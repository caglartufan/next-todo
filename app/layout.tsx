'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { store } from './_store/store';
import { uiActions } from './_store/slices/uiSlice';
import { THEME } from '@/common';
import Button from './_components/UI/Button';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [theme, setTheme] = useState<THEME>(() => store.getState().ui.theme);

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setTheme(store.getState().ui.theme);
        });

        const localStorageThemeValue = localStorage.getItem('theme');
        let initialTheme = THEME.LIGHT;
        if (localStorageThemeValue === THEME.DARK) {
            initialTheme = THEME.DARK;
        }
        store.dispatch(uiActions.setTheme({ theme: initialTheme }));
        setIsMounted(true);

        return () => {
            unsubscribe();
        };
    }, []);

    const listButtonClickHandler = () => {
        router.push('/');
    };

    const addButtonClickHandler = () => {
        router.push('/add');
    };

    const toggleThemeHandler = () => {
        const targetTheme = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
        store.dispatch(uiActions.setTheme({ theme: targetTheme }));
    };

    return (
        <Provider store={store}>
            <html className={theme === THEME.DARK ? 'dark' : ''} lang="en">
                <body
                    className={
                        'flex flex-col justify-center items-center h-screen p-4 sm:p-0 bg-light text-dark dark:bg-dark dark:text-light ' +
                        inter.className
                    }
                >
                    {isMounted && (
                        <>
                            <main className="flex flex-col w-full sm:w-[600px] sm:max-h-[80vh] bg-primary dark:bg-secondary rounded-md shadow-md overflow-hidden">
                                <div className="bg-primary-darker dark:bg-secondary-darker px-4 py-2 shadow-md">
                                    <h1 className="text-xl sm:text-2xl font-bold">
                                        Todo App
                                    </h1>
                                    <div className="flex flex-row justify-between items-center gap-x-4">
                                        <p className="text-sm font-semibold">
                                            Todo application for practicing
                                            Next.js
                                        </p>
                                        <div className="flex flex-row gap-x-2">
                                            <Button
                                                onClick={listButtonClickHandler}
                                                disabled={pathname === '/'}
                                            >
                                                LIST
                                            </Button>
                                            <Button
                                                onClick={addButtonClickHandler}
                                                disabled={pathname === '/add'}
                                            >
                                                ADD
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="p-4 overflow-y-auto"
                                >
                                    {children}
                                </div>
                            </main>
                            <div className="flex flex-col items-center justify-center mt-4 sm:h-[10vh] sm:m-0 sm:absolute sm:top-0 sm:right-8">
                                <button
                                    className="text-xs uppercase font-bold text-light cursor-pointer px-2 py-1 bg-secondary dark:bg-primary dark:text-dark rounded-md shadow-md"
                                    onClick={toggleThemeHandler}
                                >
                                    {(theme === THEME.DARK ? 'light' : 'dark') +
                                        ' mode'}
                                </button>
                            </div>
                        </>
                    )}
                </body>
            </html>
        </Provider>
    );
}
