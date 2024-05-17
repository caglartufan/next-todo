'use server';
import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';


export default async function LinkButton({
    children,
    color,
    href,
}: Readonly<{
    children: React.ReactNode;
    color?: 'bg-success' | 'bg-warning' | 'bg-info' | 'bg-danger';
    href: Url;
}>) {
    let buttonColorClass =
        'bg-primary-light hover:bg-primary-dark dark:bg-secondary-light dark:hover:bg-secondary-dark';

    if (typeof color === 'string') {
        buttonColorClass = color;
    }

    return (
        <Link href={href}
            className={
                'text-sm sm:text-base px-3 py-[2px] transition-all rounded-sm shadow-sm disabled:bg-gray-500 disabled:text-gray-400 disabled:pointer-events-none ' +
                buttonColorClass
            }
        >
            {children}
        </Link>
    );
}
