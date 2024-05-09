'use client';
export default function Card({
    children,
    color,
}: Readonly<{
    children: React.ReactNode;
    color?: 'danger' | 'success' | 'info' | 'warning';
}>) {
    const bgColor = typeof color === 'undefined' ? 'bg-info' : ('bg-' + color);

    return (
        <div className={'p-2 mb-4 rounded-md text-light ' + bgColor}>
            {children}
        </div>
    );
}
