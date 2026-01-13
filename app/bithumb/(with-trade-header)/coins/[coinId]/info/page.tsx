export default async function Page({
    params,
}: {
    params: Promise<{ coinId: string }>;
}) {
    const { coinId } = await params;
    return (
        <main className="flex h-[calc(100vh-218.88px)]">
            <div className="p-4">Coin {coinId} Info Page</div>
        </main>
    );
}
