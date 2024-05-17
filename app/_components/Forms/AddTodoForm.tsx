'use client';
import { Fragment, MouseEventHandler, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/_store/hooks';
import { formActions } from '@/app/_store/slices/formSlice';
import { addTodo } from '@/app/_actions/todos';
import Button from '../UI/Button';
import Input from '../UI/Input';
import AlertCard from '../UI/AlertCard';

type ServerActionResponse = {
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

function SubmitButton({
    disabled,
    onClick,
}: Readonly<{
    disabled: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
}>) {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            onClick={onClick}
            disabled={pending || disabled}
        >
            Submit
        </Button>
    );
}

export default function AddTodoForm() {
    const formName: FormName = 'add-todo';
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [formState, formAction] = useFormState(addTodo, initialFormState);
    const addTodoFormState = useAppSelector((state) => state.form[formName]);

    useEffect(() => {
        if (formState.todo) {
            dispatch(formActions.resetForm({ formName }));
        }
    }, [dispatch, formState.todo]);

    const cancelHandler = () => {
        router.push('/');
    };

    const submitHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();

        const button = event.currentTarget;
        const form = button.form;

        if (!form || !addTodoFormState.isValid) {
            return;
        }

        form.requestSubmit();
    };

    const feedbackCmp = (
        <AlertCard success={true} feedback="Todo has been created successfully!" />
    );

    return (
        <Fragment>
            {formState.todo && feedbackCmp}
            <form className="flex flex-col gap-y-2" action={formAction}>
                <Input
                    type="text"
                    label="Title"
                    name="title"
                    placeholder="Enter title"
                    formName={formName}
                    error={formState.errors?.title}
                />
                <Input
                    type="textarea"
                    label="Description"
                    name="description"
                    placeholder="Enter description"
                    formName={formName}
                    error={formState.errors?.description}
                />
                <div className="flex flex-row justify-center gap-x-2">
                    <Button type="button" onClick={cancelHandler}>
                        Cancel
                    </Button>
                    <SubmitButton
                        onClick={submitHandler}
                        disabled={!addTodoFormState.isValid}
                    />
                </div>
            </form>
        </Fragment>
    );
}
