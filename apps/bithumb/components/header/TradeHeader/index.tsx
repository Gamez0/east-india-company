"use client";

import { Button } from "@/components/ui/button";
import { Star, Triangle } from "lucide-react";
import BackButton from "@/components/navigation/BackButton";
import BarWaveAnimation from "@/components/animations/BarWaveAnimation";
import TradeTab from "./TradeTab";
import { usePathname } from "next/navigation";
import { MOCK_PRICE } from "@/mocks/price";
import clsx from "clsx";

export default function TradeHeader() {
    const pathName = usePathname();
    const coinId = pathName.split("/")[3];
    const coinData = MOCK_PRICE[coinId as keyof typeof MOCK_PRICE];

    return (
        <div>
            <div className="flex p-2 justify-between w-full h-14">
                <BackButton />
                <div className="flex flex-col items-center">
                    <h1>{coinData.name}(KRW)</h1>
                    <span className="text-[11px] text-[#93989e]">
                        {coinData.symbol}
                    </span>
                </div>
                <Button size={"icon-lg"} variant="ghost">
                    {/* 즐겨찾기 아이콘 넣기 */}
                    <Star className="text-[#1c2028] size-6" />
                </Button>
            </div>
            <div className="px-5 gap-1 flex flex-col">
                <div>
                    <h2
                        className={clsx(
                            coinData.midPrice > coinData.yesterDayPrice
                                ? "text-[#e15241]"
                                : "text-[#5b8ced]",
                            "text-xl",
                        )}
                    >
                        {coinData.midPrice.toLocaleString()}
                    </h2>
                    <div className="flex">
                        <span
                            className={clsx(
                                "text-xs mr-1",
                                coinData.midPrice > coinData.yesterDayPrice
                                    ? "text-[#e15241]"
                                    : "text-[#5b8ced]",
                            )}
                        >
                            {coinData.midPrice > coinData.yesterDayPrice
                                ? "+"
                                : ""}
                            {(
                                coinData.midPrice - coinData.yesterDayPrice
                            ).toLocaleString()}
                        </span>{" "}
                        <Triangle
                            className={clsx(
                                "self-center mr-0.5",
                                coinData.midPrice > coinData.yesterDayPrice
                                    ? "rotate-0 fill-[#e15241] text-transparent "
                                    : "rotate-180 fill-[#5b8ced] text-transparent",
                                "size-2 self-center",
                            )}
                        />{" "}
                        <span
                            className={clsx(
                                "text-xs",
                                coinData.midPrice > coinData.yesterDayPrice
                                    ? "text-[#e15241]"
                                    : "text-[#5b8ced]",
                            )}
                        >
                            {(
                                ((coinData.midPrice - coinData.yesterDayPrice) /
                                    coinData.yesterDayPrice) *
                                100
                            ).toFixed(2)}
                            %
                        </span>
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
