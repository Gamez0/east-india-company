import { Button } from "@/components/ui/button";
import SearchSheet from "../search/SearchSheet";

export default function MainHeader() {
    return (
        <header className="flex justify-between m-2 h-10">
            <div className="flex gap-1.5 items-end pb-[2.5px] pl-[2.5px]">
                <Button
                    variant="ghost"
                    size="logo"
                    asChild
                    className="self-center"
                >
                    <a href="/bithumb">
                        <img
                            style={{ height: "30px", width: "auto" }}
                            src="/bithumb/bithumb-logo.webp"
                            alt="Bithumb Logo"
                        />
                    </a>
                </Button>
            </div>

            <div className="flex items-center w-full justify-end">
                <SearchSheet />
                <Button variant="ghost" size="icon-lg">
                    <img src="/bithumb/setting.svg" alt="설정" />
                </Button>
            </div>
        </header>
    );
}
