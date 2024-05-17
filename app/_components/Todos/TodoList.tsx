'use server';
import { fetchTodos } from '@/app/_actions/todos';
import TodoListItem from './TodoListItem';
import EditTodoForm from '../Forms/EditTodoForm';

export default async function TodoList({
    editTodoWithId,
}: Readonly<{
    editTodoWithId?: string;
}>) {
    const fetchedTodos = await fetchTodos();

    if (!fetchedTodos.length) {
        return <p className="text-red-500">No todos were found!</p>;
    }

    return (
        <ul className="flex flex-col gap-y-4">
            {fetchedTodos.map((todo) =>
                editTodoWithId && editTodoWithId === todo._id.toString() ? (
                    <EditTodoForm
                        key={todo._id.toString()}
                        todo={{
                            _id: todo._id.toString(),
                            title: todo.title,
                            description: todo.description,
                        }}
                    />
                ) : (
                    <TodoListItem key={todo._id.toString()} todo={todo} />
                )
            )}
        </ul>
    );
}
