export default function Q2_6() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-4">
                Retrospective · 진짜 회고
            </p>

            <h2 className="text-2xl font-medium mb-3">
                &quot;분리를 더 했어야 했다&quot;가 아니라
            </h2>
            <h2 className="text-3xl font-semibold mb-12">
                <span className="text-accent">변경의 종류를 구분</span>해서 분리
                단위를 잡았어야
            </h2>

            <div className="grid grid-cols-2 gap-8">
                <div className="border border-line rounded-lg p-6">
                    <p className="text-fg-subtle text-xs font-mono uppercase tracking-wider mb-3">
                        안 바뀌는 단위
                    </p>
                    <p className="text-lg font-semibold mb-3">
                        디자인 큰 그림에 영향받는 영역
                    </p>
                    <ul className="space-y-2 text-sm text-fg-muted leading-relaxed">
                        <li>· 대시보드 상단</li>
                        <li>· 카드 영역</li>
                        <li>· 모달 영역</li>
                    </ul>
                    <p className="mt-4 pt-4 border-t border-line text-sm text-accent font-semibold">
                        → 처음부터 분리
                    </p>
                </div>

                <div className="border border-line rounded-lg p-6">
                    <p className="text-fg-subtle text-xs font-mono uppercase tracking-wider mb-3">
                        자주 바뀌는 단위
                    </p>
                    <p className="text-lg font-semibold mb-3">
                        정책 변경에 영향받는 로직
                    </p>
                    <ul className="space-y-2 text-sm text-fg-muted leading-relaxed">
                        <li>· 정책 값</li>
                        <li>· 분기 조건</li>
                        <li>· 표시 문구</li>
                    </ul>
                    <p className="mt-4 pt-4 border-t border-line text-sm text-accent font-semibold">
                        → 분리된 영역 안에 모아두기
                    </p>
                </div>
            </div>

            <p className="mt-10 text-base text-fg-muted text-center">
                영향받는 주체가 다르면 분리 단위가 달라야
            </p>
        </div>
    );
}
