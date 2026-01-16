import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSonner } from "sonner";

export default async function Page({
    params,
}: {
    params: Promise<{ bithumbId: string }>;
}) {
    const { bithumbId } = await params;
    const mockId = "1192342866";

    return (
        <main className="h-[calc(100vh-114px)] flex flex-col px-6.5 gap-6 overflow-y-auto no-scrollbar pb-15">
            {bithumbId === mockId ? (
                <div>
                    <h1 className="text-xl">신*빈님에게 송금하기</h1>
                    <p className="text-xs">수신자 ID: {bithumbId}</p>
                </div>
            ) : (
                <div>
                    <h1 className="text-xl">홍*동님에게 송금하기</h1>
                    <p className="text-xs">수신자 ID: {bithumbId}</p>
                </div>
            )}
            <div className="flex flex-col gap-4">
                보낼 금액
                <Input placeholder="0.00" />
            </div>
            <Button variant={"default"} size={"lg"} className="w-full">
                송금하기
            </Button>
        </main>
    );
}
