"use client";

import { useRef, useState, useEffect, MouseEvent, TouchEvent } from "react";

export default function RainManComplete() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [skew, setSkew] = useState(0);
    const [translateX, setTranslateX] = useState(0); // 시점 이동 상태 추가

    // 1. 드래그 시작 시점의 정보를 저장할 Ref들
    const startXRef = useRef(0); // 클릭한 순간의 마우스 X
    const baseSkewRef = useRef(0); // 클릭한 순간의 기존 skew
    const baseTranslateRef = useRef(0); // 클릭한 순간의 기존 translateX

    // 1. 입자 데이터 (기존과 동일)
    const [drops] = useState(() =>
        Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 120 - 10}%`, // 시점 이동을 대비해 양옆 여백을 둡니다.
            duration: `${6 + Math.random() * 12}s`,
            delay: `-${Math.random() * 5}s`,
            size: 64 + Math.random() * 32,
        })),
    );

    // 3. 드래그 중 (Update)
    const updateInteraction = (clientX: number) => {
        if (!isDragging) return;

        // 클릭한 지점으로부터 마우스가 이동한 거리(px)
        const deltaX = clientX - startXRef.current;

        // 이동 거리를 화면 너비 대비 비율로 환산 (민감도 조절 가능)
        const sensitivity = 0.5; // 너무 휙휙 돌아가지 않게 조절
        const moveRatio = (deltaX / window.innerWidth) * sensitivity;

        // 이전 값(base)에 새로 이동한 만큼을 더해줍니다.
        setSkew(baseSkewRef.current + moveRatio * 45);
        setTranslateX(baseTranslateRef.current + moveRatio * 240);
    };

    // 2. 드래그 시작 (MouseDown / TouchStart)
    const handleStart = (e: MouseEvent | TouchEvent) => {
        setIsDragging(true);
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;

        // 현재 마우스 위치와, 지금까지 변형된 값들을 저장해둡니다.
        startXRef.current = clientX;
        baseSkewRef.current = skew;
        baseTranslateRef.current = translateX;
    };
    const handleEnd = () => {
        setIsDragging(false);
        setSkew(0);
        // setTranslateX(0); // 놓으면 위치도 제자리로
    };

    useEffect(() => {
        const handleGlobalMove = (
            e: globalThis.MouseEvent | globalThis.TouchEvent,
        ) => {
            if (!isDragging) return;
            const clientX =
                "touches" in e
                    ? e.touches[0].clientX
                    : (e as globalThis.MouseEvent).clientX;
            updateInteraction(clientX);
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleGlobalMove);
            window.addEventListener("touchmove", handleGlobalMove, {
                passive: false,
            });
            window.addEventListener("mouseup", handleEnd);
            window.addEventListener("touchend", handleEnd);
        }
        return () => {
            window.removeEventListener("mousemove", handleGlobalMove);
            window.removeEventListener("touchmove", handleGlobalMove);
            window.removeEventListener("mouseup", handleEnd);
            window.removeEventListener("touchend", handleEnd);
        };
    }, [isDragging]);

    return (
        <div
            ref={containerRef}
            onMouseDown={handleStart}
            onTouchStart={handleStart}
            className="relative h-screen w-full bg-zinc-950 overflow-hidden touch-none select-none flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
            {/* 배경 텍스트: 비보다 더 많이 움직이게(Parallax) 하면 더 깊어 보입니다 */}
            <h1
                className="text-zinc-900 text-[18vw] font-black pointer-events-none uppercase italic"
                style={{
                    transform: `translateX(${translateX}px)`,
                    // 핵심: 드래그 중엔 즉각 반응(0s), 놓으면 부드럽게 복귀(2.5s)
                    transition: isDragging
                        ? "transform 0.1s ease-out"
                        : "transform 20s cubic-bezier(0.19, 1, 0.22, 1)",
                    willChange: "transform", // 성능 최적화를 위해 추가
                }}
            >
                Rain Man
            </h1>

            {/* 2. 비 레이어: 전체가 옆으로 슬라이드 됨 */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    transform: `translateX(${translateX}px)`,
                    // 핵심: 드래그 중엔 즉각 반응(0s), 놓으면 부드럽게 복귀(2.5s)
                    transition: isDragging
                        ? "transform 0.1s ease-out"
                        : "transform 20s cubic-bezier(0.19, 1, 0.22, 1)",
                    willChange: "transform", // 성능 최적화를 위해 추가
                }}
            >
                {drops.map((drop) => (
                    <div
                        key={drop.id}
                        className="absolute animate-fall"
                        style={{
                            left: drop.left,
                            animationDuration: drop.duration,
                            animationDelay: drop.delay,
                        }}
                    >
                        <img
                            src="/canvas/rain.png"
                            alt="rain"
                            style={{
                                width: drop.size,
                                height: "auto",
                                // 이미지 자체만 기울임
                                transform: `skewX(${skew}deg) scaleY(${1 + Math.abs(skew) / 400})`,
                                transition: isDragging
                                    ? "transform 0.1s ease-out"
                                    : "transform 2.5s cubic-bezier(0.19, 1, 0.22, 1)",
                            }}
                        />
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes fall {
                    0% {
                        transform: translateY(-20vh);
                    }
                    100% {
                        transform: translateY(110vh);
                    }
                }
                .animate-fall {
                    animation: fall linear infinite;
                }
            `}</style>
        </div>
    );
}
