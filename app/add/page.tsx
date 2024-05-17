import path from 'path';
process.env['NODE_CONFIG_DIR'] = path.join(path.resolve('./'), 'config/');
import { Fragment } from 'react';
import { Metadata } from 'next';
import AddTodoForm from '../_components/Forms/AddTodoForm';

export const metadata: Metadata = {
    title: 'Todo App | Add',
    description: 'Todo application for practicing Next.js',
};

export default function Page() {
    return (
        <Fragment>
            <h2 className="text-lg font-semibold mb-4">Add new Todo</h2>
            <AddTodoForm />
        </Fragment>
    );
}
