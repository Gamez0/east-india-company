export default function Q5_3() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-4">
                체화 과정 · 세 단계
            </p>

            <h2 className="text-2xl font-medium mb-12">
                포자랩스 → 신한은행 → 상생페이백
            </h2>

            <div className="grid grid-cols-3 gap-8">
                <div className="border-l-2 border-line pl-5">
                    <p className="text-accent text-xs font-mono uppercase tracking-wider mb-3">
                        01 · 포자랩스
                    </p>
                    <p className="text-xl font-semibold mb-3">막연한 의문</p>
                    <p className="text-sm text-fg-muted leading-relaxed">
                        믹스패널 props 요청 거부 →<br />
                        결국 적용했지만 왜인지 몰랐어요.
                        <br />
                        <br />
                        <span className="text-fg">수단을 목적으로 착각</span>한
                        시기
                    </p>
                </div>

                <div className="border-l-2 border-line pl-5">
                    <p className="text-accent text-xs font-mono uppercase tracking-wider mb-3">
                        02 · 신한은행
                    </p>
                    <p className="text-xl font-semibold mb-3">코드에서 확인</p>
                    <p className="text-sm text-fg-muted leading-relaxed">
                        레거시에서 같은 비즈니스 로직의
                        <br />
                        제각각인 타입을 봤어요.
                        <br />
                        <br />
                        <span className="text-fg">
                            &quot;비즈니스 요구사항은 계속 바뀐다&quot;
                        </span>
                        는<br />
                        증거를 코드에서 확인
                    </p>
                </div>

                <div className="border-l-2 border-accent pl-5">
                    <p className="text-accent text-xs font-mono uppercase tracking-wider mb-3">
                        03 · 상생페이백
                    </p>
                    <p className="text-xl font-semibold mb-3">체화</p>
                    <p className="text-sm text-fg-muted leading-relaxed">
                        정책이 3일마다 바뀌는 환경 —<br />
                        수정하기 쉬운 코드의 가치를
                        <br />
                        직접 체감.
                        <br />
                        <br />
                        <span className="text-accent">
                            지금도 풀어내고 싶은 문제
                        </span>
                        로 남아있어요
                    </p>
                </div>
            </div>
        </div>
    );
}
