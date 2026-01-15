import { Button } from "../ui/button";

export default function PayHeader() {
    return (
        <header className="flex items-center justify-between m-2 h-10">
            <div className="flex gap-4">
                {/* <Button variant="ghost">입출금</Button>
                <Button variant="ghost">내역</Button> */}
            </div>
            <Button variant="ghost" size="icon-lg">
                {/* TODO: qr 아이콘으로 바꾸기 */}
                <img src="/bithumb/search.svg" alt="검색" />
            </Button>
        </header>
    );
}
