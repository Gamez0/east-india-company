import OrderBook from "./OrderBook";
import OrderPanel from "./OrderPanel";

export default async function Page({
    params,
}: {
    params: Promise<{ coinId: string }>;
}) {
    const { coinId } = await params;
    return (
        <main className="flex h-[calc(100vh-218.88px)]">
            <div className="w-36 overflow-y-auto no-scrollbar">
                <OrderBook coinId={coinId} />
            </div>
            <OrderPanel />
        </main>
    );
}
