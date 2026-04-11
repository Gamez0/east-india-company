"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };
    return (
        <Button size={"icon-lg"} variant="ghost" onClick={handleBack}>
            <ArrowLeft className="text-[#1c2028] size-6" />
        </Button>
    );
}
