import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import PortfolioPieChart from "./PortfolioPieChart";

export default function Page() {
    const totalAssets = 20144;
    const krwBalance = 14988;
    const btcBalance = 0.00003846;
    const profit = 157;
    const profitRate = 3.14;

    return (
        <main className="h-[calc(100vh-114px)] px-8">
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
                        <span className="text-2xl">
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
            <section></section>
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
