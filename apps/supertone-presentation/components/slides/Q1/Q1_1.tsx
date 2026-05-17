import Image from "next/image";

export default function Q1_1() {
    return (
        <div className="w-full h-full grid grid-cols-[1fr_1.2fr] gap-16 items-center">
            <div>
                <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-6">
                    Question 01
                </p>

                <h2 className="text-2xl font-medium leading-relaxed text-fg-muted mb-10">
                    사용자에게 지연이나
                    <br />
                    <span className="text-accent">복잡성이 드러나지 않게</span>
                    <br />
                    UX를 설계했던 경험
                </h2>

                <div className="w-12 h-px bg-line mb-10" />

                <div className="space-y-3">
                    <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase">
                        Project
                    </p>
                    <p className="text-4xl font-semibold">
                        상생페이백 대시보드
                    </p>
                    <p className="text-lg text-fg-muted mt-4 leading-relaxed">
                        복잡한 정책을 사용자가 필요한 만큼만
                        <br />
                        순서대로 받을 수 있게 설계
                    </p>
                </div>
            </div>

            <div className="relative w-full aspect-[1389/954] rounded-lg overflow-hidden border-line">
                <Image
                    src="/images/q1/main.webp"
                    alt="상생페이백 대시보드 메인 화면"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
        </div>
    );
}
