import Image from "next/image";

export default function Q4_2() {
    return (
        <div className="w-full h-full grid grid-cols-[1.1fr_1fr] gap-12 items-center">
            <div>
                <p className="text-fg-subtle text-sm font-mono tracking-wider uppercase mb-4">
                    Play
                </p>

                <div className="mb-10">
                    <p className="text-accent text-xs font-mono uppercase tracking-wider mb-3">
                        까다로워 보이는 지점
                    </p>
                    <p className="text-xl font-semibold mb-2 leading-relaxed">
                        여러 스크립트 음원을 하나의
                        <br />
                        진행바로 합산해서 끊김 없이 재생
                    </p>
                    <p className="text-sm text-fg-muted leading-relaxed">
                        전역 store로 관리하는 오디오 context를
                        <br />
                        재생 엔진과 UI가 함께 바라보는 구조
                    </p>
                </div>

                <div className="border-t border-line pt-6">
                    <p className="text-accent text-xs font-mono uppercase tracking-wider mb-3">
                        흥미로운 지점
                    </p>
                    <p className="text-xl font-semibold mb-2 leading-relaxed">
                        웹과 Electron 데스크탑 앱이 동일 UI
                    </p>
                    <p className="text-sm text-fg-muted leading-relaxed">
                        단일 코드베이스로 두 환경을 함께 관리하는 구조가 궁금
                    </p>
                </div>
            </div>

            <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-line">
                <Image
                    src="/images/q4/play_main.webp"
                    alt="Play 메인 화면"
                    fill
                    className="object-contain"
                    style={{
                        objectPosition: "20% 140%",
                        transform: "scale(1.25)",
                        transformOrigin: "20% 140%",
                    }}
                />
            </div>
        </div>
    );
}
