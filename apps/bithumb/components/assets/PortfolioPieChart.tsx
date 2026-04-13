"use client";

import { Cell, Pie, PieChart } from "recharts";
import type { PieLabelRenderProps } from "recharts/types/polar/Pie";

// 종목이 많아지면 많아질 수록 아래 리스트들이 많아진다.
// 이는 유저 정보를 기반으로 결정되긴 해야 할 것 같다.
// 주식은 포트폴리오를 분산하는 것이 권장되는데, 코인 투자자들은 어떤지 모르겠다. 리스크를 선호하기 때문에 오히려 레버리지, 인버스가 더 필요하지 않나 싶다.

export default function PortfolioPieChart() {
    const data = [
        { name: "A", value: 30 },
        { name: "B", value: 20 },
        { name: "C", value: 50 },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

    const width = 256;
    const height = 256;
    const cx = width / 2;
    const cy = height / 2;

    const renderLabel = (props: PieLabelRenderProps) => {
        const {
            cx = 0,
            cy = 0,
            midAngle = 0,
            innerRadius = 0,
            outerRadius = 0,
            percent = 0,
            name = "",
        } = props;
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.45; // 텍스트 위치
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="#333"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fontWeight="500"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    return (
        <PieChart width={width} height={height}>
            <Pie
                data={data}
                cx={cx - 4}
                cy={cy - 6}
                outerRadius={100}
                innerRadius={60} // 도넛 효과!
                dataKey="value"
                paddingAngle={3} // 조각 간 간격
                label={renderLabel} // 👈 각 셀에 label 표시!
                labelLine={false} // 라벨 선 없애기(깔끔)
            >
                {data.map((entry, idx) => (
                    <Cell key={idx} fill={COLORS[idx]} />
                ))}
            </Pie>

            {/* 중앙 텍스트 */}
            <text
                x={cx}
                y={cy}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="14"
                fontWeight="400"
            >
                보유 비중(%)
            </text>
        </PieChart>
    );
}
