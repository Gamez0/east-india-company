type MarketItem = {
    symbol: string;
    name: string;
    price: number;
    change24h: number;
    volume24h: number;
};

const mockMarkets: MarketItem[] = [
    {
        symbol: "BTC/KRW",
        name: "Bitcoin",
        price: 97_500_000,
        change24h: 1.42,
        volume24h: 123_000_000_000,
    },
    {
        symbol: "ETH/KRW",
        name: "Ethereum",
        price: 4_200_000,
        change24h: -0.58,
        volume24h: 89_500_000_000,
    },
    {
        symbol: "SOL/KRW",
        name: "Solana",
        price: 175_000,
        change24h: 3.9,
        volume24h: 21_300_000_000,
    },
];

export default function Page() {
    return (
        <main className="flex flex-col gap-8 px-6 py-8">
            <header className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold">Bithumb Market</h1>
                <p className="text-sm text-muted-foreground">
                    Live prices, daily change, and 24h volume (KRW pairs).
                </p>
            </header>

            <section className="border rounded-2xl overflow-hidden">
                <div className="grid grid-cols-5 px-4 py-2 text-sm font-medium text-muted-foreground bg-muted/40">
                    <span>Pair</span>
                    <span>Name</span>
                    <span className="text-right">Price (₩)</span>
                    <span className="text-right">24h %</span>
                    <span className="text-right">24h Volume (₩)</span>
                </div>
                <div className="divide-y">
                    {mockMarkets.map((m) => (
                        <div
                            key={m.symbol}
                            className="grid grid-cols-5 px-4 py-3 items-center"
                        >
                            <span className="font-semibold">{m.symbol}</span>
                            <span className="text-sm text-muted-foreground">
                                {m.name}
                            </span>
                            <span className="text-right font-medium">
                                {m.price.toLocaleString()}
                            </span>
                            <span
                                className={`text-right font-medium ${
                                    m.change24h >= 0
                                        ? "text-emerald-600"
                                        : "text-red-600"
                                }`}
                            >
                                {m.change24h > 0 ? "+" : ""}
                                {m.change24h}%
                            </span>
                            <span className="text-right text-sm">
                                {m.volume24h.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
