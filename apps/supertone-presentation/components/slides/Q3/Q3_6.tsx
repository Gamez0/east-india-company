export default function Q3_6() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-4">
                충돌을 풀어가는 원칙
            </p>

            <h2 className="text-2xl font-medium mb-12">
                세 가지 경험에서 정리된{" "}
                <span className="text-accent">협업 원칙</span>
            </h2>

            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                <div className="flex items-start gap-4">
                    <span className="text-accent font-mono text-sm w-6">
                        01
                    </span>
                    <div>
                        <p className="text-lg font-semibold mb-1">
                            바로 맞서지 않는다
                        </p>
                        <p className="text-sm text-fg-muted">
                            감정을 분리하고 시간을 둠
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <span className="text-accent font-mono text-sm w-6">
                        02
                    </span>
                    <div>
                        <p className="text-lg font-semibold mb-1">
                            상대방 얘기를 먼저 들어준다
                        </p>
                        <p className="text-sm text-fg-muted">
                            맥락과 경험을 인정
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <span className="text-accent font-mono text-sm w-6">
                        03
                    </span>
                    <div>
                        <p className="text-lg font-semibold mb-1">
                            고생했다, 감사하다 인사한다
                        </p>
                        <p className="text-sm text-fg-muted">
                            다음 고민의 여유를 만듦
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <span className="text-accent font-mono text-sm w-6">
                        04
                    </span>
                    <div>
                        <p className="text-lg font-semibold mb-1">
                            대안을 같이 고민한다
                        </p>
                        <p className="text-sm text-fg-muted">
                            함께 풀어나가는 자세
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <span className="text-accent font-mono text-sm w-6">
                        05
                    </span>
                    <div>
                        <p className="text-lg font-semibold mb-1">
                            거절도 검토 후에 한다
                        </p>
                        <p className="text-sm text-fg-muted">
                            안 되는 걸 알아도 제스처
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <span className="text-accent font-mono text-sm w-6">
                        06
                    </span>
                    <div>
                        <p className="text-lg font-semibold mb-1">
                            의견 관철은 충분한 근거로
                        </p>
                        <p className="text-sm text-fg-muted">
                            UI/UX 정확성, 코드 유지보수
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
