import React from "react";
import type { Metadata, Viewport } from "next";
import BithumbHeader from "@/components/header/BithumbHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Bithumb",
    description: "Bithumb Exchange Page",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function BithumbLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col items-center bg-zinc-50 w-full">
            <div className="max-w-3xl w-full bg-white">
                <BithumbHeader />
                {children}
                <BottomNavigation />
            </div>
        </div>
    );
}

function BottomNavigation() {
    const menuItems = [
        { icon: "assets.svg", label: "자산현황", route: "/bithumb/assets" },
        { icon: "market.svg", label: "추천", route: "/bithumb/market" }, // TODO: 어울리는 아이콘으로 변경
        { icon: "deposit.svg", label: "동향", route: "/bithumb/trend" }, // TODO: 어울리는 아이콘으로 변경
        { icon: "etc.svg", label: "더보기", route: "/bithumb/more" },
    ];

    return (
        <nav
            className="w-full h-14.5"
            style={{ boxShadow: "0 1px 5px rgba(0,0,0,0.15)" }}
        >
            <ul className="w-full h-14.5 flex justify-end">
                {menuItems.map((item) => (
                    <li key={item.label} className="flex-1">
                        <Link href={item.route}>
                            <Button
                                variant="ghost"
                                className="w-full flex flex-col h-10 leading-0 gap-0 mt-1.75"
                            >
                                <img
                                    src={`/bithumb/${item.icon}`}
                                    className="size-7"
                                    alt={item.label}
                                />
                                <span className="text-[10px] leading-3">
                                    {item.label}
                                </span>
                            </Button>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
