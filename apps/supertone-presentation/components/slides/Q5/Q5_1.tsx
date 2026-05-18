export default function Q5_1() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-6">
                Question 05
            </p>

            <h2 className="text-2xl font-medium leading-relaxed text-fg-muted mb-12">
                최근 1~2년 사이에 새로 배우거나
                <br />
                <span className="text-accent">관점이 바뀐 기술 / 개념</span>
            </h2>

            <div className="w-12 h-px bg-line mb-12" />

            <h3 className="text-3xl font-semibold mb-10">
                좋은 코드의 기준이 바뀌었어요
            </h3>

            <div className="grid grid-cols-[1fr_auto_1fr] gap-10 items-center">
                <div className="border-l-2 border-line pl-5">
                    <p className="text-fg-subtle text-xs font-mono uppercase tracking-wider mb-3">
                        Before
                    </p>
                    <p className="text-xl font-medium text-fg-muted leading-relaxed">
                        코드 자체의
                        <br />
                        완성도
                    </p>
                    <p className="text-sm text-fg-subtle mt-3 leading-relaxed">
                        최신 라이브러리 · 빌드 사이즈
                        <br />
                        외부 의존 · 리팩토링 · 컨벤션
                    </p>
                </div>

                <div className="text-accent text-4xl">→</div>

                <div className="border-l-2 border-accent pl-5">
                    <p className="text-accent text-xs font-mono uppercase tracking-wider mb-3">
                        After
                    </p>
                    <p className="text-xl font-semibold leading-relaxed">
                        <span className="text-accent">수정하기 쉬운</span> 코드
                    </p>
                    <p className="text-sm text-fg-muted mt-3 leading-relaxed">
                        한 곳만 바꾸면 되거나
                        <br />
                        바꿔야 할 지점 찾기 쉬운 구조
                    </p>
                </div>
            </div>

            <p className="mt-10 text-base text-fg-muted leading-relaxed text-center">
                궁극적으로{" "}
                <span className="text-accent font-semibold">
                    빠르게 변하는 비즈니스 요구사항
                </span>
                에 대응하기 위함
            </p>
        </div>
    );
}
