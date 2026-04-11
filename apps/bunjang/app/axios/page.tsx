"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Post } from "../types";

export default function Page() {
    const [data, setData] = useState<Post[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/posts",
                );

                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // 단점: fetching 중일 때 사용자에게 로딩 상태를 보여주지 않음, 또 에러 처리 같은 것들 또한 다 직접 해야 함.

    return (
        <div>
            <h1>Bunjang Page</h1>
            <p>Welcome to the Bunjang page!</p>
            <ul>
                {data.map((item, index) => (
                    <li key={item.id}>
                        {index + 1}. {item.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
