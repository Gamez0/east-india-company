import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuyPanel from "./BuyPanel";

export default function OrderPanel() {
    return (
        <div className="w-[calc(100%-144px)]">
            <Tabs defaultValue="buy" className="w-full">
                <TabsList className="w-full flex">
                    <TabsTrigger className="flex-1" value="buy">
                        매수
                    </TabsTrigger>
                    <TabsTrigger className="flex-1" value="sell">
                        매도
                    </TabsTrigger>
                    <TabsTrigger className="flex-1" value="history">
                        내역
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="buy" className="pt-4 px-3">
                    <BuyPanel />
                </TabsContent>
                <TabsContent value="sell">
                    Change your password here.
                </TabsContent>
                <TabsContent value="history">
                    Set your account email address here.
                </TabsContent>
            </Tabs>
        </div>
    );
}
