import React from "react";
import type { Metadata } from "next";
import BithumbHeader from "@/components/header/BithumbHeader";

export const metadata: Metadata = {
    title: "Bithumb",
    description: "Bithumb Exchange Page",
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
    return <div className="h-14.5">Bottom Navigation</div>;
}
