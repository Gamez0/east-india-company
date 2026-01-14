import TradeHeader from "@/components/header/TradeHeader";
import { MOCK_PRICE } from "@/mocks/price";

import type { Metadata } from "next";

type Props = {
    params: Promise<{ coinId: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const coinId = (await params).coinId;

    // fetch post information
    const MOCK_PRICE_DATA = MOCK_PRICE[coinId as keyof typeof MOCK_PRICE]; // <- 여기서 슬러그가 코인 아이디라고 가정
    const percent = (
        ((MOCK_PRICE_DATA.midPrice - MOCK_PRICE_DATA.yesterDayPrice) /
            MOCK_PRICE_DATA.yesterDayPrice) *
        100
    ).toFixed(2);
    const percentSign = percent > "0" ? "+" : "";
    return {
        title:
            MOCK_PRICE_DATA?.midPrice.toLocaleString() +
            "원 " +
            percentSign +
            percent +
            "% | " +
            MOCK_PRICE_DATA?.symbol +
            " Bithumb",
        description: `Trade ${MOCK_PRICE_DATA?.name} on Bithumb.`,
    };
}

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex w-full flex-col overflow-hidden">
            <TradeHeader />
            {children}
        </div>
    );
}
