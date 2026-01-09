import TradeHeader from "@/components/header/TradeHeader";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex w-full flex-col overflow-hidden">
            <TradeHeader />
            {children}
        </div>
    );
}
