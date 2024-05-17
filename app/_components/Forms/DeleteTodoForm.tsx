'use client';
import { useFormStatus } from 'react-dom';
import Button from '../UI/Button';
import { deleteTodo } from '@/app/_actions/todos';

function DeleteButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" color="bg-danger" disabled={pending}>
            Delete
        </Button>
    );
}

export default function DeleteTodoForm({
    todoId,
}: Readonly<{
    todoId: string;
}>) {
    return (
        <form action={deleteTodo}>
            <input type="hidden" name="id" value={todoId} />
            <DeleteButton />
        </form>
    );
}
