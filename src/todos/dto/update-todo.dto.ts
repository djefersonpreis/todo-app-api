import { IsString, IsOptional, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    @IsOptional()
    @IsString({
        message: 'Informe um Título para o ToDo;',
    })
    @MaxLength(80, {
        message: 'O Título deve conter até 80 caracteres.',
    })
    title: string;

    @IsOptional()
    @IsString({
        message: 'Informe um Comentário para o ToDo;',
    })
    @MaxLength(200, {
        message: 'O Comentário deve conter até 200 caracteres.',
    })
    comment: string;
}
