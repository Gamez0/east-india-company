import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
    return (
        <main className="h-[calc(100vh-114px)] flex flex-col px-6.5 gap-6 overflow-y-auto no-scrollbar pb-15">
            <h1 className="text-2xl font-bold">빗썸 유저에게 송금하기</h1>
            {/* Tab email/phone 또는 빗썸 id */}
            <Tabs defaultValue="id" className="w-full gap-4">
                <TabsList>
                    <TabsTrigger value="email/phone">
                        이메일/휴대번호
                    </TabsTrigger>
                    <TabsTrigger value="id">빗썸 ID</TabsTrigger>
                </TabsList>
                <TabsContent
                    value="email/phone"
                    className="flex flex-col gap-2"
                >
                    <Input />
                    <Button variant={"default"} size={"lg"} className="w-full">
                        계속하기
                    </Button>
                </TabsContent>
                <TabsContent value="id" className="flex flex-col gap-2">
                    <Input placeholder="빗썸 ID" />
                    <p className="text-xs">
                        빗썸 ID 는 Pay 에서 찾을 수 있어요.
                    </p>
                    <Button variant={"default"} size={"lg"} className="w-full">
                        계속하기
                    </Button>
                </TabsContent>
            </Tabs>
        </main>
    );
}
