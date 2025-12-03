"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Tab = "exchange" | "market";

export default function BithumbHeader() {
    const pathname = usePathname();

    if (!pathname.startsWith("/bithumb")) return null;

    const [activeTab, setActiveTab] = useState<Tab>("exchange");

    const handleTabClick = (tab: Tab) => {
        setActiveTab(tab);
    };

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
                    <Button variant="ghost" size="icon-lg">
                        <img src="/bithumb/search.svg" alt="검색" />
                    </Button>
                    <Button variant="ghost" size="icon-lg">
                        <img src="/bithumb/setting.svg" alt="설정" />
                    </Button>
                </div>
            )}
        </header>
    );
}
