import { useSearchParams } from "next/navigation";
import { usePostsSuspenseQuery } from "../hooks/usePostsSuspenseQuery";
import Link from "next/link";

export default function PostsContainer() {
    const searchParams = useSearchParams();
    const page = searchParams.get("page");

    const { data } = usePostsSuspenseQuery({ page: Number(page) });
    const { posts, total } = data;
    const totalPage = Math.ceil(total / 10);
    return (
        <div>
            <form method="GET">
                <input name="q" />
                <input type="hidden" name="page" value="1" />
                <button type="submit">검색</button>
            </form>
            <div>총 상품 수 : {total}</div>
            <ul>
                {posts.map((post, i) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
            <div className="flex gap-4">
                {Array.from({ length: totalPage }).map((_, i) => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("page", String(i + 1));
                    return (
                        <Link key={i} href={`?${params.toString()}`}>
                            {i + 1}
                        </Link>
                    );
                })}
            </div>
            <div>
                <Test>
                    <TestItem />
                    <form action="" method="GET">
                        <input name="q" />
                        <input name="page" type="hidden" value={1} />
                        <button type="submit">검색</button>
                    </form>
                </Test>
            </div>
        </div>
    );
}

function Test({
    children,
    foo,
    bar,
}: {
    children: React.ReactNode;
    foo?: string;
    bar?: string;
}) {
    return <div>{children}</div>;
}
function TestItem() {
    return <div>something</div>;
}
