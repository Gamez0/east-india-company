import OrderBook from "./OrderBook";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "129,580,000 BTC/KRW",
    robots: {
        index: false,
        follow: true,
    },
};

export default async function Page({
    params,
}: {
    params: Promise<{ coinId: string }>;
}) {
    const { coinId } = await params;
    return (
        <main className="h-[calc(100vh-186px)]">
            {/* TODO: next local font 로 최적화하기 https://nextjs.org/docs/app/getting-started/fonts#local-fonts */}
            Coin {coinId}
            <OrderBook />
        </main>
    );
}
