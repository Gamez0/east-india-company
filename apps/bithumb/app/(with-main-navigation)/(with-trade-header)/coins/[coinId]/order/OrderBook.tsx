"use client";

import {
    createInitialOrderbook,
    useBinaryOrderbook,
} from "@/hooks/useBinaryOrderbook";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MOCK_PRICE } from "@/mocks/price";

export default function OrderBook({ coinId }: { coinId: string }) {
    const [isClient, setIsClient] = useState(false);

    const pathName = usePathname();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsClient(true);
    }, []);

    const midPrice = MOCK_PRICE[coinId].midPrice;
    const step = MOCK_PRICE[coinId].step;

    const INITIAL_ORDERBOOK = createInitialOrderbook({
        midPrice,
        step,
    });

    const orderBook = useBinaryOrderbook(
        INITIAL_ORDERBOOK,
        MOCK_PRICE[coinId].yesterDayPrice,
    );
    // bids 10~19
    const bids = orderBook.slice(10, 20);
    const offers = orderBook.slice(0, 10);
    return (
        isClient && (
            <ul className="w-36">
                {offers.map((level, idx) => (
                    <li
                        key={idx}
                        className="bg-[#e3ebf7] h-10 pt-1.5 pr-1 pb-1.5 pl-2 flex justify-between"
                    >
                        <div className="flex flex-col">
                            <span className={clsx("text-[#e15241] text-xs")}>
                                {level.p.toLocaleString()}
                            </span>{" "}
                            {level.percent !== undefined && (
                                <span
                                    className={clsx(
                                        "text-[10px]",
                                        level.percent > 0
                                            ? "text-[#e15241]"
                                            : "text-[#5b8ced]",
                                    )}
                                >
                                    {level.percent > 0 ? "+" : ""}
                                    {level.percent.toFixed(2)}%
                                </span>
                            )}
                        </div>
                        <span className="text-[#1c2028] text-[10px]">
                            {level.q.toFixed(4)}
                        </span>
                    </li>
                ))}
                {bids.map((level, idx) => (
                    <li
                        key={idx}
                        className="bg-[#fcefef] h-10 pt-1.5 pr-1 pb-1.5 pl-2 flex justify-between"
                    >
                        <div className="flex flex-col">
                            <span className="text-[#e15241] text-xs">
                                {level.p.toLocaleString()}
                            </span>{" "}
                            {level.percent !== undefined && (
                                <span
                                    className={clsx(
                                        "text-[10px]",
                                        level.percent > 0
                                            ? "text-[#e15241]"
                                            : "text-[#5b8ced]",
                                    )}
                                >
                                    {level.percent > 0 ? "+" : ""}
                                    {level.percent.toFixed(2)}%
                                </span>
                            )}
                        </div>
                        <span className="text-[#1c2028] text-[10px]">
                            {level.q.toFixed(4)}
                        </span>
                    </li>
                ))}
            </ul>
        )
    );
}
