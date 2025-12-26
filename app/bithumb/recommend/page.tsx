import { TabsContent } from "@radix-ui/react-tabs";
import BarWaveAnimation from "./BarWaveAnimation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopBuysTable from "./TopBuysTable";
import GrowthRateTable from "./GrowthRateTable";
import DeclineRateTable from "./DeclineRateTable";
import TradingVolumeTable from "./TradingVolumeTable";
import TopThemesTable from "./TopThemesTable";

type MarketItem = {
    symbol: string;
    name: string;
    price: number;
    change24h: number;
    volume24h: number;
};

const mockMarkets: MarketItem[] = [
    {
        symbol: "BTC/KRW",
        name: "Bitcoin",
        price: 97_500_000,
        change24h: 1.42,
        volume24h: 123_000_000_000,
    },
    {
        symbol: "ETH/KRW",
        name: "Ethereum",
        price: 4_200_000,
        change24h: -0.58,
        volume24h: 89_500_000_000,
    },
    {
        symbol: "SOL/KRW",
        name: "Solana",
        price: 175_000,
        change24h: 3.9,
        volume24h: 21_300_000_000,
    },
];

const tabList = [
    { label: "순매수상위", value: "topBuys" },
    { label: "상승률", value: "growthRate" },
    { label: "하락률", value: "declineRate" },
    { label: "거래금액", value: "tradingVolume" },
    { label: "테마상위", value: "topThemes" },
];


export default function Page() {
    return (
        <main className="flex flex-col gap-8 px-6 py-8 h-[calc(100vh-114px)]">
            <header className="sr-only">
                <h1>추천</h1>
            </header>
            {/* key feature 1. 상승신호 */}
            {/* 요즘 하락세이다보니 상승신호가 잘 보이지 않음. 
            1. 따라서 key feature 를 코인랜딩으로 하는것도 좋아보임
            시황에 따라 key feature 가 바뀌면 어떨까? 
            2. 상승신호가 없을 때 그냥 비어 있는 공간보다는 뭘 보여주는게 좋을까?
            (과거 상승신호가 뜬 종목들을 보니 다 가격이 낮아졌음. ㄷㄷ)
            고민해본 결과 상승신호 보단 랜딩이 낫지 않나 싶음.
            */}

            <section className="flex bg-[#282b33] p-2 rounded-sm justify-between">
                {/* 요즘 같은 하락장일 때는 아래 좀 무의미함... 그래서 빼는게 좋다라곤 생각하나. 6월에 출시되었고 빗썸이 좀 미는 기능인 거 같아서 아예 빼기보단 강화한 아이디어를 제안하면 좋을 듯. */}
                <div className="flex gap-2">
                    <BarWaveAnimation />
                    <strong className="text-white text-sm">
                        상승신호 감지중
                    </strong>
                </div>

                <button className="text-white opacity-60 text-sm">
                    전체현황
                </button>
            </section>
            {/* 실시간 차트 (빅데이터 + 실시간 순위) */}
            <section className="flex flex-col gap-4">
                <header>
                    <h2 className="text-lg font-semibold">실시간 차트</h2>
                </header>
                <div className="flex flex-col gap-2">
                    <Tabs defaultValue="topBuys">
                        <TabsList className="w-full">
                            {tabList.map((tab) => (
                                <TabsTrigger key={tab.value} value={tab.value}>
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        <TabsContent value="topBuys">
                            {/* 순매수상위 탭 내용 */}
                            <TopBuysTable />
                        </TabsContent>
                        <TabsContent value="growthRate">
                            <GrowthRateTable />
                        </TabsContent>
                        <TabsContent value="declineRate">
                            <DeclineRateTable />
                        </TabsContent>
                        <TabsContent value="tradingVolume">
                            <TradingVolumeTable />
                        </TabsContent>
                        <TabsContent value="topThemes">
                            <TopThemesTable />
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
            <section>{/* 스테이킹 또는 랜딩(코인 대여 서비스) */}</section>
        </main>
    );
}
