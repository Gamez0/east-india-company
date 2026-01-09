export default async function Page({
    params,
}: {
    params: Promise<{ coinId: string }>;
}) {
    const { coinId } = await params;
    return (
        <main className="h-[calc(100vh-186px)]">
            <div className="p-4">Coin {coinId} Info Page</div>
        </main>
    );
}
