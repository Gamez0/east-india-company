import { Button } from "@/components/ui/button";
import { Star, Triangle } from "lucide-react";
import BackButton from "@/components/navigation/BackButton";
import BarWaveAnimation from "@/components/animations/BarWaveAnimation";
import TradeTab from "./TradeTab";

export default function TradeHeader() {
    return (
        <div>
            <div className="flex p-2 justify-between w-full h-14">
                <BackButton />
                <div className="flex flex-col items-center">
                    <h1>비트코인(KRW)</h1>
                    <span className="text-[11px] text-[#93989e]">BTC</span>
                </div>
                <Button size={"icon-lg"} variant="ghost">
                    {/* 즐겨찾기 아이콘 넣기 */}
                    <Star className="text-[#1c2028] size-6" />
                </Button>
            </div>
            <div className="px-5 gap-1 flex flex-col">
                <div>
                    <h2 className="text-[#4880ee] text-[22px]">129,585,000</h2>
                    <div className="flex ">
                        <span className="text-[#4880ee]">-12,345</span>{" "}
                        <Triangle className="rotate-180 fill-[#4880ee]  text-transparent size-2 self-center" />
                        <span className="text-[#4880ee]">2.34%</span>
                    </div>
                </div>
                <div className="flex gap-2 bg-[#f8f9fa]">
                    <BarWaveAnimation />
                    <span className="text-xs">상승신호 감지중</span>
                </div>
            </div>
            <TradeTab />
        </div>
    );
}
