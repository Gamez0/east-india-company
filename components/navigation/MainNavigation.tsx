"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { AssetsIcon } from "@/icons/bithumb/AssetsIcon";
import { MarketIcon } from "@/icons/bithumb/MarketIcon";
import { DepositIcon } from "@/icons/bithumb/DepositIcon";
import { EtcIcon } from "@/icons/bithumb/EtcIcon";
import clsx from "clsx";

const menuItems = [
    { icon: "assets.svg", label: "자산현황", route: "/bithumb" },
    { icon: "market.svg", label: "추천", route: "/bithumb/recommend" },
    { icon: "deposit.svg", label: "입출금", route: "/bithumb/inout" },
    { icon: "etc.svg", label: "더보기", route: "/bithumb/menu" },
];

export default function MainNavigation() {
    const pathName = usePathname();

    const isAssetsPage = pathName === "/bithumb";
    const isMarketPage = pathName === "/bithumb/recommend";
    const isInoutPage = pathName === "/bithumb/inout";
    const isMenuPage = pathName === "/bithumb/menu";

    return (
        <nav
            className="w-full h-14.5"
            style={{ boxShadow: "0 1px 5px rgba(0,0,0,0.15)" }}
        >
            <ul className="w-full h-14.5 flex justify-end">
                <li className="flex-1">
                    <Link href={"/bithumb"}>
                        <Button
                            variant="ghost"
                            className="w-full flex flex-col h-10 gap-0 mt-1.75 text-[#acb0b4]"
                        >
                            <AssetsIcon
                                className={clsx(
                                    "size-7",
                                    isAssetsPage ? "text-[#1c2028]" : "",
                                )}
                            />

                            <span
                                className={clsx(
                                    "text-[10px] leading-3",
                                    isAssetsPage ? "text-[#1c2028]" : "",
                                )}
                            >
                                {menuItems[0].label}
                            </span>
                        </Button>
                    </Link>
                </li>
                <li className="flex-1">
                    <Link href={"/bithumb/recommend"}>
                        <Button
                            variant="ghost"
                            className="w-full flex flex-col h-10 gap-0 mt-1.75 text-[#acb0b4]"
                        >
                            <MarketIcon
                                className={clsx(
                                    "size-7",
                                    isMarketPage ? "text-[#1c2028]" : "",
                                )}
                            />
                            <span
                                className={clsx(
                                    "text-[10px] leading-3",
                                    isMarketPage ? "text-[#1c2028]" : "",
                                )}
                            >
                                {menuItems[1].label}
                            </span>
                        </Button>
                    </Link>
                </li>
                <li className="flex-1">
                    <Link href={"/bithumb/inout"}>
                        <Button
                            variant="ghost"
                            className="w-full flex flex-col h-10 gap-0 mt-1.75 text-[#acb0b4]"
                        >
                            <DepositIcon
                                className={clsx(
                                    "size-7",
                                    isInoutPage ? "text-[#1c2028]" : "",
                                )}
                            />
                            <span
                                className={clsx(
                                    "text-[10px] leading-3",
                                    isInoutPage ? "text-[#1c2028]" : "",
                                )}
                            >
                                {menuItems[2].label}
                            </span>
                        </Button>
                    </Link>
                </li>
                <li className="flex-1">
                    <Link href={"/bithumb/menu"}>
                        <Button
                            variant="ghost"
                            className="w-full flex flex-col h-10 gap-0 mt-1.75 text-[#acb0b4]"
                        >
                            <EtcIcon
                                className={clsx(
                                    "size-7",
                                    isMenuPage ? "text-[#1c2028]" : "",
                                )}
                            />
                            <span
                                className={clsx(
                                    "text-[10px] leading-3",
                                    isMenuPage ? "text-[#1c2028]" : "",
                                )}
                            >
                                {menuItems[3].label}
                            </span>
                        </Button>
                        ;
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
