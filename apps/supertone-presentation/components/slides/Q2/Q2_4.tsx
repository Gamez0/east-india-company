export default function Q2_4() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-4">
                Decision · 변경에 유리한 구조
            </p>

            <h2 className="text-2xl font-medium mb-10">
                정책이 <span className="text-accent">3일마다 바뀌는 환경</span>
                에서의 트레이드오프
            </h2>

            <div className="grid grid-cols-2 gap-8">
                <div className="border border-line rounded-lg p-6">
                    <p className="text-fg-subtle text-xs font-mono uppercase tracking-wider mb-3">
                        Option A
                    </p>
                    <p className="text-xl font-semibold mb-4">
                        적극적 공통화 · 분리
                    </p>
                    <div className="space-y-2 text-sm">
                        <p className="text-fg-muted">+ 재사용성 좋음</p>
                        <p className="text-fg-muted">+ 분리 단위만 수정</p>
                        <p className="text-fg-subtle">− 이른 추상화의 함정</p>
                        <p className="text-fg-subtle">
                            − 분리 단위와 변경 단위 어긋남
                        </p>
                    </div>
                </div>

                <div className="border-2 border-accent rounded-lg p-6 bg-accent/5">
                    <p className="text-accent text-xs font-mono uppercase tracking-wider mb-3">
                        Option B · Selected
                    </p>
                    <p className="text-xl font-semibold mb-4">
                        한 컴포넌트에 모아두기
                    </p>
                    <div className="space-y-2 text-sm">
                        <p className="text-fg-muted">+ 한 곳만 보면 됨</p>
                        <p className="text-fg-muted">+ 코드 이해 직관적</p>
                        <p className="text-fg-subtle">− 컴포넌트 비대화</p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-accent/30 text-sm text-fg leading-relaxed">
                        <p>· 이른 공통화는 독</p>
                        <p>· 정책 로직 재사용 가능성 낮음 (한 곳에서만 사용)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
