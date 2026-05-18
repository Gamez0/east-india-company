import Image from "next/image";

export default function Q4_3() {
    return (
        <div className="w-full h-full grid grid-cols-[1.1fr_1fr] gap-12 items-center">
            <div>
                <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-4">
                    Play · 개선하고 싶은 부분
                </p>

                <h3 className="text-2xl font-semibold mb-6 leading-relaxed">
                    AI 처리 단계별{" "}
                    <span className="text-accent">피드백 부재</span>
                </h3>

                <div className="space-y-5 text-base leading-relaxed">
                    <p className="text-fg">
                        3초짜리 짧은 영상을 올렸을 때 —<br />
                        <span className="text-fg-muted">
                            204만 떨어지고 어떤 피드백도 없는 상태
                        </span>
                    </p>

                    <div className="border-l-2 border-accent pl-5">
                        <p className="text-fg-muted mb-2">사용자 입장에서</p>
                        <p className="text-fg">
                            지금 처리 중인가? 실패한 건가?
                            <br />
                            <span className="text-fg-muted">알 길이 없음</span>
                        </p>
                    </div>

                    <div className="pt-3">
                        <p className="text-sm text-fg-muted">
                            상생페이백에서 폼 에러 피드백을 단계별로 보여주는
                            설계를
                            <br />
                            해봤어서 — 비슷한 접근을 적용할 수 있어요
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-line">
                <Image
                    src="/images/q4/play_processing.webp"
                    alt="Play AI 처리 중 화면"
                    fill
                    className="object-contain"
                />
            </div>
        </div>
    );
}
