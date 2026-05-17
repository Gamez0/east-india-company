export default function Q2_3() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-4">
                Decision · 큰 그림
            </p>

            <h2 className="text-2xl font-medium mb-12">
                10가지 결정을 <span className="text-accent">네 가지 흐름</span>
                으로
            </h2>

            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                <div className="border-l-2 border-line pl-5">
                    <p className="text-fg-subtle text-xs font-mono mb-2">01</p>
                    <p className="text-xl font-semibold mb-2">
                        경량화를 위한 초기 기술 스택
                    </p>
                    <p className="text-sm text-fg-muted leading-relaxed">
                        react-router · Vite · Tanstack Query
                        <br />
                        Zustand · shadcn · Tailwind
                    </p>
                </div>

                <div className="border-l-2 border-accent pl-5">
                    <p className="text-accent text-xs font-mono mb-2">02</p>
                    <p className="text-xl font-semibold mb-2">
                        변경에 유리한 구조 전략
                    </p>
                    <p className="text-sm text-fg-muted leading-relaxed">
                        이른 공통화 vs 안 함<br />
                        <span className="text-accent">
                            가장 기억에 남는 결정
                        </span>
                    </p>
                </div>

                <div className="border-l-2 border-line pl-5">
                    <p className="text-fg-subtle text-xs font-mono mb-2">03</p>
                    <p className="text-xl font-semibold mb-2">
                        TypeScript 점진적 도입
                    </p>
                    <p className="text-sm text-fg-muted leading-relaxed">
                        파일 확장자만 강제
                        <br />
                        타입 선언은 자유
                    </p>
                </div>

                <div className="border-l-2 border-line pl-5">
                    <p className="text-fg-subtle text-xs font-mono mb-2">04</p>
                    <p className="text-xl font-semibold mb-2">
                        Font subset (운영 중 보완)
                    </p>
                    <p className="text-sm text-fg-muted leading-relaxed">
                        팀원 제안 → 검증 → 적용
                        <br />
                        외부 CDN + fallback 폰트
                    </p>
                </div>
            </div>
        </div>
    );
}
