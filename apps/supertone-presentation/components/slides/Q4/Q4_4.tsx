export default function Q4_4() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-4">
                Shift · 까다로워 보이는 지점
            </p>

            <h2 className="text-3xl font-semibold mb-10">
                JUCE WebEngine 안에{" "}
                <span className="text-accent">웹 UI 임베드</span>
            </h2>

            <div className="grid grid-cols-2 gap-10">
                <div className="border border-line rounded-lg p-6">
                    <p className="text-fg-subtle text-xs font-mono uppercase tracking-wider mb-3">
                        Native
                    </p>
                    <p className="text-xl font-semibold mb-3">C++ 코어</p>
                    <p className="text-sm text-fg-muted leading-relaxed">
                        실시간 오디오 처리
                        <br />
                        낮은 레이턴시 보장
                    </p>
                </div>

                <div className="border border-line rounded-lg p-6">
                    <p className="text-fg-subtle text-xs font-mono uppercase tracking-wider mb-3">
                        Web
                    </p>
                    <p className="text-xl font-semibold mb-3">웹뷰 UI</p>
                    <p className="text-sm text-fg-muted leading-relaxed">
                        React 기반 인터페이스
                        <br />
                        빠른 UI 변경 대응
                    </p>
                </div>
            </div>

            <div className="mt-10 border-t border-line pt-8">
                <p className="text-lg text-fg-muted leading-relaxed max-w-3xl">
                    두 레이어 간 통신이 어떻게 이루어지는지가 궁금했어요.
                    <br />
                    <span className="text-fg">
                        실시간 오디오 처리의 안정성을 유지하면서
                    </span>
                    UI 반응성을 어떻게 보장하는지요.
                </p>
            </div>
        </div>
    );
}
