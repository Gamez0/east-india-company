export default function Q1_4() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-12">
                결과
            </p>

            <div className="grid grid-cols-2 gap-16">
                <div>
                    <p className="text-accent text-sm font-mono uppercase tracking-wider mb-6">
                        정부 측 임팩트
                    </p>
                    <p className="text-6xl font-bold mb-3">
                        +7조 <span className="text-accent">220억</span>
                    </p>
                    <p className="text-lg text-fg-muted leading-relaxed">
                        전년 월평균 대비
                        <br />
                        추가 지출 (중기부 집계)
                    </p>
                </div>

                <div>
                    <p className="text-accent text-sm font-mono uppercase tracking-wider mb-6">
                        사용자 측 경험
                    </p>
                    <p className="text-6xl font-bold mb-3">
                        평균 <span className="text-accent">6만원</span>
                    </p>
                    <p className="text-lg text-fg-muted leading-relaxed">
                        1인당 환급
                        <br />
                        1500만 명 신청
                    </p>
                </div>
            </div>

            <div className="w-20 h-px bg-line my-16" />

            <p className="text-xl text-fg-muted leading-relaxed max-w-3xl">
                &quot;그냥 환급&quot;이 아니라{" "}
                <span className="text-accent">
                    &quot;작년보다 더 쓴 만큼 환급&quot;
                </span>
                이라는
                <br />
                복잡한 정책을, 사용자가 자연스럽게 이해하도록 유도
            </p>
        </div>
    );
}
