export default function Q1_2() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-12">
                문제 정의
            </p>

            <div className="grid grid-cols-2 gap-16">
                <div>
                    <p className="text-fg-subtle text-xs font-mono uppercase tracking-wider mb-6">
                        정책의 복잡성
                    </p>
                    <ul className="space-y-4 text-xl text-fg-muted leading-relaxed">
                        <li>· 신청 시점별 소급 처리</li>
                        <li>· 날짜 기반 지급 상태 판단</li>
                        <li>· 카드사별 사용액 집계</li>
                        <li>· 출시 직전까지 외부 요인 변경</li>
                    </ul>
                </div>

                <div>
                    <p className="text-fg-subtle text-xs font-mono uppercase tracking-wider mb-6">
                        동시에 풀어야 했던 두 가지
                    </p>
                    <div className="space-y-6">
                        <div>
                            <p className="text-accent text-lg font-medium mb-2">
                                정부 측
                            </p>
                            <p className="text-xl text-fg leading-relaxed">
                                소비 동기를 만드는
                                <br />
                                경험
                            </p>
                        </div>
                        <div>
                            <p className="text-accent text-lg font-medium mb-2">
                                사용자 측
                            </p>
                            <p className="text-xl text-fg leading-relaxed">
                                &quot;왜 이 금액인지&quot; 궁금증
                                <br />
                                해소
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
