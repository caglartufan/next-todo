'use client';
import { MouseEventHandler } from 'react';

export default function Button({
    children,
    color,
    type,
    disabled,
    onClick,
}: Readonly<{
    children: React.ReactNode;
    color?: 'bg-success' | 'bg-info' | 'bg-warning' | 'bg-danger';
    type?: 'button' | 'reset' | 'submit',
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}>) {
    let buttonColorClass = 'bg-primary-light hover:bg-primary-dark dark:bg-secondary-light dark:hover:bg-secondary-dark';

    if(typeof color === 'string') {
        buttonColorClass = color;
    }

    return (
        <button
            className={'text-sm sm:text-base px-3 py-[2px] transition-all rounded-sm shadow-sm disabled:bg-gray-500 disabled:text-gray-400 disabled:pointer-events-none ' + buttonColorClass}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
