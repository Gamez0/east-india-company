export default function Intro2() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-16">
                좋은 코드의 기준
            </p>

            <div className="grid grid-cols-[1fr_auto_1fr] gap-16 items-center">
                <div className="space-y-4">
                    <p className="text-fg-subtle text-xs font-mono uppercase tracking-wider">
                        Before
                    </p>
                    <p className="text-4xl font-medium text-fg-muted leading-tight">
                        코드 자체의
                        <br />
                        완성도
                    </p>
                </div>

                <div className="text-accent text-5xl">→</div>

                <div className="space-y-4">
                    <p className="text-fg-subtle text-xs font-mono uppercase tracking-wider">
                        After
                    </p>
                    <p className="text-4xl font-semibold leading-tight">
                        비즈니스에
                        <br />
                        <span className="text-accent">잘 대응하는</span> 코드
                    </p>
                </div>
            </div>
        </div>
    );
}
