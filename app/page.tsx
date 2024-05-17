import { Metadata } from 'next';
import { Suspense } from 'react';
import LoadingText from './_components/UI/LoadingText';
import TodoList from './_components/Todos/TodoList';

export const metadata: Metadata = {
    title: 'Todo App',
    description: 'Todo application for practicing Next.js',
};

export default function Home({
    searchParams
}: Readonly<{
    searchParams: {
        edit: string;
    }
}>) {
    const { edit: editingTodoId } = searchParams;

    return (
        <Suspense fallback={<LoadingText />}>
            <TodoList editTodoWithId={editingTodoId} />
        </Suspense>
    );
}
