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
        <main className="h-[calc(100vh-114px)]">
            {/* TODO: 탭 구현하기, 탭 아이템이 url 마지막에 오도록 하기 
            /btc/order, /btc/chart 와 같이. 그래서 공통 레이아웃을 쓰도록. 
            그 다음에 포트폴리오에 내용 업데이트하기 */}
            <h1>
                <button>뒤로가기</button>
                비트코인(KRW)
                <button>즐겨찾기</button>
            </h1>
            <h2>
                <div>
                    <span>129,580,000</span>
                    +1,500,000 1.17%
                </div>
                타 서비스 시세
                <nav className="w-full">
                    <button>주문</button>
                    <button>호가</button>
                    <button>차트</button>
                    <button>시세</button>
                    <button>정보</button>
                </nav>
            </h2>
            Coin {coinId}
            <OrderBook />
        </main>
    );
}
