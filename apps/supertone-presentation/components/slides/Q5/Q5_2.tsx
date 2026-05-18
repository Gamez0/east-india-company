export default function Q5_2() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-4">
                시작점 · 포자랩스
            </p>

            <h2 className="text-2xl font-medium mb-12 leading-relaxed">
                AI 음원 서비스를 만들면서{" "}
                <span className="text-accent">처음 흔들린 순간</span>
            </h2>

            <div className="grid grid-cols-2 gap-12 items-start">
                <div>
                    <p className="text-fg-subtle text-xs font-mono uppercase tracking-wider mb-4">
                        그때의 분위기
                    </p>
                    <p className="text-lg text-fg-muted leading-relaxed mb-4">
                        &quot;우리 서비스가 대단하니까
                        <br />
                        사람들이 좀 불편해도 써줄 것이다&quot;
                    </p>
                    <ul className="space-y-2 text-sm text-fg-muted leading-relaxed">
                        <li>· 가치 전달 전 회원가입 강제</li>
                        <li>· 사용자 자유 입력 막은 자판기식 구조</li>
                    </ul>
                </div>

                <div>
                    <p className="text-accent text-xs font-mono uppercase tracking-wider mb-4">
                        결과와 깨달음
                    </p>
                    <p className="text-2xl font-semibold mb-3">
                        사용자 외면 → 실패
                    </p>
                    <p className="text-base text-fg-muted leading-relaxed">
                        사용자에게 가치를 먼저 전달하고,
                        <br />
                        그 다음에 비용을 요구해야 하는데
                        <br />
                        <span className="text-fg">그러지 못했어요</span>
                    </p>
                    <div className="mt-5 pt-4 border-t border-line">
                        <p className="text-sm text-fg-muted leading-relaxed">
                            당시엔 그게 문제인지도{" "}
                            <span className="text-fg">어렴풋이만 여겼어요</span>
                            .<br />
                            체화는{" "}
                            <span className="text-accent">
                                그 뒤 두 번의 경험
                            </span>
                            을 거치며 이루어졌어요.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
