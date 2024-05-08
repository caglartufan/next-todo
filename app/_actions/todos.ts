'use server';
import { revalidatePath } from 'next/cache';
import { dbConnect } from '../_lib/db';
import Todo from '../_models/Todo';

export async function fetchTodos() {
    await dbConnect();

    const todos = await Todo.find().sort({ createdAt: 'desc' });

    return todos;
}

export async function addTodo(prevState: any, formData: FormData) {
    const title = formData.get('title')?.toString();
    const description = formData.get('description')?.toString();
    const response: {
        errors?: {
            title?: string;
            description?: string;
        };
        todo?: {
            title: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } = {};

    response.errors = {};

    if (!title || title === '') {
        response.errors.title = 'Title must not be empty.';
    } else if (title.length < 5) {
        response.errors.title = 'Title must contain at least 5 characters.';
    } else if (title.length > 50) {
        response.errors.title = 'Title must contain at most 50 characters.';
    }

    if (!description || description === '') {
        response.errors.description = 'Description must not be empty.';
    } else if (description.length < 3) {
        response.errors.description =
            'Description must contain at least 3 characters.';
    } else if (description.length > 250) {
        response.errors.description =
            'Description must contain at most 250 characters.';
    }

    if (response.errors.title || response.errors.description) {
        return response;
    }

    response.errors = undefined;

    await dbConnect();

    const todo = new Todo({
        title,
        description,
    });

    await todo.save();

    response.todo = {
        title: todo.title,
        description: todo.description,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt
    };

    revalidatePath('/');

    return response;
}
