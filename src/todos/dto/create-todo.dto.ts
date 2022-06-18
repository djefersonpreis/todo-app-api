import {
    IsNotEmpty,
    MaxLength
} from 'class-validator';

export class CreateTodoDto {
    @IsNotEmpty({
        message: 'Informe um Título para o ToDo;',
    })
    @MaxLength(80, {
        message: 'O Título deve conter até 80 caracteres.',
    })
    title: string;

    
    @IsNotEmpty({
        message: 'Informe um Comentário para o ToDo;',
    })
    @MaxLength(200, {
        message: 'O Comentário deve conter até 200 caracteres.',
    })
    comment: string;
}
