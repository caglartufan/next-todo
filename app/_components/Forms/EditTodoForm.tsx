'use client';
import { MouseEventHandler, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/_store/hooks';
import { formActions } from '@/app/_store/slices/formSlice';
import { editTodo } from '@/app/_actions/todos';
import Card from '../UI/Card';
import Input from '../UI/Input';
import Button from '../UI/Button';
import AlertCard from '../UI/AlertCard';

type ServerActionResponse = {
    message?: string;
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
};

const initialFormState: ServerActionResponse = {};

function EditButton({
    disabled,
    onClick,
}: Readonly<{
    disabled: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>
}>) {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            color="bg-info"
            onClick={onClick}
            disabled={pending || disabled}
        >
            Edit
        </Button>
    );
}

export default function EditTodoForm({
    todo,
}: Readonly<{
    todo: SerializedTodo;
}>) {
    const formName: FormName = 'edit-todo';
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [formState, formAction] = useFormState(editTodo, initialFormState);
    const editTodoFormState = useAppSelector((state) => state.form[formName]);

    useEffect(() => {
        if (todo.title && todo.title !== '') {
            dispatch(
                formActions.changeInput({
                    formName,
                    inputName: 'title',
                    value: todo.title,
                })
            );
        }

        if (todo.description && todo.description !== '') {
            dispatch(
                formActions.changeInput({
                    formName,
                    inputName: 'description',
                    value: todo.description,
                })
            );
        }
    }, [dispatch, todo.title, todo.description]);

    const backHandler = () => {
        router.push('/');
    };

    const submitHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        const button = event.currentTarget;
        const form = button.form;

        if (!form || !editTodoFormState.isValid) {
            return;
        }

        form.requestSubmit();
    };

    let feedbackCmp: React.ReactNode = null;
    if (formState.todo) {
        feedbackCmp = (
            <AlertCard success={true} feedback="Todo has been edited successfully!" />
        );
    } else if (formState.error) {
        feedbackCmp = (
            <AlertCard success={false} feedback={formState.error} />
        );
    } else if(formState.errors) {
        feedbackCmp = (
            <AlertCard success={false} feedback="Title or description is not valid!" />
        );
    }

    return (
        <Card className="flex flex-col bg-primary-dark dark:bg-secondary-dark py-2 px-3 shadow-md">
            {feedbackCmp}
            <form
                className="flex flex-col gap-y-2 w-full"
                action={formAction}
            >
                <input type="hidden" name="id" value={todo._id} />
                <Input
                    type="text"
                    name="title"
                    label="Title"
                    placeholder="Enter title"
                    formName={formName}
                    error={formState.errors?.title}
                />
                <Input
                    type="text"
                    name="description"
                    label="Description"
                    placeholder="Enter description"
                    formName={formName}
                    error={formState.errors?.description}
                />
                <div className="flex flex-row justify-center gap-x-2">
                    <Button
                        type="button"
                        color="bg-warning"
                        onClick={backHandler}
                    >
                        Back
                    </Button>
                    <EditButton onClick={submitHandler} disabled={!editTodoFormState.isValid} />
                </div>
            </form>
        </Card>
    );
}
