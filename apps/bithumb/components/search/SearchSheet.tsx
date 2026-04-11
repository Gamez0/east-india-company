"use client";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, X } from "lucide-react";
import { useMemo, useState } from "react";

const popularSearches = [
    "BTC/KRW",
    "ETH/KRW",
    "XRP/KRW",
    "SOL/KRW",
    "DOGE/KRW",
    "ADA/KRW",
];

const popularCoins = [
    {
        symbol: "BTC/KRW",
        name: "Bitcoin",
        price: 97_500_000,
        change: 1.42,
        icon: "/bithumb/coin/coin-btc.png",
    },
    {
        symbol: "ETH/KRW",
        name: "Ethereum",
        price: 4_200_000,
        change: -0.58,
        icon: "/bithumb/coin/coin-eth.png",
    },
    {
        symbol: "SOL/KRW",
        name: "Solana",
        price: 175_000,
        change: 3.9,
        icon: "/bithumb/coin/coin-sol.png",
    },
];

export default function SearchSheet() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchHistory, setSearchHistory] = useState<string[]>([
        "BTC/KRW",
        "ETH/KRW",
        "SOL/KRW",
    ]);
    const timeLabel = useMemo(() => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes} 기준`;
    }, []);

    const handleAddSearchHistory = (term: string) => {
        const cleaned = term.trim();
        if (!cleaned) return;

        setSearchHistory((prev) => {
            const withoutDuplicate = prev.filter((item) => item !== cleaned);
            return [cleaned, ...withoutDuplicate].slice(0, 10);
        });
    };

    const handleRemoveHistory = (term: string) => {
        setSearchHistory((prev) => prev.filter((item) => item !== term));
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleAddSearchHistory(searchTerm);
            setSearchTerm("");
        }
    };

    const handleSearchSelect = (term: string) => {
        setSearchTerm(term);
        handleAddSearchHistory(term);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon-lg">
                    <img src="/bithumb/search.svg" alt="검색" />
                </Button>
            </SheetTrigger>
            <SheetContent
                side="right"
                className="h-[calc(100vh-60px)] w-full max-w-none border-t px-5 pt-4 pb-6 sm:h-[80vh]"
                xIcon={false}
            >
                <SheetHeader className="sr-only">
                    <SheetTitle className="text-lg font-bold">
                        검색 페이지
                    </SheetTitle>
                </SheetHeader>
                <div className="flex flex-row gap-1">
                    <SheetClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
                        <ChevronLeft className="size-6" />
                        <span className="sr-only">Close</span>
                    </SheetClose>
                    <input
                        type="text"
                        placeholder="코인명/심볼 검색 (예: BTC, ETH)"
                        className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        autoFocus
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        onKeyDown={handleKeyDown}
                        aria-label="코인명 또는 심볼 검색"
                    />
                </div>
                {searchHistory.length > 0 && (
                    <section
                        aria-label="최근 검색어"
                        className="mt-3 flex flex-col gap-2"
                    >
                        <ul className="flex flex-wrap gap-2">
                            {searchHistory.map((term) => (
                                <li key={term}>
                                    <Badge
                                        variant="secondary"
                                        className="pl-2 pr-1"
                                        asChild
                                    >
                                        <button
                                            type="button"
                                            className="flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full"
                                            onClick={() => setSearchTerm(term)}
                                        >
                                            <span className="text-xs">
                                                {term}
                                            </span>
                                            <X
                                                className="size-3 cursor-pointer hover:text-foreground/80"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleRemoveHistory(term);
                                                }}
                                            />
                                        </button>
                                    </Badge>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
                <section className="mt-4">
                    <div className="flex justify-between">
                        <div className="mb-2 text-sm font-semibold">
                            인기 검색어
                        </div>
                        <div className="mb-1 text-xs text-muted-foreground">
                            {timeLabel}
                        </div>
                    </div>

                    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {popularSearches.map((term, index) => (
                            <li key={term}>
                                <button
                                    type="button"
                                    className="flex items-center gap-2 w-full rounded-md border px-3 py-2 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                    onClick={() => handleSearchSelect(term)}
                                >
                                    <span className="text-xs font-semibold text-muted-foreground">
                                        {index + 1}
                                    </span>
                                    <span className="font-medium">{term}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="mt-4">
                    <div className="flex justify-between">
                        <div className="mb-2 text-sm font-semibold">
                            인기 코인
                        </div>
                        <div className="mb-1 text-xs text-muted-foreground">
                            {timeLabel}
                        </div>
                    </div>
                    <ul className="flex flex-col gap-2">
                        {popularCoins.map((coin) => {
                            const isUp = coin.change >= 0;
                            return (
                                <li key={coin.symbol}>
                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                        onClick={() =>
                                            handleSearchSelect(coin.symbol)
                                        }
                                    >
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={coin.icon}
                                                alt={`${coin.symbol} icon`}
                                                className="size-8"
                                            />
                                            <div className="flex flex-col text-left">
                                                <span className="font-semibold">
                                                    {coin.symbol}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {coin.name}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium">
                                                {coin.price.toLocaleString()}
                                            </div>
                                            <div
                                                className={`text-xs ${
                                                    isUp
                                                        ? "text-emerald-600"
                                                        : "text-red-500"
                                                }`}
                                            >
                                                {isUp ? "+" : ""}
                                                {coin.change}%
                                            </div>
                                        </div>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            </SheetContent>
        </Sheet>
    );
}
