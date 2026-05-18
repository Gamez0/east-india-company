export default function Q3_2() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-4">
                Case 01
            </p>

            <h2 className="text-3xl font-semibold mb-3">
                내가 맞고 상대방이 틀린 경우
            </h2>
            <p className="text-lg text-fg-muted mb-10">
                상생페이백 이의신청 UI
            </p>

            <div className="w-12 h-px bg-line mb-10" />

            <div className="grid grid-cols-2 gap-12">
                <div>
                    <p className="text-fg-subtle text-xs font-mono uppercase tracking-wider mb-4">
                        상황
                    </p>
                    <p className="text-lg leading-relaxed text-fg-muted">
                        기획자가 <span className="text-fg">라디오 UI</span>를
                        <br />
                        <span className="text-fg">체크박스 UX</span>로
                        만들어달라고 요청
                    </p>
                </div>

                <div>
                    <p className="text-accent text-xs font-mono uppercase tracking-wider mb-4">
                        접근
                    </p>
                    <ul className="space-y-3 text-base text-fg-muted leading-relaxed">
                        <li>· 바로 맞서지 않고 커피 자리에서 먼저 들어줌</li>
                        <li>· 업계 경험 인정</li>
                        <li>· 근거 기반 설득</li>
                    </ul>
                    <div className="mt-5 pt-4 border-t border-line space-y-2 text-sm">
                        <p className="text-fg-muted">
                            → 전국민 대상 서비스의 정확성
                        </p>
                        <p className="text-fg-muted">
                            → 모던 웹 표준 (shadcn 미지원)
                        </p>
                        <p className="text-fg-muted">
                            → 추가 공수와 코드 유지 문제
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
