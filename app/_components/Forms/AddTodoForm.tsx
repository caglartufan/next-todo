'use client';
import { Fragment, MouseEventHandler, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/_store/hooks';
import { addTodo } from '@/app/_actions/todos';
import { addTodoFormActions } from '@/app/_store/slices/addTodoFormSlice';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Card from '../UI/Card';

type FormState = {
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

const initialFormState: FormState = {};

export default function AddTodoForm() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [formState, formAction] = useFormState(addTodo, initialFormState);
    const addTodoFormState = useAppSelector((state) => state.addTodoForm);

    useEffect(() => {
        console.log(formState);
    }, [formState]);

    useEffect(() => {
        if (formState.todo) {
            dispatch(addTodoFormActions.resetForm());
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
        <Card color="success">
            <p className="text-sm">Todo has been created successfully!</p>
        </Card>
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
                    inputState={addTodoFormState.inputs.title}
                    error={formState.errors?.title}
                />
                <Input
                    type="textarea"
                    label="Description"
                    name="description"
                    placeholder="Enter description"
                    inputState={addTodoFormState.inputs.description}
                    error={formState.errors?.description}
                />
                <div className="flex flex-row justify-center gap-x-2">
                    <Button type="button" onClick={cancelHandler}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        onClick={submitHandler}
                        disabled={!addTodoFormState.isValid}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Fragment>
    );
}
