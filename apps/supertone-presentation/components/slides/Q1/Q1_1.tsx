import Image from "next/image";

export default function Q1_1() {
    return (
        <div className="w-full h-full grid grid-cols-[1fr_1.2fr] gap-16 items-center">
            <div>
                <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-6">
                    Question 01
                </p>

                <h2 className="text-2xl font-medium leading-relaxed text-fg-muted mb-8">
                    사용자에게 지연이나
                    <br />
                    <span className="text-accent">복잡성이 드러나지 않게</span>
                    <br />
                    UX를 설계했던 경험
                </h2>

                <div className="w-12 h-px bg-line mb-8" />

                <div className="space-y-3 mb-8">
                    <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase">
                        Project
                    </p>
                    <p className="text-4xl font-semibold">
                        상생페이백 대시보드
                    </p>
                    <p className="text-base text-fg-muted leading-relaxed">
                        복잡한 정책을 사용자가 필요한 만큼만
                        <br />
                        순서대로 받을 수 있게 설계
                    </p>
                </div>

                {/* Play 연결 */}
                <div className="border-l-2 border-accent pl-4 py-1">
                    <p className="text-fg-subtle text-xs font-mono uppercase tracking-wider mb-2">
                        수퍼톤 Play에서 본 같은 맥락
                    </p>
                    <p className="text-sm text-fg-muted leading-relaxed">
                        긴 대사를{" "}
                        <span className="text-fg">스크립트로 분리</span> → 전체
                        완성을 기다리지 않고 조각별로 생성·재생
                    </p>
                </div>
            </div>

            <div className="relative w-full aspect-[1389/954] rounded-lg overflow-hidden border border-line">
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
