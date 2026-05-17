export default function Q2_7() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-10">
                Retrospective · 어떻게 적용 & 왜 못 했나
            </p>

            <div className="grid grid-cols-2 gap-12">
                <div>
                    <p className="text-accent text-xs font-mono uppercase tracking-wider mb-4">
                        How to apply
                    </p>
                    <h3 className="text-xl font-semibold mb-5">점진적 분리</h3>
                    <div className="space-y-4 text-base text-fg-muted leading-relaxed">
                        <div className="flex gap-3">
                            <span className="text-accent font-mono">01</span>
                            <p>도메인 이해 부족한 초반엔 한 컴포넌트로 시작</p>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-accent font-mono">02</span>
                            <p>
                                이해가 쌓이면 &quot;안 바뀐다&quot;는 확신이
                                드는 영역부터 분리
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-accent font-mono">03</span>
                            <p>
                                정책 변경이 와도 영역 단위는 그대로, 안의 로직만
                                수정
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-fg-subtle text-xs font-mono uppercase tracking-wider mb-4">
                        Why I couldn&apos;t
                    </p>
                    <h3 className="text-xl font-semibold mb-5">
                        이분법으로 봤음
                    </h3>
                    <p className="text-base text-fg-muted leading-relaxed mb-5">
                        &quot;공통화 vs 안 함&quot; 두 가지 선택지로만 봤어요.
                        <br />
                        <br />
                        정책이 너무 자주 바뀌니까 일단 한 곳에 모으는 게
                        안전하다고 판단했고,
                        <br />
                        <br />
                        <span className="text-fg">
                            변경의 종류를 구분해서 다른 전략을 쓴다는 시야가
                            없었어요.
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
