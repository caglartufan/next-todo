'use client';

import Button from "./_components/UI/Button";

export default function ErrorPage({
    error,
    reset
}: Readonly<{
    error: Error & { digest: string };
    reset: () => void;
}>) {
    return (
        <div className="text-center">
            <div className="mb-4">
                <h2 className="text-lg text-red-500 dark:text-red-400 sm:text-xl font-bold">Something went wrong!</h2>
                <p>{error.message}</p>
            </div>
            <Button onClick={() => reset()}>
                TRY AGAIN
            </Button>
        </div>
    );
}
