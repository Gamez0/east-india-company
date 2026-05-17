export default function Q2_1() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-6">
                Question 02
            </p>

            <h2 className="text-2xl font-medium leading-relaxed text-fg-muted mb-12">
                아키텍처나 기술 선택을 주도한 경험 중<br />
                <span className="text-accent">가장 기억에 남는 결정</span>
            </h2>

            <div className="w-12 h-px bg-line mb-12" />

            <div className="grid grid-cols-2 gap-12">
                <div>
                    <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-3">
                        Project
                    </p>
                    <p className="text-3xl font-semibold mb-2">상생페이백</p>
                    <p className="text-lg text-fg-muted">프론트엔드 팀장</p>
                </div>

                <div>
                    <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-3">
                        Role
                    </p>
                    <p className="text-xl leading-relaxed text-fg-muted">
                        제약 분석부터
                        <br />
                        기술 스택 결정까지
                        <br />
                        <span className="text-accent">주도</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
