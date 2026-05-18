import Image from "next/image";

export default function Q4_5() {
    return (
        <div className="w-full h-full grid grid-cols-[1fr_1.1fr] gap-12 items-center">
            <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-line">
                <Image
                    src="/images/q4/shift_main.webp"
                    alt="Shift 캐릭터 선택 화면"
                    fill
                    className="object-contain"
                />
            </div>

            <div>
                <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-4">
                    Shift · 개선하고 싶은 부분
                </p>

                <div className="space-y-6">
                    <div>
                        <p className="text-accent text-xs font-mono uppercase tracking-wider mb-2">
                            01
                        </p>
                        <p className="text-xl font-semibold mb-2">
                            마이크 입력 피드백
                        </p>
                        <p className="text-sm text-fg-muted leading-relaxed">
                            &quot;waiting for input&quot;이 로딩처럼 보임.
                            <br />
                            <span className="text-fg">
                                AnalyserNode로 볼륨 레벨을 매 프레임 측정
                            </span>
                            해서
                            <br />
                            입력 없음 / 약함 / 충분 3단계로 구분 가능
                        </p>
                    </div>

                    <div className="border-t border-line pt-5">
                        <p className="text-accent text-xs font-mono uppercase tracking-wider mb-2">
                            02
                        </p>
                        <p className="text-xl font-semibold mb-2">
                            캐릭터 선택 UX
                        </p>
                        <p className="text-sm text-fg-muted leading-relaxed">
                            호버 버튼이 미리듣기인지 명확하지 않음.
                            <br />
                            배경 클릭이 캐릭터 선택이라는 것도 잘 안 보임.
                        </p>
                    </div>

                    <div className="pt-4">
                        <p className="text-sm text-accent leading-relaxed">
                            관통하는 맥락 —{" "}
                            <span className="font-semibold">
                                사용자가 지금 뭘 해야 하는지,
                                <br />왜 안 되는지 UI가 알려주지 않는다
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
