import { Suspense } from "react";
import Filters from "./Filters";

export default function Page() {
    return (
        <main>
            문제에 따라 다르지.. useState를 써야 하면 이제 거긴 클라이언트
            컴포넌트로 하고
            <Suspense fallback={<div>Loading ...</div>}>
                <Filters />
            </Suspense>
        </main>
    );
}
