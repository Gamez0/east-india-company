export default function Index() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-12">
                Index
            </p>

            <div className="grid grid-cols-2 gap-x-16 gap-y-8">
                <div className="flex items-baseline gap-5">
                    <span className="text-accent font-mono text-sm w-8">
                        01
                    </span>
                    <div>
                        <p className="text-xl font-semibold mb-1">UX 설계</p>
                        <p className="text-sm text-fg-muted">
                            복잡성을 사용자에게 드러내지 않기
                        </p>
                    </div>
                </div>

                <div className="flex items-baseline gap-5">
                    <span className="text-accent font-mono text-sm w-8">
                        02
                    </span>
                    <div>
                        <p className="text-xl font-semibold mb-1">
                            기술 선택과 회고
                        </p>
                        <p className="text-sm text-fg-muted">
                            변경에 유리한 구조
                        </p>
                    </div>
                </div>

                <div className="flex items-baseline gap-5">
                    <span className="text-accent font-mono text-sm w-8">
                        03
                    </span>
                    <div>
                        <p className="text-xl font-semibold mb-1">의견 충돌</p>
                        <p className="text-sm text-fg-muted">
                            세 가지 케이스와 협업 원칙
                        </p>
                    </div>
                </div>

                <div className="flex items-baseline gap-5">
                    <span className="text-accent font-mono text-sm w-8">
                        04
                    </span>
                    <div>
                        <p className="text-xl font-semibold mb-1">
                            수퍼톤 제품 분석
                        </p>
                        <p className="text-sm text-fg-muted">Play와 Shift</p>
                    </div>
                </div>

                <div className="flex items-baseline gap-5">
                    <span className="text-accent font-mono text-sm w-8">
                        05
                    </span>
                    <div>
                        <p className="text-xl font-semibold mb-1">
                            관점이 바뀐 것
                        </p>
                        <p className="text-sm text-fg-muted">
                            좋은 코드의 기준
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
