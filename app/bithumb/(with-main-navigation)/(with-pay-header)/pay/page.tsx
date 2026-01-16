import {
    ArrowDownToLine,
    ArrowUpFromLine,
    BanknoteArrowDownIcon,
    BanknoteArrowUpIcon,
    Cake,
    Component,
    Handshake,
    Link as LinkIcon,
    Replace,
} from "lucide-react";
import { Metadata } from "next";
import CopyButton from "./CopyButton";
import Link from "next/link";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

const BITHUMB_ID = "119 234 286 6";

const PAY_SERVICE_ITEMS = [
    // {
    //     id: 1,
    //     name: "송금",
    //     route: "/bithumb/pay/remit",
    //     iconComponent: ArrowUpToLine,
    // },
    {
        id: 2,
        name: "수신",
        route: "/bithumb/pay/receive",
        iconComponent: ArrowDownToLine,
    },
    {
        id: 3,
        name: "입금",
        route: "/bithumb/pay/deposit",
        iconComponent: BanknoteArrowUpIcon,
    },
    {
        id: 4,
        name: "출금",
        route: "/bithumb/pay/withdraw",
        iconComponent: BanknoteArrowDownIcon,
    },
    {
        id: 5,
        name: "이벤트",
        route: "/bithumb/pay/event",
        iconComponent: Cake,
    },
    {
        id: 6,
        name: "가맹하기",
        route: "/bithumb/pay/merchant",
        iconComponent: Handshake,
    },
    {
        id: 7,
        name: "동시 송금",
        route: "/bithumb/pay/multi-remit",
        iconComponent: Component,
    },
    {
        id: 8,
        name: "코인 전환",
        route: "/bithumb/pay/coin-convert",
        iconComponent: Replace,
    },
];

export default function Page() {
    return (
        <main className="h-[calc(100vh-114px)] flex flex-col px-6.5 gap-6 overflow-y-auto no-scrollbar pb-15">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Pay</h1>
                <div className="flex items-center gap-1">
                    <p className="text-xs">Bithumb ID: {BITHUMB_ID}</p>
                    <CopyButton BITHUMB_ID={BITHUMB_ID} />
                </div>
            </div>
            {/* 송금하기 */}
            <div className="flex gap-2">
                <Link
                    href="/bithumb/pay/remit"
                    className="flex bg-[#f2f4f6] p-4 rounded-2xl w-full items-center justify-between relative"
                >
                    <span className="text-sm">
                        빗썸 유저에게 <br />
                        보내기
                    </span>
                    <ArrowUpFromLine size={16} />
                    <p className="text-xs text-primary absolute top-1.5 right-2">
                        보너스
                    </p>
                </Link>
                <Link
                    href="/bithumb/pay/remit"
                    className="flex bg-[#f2f4f6] p-4 rounded-2xl w-full items-center justify-between"
                >
                    <span className="text-sm">온체인 전송</span>
                    <LinkIcon size={16} />
                </Link>
            </div>
            <ul className="grid grid-cols-4 gap-4">
                {PAY_SERVICE_ITEMS.map((item) => (
                    <li key={item.id} className="flex flex-col items-center">
                        <a
                            href={item.route}
                            className="flex flex-col items-center p-4 border rounded-lg hover:shadow-lg transition"
                        >
                            <span className="">
                                <item.iconComponent size={16} />
                            </span>
                        </a>
                        <span className="mt-2 font-medium text-sm">
                            {item.name}
                        </span>
                    </li>
                ))}
            </ul>
        </main>
    );
}
