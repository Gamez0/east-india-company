"use client";

import {
    createInitialOrderbook,
    useBinaryOrderbook,
} from "@/hooks/useBinaryOrderbook";
import { useEffect, useState } from "react";

export default function OrderBook() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsClient(true);
    }, []);

    const INITIAL_ORDERBOOK = createInitialOrderbook();

    const orderBook = useBinaryOrderbook(INITIAL_ORDERBOOK);
    // bids 10~19
    const bids = orderBook.slice(10, 20);
    const offers = orderBook.slice(0, 10);
    return (
        isClient && (
            <ul className="min-w-36 overflow-y-auto">
                {offers.map((level, idx) => (
                    <li key={idx} className="bg-[#e3ebf7] h-10">
                        <span className="text-[#e15241]">
                            {level.p.toLocaleString()}
                        </span>{" "}
                        <span className="text-[#1c2028]">
                            {level.q.toFixed(4)}
                        </span>
                    </li>
                ))}
                {bids.map((level, idx) => (
                    <li key={idx} className="bg-[#fcefef] h-10">
                        <span className="text-[#e15241]">
                            {level.p.toLocaleString()}
                        </span>{" "}
                        <span className="text-[#1c2028]">
                            {level.q.toFixed(4)}
                        </span>
                    </li>
                ))}
            </ul>
        )
    );
}
