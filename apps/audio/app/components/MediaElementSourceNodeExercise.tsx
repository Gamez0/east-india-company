"use client";

import { useRef, useState } from "react";

// ──────────────────────────────────────────────────────────────────
// 실습: MediaElementSourceNode
//
// <audio> 태그는 기본적으로 Web Audio API의 AudioNode 연결 구조 밖에 있다.
// createMediaElementSource()로 감싸면 그 안으로 들어온다.
//
// 연결 구조:
//   <audio> → MediaElementSourceNode → GainNode → ctx.destination
//
// 주의: createMediaElementSource()를 호출한 순간
//       <audio>의 직접 출력이 끊긴다.
//       connect()로 destination까지 연결하지 않으면 무음이다.
// ──────────────────────────────────────────────────────────────────

export default function MediaElementSourceNodeExercise() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const ctxRef = useRef<AudioContext | null>(null);
    const gainRef = useRef<GainNode | null>(null);

    const [file, setFile] = useState<string | null>(null);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(1);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0];
        if (!f) return;

        handleStop();
        if (file) URL.revokeObjectURL(file);

        const url = URL.createObjectURL(f);
        setFile(url);

        // new Audio() 는 <audio> 태그와 동일한 HTMLAudioElement
        audioRef.current = new Audio(url);
    }

    async function handlePlay() {
        const audio = audioRef.current;
        if (!audio) return;

        // AudioContext는 한 번만 생성 — 이미 있으면 재사용
        if (!ctxRef.current) {
            const ctx = new AudioContext();
            ctxRef.current = ctx;

            // TODO 1: <audio>를 AudioNode 연결 구조의 소스로 감싸봐
            const source = ctx.createMediaElementSource(audio);

            // TODO 2: GainNode를 만들어봐 (볼륨 제어용)
            const gain = ctx.createGain();
            gainRef.current = gain;

            // TODO 3: source → gain → destination 순서로 연결해봐
            source.connect(gain);
            gain.connect(ctx.destination);
        }

        if (ctxRef.current.state === "suspended") {
            await ctxRef.current.resume();
        }

        audio.play();
        setPlaying(true);
    }

    function handleStop() {
        audioRef.current?.pause();
        setPlaying(false);
    }

    function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
        const v = Number(e.target.value);
        setVolume(v);

        // TODO 4: 슬라이더 움직일 때 gain 볼륨을 실시간으로 바꿔봐
        // gainRef.current가 있으면 gain.gain.value = v
        if (gainRef.current) {
            gainRef.current.gain.value = v;
        }
    }

    return (
        <div className="p-6 max-w-sm space-y-5 font-mono text-sm">
            <div className="font-sans space-y-1">
                <h2 className="text-lg font-semibold">
                    MediaElementSourceNode
                </h2>
                <p className="text-white/50 text-sm">
                    로컬 오디오 파일을 골라서 AudioNode 연결 구조를 통해
                    재생해봐.
                </p>
            </div>

            {/* 파일 선택 */}
            <label className="block cursor-pointer rounded border border-dashed border-white/20 p-3 text-center text-white/40 hover:border-white/40 hover:text-white/70 transition-colors">
                {file ? "파일 선택됨 ✓" : "오디오 파일 선택"}
                <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>

            {/* 볼륨 슬라이더 */}
            <div className="space-y-1">
                <span className="text-white/40 text-xs">
                    volume: {volume.toFixed(2)}
                </span>
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full accent-white"
                />
            </div>

            {/* 재생 버튼 */}
            <button
                onClick={playing ? handleStop : handlePlay}
                disabled={!file}
                className={[
                    "w-full rounded px-4 py-2 text-sm transition-colors",
                    !file
                        ? "bg-white/5 text-white/20 cursor-not-allowed"
                        : playing
                          ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                          : "bg-white/10 text-white hover:bg-white/20",
                ].join(" ")}
            >
                {playing ? "■ stop" : "▶ play"}
            </button>

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
                    <li>
                        createMediaElementSource(audio) — audio는
                        HTMLAudioElement
                    </li>
                    <li>감싼 순간 직접 출력이 끊기니까 connect() 필수</li>
                    <li>볼륨 슬라이더는 gain.gain.value 에 넘기면 돼</li>
                </ul>
            )}
        </div>
    );
}
