export default function Q3_1() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-6">
                Question 03
            </p>

            <h2 className="text-2xl font-medium leading-relaxed text-fg-muted mb-12">
                기획자·디자이너·백엔드와
                <br />
                <span className="text-accent">의견이 충돌했던 상황</span>
            </h2>

            <div className="w-12 h-px bg-line mb-12" />

            <p className="text-xl text-fg-muted leading-relaxed mb-8">
                경험들을 돌아보니 <span className="text-accent">세 가지</span>로
                나눌 수 있었어요
            </p>

            <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                    <span className="text-accent text-sm font-mono w-12">
                        Case 1
                    </span>
                    <p className="text-xl">내가 맞고 상대방이 틀린 경우</p>
                </div>
                <div className="flex items-baseline gap-4">
                    <span className="text-accent text-sm font-mono w-12">
                        Case 2
                    </span>
                    <p className="text-xl">내가 틀리고 상대방이 맞는 경우</p>
                </div>
                <div className="flex items-baseline gap-4">
                    <span className="text-accent text-sm font-mono w-12">
                        Case 3
                    </span>
                    <p className="text-xl">
                        둘 다 맞지만 최선의 방법을 조율하는 경우
                    </p>
                </div>
            </div>
        </div>
    );
}
