import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { resourceLimits } from 'worker_threads';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private todosRepository: Repository<Todo>,
    ) { }

    async create(createTodoDto: CreateTodoDto): Promise<Todo> {
        const { title, comment } = createTodoDto;

        const todo: Todo = new Todo();
        todo.title = title;
        todo.comment = comment;

        try {
            await todo.save();
            return todo;
        } catch (error) {
            throw new InternalServerErrorException(
                'Erro ao cadastrar ToDo no banco de dados',
            );
        }
    }

    findAll(): Promise<Todo[]> {
        return this.todosRepository.find();
    }

    findOne(id: string): Promise<Todo> {
        return this.todosRepository.findOne({ where: { id: id } });
    }

    async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
        const todo = await this.findOne(id);

        const { title, comment } = updateTodoDto;

        todo.title = title;
        todo.comment = comment;

        try {
            await todo.save();
            return todo;
        } catch (error) {
            throw new InternalServerErrorException(
                'Erro ao alterar registro de ToDo no banco de dados',
            );
        }
    }

    async remove(id: string) {
        const result = await this.todosRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(
                'Não foi encontrado um ToDo com o ID informado',
            );
        }
    }
}
