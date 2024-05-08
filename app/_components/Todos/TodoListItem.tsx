'use server';
import { ITodo } from '@/app/_models/Todo';
import { HydratedDocument } from 'mongoose';

export default async function TodoListItem({ todo }: Readonly<{ todo: HydratedDocument<ITodo> }>) {
    return (
        <li key={todo.id}>
            <span className="text-xl">{todo.title}</span>
            <p>{todo.description}</p>
            <span>{todo.createdAt.toDateString()}</span>
        </li>
    );
}
