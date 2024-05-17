'use server';
import { revalidatePath } from 'next/cache';
import { dbConnect } from '../_lib/db';
import mongoose from 'mongoose';
import Todo from '../_models/Todo';
import { validateTodoTitleAndDescription } from '../_utils/validators';

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

    response.errors = validateTodoTitleAndDescription(title, description);
    if (response.errors) {
        return response;
    }

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
        updatedAt: todo.updatedAt,
    };

    revalidatePath('/');

    return response;
}

export async function editTodo(prevState: any, formData: FormData) {
    const todoId = formData.get('id')?.toString();
    const title = formData.get('title')?.toString();
    const description = formData.get('description')?.toString();
    const response: {
        error?: string;
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

    response.error = 'Todo was not found!';
    if (!todoId || todoId === '' || !mongoose.Types.ObjectId.isValid(todoId)) {
        return response;
    }

    const todo = await Todo.findById(todoId);

    if (!todo) {
        return response;
    }

    response.error = undefined;

    response.errors = validateTodoTitleAndDescription(title, description);
    if(response.errors) {
        return response;
    }

    todo.title = title!;
    todo.description = description!;

    await todo.save();

    response.todo = todo;

    revalidatePath('/');

    return response;
}

export async function deleteTodo(formData: FormData) {
    const todoId = formData.get('id')?.toString();
    const response: {
        ok: boolean;
        message?: string;
    } = { ok: false };

    if (!todoId || todoId === '' || !mongoose.Types.ObjectId.isValid(todoId)) {
        response.message = 'Invalid todo ID given.';
        return response;
    }

    const todo = await Todo.findByIdAndDelete(todoId);

    if (!todo) {
        response.message = 'Todo was not found.';
        return response;
    }

    revalidatePath('/');

    response.ok = true;
    response.message = undefined;
    return response;
}
