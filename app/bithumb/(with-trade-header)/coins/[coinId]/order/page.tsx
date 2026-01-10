import OrderBook from "./OrderBook";
import OrderPanel from "./OrderPanel";

export default async function Page({
    params,
}: {
    params: Promise<{ coinId: string }>;
}) {
    const { coinId } = await params;
    return (
        <main className="flex h-[calc(100vh-232px)]">
            <OrderBook />
            <OrderPanel />
        </main>
    );
}
