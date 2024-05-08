'use client';
export default function Card({
    children,
    color,
}: Readonly<{
    children: React.ReactNode,
    color?: 'danger' | 'success' | 'info' | 'warning',
}>) {
    return (
        <div className={'p-2 mb-4 rounded-md text-light' + (color ? ` bg-${color}` : '')}>
            {children}
        </div>
    );
}