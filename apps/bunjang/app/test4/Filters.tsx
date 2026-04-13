"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// client component
export default function Filters() {
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
