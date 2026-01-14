import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BuyPanel() {
    return (
        <Tabs defaultValue="buy-limit" className="w-full">
            <TabsList className="w-full flex">
                <TabsTrigger className="flex-1" value="buy-limit">
                    지정
                </TabsTrigger>
                <TabsTrigger className="flex-1" value="buy-market">
                    시장
                </TabsTrigger>
                <TabsTrigger className="flex-1" value="buy-automatic">
                    자동
                </TabsTrigger>
            </TabsList>
            <TabsContent value="buy-limit">
                <div className="flex justify-between">
                    <span className="text-[#1c2028]">주문가능</span>
                    <div>
                        <strong>2,630</strong>
                        <span className="text-[#1c2028]">원</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-1">
                        <Label
                            htmlFor="buy-quantity"
                            className="text-xs w-[30px]"
                        >
                            수량
                        </Label>
                        <Input id="buy-quantity" type="number" />
                    </div>
                    <div className="flex flex-row gap-1">
                        <Label htmlFor="buy-price" className="text-xs w-[30px]">
                            가격
                        </Label>
                        <Input id="buy-price" type="number" />
                    </div>
                </div>
                <span className="text-xs">현재가 대비 %</span>
                <div className="flex flex-row gap-1">
                    <Label htmlFor="buy-price" className="text-xs w-[30px]">
                        총액
                    </Label>
                    <Input id="buy-price" type="number" />
                </div>
                <div className="flex w-full gap-0.5 mt-3">
                    <Button variant="secondary" size="lg" className="flex-25">
                        초기화
                    </Button>
                    <Button variant="buy" size="lg" className="flex-40">
                        매수
                    </Button>
                </div>
            </TabsContent>
            <TabsContent value="buy-market">시장가 구매</TabsContent>
            <TabsContent value="buy-automatic">자동 구매</TabsContent>
        </Tabs>
    );
}
