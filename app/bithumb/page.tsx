import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
    return (
        <div className="flex flex-col h-[calc(100vh-114px)]">
            <Tabs>
                <TabsList>
                    <TabsTrigger value="live-chart">실시간 차트</TabsTrigger>
                    <TabsTrigger value="holding">보유</TabsTrigger>
                    <TabsTrigger value="like">관심</TabsTrigger>
                </TabsList>
                <TabsContent value="live-chart"></TabsContent>
                <TabsContent value="holding"></TabsContent>
                <TabsContent value="like"></TabsContent>
            </Tabs>
        </div>
    );
}
