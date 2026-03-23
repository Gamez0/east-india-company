import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export default function Page() {
    return (
        <main>
            문제에 따라 다르지.. useState를 써야 하면 이제 거긴 클라이언트
            컴포넌트로 하고
        </main>
    );
}

// client component
function Filters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const setQuery = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, value);
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div>
            <button onClick={() => setQuery("sort", "latest")}>Latest</button>
            <button onClick={() => setQuery("sort", "oldest")}>Oldest</button>
            <button onClick={() => setQuery("price", "lowest")}>Lowest</button>
        </div>
    );
}
