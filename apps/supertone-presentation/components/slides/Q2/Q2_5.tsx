export default function Q2_5() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-12">
                Consequences · 결과
            </p>

            <div className="grid grid-cols-2 gap-12 mb-12">
                <div>
                    <p className="text-accent text-xs font-mono uppercase tracking-wider mb-4">
                        잘 된 것
                    </p>
                    <p className="text-2xl font-semibold mb-3">
                        변경 위치를 찾는 시간 짧음
                    </p>
                    <p className="text-5xl font-bold mb-2">
                        1500<span className="text-3xl">만</span>
                    </p>
                    <p className="text-base text-fg-muted">
                        신청자 무사 처리, 큰 장애 없음
                    </p>
                </div>

                <div>
                    <p className="text-fg-subtle text-xs font-mono uppercase tracking-wider mb-4">
                        한계
                    </p>
                    <p className="text-2xl font-semibold mb-3 text-fg-muted">
                        점점 변화에 약한 구조로
                    </p>
                    <ul className="space-y-2 text-base text-fg-muted leading-relaxed">
                        <li>· 컴포넌트 비대화</li>
                        <li>· 신규 팀원 코드 이해 시간 증가</li>
                        <li>· 분리하려 해도 너무 비대해져 부담</li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-line pt-8">
                <p className="text-lg text-fg-muted leading-relaxed max-w-3xl">
                    비즈니스 요구사항은 다 달성했지만,
                    <br />
                    <span className="text-accent font-semibold">
                        개발 효율 관점에서 손실
                    </span>
                    이 있었어요. 코드 구조가 좋지 않다 보니
                    <br />
                    역량 대비 산출량이 떨어졌고, 변경 대응에 시간이 크게
                    뺏겼어요.
                </p>
            </div>
        </div>
    );
}
