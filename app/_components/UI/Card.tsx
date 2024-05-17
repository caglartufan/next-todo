'use client';
export default function Card({
    children,
    className,
}: Readonly<{
    children: React.ReactNode;
    className?: string;
}>) {
    let cardClassName = 'rounded-md';

    if(className) {
        cardClassName += ' ' + className;
    }

    return (
        <div className={cardClassName}>
            {children}
        </div>
    );
}
