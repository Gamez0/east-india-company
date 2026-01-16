import BackButton from "../navigation/BackButton";
import { Scan } from "lucide-react";
import Link from "next/link";

export default function PayHeader() {
    return (
        <header className="flex items-center justify-between m-2 h-10 mr-4">
            {/* Back button */}
            <BackButton />
            <Link href="/bithumb/pay/scan">
                {/* TODO: qr 아이콘으로 바꾸기 */}
                <Scan className="text-[#1c2028] size-6" />
            </Link>
        </header>
    );
}
