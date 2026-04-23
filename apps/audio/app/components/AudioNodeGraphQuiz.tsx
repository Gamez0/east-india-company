"use client";

import { useRef, useState } from "react";

// ──────────────────────────────────────────────────────────────────
// 실습: AudioNode 그래프
//
// Web Audio API는 오디오 처리를 "노드의 연결"로 표현한다.
//
// 구조:
//   [소스 노드] → [처리 노드] → [ctx.destination]
//
// - 소스 노드  : 소리를 만들어낸다 (OscillatorNode, AudioBufferSourceNode 등)
// - 처리 노드  : 소리를 변형한다   (GainNode, BiquadFilterNode 등)
// - destination: AudioContext의 최종 출력 — 스피커로 나가는 곳
//
// 규칙: destination에 도달하지 않으면 소리가 나지 않는다.
//
// TODO 를 완성해서 소리가 나도록 만들어봐.
// ──────────────────────────────────────────────────────────────────

export default function AudioNodeGraphQuiz() {
    const ctxRef = useRef<AudioContext | null>(null);
    const oscRef = useRef<OscillatorNode | null>(null);
    const [playing, setPlaying] = useState(false);

    async function handlePlay() {
        // AudioContext: 오디오 그래프 전체를 감싸는 컨테이너
        const ctx = new AudioContext();
        ctxRef.current = ctx;

        // autoplay 정책: 사용자 인터랙션(클릭) 후에 resume 필요
        if (ctx.state === "suspended") await ctx.resume();

        // ── 소스 노드 ──────────────────────────────────────────────
        // OscillatorNode: 주파수 기반으로 파형을 생성하는 소스 노드
        // createOscillator()로 만들고 frequency.value로 음높이를 설정한다
        const osc = ctx.createOscillator();
        osc.frequency.value = 440; // 440Hz = 라(A4)
        osc.type = "sine"; // 파형 종류: sine | square | sawtooth | triangle

        // ── 처리 노드 ──────────────────────────────────────────────
        // GainNode: 볼륨을 제어하는 처리 노드
        // gain.gain.value: 0 = 무음, 1 = 원본, 그 이상 = 증폭
        const gain = ctx.createGain();
        gain.gain.value = 0.2; // 귀 보호용으로 낮게

        // ── 연결 ───────────────────────────────────────────────────
        // connect(node): 현재 노드의 출력을 다음 노드의 입력으로 연결한다
        // 연결 방향은 단방향 — 역방향 연결은 피드백 루프가 생긴다

        // TODO 1: osc의 출력을 gain으로 연결해봐
        osc.connect(gain);

        // TODO 2: gain의 출력을 최종 스피커 출력으로 연결해봐
        gain.connect(ctx.destination);

        // ── 재생 ───────────────────────────────────────────────────
        // start()를 호출하기 전까지 소리는 나지 않는다
        oscRef.current = osc;
        osc.start();
        setPlaying(true);
    }

    function handleStop() {
        // disconnect(): 연결 해제 — React cleanup 패턴에서 반드시 호출해야 메모리 누수를 막는다
        oscRef.current?.stop();
        oscRef.current?.disconnect();
        ctxRef.current?.close();
        oscRef.current = null;
        ctxRef.current = null;
        setPlaying(false);
    }

    return (
        <div className="p-6 max-w-sm space-y-4 font-mono text-sm">
            <div className="font-sans space-y-1">
                <h2 className="text-lg font-semibold">AudioNode 그래프</h2>
                <p className="text-white/50 text-sm">
                    파일 열어서 TODO 채우고 ▶ run 눌러봐.
                </p>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={playing ? handleStop : handlePlay}
                    className={[
                        "flex-1 rounded px-4 py-2 text-sm transition-colors",
                        playing
                            ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                            : "bg-white/10 text-white hover:bg-white/20",
                    ].join(" ")}
                >
                    {playing ? "■ stop" : "▶ run"}
                </button>
            </div>
        </div>
    );
}
