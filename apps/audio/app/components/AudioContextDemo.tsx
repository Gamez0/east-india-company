"use client";

import { useEffect, useRef, useState } from "react";

type ContextState = "suspended" | "running" | "closed" | "none";

export default function AudioContextDemo() {
  // AudioContext는 앱 전체에서 하나만 유지
  const ctxRef = useRef<AudioContext | null>(null);

  const [state, setState] = useState<ContextState>("none");
  const [currentTime, setCurrentTime] = useState(0);
  const [sampleRate, setSampleRate] = useState(0);
  const timerRef = useRef<number | null>(null);

  // currentTime은 ctx가 running일 때만 증가 — 시각적으로 확인용
  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      if (ctxRef.current) {
        setCurrentTime(ctxRef.current.currentTime);
        setState(ctxRef.current.state as ContextState);
      }
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function handleCreate() {
    if (ctxRef.current) return;

    // new AudioContext() — 브라우저 autoplay 정책으로 인해 suspended 상태로 시작될 수 있음
    ctxRef.current = new AudioContext();
    setSampleRate(ctxRef.current.sampleRate);
    setState(ctxRef.current.state as ContextState);
  }

  async function handleResume() {
    if (!ctxRef.current) return;
    // 사용자 인터랙션(버튼 클릭) 안에서 resume → autoplay 정책 통과
    await ctxRef.current.resume();
    setState(ctxRef.current.state as ContextState);
  }

  async function handleSuspend() {
    if (!ctxRef.current) return;
    // suspend: 오디오 처리 일시정지, CPU 절약 (백그라운드 탭 전환 시 활용)
    await ctxRef.current.suspend();
    setState(ctxRef.current.state as ContextState);
  }

  async function handleClose() {
    if (!ctxRef.current) return;
    // close: 완전 종료 — 이후 resume/suspend 불가, 새 ctx를 만들어야 함
    await ctxRef.current.close();
    setState(ctxRef.current.state as ContextState);
  }

  function handleReset() {
    ctxRef.current = null;
    setState("none");
    setCurrentTime(0);
    setSampleRate(0);
  }

  const stateColor: Record<ContextState, string> = {
    none: "text-gray-400",
    running: "text-green-400",
    suspended: "text-yellow-400",
    closed: "text-red-400",
  };

  return (
    <div className="p-6 max-w-md space-y-6 font-mono text-sm">
      <h2 className="text-lg font-semibold font-sans">AudioContext 생명주기</h2>

      {/* 상태 패널 */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-white/50">state</span>
          <span className={stateColor[state]}>{state}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/50">currentTime</span>
          {/* currentTime은 running일 때만 증가 — suspended면 멈춤 */}
          <span className="text-white">{currentTime.toFixed(3)}s</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/50">sampleRate</span>
          <span className="text-white">{sampleRate ? `${sampleRate} Hz` : "—"}</span>
        </div>
      </div>

      {/* 컨트롤 */}
      <div className="space-y-2">
        <Button onClick={handleCreate} disabled={state !== "none"}>
          new AudioContext()
        </Button>
        <Button
          onClick={handleResume}
          disabled={state !== "suspended"}
          highlight
        >
          ctx.resume() — autoplay 정책 통과
        </Button>
        <Button onClick={handleSuspend} disabled={state !== "running"}>
          ctx.suspend() — CPU 절약
        </Button>
        <Button onClick={handleClose} disabled={state === "none" || state === "closed"}>
          ctx.close() — 완전 종료
        </Button>
        <Button onClick={handleReset} disabled={state !== "closed"}>
          reset (새 ctx 준비)
        </Button>
      </div>

      {/* 힌트 */}
      <p className="text-white/40 text-xs leading-relaxed">
        생성 직후 state를 확인해봐. 브라우저 autoplay 정책에 따라
        suspended로 시작될 수 있어. currentTime은 running일 때만 증가한다.
      </p>
    </div>
  );
}

function Button({
  children,
  onClick,
  disabled,
  highlight,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  highlight?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        "w-full rounded px-3 py-2 text-left transition-colors",
        highlight
          ? "bg-green-500/20 text-green-300 hover:bg-green-500/30"
          : "bg-white/5 text-white/80 hover:bg-white/10",
        disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
