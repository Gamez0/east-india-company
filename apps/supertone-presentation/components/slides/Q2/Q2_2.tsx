export default function Q2_2() {
    return (
        <div className="w-full h-full flex flex-col justify-center">
            <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-12">
                Context · 제약 조건
            </p>

            <div className="grid grid-cols-2 gap-12">
                <div className="border-l-2 border-line pl-6">
                    <p className="text-fg-subtle text-xs font-mono uppercase tracking-wider mb-4">
                        바꿀 수 없는 제약
                    </p>
                    <p className="text-2xl font-semibold mb-3">SSR 불가</p>
                    <p className="text-base text-fg-muted leading-relaxed">
                        NHN 인프라 계약으로
                        <br />
                        web WAS, CDN 고정
                    </p>
                </div>

                <div className="border-l-2 border-accent pl-6">
                    <p className="text-accent text-xs font-mono uppercase tracking-wider mb-4">
                        해결해야 하는 제약
                    </p>
                    <ul className="space-y-3 text-lg text-fg leading-relaxed">
                        <li>
                            ·{" "}
                            <span className="text-accent font-semibold">
                                접속 실패하지 않는 것
                            </span>{" "}
                            (5000만 트래픽)
                        </li>
                        <li>
                            ·{" "}
                            <span className="text-accent font-semibold">
                                변경에 빠르게 대응
                            </span>{" "}
                            (정책 3일마다 변경)
                        </li>
                        <li>· 구 브라우저 지원</li>
                        <li>· 모바일 환경 대응</li>
                        <li>· 접근성</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
