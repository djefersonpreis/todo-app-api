import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { TodosModule } from './todos/todos.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig), 
        TodosModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
