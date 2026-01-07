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

// meta info
export const metadata = {
    title: "추천 | 빗썸",
    description: "빗썸 추천 페이지입니다.",
};

export default function Page() {
    return (
        <main className="flex flex-col gap-8 px-6 py-8 h-[calc(100vh-114px)] overflow-y-auto no-scrollbar">
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
            <section>
                {/* 스테이킹 또는 랜딩(코인 대여 서비스) */}
                {/* 매일 보상을 받는 스테이킹 */}
                <header>
                    <h2 className="text-lg font-semibold">
                        매일 보상을 받는 <br /> 스테이킹
                    </h2>
                </header>
                <div>
                    {/* 1~5 상위 이자 제공하는 스테이킹 코인 소개 */}
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-300 text-[#93989e] text-xs">
                                <th className="py-2 w-[50%]">자산명</th>
                                <th className="py-2 w-[30%] text-right">
                                    연 이자
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 text-[15px]">
                                <td className="py-2 flex gap-2">
                                    <span className="text-[#3d414b] text-[13px] self-center italic">
                                        1
                                    </span>
                                    <span>이더리움</span>
                                </td>
                                <td className="py-2  text-right">5.2%</td>
                            </tr>
                            <tr className="border-b border-gray-200 text-[15px]">
                                <td className="py-2 flex gap-2">
                                    <span className="text-[#3d414b] text-[13px] self-center italic">
                                        2
                                    </span>
                                    <span>오브스</span>
                                </td>
                                <td className="py-2  text-right">4.8%</td>
                            </tr>
                            <tr className="border-b border-gray-200 text-[15px]">
                                <td className="py-2 flex gap-2">
                                    <span className="text-[#3d414b] text-[13px] self-center italic">
                                        3
                                    </span>
                                    <span>트론</span>
                                </td>
                                <td className="py-2  text-right">4.5%</td>
                            </tr>
                            <tr className="border-b border-gray-200 text-[15px]">
                                <td className="py-2 flex gap-2">
                                    <span className="text-[#3d414b] text-[13px] self-center italic">
                                        4
                                    </span>
                                    <span>아이콘</span>
                                </td>
                                <td className="py-2  text-right">4.2%</td>
                            </tr>
                            <tr className="border-b border-gray-200 text-[15px]">
                                <td className="py-2 flex gap-2">
                                    <span className="text-[#3d414b] text-[13px] self-center italic">
                                        5
                                    </span>
                                    <span>코스모스</span>
                                </td>
                                <td className="py-2  text-right">2.05%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <section>
                {/* 빗썸 랜딩 (코인 대여 서비스) */}
                <header className="flex flex-row justify-between">
                    <h2 className="text-lg font-semibold">
                        빗썸 랜딩 <br /> (코인 대여 서비스)
                    </h2>
                    {/* 2025 12 25 기준이라고 표시하기 */}
                    <p className="text-xs text-gray-500 self-end">
                        2024.12.25 기준
                    </p>
                </header>
                <div>
                    {/* 1~5 상위 대여 자산 */}
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-300 text-[#93989e] text-xs">
                                <th className="py-2 w-[50%]">자산명</th>
                                <th className="py-2 w-[30%] text-right">
                                    총 대여 금액
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 text-[15px]">
                                <td className="py-2 flex gap-2">
                                    <span className="text-[#3d414b] text-[13px] self-center italic">
                                        1
                                    </span>
                                    <span>테더</span>
                                </td>
                                <td className="py-2  text-right">
                                    45,875,352,748원
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 text-[15px]">
                                <td className="py-2 flex gap-2">
                                    <span className="text-[#3d414b] text-[13px] self-center italic">
                                        2
                                    </span>
                                    <span>비트코인</span>
                                </td>
                                <td className="py-2  text-right">
                                    5,217,143,283원
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 text-[15px]">
                                <td className="py-2 flex gap-2">
                                    <span className="text-[#3d414b] text-[13px] self-center italic">
                                        3
                                    </span>
                                    <span>엑스알피</span>
                                </td>
                                <td className="py-2  text-right">
                                    1,976,977,723원
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}
