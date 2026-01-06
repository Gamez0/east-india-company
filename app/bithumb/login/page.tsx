// no index 처리
import { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

export default function Page() {
    return (
        <main className="h-[calc(100vh-114px)] flex flex-col items-center justify-center gap-4">
            <h1>로그인 페이지</h1>
            <p className="text-center">
                noindex, nofollow 처리가 된 페이지입니다. <br /> header 하위에
                있는 meta 태그에서 확인 가능해요.
            </p>
        </main>
    );
}
