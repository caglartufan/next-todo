'use client';
import { MouseEventHandler } from 'react';

export default function Button({
    children,
    type,
    disabled,
    onClick,
}: Readonly<{
    children: React.ReactNode;
    type?: 'button' | 'reset' | 'submit',
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}>) {
    return (
        <button
            className="px-3 py-[2px] bg-primary-light hover:bg-primary-dark dark:bg-secondary-light dark:hover:bg-secondary-dark transition-all rounded-sm shadow-sm disabled:bg-gray-500 disabled:text-gray-400 disabled:pointer-events-none"
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
