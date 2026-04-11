/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const bithumbFont = localFont({
    src: [
        {
            path: "../public/bithumb/fonts/BithumbTradingSans-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/bithumb/fonts/BithumbTradingSans-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/bithumb/fonts/BithumbTradingSans-Semibold.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "../public/bithumb/fonts/BithumbTradingSans-Bold.woff2",
            weight: "700",
            style: "normal",
        },
    ],
});
export const metadata: Metadata = {
    title: "빗썸 404 - Page Not Found",
    description: "The page you are looking for does not exist.",
    icons: {
        icon: [
            {
                url: "https://content.bithumb.com/resources/img/comm/seo/favicon-32x32.png",
                type: "image/png",
                sizes: "32x32",
            },
        ],
    },
};

export default function GlobalNotFound() {
    return (
        <html lang="en" className={bithumbFont.className}>
            <body className="h-screen w-screen flex flex-col items-center justify-center gap-4">
                <h1>404</h1>
                <p>페이지가 존재하지 않습니다</p>
                <p>또는 페이지는 구현되지 않았습니다.</p>
                <a
                    href="/bithumb"
                    className="mt-4 border px-4 py-2 rounded-md hover:bg-black hover:text-white transition bg-primary text-white"
                >
                    홈으로 가기
                </a>
            </body>
        </html>
    );
}
