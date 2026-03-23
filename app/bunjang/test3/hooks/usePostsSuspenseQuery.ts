import { useSuspenseQuery } from "@tanstack/react-query";
import { Post } from "../../types";

type PostResponse = {
    posts: Post[];
    total: number;
};

export function usePostsSuspenseQuery({ page }: { page: number }) {
    return useSuspenseQuery<Post[], Error, PostResponse>({
        queryKey: ["post", page],
        queryFn: async () => {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/posts?_page=${page}`,
            );
            const total = response.headers.get("X-Total-Count");
            return await response.json();
        },
        select: (data) => ({
            posts: data,
            total: 100,
        }),
        staleTime: 60 * 1000,
    });
}
