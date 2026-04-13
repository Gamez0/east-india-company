/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import "./globals.css";

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
        <html lang="en">
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
