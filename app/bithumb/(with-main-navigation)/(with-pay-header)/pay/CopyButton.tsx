"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function CopyButton({ BITHUMB_ID }: { BITHUMB_ID: string }) {
    const handleCopyId = () => {
        navigator.clipboard?.writeText(BITHUMB_ID);
        toast("BITHUMB ID 가 복사되었습니다.");
    };

    return (
        <button onClick={handleCopyId} className="flex items-center">
            <Copy size={12} />
        </button>
    );
}
