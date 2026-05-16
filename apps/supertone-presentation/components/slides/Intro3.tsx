export default function Intro3() {
    return (
        <div className="w-full h-full flex flex-col justify-center space-y-16">
            <div>
                <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-6">
                    Career
                </p>
                <div className="flex items-center gap-4 text-3xl font-medium flex-wrap">
                    <span className="text-fg-muted">티맥스</span>
                    <span className="text-fg-subtle">→</span>
                    <span className="text-fg-muted">포자랩스</span>
                    <span className="text-fg-subtle">→</span>
                    <span className="text-fg-muted">신한은행</span>
                    <span className="text-fg-subtle">→</span>
                    <span className="text-fg-muted">상생페이백</span>
                    <span className="text-accent">→ ?</span>
                </div>
            </div>

            <div className="w-20 h-px bg-line" />

            <div className="space-y-3">
                <p className="text-fg-muted text-2xl leading-relaxed">
                    매출을 내는 서비스를
                </p>
                <p className="text-3xl font-medium leading-relaxed">
                    사용자가 <span className="text-accent">더 편하고 좋게</span>{" "}
                    쓸 수 있도록
                </p>
                <p className="text-3xl font-medium leading-relaxed">
                    지속적으로 발전시키는 일
                </p>
            </div>
        </div>
    );
}
