'use server';
import { ITodo } from '@/app/_models/Todo';
import { HydratedDocument } from 'mongoose';
import DeleteTodoForm from '../Forms/DeleteTodoForm';
import LinkButton from '../UI/LinkButton';
import Card from '../UI/Card';

export default async function TodoListItem({
    todo,
}: Readonly<{ todo: HydratedDocument<ITodo> }>) {
    return (
        <li>
            <Card className="flex flex-row bg-primary-dark dark:bg-secondary-dark py-1 px-3 shadow-md">
                <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold">{todo.title}</h3>
                    <p className="text-sm sm:text-base mb-2">{todo.description}</p>
                    <span className="text-xs text-end">
                        {todo.createdAt.toDateString()}
                    </span>
                </div>
                <div className="flex flex-row gap-x-2 h-min pt-2">
                    <LinkButton
                        color="bg-info"
                        href={{ pathname: '/', query: { edit: todo.id } }}
                    >
                        Edit
                    </LinkButton>
                    <DeleteTodoForm todoId={todo.id} />
                </div>
            </Card>
        </li>
    );
}
