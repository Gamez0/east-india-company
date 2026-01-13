export const MOCK_PRICE: {
    [key: string]: {
        name: string;
        symbol: string;
        midPrice: number;
        step: number;
        yesterDayPrice: number;
    };
} = {
    btc: {
        name: "비트코인",
        symbol: "BTC",
        midPrice: 129580000,
        step: 5000,
        yesterDayPrice: 128000000,
    },
    eth: {
        name: "이더리움",
        symbol: "ETH",
        midPrice: 9200000,
        step: 500,
        yesterDayPrice: 9000000,
    },
    ena: {
        name: "에테나",
        symbol: "ENA",
        midPrice: 339,
        step: 1,
        yesterDayPrice: 330,
    },
    sol: {
        name: "솔라나",
        symbol: "SOL",
        midPrice: 20100,
        step: 100,
        yesterDayPrice: 19800,
    },
    orca: {
        name: "오르카",
        symbol: "ORCA",
        midPrice: 1740,
        step: 3,
        yesterDayPrice: 1700,
    },
};
