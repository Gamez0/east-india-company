import React from "react";
import type { Metadata, Viewport } from "next";
import MainNavigation from "@/components/navigation/MainNavigation";

export const metadata: Metadata = {
    title: "빗썸",
    description: "대한민국 대표 가상자산 거래소 빗썸 공식 홈페이지",
    icons: {
        icon: [
            {
                url: "https://content.bithumb.com/resources/img/comm/seo/favicon-32x32.png",
                type: "image/png",
                sizes: "32x32",
            },
        ],
    },
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
        <div className="flex flex-col items-center bg-zinc-50 w-full overflow-hidden">
            <div className="max-w-3xl w-full bg-white">
                {children}
                <MainNavigation />
            </div>
        </div>
    );
}
