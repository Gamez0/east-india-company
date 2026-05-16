export default function Intro1() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <div className="space-y-4">
                <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase">
                    Frontend Engineer · 4년 10개월
                </p>
                <h1 className="text-8xl font-bold tracking-tight">신도빈</h1>
            </div>

            <div className="mt-24 space-y-2">
                <p className="text-fg-muted text-2xl">좋은 코드의 기준이</p>
                <p className="text-5xl font-semibold">
                    <span className="text-accent">바뀌어온</span> 과정
                </p>
            </div>
        </div>
    );
}
