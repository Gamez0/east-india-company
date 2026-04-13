import Link from "next/link";

export default function Page() {
    return (
        <div>
            <h1>Bunjang Page</h1>
            <p>Welcome to the Bunjang page!</p>
            <div className="flex flex-col">
                <Link
                    className="text-blue-500 hover:underline"
                    href="/bunjang/axios"
                >
                    Go to Bunjang Axios
                </Link>
                <Link
                    className="text-blue-500 hover:underline"
                    href="/bunjang/react-query-client"
                >
                    Go to Bunjang React Query (Client Side Fetching)
                </Link>
                <Link
                    className="text-blue-500 hover:underline"
                    href="/bunjang/react-query-server"
                >
                    Go to Bunjang React Query (Server Side Fetching)
                </Link>
                <Link
                    className="text-blue-500 hover:underline"
                    href="/bunjang/fetch"
                >
                    Go to Bunjang Fetch
                </Link>
            </div>
        </div>
    );
}
