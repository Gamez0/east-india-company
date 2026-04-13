import { Params } from "next/dist/server/request/params";
import { Post } from "../types";
import SearchInput from "./SearchInput";
import Link from "next/link";

type SearchParams = Promise<{
    [key: string]: string | string[] | undefined;
}>;

// server component using fetch and form
export default async function Page(props: {
    params: Params;
    searchParams: SearchParams;
}) {
    const searchParams = await props.searchParams;
    const { q, page } = searchParams;
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts${!!q ? `?q=${q}` : ""}?_page=${page}&_limit=10`,
    );
    const posts: Post[] = await response.json();
    const total = response.headers.get("X-Total-Count");
    const totalPage = Math.ceil(Number(total) / 10);

    return (
        <div>
            <div>총 검색 수 : {total}</div>
            <SearchInput />
            <ul>
                {posts.map((post, i) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
            <div className="flex gap-4">
                {Array.from({ length: totalPage }).map((_, i) => (
                    <Link
                        key={i}
                        href={{
                            query: {
                                ...searchParams,
                                page: String(i + 1),
                            },
                        }}
                    >
                        {i + 1}
                    </Link>
                ))}
            </div>
        </div>
    );
}
