import { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

export default function Page() {
    return (
        <main className="h-[calc(100vh-114px)] flex flex-col items-center justify-center">
            <h1>더보기 페이지입니다</h1>
        </main>
    );
}
