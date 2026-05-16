"use client";

import { useRef, useState } from "react";

// ──────────────────────────────────────────────────────────────────
// 실습: AudioBuffer & decodeAudioData
//
// 파이프라인:
//   파일 선택
//     → file.arrayBuffer()       // 바이너리 덩어리 (mp3/wav 원본)
//     → ctx.decodeAudioData()    // 브라우저가 PCM으로 디코딩
//     → AudioBuffer              // 메모리에 올라간 파형 데이터
//     → AudioBufferSourceNode    // 재생 노드 (일회용)
//     → ctx.destination
//
// 핵심 차이:
//   MediaElementSourceNode = 스트리밍 (재생하면서 디코딩)
//   AudioBuffer            = 전체를 메모리에 올린 뒤 재생 (정밀 제어 가능)
// ──────────────────────────────────────────────────────────────────

export default function AudioBufferExercise() {
    const ctxRef = useRef<AudioContext | null>(null);

    // AudioBuffer는 재사용 가능 — 디코딩은 한 번만 한다
    const bufferRef = useRef<AudioBuffer | null>(null);

    // AudioBufferSourceNode는 일회용 — 재생마다 새로 만든다
    const sourceRef = useRef<AudioBufferSourceNode | null>(null);

    const [status, setStatus] = useState<
        "idle" | "decoding" | "ready" | "playing"
    >("idle");

    function getCtx() {
        if (!ctxRef.current || ctxRef.current.state === "closed") {
            ctxRef.current = new AudioContext();
        }
        return ctxRef.current;
    }

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setStatus("decoding");
        const ctx = getCtx();

        // TODO 1: file에서 ArrayBuffer를 가져와봐
        // hint: file에는 arrayBuffer() 메서드가 있어
        const arrayBuffer = await file.arrayBuffer();

        // TODO 2: ArrayBuffer를 AudioBuffer로 디코딩해봐
        // hint: ctx.decode_________(arrayBuffer)
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

        bufferRef.current = audioBuffer;
        setStatus("ready");
    }

    async function handlePlay() {
        const ctx = getCtx();
        if (!bufferRef.current) return;

        if (ctx.state === "suspended") await ctx.resume();

        // TODO 3: AudioBufferSourceNode를 만들어봐
        // hint: ctx.createBufferSource()
        const source = ctx.createBufferSource();

        // TODO 4: source에 디코딩된 버퍼를 연결해봐
        source.buffer = bufferRef.current;

        // TODO 5: source → destination 연결하고 재생해봐
        source.connect(ctx.destination);
        source.start();
        sourceRef.current = source;

        // AudioBufferSourceNode는 재생이 끝나면 자동으로 정리된다
        source.onended = () => setStatus("ready");

        setStatus("playing");
    }

    function handleStop() {
        sourceRef.current?.stop();
        sourceRef.current = null;
        setStatus("ready");
    }

    const statusLabel: Record<typeof status, string> = {
        idle: "파일을 선택해봐",
        decoding: "디코딩 중...",
        ready: "재생 준비 완료",
        playing: "재생 중",
    };

    return (
        <div className="p-6 max-w-sm space-y-5 font-mono text-sm">
            <div className="font-sans space-y-1">
                <h2 className="text-lg font-semibold">
                    AudioBuffer & decodeAudioData
                </h2>
                <p className="text-white/50 text-sm">
                    파일을 올리면 전체를 메모리에 디코딩한 뒤 재생한다.
                </p>
            </div>

            {/* 상태 표시 */}
            <div className="rounded border border-white/10 bg-white/5 px-3 py-2 text-white/60 text-xs">
                status:{" "}
                <span className="text-white">{statusLabel[status]}</span>
            </div>

            {/* 파일 선택 — 선택하면 바로 디코딩 시작 */}
            <label className="block cursor-pointer rounded border border-dashed border-white/20 p-3 text-center text-white/40 hover:border-white/40 hover:text-white/70 transition-colors">
                오디오 파일 선택 (선택 시 바로 디코딩)
                <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>

            {/* 재생 / 정지 */}
            <div className="flex gap-2">
                <button
                    onClick={handlePlay}
                    disabled={status !== "ready"}
                    className={[
                        "flex-1 rounded px-4 py-2 text-sm transition-colors",
                        status === "ready"
                            ? "bg-white/10 text-white hover:bg-white/20"
                            : "bg-white/5 text-white/20 cursor-not-allowed",
                    ].join(" ")}
                >
                    ▶ play
                </button>
                <button
                    onClick={handleStop}
                    disabled={status !== "playing"}
                    className={[
                        "flex-1 rounded px-4 py-2 text-sm transition-colors",
                        status === "playing"
                            ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                            : "bg-white/5 text-white/20 cursor-not-allowed",
                    ].join(" ")}
                >
                    ■ stop
                </button>
            </div>

            <Hint />
        </div>
    );
}

function Hint() {
    const [open, setOpen] = useState(false);
    return (
        <div className="text-xs font-sans">
            <button
                onClick={() => setOpen((v) => !v)}
                className="text-white/30 hover:text-white/60"
            >
                {open ? "▼ 힌트 숨기기" : "▶ 힌트 보기"}
            </button>
            {open && (
                <ul className="mt-2 text-white/40 space-y-1 list-disc list-inside leading-relaxed">
                    <li>File 객체에는 .arrayBuffer() 메서드가 있어</li>
                    <li>
                        ctx.decodeAudioData(arrayBuffer) — Promise 반환, await
                        필요
                    </li>
                    <li>ctx.createBufferSource() 로 SourceNode 생성</li>
                    <li>source.buffer = audioBuffer 로 데이터 연결</li>
                    <li>
                        SourceNode는 일회용 — play 버튼 누를 때마다 새로
                        만들어야 해
                    </li>
                </ul>
            )}
        </div>
    );
}
