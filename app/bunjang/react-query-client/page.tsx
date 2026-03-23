"use client";

import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";
import { Post } from "../types";
import { useState } from "react";

const queryClient = new QueryClient();

// client side fetching이므로, 페이지 컴포넌트에서 QueryClientProvider로 감싸주고, 그 안에서 useQuery 훅을 사용하여 데이터를 가져옵니다.
export default function Page() {
    return (
        <QueryClientProvider client={queryClient}>
            <Posts />
        </QueryClientProvider>
    );
}

function Posts() {
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>();
    const totalPages = total ? Math.ceil(total / 10) : undefined;
    const { data, isPending, error } = useQuery<Post[]>({
        queryKey: ["posts", page],
        queryFn: async () => {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`,
            );
            const _total = response.headers.get("X-Total-Count");
            setTotal(Number(_total));
            return await response.json();
        },
        staleTime: 60 * 1000,
    });
    if (isPending) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Loading...</h1>
            </div>
        );
    }
    if (error) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Error: {error.message}</h1>
            </div>
        );
    }
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Posts</h1>
            {total && <div>Total: {total}</div>}
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
            {totalPages && (
                <div style={{ display: "flex", gap: "4px" }}>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            disabled={page === i + 1}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
