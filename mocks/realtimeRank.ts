// mocks/realtimeRank.ts

/* -----------------------------
 * 1. 초기 Mock 데이터 (24h 기준)
 * ----------------------------- */
export const TOP_BUYS_MOCK_DATA = [
    { name: "휴머니티 프로토콜", price: 209, change24h: -13.58 },
    { name: "펌프닷펀", price: 2.713, change24h: -8.28 },
    { name: "이더리움", price: 4_427_000, change24h: -2.68 },
    { name: "에테나", price: 299, change24h: -5.66 },
    { name: "오르카", price: 1_660, change24h: -7.16 },
];

export const GROWTH_RATE_MOCK_DATA = [
    { name: "솔라나", price: 175_000, change24h: 3.9 },
    { name: "비트코인", price: 97_500_000, change24h: 1.42 },
    { name: "이더리움", price: 4_200_000, change24h: 2.58 },
    { name: "에이다", price: 1_250, change24h: 1.25 },
    { name: "리플", price: 650, change24h: 2.1 },
];

export const DECLINE_RATE_MOCK_DATA = [
    { name: "도지코인", price: 85, change24h: -4.5 },
    { name: "폴카닷", price: 12_500, change24h: -3.9 },
    { name: "체인링크", price: 7_300, change24h: -3.2 },
    { name: "라이트코인", price: 150_000, change24h: -2.8 },
    { name: "비트코인 캐시", price: 320_000, change24h: -2.5 },
];

export const TRADING_VOLUME_MOCK_DATA = [
    {
        name: "비트코인",
        price: 97_500_000,
        change24h: 1.42,
        tradingVolume: 123_000_000_000,
    },
    {
        name: "이더리움",
        price: 4_200_000,
        change24h: -0.58,
        tradingVolume: 89_500_000_000,
    },
    {
        name: "솔라나",
        price: 175_000,
        change24h: 3.9,
        tradingVolume: 21_300_000_000,
    },
    {
        name: "리플",
        price: 650,
        change24h: -2.1,
        tradingVolume: 15_700_000_000,
    },
    {
        name: "에이다",
        price: 1_250,
        change24h: -1.25,
        tradingVolume: 8_956_789_432,
    },
];

export const TOP_THEMES_MOCK_DATA = [
    {
        name: "레이어1",
        price: 2_500,
        change24h: 4.5,
        marketCap: 1_500_000_000,
    },
    { name: "채굴", price: 3_200, change24h: 3.8, marketCap: 750_000_000 },
    {
        name: "디파이",
        price: 1_800,
        change24h: 2.9,
        marketCap: 600_000_000,
    },
    { name: "게임 코인", price: 4_100, change24h: 2.5, marketCap: 850_000_000 },
    { name: "웹3 코인", price: 2_200, change24h: 1.8, marketCap: 400_000_000 },
];

/* -----------------------------
 * 2. 실시간용 타입 정의
 * ----------------------------- */
export type RankBy =
    | "topBuys"
    | "growthRate"
    | "declineRate"
    | "tradingVolume"
    | "topThemes";

export type RealtimeCoin = {
    name: string;
    basePrice: number;
    baseChange24h: number;
    price: number;
    changeRate: number;

    // tradingVolume 은 "거래금액" 랭킹용
    tradingVolume?: number;

    // marketCap 은 "테마상위" 랭킹용
    marketCap?: number;
};
/* -----------------------------
 * 3. 유틸
 * ----------------------------- */
const clamp = (v: number, min: number, max: number) =>
    Math.min(max, Math.max(min, v));

/* -----------------------------
 * 4. 초기 상태 생성
 * ----------------------------- */
export function initRealtimeCoins({
    rankBy,
}: {
    rankBy: RankBy;
}): RealtimeCoin[] {
    if (rankBy === "tradingVolume") {
        const mockData = TRADING_VOLUME_MOCK_DATA;
        return mockData.map((coin) => ({
            name: coin.name,
            basePrice: coin.price,
            baseChange24h: coin.change24h,
            price: coin.price,
            changeRate: coin.change24h,
            tradingVolume: coin.tradingVolume, // ✅ 필수
        }));
    }

    if (rankBy === "topThemes") {
        const mockData = TOP_THEMES_MOCK_DATA;
        return mockData.map((coin) => ({
            name: coin.name,
            basePrice: coin.price,
            baseChange24h: coin.change24h,
            price: coin.price,
            changeRate: coin.change24h,
            marketCap: coin.marketCap,
        }));
    }

    const mockData = {
        topBuys: TOP_BUYS_MOCK_DATA,
        growthRate: GROWTH_RATE_MOCK_DATA,
        declineRate: DECLINE_RATE_MOCK_DATA,
    }[rankBy];

    return mockData.map((coin) => ({
        name: coin.name,
        basePrice: coin.price,
        baseChange24h: coin.change24h,
        price: coin.price,
        changeRate: coin.change24h,
    }));
}

/* -----------------------------
 * 5. 실시간 tick 로직
 * ----------------------------- */
/**
 * - 24h 변동률(baseChange24h)을 중심(anchor)으로
 * - 실시간 변동은 ±volatility% 범위에서 발생
 * - 가끔 스파이크(급등/급락) 허용
 */
export function tickRealtimeCoins(
    coins: RealtimeCoin[],
    volatility = 0.3, // 실시간 변동폭 (%)
): RealtimeCoin[] {
    return coins.map((coin) => {
        // 기본 노이즈
        let noise = Math.random() * volatility * 2 - volatility;

        // 10% 확률로 스파이크
        if (Math.random() < 0.1) {
            noise *= 2.5;
        }

        // 다음 변동률 (24h 기준 ± 제한)
        const nextChangeRate = clamp(
            coin.baseChange24h + noise,
            coin.baseChange24h - 1.5,
            coin.baseChange24h + 1.5,
        );

        // 변동률 기반 가격 계산
        const nextPrice = coin.basePrice * (1 + nextChangeRate / 100);

        return {
            ...coin,
            price: Math.max(1, Math.round(nextPrice)),
            changeRate: Number(nextChangeRate.toFixed(2)),
        };
    });
}

/* -----------------------------
 * 6. 순위 정렬
 * ----------------------------- */
/**
 * 변동률 기준 정렬
 * (덜 떨어졌거나 더 오른 코인이 상위)
 */
export function sortByRealtimeRank(coins: RealtimeCoin[]): RealtimeCoin[] {
    return [...coins].sort((a, b) => b.changeRate - a.changeRate);
}

export function sortByRealtimeDeclineRank(
    coins: RealtimeCoin[],
): RealtimeCoin[] {
    return [...coins].sort((a, b) => a.changeRate - b.changeRate);
}

export function sortByRealtimeTradingVolumeRank(
    coins: RealtimeCoin[],
): RealtimeCoin[] {
    return [...coins].sort((a, b) => {
        const volumeA = a.tradingVolume ?? 0;
        const volumeB = b.tradingVolume ?? 0;
        return volumeB - volumeA;
    });
}

export const sortByRealtimeMarketCapRank = (
    coins: RealtimeCoin[],
): RealtimeCoin[] => {
    return [...coins].sort((a, b) => {
        const marketCapA = a.marketCap ?? 0;
        const marketCapB = b.marketCap ?? 0;
        return marketCapB - marketCapA;
    });
};
