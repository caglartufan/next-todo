import Card from './Card';

export default function AlertCard({
    feedback,
    success,
}: Readonly<{
    feedback: string;
    success: boolean;
}>) {
    const bgColor = success ? 'bg-success' : 'bg-danger';

    return (
        <Card className={'p-2 mb-4 ' + bgColor}>
            <p className="text-sm text-light">{feedback}</p>
        </Card>
    );
}
