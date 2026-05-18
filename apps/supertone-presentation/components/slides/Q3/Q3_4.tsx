export default function Q3_4() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-4">
                Case 03
            </p>

            <h2 className="text-3xl font-semibold mb-3">
                둘 다 맞지만 최선이 다른 경우
            </h2>
            <p className="text-lg text-fg-muted mb-10">
                신한은행 websquare → React 포팅
            </p>

            <div className="w-12 h-px bg-line mb-10" />

            <div className="grid grid-cols-2 gap-10">
                <div className="border-l-2 border-line pl-5">
                    <p className="text-fg-subtle text-xs font-mono uppercase tracking-wider mb-3">
                        상사
                    </p>
                    <p className="text-base font-semibold mb-3">
                        검증된 방법 그대로
                    </p>
                    <ul className="space-y-2 text-sm text-fg-muted leading-relaxed">
                        <li>· 지연된 일정에서 안전이 우선</li>
                        <li>· 파편 코드에 잘못된 게 섞여있을 수 있다</li>
                    </ul>
                </div>

                <div className="border-l-2 border-line pl-5">
                    <p className="text-fg-subtle text-xs font-mono uppercase tracking-wider mb-3">
                        나
                    </p>
                    <p className="text-base font-semibold mb-3">
                        파편 코드 활용으로 단축
                    </p>
                    <ul className="space-y-2 text-sm text-fg-muted leading-relaxed">
                        <li>· 이미 구현된 React 코드들이 있음</li>
                        <li>· 처음부터 포팅보다 훨씬 빠름</li>
                    </ul>
                </div>
            </div>

            <div className="mt-10 border-t border-line pt-8">
                <p className="text-accent text-xs font-mono uppercase tracking-wider mb-3">
                    접근
                </p>
                <p className="text-lg leading-relaxed text-fg-muted">
                    상사의 우려가 맞았어요 — 선별과 보충이 필요했어요.
                    <br />
                    <span className="text-fg">우려를 해소하는 방향</span>으로
                    접근: 분석 → websquare 비교 → 제대로 구현된 것만 선별 →
                    부족한 부분 보충
                </p>
            </div>
        </div>
    );
}
