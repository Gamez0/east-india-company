"use client";

import { useEffect, useState, useCallback } from "react";
import Intro1 from "./slides/Intro1";
import Intro2 from "./slides/Intro2";
import Intro3 from "./slides/Intro3";
import Q1_1 from "./slides/Q1_1";
import Q1_2 from "./slides/Q1_2";
import Q1_3 from "./slides/Q1_3";
import Q1_4 from "./slides/Q1_4";

const slides = [
    <Intro1 key="intro1" />,
    <Intro2 key="intro2" />,
    <Intro3 key="intro3" />,
    <Q1_1 key="q1_1" />,
    <Q1_2 key="q1_2" />,
    <Q1_3 key="q1_3" />,
    <Q1_4 key="q1_4" />,
];

export default function Presentation() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const goNext = useCallback(() => {
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
    }, []);

    const goPrev = useCallback(() => {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
    }, []);

    useEffect(() => {
        const toggleFullscreen = () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === " ") {
                e.preventDefault();
                goNext();
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                goPrev();
            } else if (e.key === "f" || e.key === "F") {
                toggleFullscreen();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [goNext, goPrev]);

    return (
        <div className="w-screen h-screen relative bg-canvas overflow-hidden">
            <div className="w-full h-full flex items-center justify-center p-16">
                <div className="w-full h-full max-w-7xl">
                    {slides[currentSlide]}
                </div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 text-fg-subtle text-sm font-mono">
                <span>{String(currentSlide + 1).padStart(2, "0")}</span>
                <div className="w-32 h-px bg-line relative">
                    <div
                        className="absolute top-0 left-0 h-full bg-accent transition-all duration-300"
                        style={{
                            width: `${((currentSlide + 1) / slides.length) * 100}%`,
                        }}
                    />
                </div>
                <span>{String(slides.length).padStart(2, "0")}</span>
            </div>

            <div className="absolute bottom-6 right-6 text-fg-subtle text-xs font-mono">
                ← → space · F
            </div>
        </div>
    );
}
