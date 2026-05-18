export default function Outro() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center text-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-8">
                Thank you
            </p>

            <h2 className="text-4xl font-medium leading-relaxed text-fg-muted mb-4">
                좋은 코드의 기준이
            </h2>
            <h2 className="text-5xl font-bold mb-16">
                <span className="text-accent">바뀌어온</span> 과정
            </h2>

            <div className="w-20 h-px bg-line mb-16" />

            <p className="text-xl text-fg-muted leading-relaxed mb-3">
                비즈니스 요구사항에 잘 대응하는 코드
            </p>
            <p className="text-xl text-fg-muted leading-relaxed mb-3">
                <span className="text-accent">→</span>
            </p>
            <p className="text-2xl font-semibold leading-relaxed">
                수퍼톤에서{" "}
                <span className="text-accent">매출을 내는 서비스</span>를<br />
                지속적으로 발전시키는 일
            </p>

            <p className="mt-20 text-2xl font-medium">감사합니다</p>

            <p className="mt-2 text-base text-fg-subtle">신도빈</p>
        </div>
    );
}
