'use client';
import { useAppDispatch, useAppSelector } from '@/app/_store/hooks';
import { formActions } from '@/app/_store/slices/formSlice';
import {
    useRef,
    KeyboardEvent,
    ChangeEventHandler,
    FocusEventHandler,
} from 'react';

export default function Input({
    type,
    label,
    name,
    placeholder,
    value,
    onChange,
    onFocus,
    onBlur,
    error,
    formName,
}: Readonly<{
    type: 'text' | 'textarea';
    label: string;
    name: string;
    placeholder?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    error?: string | null;
    formName?: FormName;
}>) {
    const dispatch = useAppDispatch();
    const inputState = useAppSelector((state) => {
        if (!formName) {
            return null;
        }

        const formInputs = state.form[formName].inputs;

        if (!(name in formInputs)) {
            return null;
        }

        return formInputs[name as InputName];
    });
    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    let inputCmp: React.ReactNode;
    const inputStyle =
        'text-sm bg-transparent border-b-[1px] border-b-dark dark:border-b-light placeholder:text-neutral-500 dark:placeholder:text-gray-400 placeholder:italic';

    const inputStateSpecificAttributes: {
        value?: string;
        onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
        onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
        onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    } = inputState
        ? {
              value: inputState.value,
              onChange: (event) => {
                  dispatch(
                      formActions.changeInput({
                          formName: formName as FormName,
                          inputName: name as InputName,
                          value: event.target.value,
                      })
                  );
              },
              onFocus: () => {
                  dispatch(
                      formActions.inputTouched({
                          formName: formName as FormName,
                          inputName: name as InputName,
                      })
                  );
              },
              onBlur: () => {
                  dispatch(
                      formActions.validateInput({
                          formName: formName as FormName,
                          inputName: name as InputName,
                      })
                  );
              },
          }
        : {};

    if (!error && inputState?.error) {
        error = inputState.error;
    }

    if (type === 'text') {
        inputCmp = (
            <input
                type="text"
                name={name}
                className={inputStyle}
                id={name + '-input'}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                {...inputStateSpecificAttributes}
                ref={inputRef}
            />
        );
    } else if (type == 'textarea') {
        const onKeyDownHandler = (
            event: KeyboardEvent<HTMLTextAreaElement>
        ) => {
            const textarea = textareaRef.current;

            if (!textarea) {
                return;
            }

            setTimeout(() => {
                textarea.style.height = 'auto';
                textarea.style.padding = '0';
                textarea.style.height = textarea.scrollHeight + 'px';
            }, 0);
        };

        inputCmp = (
            <textarea
                name={name}
                className={inputStyle + ' resize-none'}
                rows={1}
                id={name + '-input'}
                onKeyDown={onKeyDownHandler}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                {...inputStateSpecificAttributes}
                ref={textareaRef}
            />
        );
    }

    return (
        <div className="flex flex-col">
            <label
                className="text-sm font-semibold mb-1"
                htmlFor={name + '-input'}
            >
                {label}
            </label>
            {inputCmp}
            {error && (
                <p className="text-danger text-xs font-light mt-1">{error}</p>
            )}
        </div>
    );
}
