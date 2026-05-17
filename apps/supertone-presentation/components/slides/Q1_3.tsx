import Image from "next/image";

export default function Q1_3() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-4">
                해결 방법
            </p>

            <h2 className="text-2xl font-medium mb-10">
                사용자가 <span className="text-accent">필요한 만큼만</span>{" "}
                파고들 수 있는 3단계 구조
            </h2>

            <div className="grid grid-cols-3 gap-6">
                {/* 1단계 */}
                <div className="space-y-4">
                    <div className="border-l-2 border-accent pl-4">
                        <p className="text-accent text-xs font-mono mb-2">01</p>
                        <p className="text-xl font-semibold mb-2">메인 문구</p>
                        <p className="text-sm text-fg-muted leading-relaxed">
                            한 줄로 핵심만
                            <br />
                            &quot;얼마 받았다 / 받을 예정&quot;
                        </p>
                    </div>
                    <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden border border-line bg-surface">
                        <Image
                            src="/images/q1/main.webp"
                            alt="메인 문구 영역"
                            fill
                            className="object-cover object-top"
                            style={{
                                objectPosition: "50% 0%",
                                transform: "scale(1.75)",
                                transformOrigin: "50% 0%",
                            }}
                        />
                    </div>
                </div>

                {/* 2단계 */}
                <div className="space-y-4">
                    <div className="border-l-2 border-line pl-4">
                        <p className="text-fg-subtle text-xs font-mono mb-2">
                            02
                        </p>
                        <p className="text-xl font-semibold mb-2">월별 카드</p>
                        <p className="text-sm text-fg-muted leading-relaxed">
                            각 월의 사용액과
                            <br />
                            페이백 금액
                        </p>
                    </div>
                    <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden border border-line bg-surface">
                        <Image
                            src="/images/q1/main.webp"
                            alt="월별 카드 영역"
                            fill
                            className="object-cover object-bottom"
                            style={{ objectPosition: "50% 100%" }}
                        />
                    </div>
                </div>

                {/* 3단계 */}
                <div className="space-y-4">
                    <div className="border-l-2 border-line pl-4">
                        <p className="text-fg-subtle text-xs font-mono mb-2">
                            03
                        </p>
                        <p className="text-xl font-semibold mb-2">
                            상세내역 모달
                        </p>
                        <p className="text-sm text-fg-muted leading-relaxed">
                            계산식 그대로 노출
                            <br />
                            완전한 투명성
                        </p>
                    </div>
                    <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden border border-line bg-surface flex items-center justify-center">
                        <Image
                            src="/images/q1/modal.webp"
                            alt="상세 모달"
                            fill
                            className="object-contain"
                            style={{
                                objectPosition: "50% 0%",
                                transform: "scale(3)",
                                transformOrigin: "50% 0%",
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-8 flex items-center gap-3 text-fg-subtle text-sm">
                <span>궁금증의 깊이</span>
                <div className="w-32 h-px bg-gradient-to-r from-accent to-line" />
                <span>완전한 이해</span>
            </div>
        </div>
    );
}
