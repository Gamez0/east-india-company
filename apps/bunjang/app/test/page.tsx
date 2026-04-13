import { Params } from "next/dist/server/request/params";
import { Post } from "../types";
import Search from "./Search";

type SearchParams = Promise<{
    [key: string]: string | string[] | undefined;
}>;

export default async function Page(props: {
    params: Params;
    searchParams: SearchParams;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams.q;
    const data = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const posts: Post[] = await data.json();
    return (
        <ul>
            <Search />
            <div>{query}의 검색 결과:</div>
            {posts.map((post) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
}
