import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import PortfolioPieChart from "@/components/assets/PortfolioPieChart";
import Link from "next/link";

// meta info
export const metadata = {
    title: "자산현황 | 빗썸",
    description: "빗썸 자산현황 페이지입니다.",
};

export default function Page() {
    const totalAssets = 20144;
    const krwBalance = 14988;
    const btcBalance = 0.00003846;
    const profit = 157;
    const profitRate = 3.14;

    const assets = [
        {
            imgSrc: "/bithumb/coin/coin-btc.png",
            name: "비트코인 (BTC)",
            amount: "0.00003846 BTC",
            value: 5178,
            profit: 179,
            profitRate: 3.58,
            coinId: "btc",
        },
        {
            imgSrc: "/bithumb/coin/coin-eth.png",
            name: "이더리움 (ETH)",
            amount: "0.00012345 ETH",
            value: 8123,
            profit: 245,
            profitRate: 3.11,
            coinId: "eth",
        },
        {
            imgSrc: "/bithumb/coin/coin-sol.png",
            name: "솔라리움 (SOL)",
            amount: "10.5678 SOL",
            value: 6843,
            profit: 132,
            profitRate: 2.58,
            coinId: "sol",
        },
    ];

    return (
        <main className="flex flex-col h-[calc(100vh-114px)] px-6.5 gap-2">
            <header className="sr-only">
                <h1>자산 현황</h1>
            </header>
            <section className="flex flex-col pt-10 pb-4 gap-8">
                <div className="flex gap-2">
                    <div className="flex flex-col bg-[#f2f4f6] p-4 rounded-2xl w-full">
                        <span className="text-sm">원화</span>
                        <span>{krwBalance.toLocaleString()}원</span>
                    </div>
                    <div className="flex flex-col bg-[#f2f4f6] p-4 rounded-2xl w-full">
                        <span className="text-sm">BTC</span>
                        <span>{btcBalance} BTC</span>
                    </div>
                </div>
                <div>
                    <p className="">총 보유자산</p>
                    <div className="flex items-end">
                        <span className="text-2xl font-semibold">
                            {totalAssets.toLocaleString()}
                        </span>
                        <span>원</span>
                    </div>
                    <span className="text-[#e15241]">
                        +{profit} ({profitRate}%)
                    </span>
                </div>
            </section>
            <section className="flex flex-col">
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <div className="flex gap-1 self-center">
                                <img
                                    src="/bithumb/img-assets-portfolio.webp"
                                    className="size-6"
                                />
                                <p className="text-base">보유자산 포트폴리오</p>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance items-center">
                            <PortfolioPieChart />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>
            <section className="flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                    <Select>
                        <SelectTrigger className="p-0 border-none gap-1">
                            <SelectValue
                                className="text-sm text-[#1c2028]"
                                placeholder="보유자산 높은 순"
                                defaultValue="descAssetHoldings"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="krOrder">
                                    가나다 순
                                </SelectItem>
                                <SelectItem value="descAssetHoldings">
                                    보유자산 높은 순
                                </SelectItem>
                                <SelectItem value="ascAssetHoldings">
                                    보유자산 낮은 순
                                </SelectItem>
                                <SelectItem value="descProfit">
                                    총 수익률 높은 순
                                </SelectItem>
                                <SelectItem value="ascProfit">
                                    총 수익률 낮은 순
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="hideSmallAssets" />
                        <Label
                            htmlFor="hideSmallAssets"
                            className="text-sm text-[#707882]"
                        >
                            비상장/소액 자산 숨기기
                        </Label>
                    </div>
                </div>
                <div className="flex flex-col gap-4.5">
                    {assets.map((asset, index) => (
                        <Link
                            key={index}
                            className="flex flex-row justify-between"
                            href={`/bithumb/coins/${asset.coinId}`}
                        >
                            <div className="flex flex-row gap-2 items-center">
                                <img src={asset.imgSrc} className="size-8" />
                                <div>
                                    <p className="">{asset.name}</p>
                                    <p className="text-xs text-[#707882]">
                                        {asset.amount}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-[#e15241]">
                                    {asset.value} 원
                                </p>

                                <p className="text-sm text-[#e15241]">
                                    +{asset.profit} ({asset.profitRate}%)
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}

/** 이렇게 바꾼 이유?
 *  자산현황을 100명이 들어오면 대다수가 수익률을 확인하러 들어 온다고 생각한다.
 * 그래서 상단 탭의 형태가 아닌 내 자산 현황을 간단하게 보여주고 수익률을 가장 강조해서 보여준다.
 * 그 밑에 이제 내 자산들의 수익률을 보여 준 뒤
 * 그 하단에 거래내역, 주문내역, 미체결과 같은 한번 확인하면 추가적으로 접근하지 않는 영역을 아래에 둔다.
 *
 */
