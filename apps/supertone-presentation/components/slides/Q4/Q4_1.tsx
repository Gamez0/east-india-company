export default function Q4_1() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-6">
                Question 04
            </p>

            <h2 className="text-2xl font-medium leading-relaxed text-fg-muted mb-12">
                수퍼톤 제품을 살펴보고
                <br />
                <span className="text-accent">
                    까다로워 보이는 지점, 흥미로운 지점, 개선하고 싶은 부분
                </span>
            </h2>

            <div className="w-12 h-px bg-line mb-12" />

            <div className="grid grid-cols-2 gap-12">
                <div>
                    <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-3">
                        Product 01
                    </p>
                    <p className="text-4xl font-semibold mb-2">Play</p>
                    <p className="text-base text-fg-muted">
                        웹 + Electron, AI 음성 생성
                    </p>
                </div>

                <div>
                    <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-3">
                        Product 02
                    </p>
                    <p className="text-4xl font-semibold mb-2">Shift</p>
                    <p className="text-base text-fg-muted">
                        JUCE WebEngine, 실시간 음성 변환
                    </p>
                </div>
            </div>
        </div>
    );
}
