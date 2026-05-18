export default function Q3_3() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-4">
                Case 02
            </p>

            <h2 className="text-3xl font-semibold mb-3">
                내가 틀리고 상대방이 맞는 경우
            </h2>
            <p className="text-lg text-fg-muted mb-10">
                포자랩스 믹스패널 props
            </p>

            <div className="w-12 h-px bg-line mb-10" />

            <div className="grid grid-cols-2 gap-12">
                <div>
                    <p className="text-fg-subtle text-xs font-mono uppercase tracking-wider mb-4">
                        그때
                    </p>
                    <p className="text-base text-fg-muted leading-relaxed mb-4">
                        마케팅 담당자가 음원 id, 장르 같은
                        <br />
                        context 정보를 매 이벤트에 보내달라 요청
                    </p>
                    <p className="text-base text-fg-muted leading-relaxed">
                        저는{" "}
                        <span className="text-fg">
                            props가 늘어나고
                            <br />
                            리렌더링이 좋지 않다
                        </span>
                        며 어렵다고 했어요
                    </p>
                </div>

                <div>
                    <p className="text-accent text-xs font-mono uppercase tracking-wider mb-4">
                        지금 돌아보면
                    </p>
                    <p className="text-lg leading-relaxed mb-4">
                        <span className="text-accent font-semibold">
                            수단을 목적으로 착각
                        </span>
                    </p>
                    <p className="text-base text-fg-muted leading-relaxed">
                        재생 버튼 리렌더링이 서비스를 망하게 하지 않아요.
                        <br />
                        <span className="text-fg">
                            사용자 니즈를 모르는 게
                        </span>{" "}
                        망하게 해요.
                    </p>
                    <p className="mt-4 text-sm text-fg-muted leading-relaxed">
                        여기서부터 — 좋은 코드는
                        <br />
                        <span className="text-accent">
                            변동하는 비즈니스 요구사항에 잘 대처
                        </span>
                        하기 위함이라는
                        <br />
                        관점이 자리잡기 시작했어요
                    </p>
                </div>
            </div>
        </div>
    );
}
