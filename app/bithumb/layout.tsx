import React from "react";
import type { Metadata, Viewport } from "next";
import BithumbHeader from "@/components/header/BithumbHeader";
import { Button } from "@/components/ui/button";

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
        <div className="flex flex-col">
            <BithumbHeader />
            {children}
            <BottomNavigation />
        </div>
    );
}

function BottomNavigation() {
    const menuItems = [
        { icon: "market.svg", label: "거래소" },
        { icon: "event.svg", label: "혜택/서비스" },
        { icon: "assets.svg", label: "자산현황" },
        { icon: "deposit.svg", label: "입출금" },
        { icon: "etc.svg", label: "더보기" },
    ];
    return (
        <nav
            className="w-full h-14.5"
            style={{ boxShadow: "0 1px 5px rgba(0,0,0,0.15)" }}
        >
            <ul className="w-full h-14.5 flex justify-end">
                {menuItems.map((item) => (
                    <li key={item.label} className="flex-1">
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
                    </li>
                ))}
            </ul>
        </nav>
    );
}
