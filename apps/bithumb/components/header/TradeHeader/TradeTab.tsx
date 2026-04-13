"use client";

import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";

export default function TradeTab() {
    const router = useRouter();

    const pathname = usePathname();

    const isOrderPage = pathname.endsWith("/order");
    const isChartPage = pathname.endsWith("/chart");
    const isPricePage = pathname.endsWith("/price");
    const isInfoPage = pathname.endsWith("/info");
    const isIndexPage = pathname.endsWith("/index");

    const handleTabClick = (tab: string) => {
        const newPathname = pathname.replace(
            /\/(order|index|chart|price|info)$/,
            "",
        );
        router.push(newPathname + "/" + tab);
    };

    return (
        <nav className="flex w-full border-b">
            <button
                className={clsx(
                    "flex-1 py-2 text-center text-[15px]",
                    isOrderPage
                        ? "border-b-2 border-[#1c2028] text-[#1c2028]"
                        : "text-[#777777]",
                )}
                onClick={() => handleTabClick("order")}
            >
                주문
            </button>
            <button
                className={clsx(
                    "flex-1 py-2 text-center text-[15px]",
                    isIndexPage
                        ? "border-b-2 border-[#1c2028] text-[#1c2028]"
                        : "text-[#777777]",
                )}
                onClick={() => handleTabClick("index")}
            >
                호가
            </button>
            <button
                className={clsx(
                    "flex-1 py-2 text-center text-[15px]",
                    isChartPage
                        ? "border-b-2 border-[#1c2028] text-[#1c2028]"
                        : "text-[#777777]",
                )}
                onClick={() => handleTabClick("chart")}
            >
                차트
            </button>
            <button
                className={clsx(
                    "flex-1 py-2 text-center text-[15px]",
                    isPricePage
                        ? "border-b-2 border-[#1c2028] text-[#1c2028]"
                        : "text-[#777777]",
                )}
                onClick={() => handleTabClick("price")}
            >
                시세
            </button>
            <button
                className={clsx(
                    "flex-1 py-2 text-center text-[15px]",
                    isInfoPage
                        ? "border-b-2 border-[#1c2028] text-[#1c2028]"
                        : "text-[#777777]",
                )}
                onClick={() => handleTabClick("info")}
            >
                정보
            </button>
        </nav>
    );
}
