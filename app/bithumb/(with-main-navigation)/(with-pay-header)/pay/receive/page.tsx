import Image from "next/image";

export default function Page() {
    return (
        <main className="h-[calc(100vh-114px)] flex flex-col px-6.5 gap-20 overflow-y-auto no-scrollbar pb-15">
            <div>
                <h1 className="text-2xl font-bold">송금 받기</h1>
                <p className="text-xs">
                    Others can scan with Bithumb App to pay
                </p>
            </div>
            <div className="w-full justify-center flex">
                <Image
                    src="/bithumb/pay/qr-example.png"
                    width={240}
                    height={240}
                    alt="qr code"
                />
            </div>
        </main>
    );
}
