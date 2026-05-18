export default function Q3_5() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-10">
                Case 03 · 결과와 배움
            </p>

            <div className="grid grid-cols-2 gap-12 mb-12">
                <div>
                    <p className="text-accent text-xs font-mono uppercase tracking-wider mb-4">
                        결과
                    </p>
                    <p className="text-6xl font-bold mb-3">
                        4주 <span className="text-accent">→ 2주</span>
                    </p>
                    <p className="text-base text-fg-muted leading-relaxed">
                        상품별로 따로 있던 페이지를
                        <br />
                        <span className="text-fg">하나의 동적 페이지</span>로
                        집결
                    </p>
                </div>

                <div>
                    <p className="text-accent text-xs font-mono uppercase tracking-wider mb-4">
                        합의에 도달한 방법
                    </p>
                    <p className="text-xl font-semibold mb-4">자주 공유</p>
                    <p className="text-base text-fg-muted leading-relaxed">
                        점심 · 오후 3시 · 퇴근 전<br />
                        <span className="text-fg">하루 최소 3번 이상</span>
                        <br />
                        &quot;안전하게 잘 가져오고 있구나&quot;를 확인
                    </p>
                </div>
            </div>

            <div className="border-t border-line pt-8">
                <p className="text-accent text-xs font-mono uppercase tracking-wider mb-4">
                    배운 것
                </p>
                <p className="text-lg leading-relaxed text-fg-muted">
                    이전엔 진행 상황 공유가 정말 프로젝트에 도움 되는지
                    의문이었어요.
                    <br />
                    <span className="text-fg">
                        투명한 공유가 상대방의 의문을 해소하고 신뢰를 쌓는 방법
                    </span>
                    이고,
                    <br />그 신뢰가 결국 프로젝트 완료에 직접적으로 도움됐어요.
                </p>
            </div>
        </div>
    );
}
