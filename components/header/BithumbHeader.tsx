"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Tab = "exchange" | "market";

export default function BithumbHeader() {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState<Tab>("exchange");

    const handleTabClick = (tab: Tab) => {
        setActiveTab(tab);
    };

    if (!pathname.startsWith("/bithumb")) return null;

    return (
        <header className="flex justify-between m-2 h-10">
            <div className="flex gap-1.5 items-end pb-[2.5px] pl-[2.5px]">
                <Button variant="ghost" size="icon" asChild>
                    <a href="/bithumb">
                        <img src="/bithumb/logo.svg" alt="Bithumb Logo" />
                    </a>
                </Button>
                <nav className="flex flex-row font-bold text-lg gap-4">
                    <Button
                        variant={
                            activeTab === "exchange"
                                ? "header-active"
                                : "header-default"
                        }
                        onClick={() => handleTabClick("exchange")}
                    >
                        거래소
                    </Button>
                    <Button
                        variant={
                            activeTab === "market"
                                ? "header-active"
                                : "header-default"
                        }
                        onClick={() => handleTabClick("market")}
                    >
                        시장동향
                    </Button>
                </nav>
            </div>
            {activeTab === "exchange" && (
                <div className="flex items-center">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon-lg">
                                <img src="/bithumb/search.svg" alt="검색" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="h-[calc(100vh-60px)] w-full max-w-none border-t px-5 pt-4 pb-6 sm:h-[80vh]"
                        >
                            <SheetHeader className="p-0">
                                <SheetTitle>코인 검색</SheetTitle>
                            </SheetHeader>
                            <div className="mt-4 flex flex-col gap-3">
                                <input
                                    type="text"
                                    placeholder="코인명/심볼 검색 (예: BTC, ETH)"
                                    className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                    autoFocus
                                />
                                <div className="flex flex-col divide-y rounded-md border">
                                    {["BTC/KRW", "ETH/KRW", "SOL/KRW"].map(
                                        (pair) => (
                                            <button
                                                key={pair}
                                                className="flex items-center justify-between px-3 py-3 text-left text-sm hover:bg-muted"
                                            >
                                                <span className="font-medium">
                                                    {pair}
                                                </span>
                                                <span className="text-muted-foreground">
                                                    바로가기
                                                </span>
                                            </button>
                                        ),
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Button variant="ghost" size="icon-lg">
                        <img src="/bithumb/setting.svg" alt="설정" />
                    </Button>
                </div>
            )}
        </header>
    );
}
