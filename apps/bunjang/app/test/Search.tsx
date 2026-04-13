"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function Search() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
    };

    const handleClick = () => {
        router.push(`?q=${encodeURIComponent(query)}`);
    };

    return (
        <div>
            <input onChange={handleChange} placeholder="검색어를 입력하세요." />
            <button onClick={handleClick} aria-label="입력">
                입력
            </button>
        </div>
    );
}
