'use server';
import { fetchTodos } from '@/app/_actions/todos';
import TodoListItem from './TodoListItem';

export default async function TodoList() {
    const fetchedTodos = await fetchTodos();

    if (!fetchedTodos.length) {
        return <p className="text-red-500">No todos were found!</p>;
    }

    return (
        <ul>
            {fetchedTodos.map((todo) => (
                <TodoListItem key={todo._id.toString()} todo={todo} />
            ))}
        </ul>
    );
}