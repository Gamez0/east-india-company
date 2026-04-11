"use client";

import { useRealtimeCoinRank } from "@/hooks/useRealtimeCoinRank";

export default function TopBuysTable() {
    const rankedCoins = useRealtimeCoinRank({ rankBy: "topBuys" });

    return (
        <table className="w-full text-left">
            <thead>
                <tr className="border-b border-gray-300 text-[#93989e] text-xs">
                    <th className="py-2 w-[50%]">자산명</th>
                    <th className="py-2 w-[30%] text-right">현재가</th>
                    <th className="py-2 text-right">변동(24H)</th>
                </tr>
            </thead>
            <tbody>
                {rankedCoins.map((item, index) => (
                    <tr
                        key={item.name}
                        className="border-b border-gray-200 text-[15px]"
                    >
                        <td className="py-2 flex gap-2">
                            <span className="text-[#3d414b] text-[13px] self-center italic">
                                {index + 1}
                            </span>
                            <span>{item.name}</span>
                        </td>
                        <td className="py-2  text-right">
                            {item.price.toLocaleString()}
                        </td>
                        <td
                            className={`py-2 text-right ${
                                item.changeRate > 0
                                    ? "text-red-500"
                                    : "text-blue-500"
                            }`}
                        >
                            {item.changeRate > 0
                                ? `+${item.changeRate}%`
                                : `${item.changeRate}%`}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
