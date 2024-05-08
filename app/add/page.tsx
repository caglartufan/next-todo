import { Fragment } from 'react';
import { Metadata } from 'next';
import AddTodoForm from '../_components/Forms/AddTodoForm';
import { revalidatePath } from 'next/cache';

export const metadata: Metadata = {
    title: 'Todo App | Add',
    description: 'Todo application for practicing Next.js',
};

export default function Page() {
    revalidatePath('/');

    return (
        <Fragment>
            <h2 className="text-lg font-semibold mb-4">Add new Todo</h2>
            <AddTodoForm />
        </Fragment>
    );
}
