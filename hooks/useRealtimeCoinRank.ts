"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
    initRealtimeCoins,
    tickRealtimeCoins,
    sortByRealtimeRank,
    RealtimeCoin,
    sortByRealtimeDeclineRank,
    sortByRealtimeMarketCapRank,
    sortByRealtimeTradingVolumeRank,
} from "@/mocks/realtimeRank";

/**
 * 실시간 코인 순위 훅
 *
 * @param intervalMs - tick 주기(ms)
 */
export function useRealtimeCoinRank({
    rankBy,
    intervalMs = 1000,
}: {
    rankBy:
        | "topBuys"
        | "growthRate"
        | "declineRate"
        | "tradingVolume"
        | "topThemes";
    intervalMs?: number;
}): RealtimeCoin[] {
    const [coins, setCoins] = useState<RealtimeCoin[]>(() =>
        initRealtimeCoins({ rankBy }),
    );

    // interval 누적 횟수 (필요 시 확장용)
    const tickCountRef = useRef(0);

    useEffect(() => {
        const id = window.setInterval(() => {
            tickCountRef.current += 1;

            setCoins((prev) => tickRealtimeCoins(prev));
        }, intervalMs);

        return () => {
            window.clearInterval(id);
        };
    }, [intervalMs]);

    /**
     * 변동률 기준 정렬된 순위
     * (렌더링 최적화를 위해 useMemo)
     */
    const rankedCoins = useMemo(() => sortByRealtimeRank(coins), [coins]);
    const rankedDeclineCoins = useMemo(
        () => sortByRealtimeDeclineRank(coins),
        [coins],
    );
    const rankedTradingVolumeCoins = useMemo(
        () => sortByRealtimeTradingVolumeRank(coins),
        [coins],
    );
    const rankedTopThemeCoins = useMemo(
        () => sortByRealtimeMarketCapRank(coins),
        [coins],
    );

    if (rankBy === "declineRate") {
        return rankedDeclineCoins;
    }

    if (rankBy === "tradingVolume") {
        return rankedTradingVolumeCoins;
    }

    if (rankBy === "topThemes") {
        return rankedTopThemeCoins;
    }

    return rankedCoins;
}
