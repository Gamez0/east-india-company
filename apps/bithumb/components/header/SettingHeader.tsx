import { Button } from "@/components/ui/button";

export default function SettingHeader() {
    return (
        <header className="flex items-center justify-end m-2 h-10">
            <Button variant="ghost" size="icon-lg">
                <img src="/bithumb/setting.svg" alt="설정" />
            </Button>
        </header>
    );
}
