import { Metadata } from 'next';
import TodoList from './_components/Todos/TodoList';

export const metadata: Metadata = {
    title: 'Todo App',
    description: 'Todo application for practicing Next.js',
};

export default function Home() {
    return (
        <TodoList />
    );
}
