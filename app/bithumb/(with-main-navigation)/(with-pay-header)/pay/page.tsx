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
            <h1 className="text-xl font-bold mb-4">페이 페이지</h1>
            <p className="text-center text-gray-600">
                여기는 페이 페이지입니다. 페이 관련 기능을 여기에 구현하세요.
            </p>
        </main>
    );
}
