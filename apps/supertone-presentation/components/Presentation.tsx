"use client";

import { useEffect, useState, useCallback } from "react";
import Intro1 from "./slides/Intro/Intro1";
import Intro2 from "./slides/Intro/Intro2";
import Intro3 from "./slides/Intro/Intro3";
import Q1_1 from "./slides/Q1/Q1_1";
import Q1_2 from "./slides/Q1/Q1_2";
import Q1_3 from "./slides/Q1/Q1_3";
import Q1_4 from "./slides/Q1/Q1_4";
import Q2_1 from "./slides/Q2/Q2_1";
import Q2_2 from "./slides/Q2/Q2_2";
import Q2_3 from "./slides/Q2/Q2_3";
import Q2_4 from "./slides/Q2/Q2_4";
import Q2_5 from "./slides/Q2/Q2_5";
import Q2_6 from "./slides/Q2/Q2_6";
import Q2_7 from "./slides/Q2/Q2_7";
import Q3_1 from "./slides/Q3/Q3_1";
import Q3_2 from "./slides/Q3/Q3_2";
import Q3_3 from "./slides/Q3/Q3_3";
import Q3_4 from "./slides/Q3/Q3_4";
import Q3_5 from "./slides/Q3/Q3_5";
import Q3_6 from "./slides/Q3/Q3_6";
import Q4_1 from "./slides/Q4/Q4_1";
import Q4_2 from "./slides/Q4/Q4_2";
import Q4_3 from "./slides/Q4/Q4_3";
import Q4_4 from "./slides/Q4/Q4_4";
import Q4_5 from "./slides/Q4/Q4_5";
import Q5_1 from "./slides/Q5/Q5_1";
import Q5_2 from "./slides/Q5/Q5_2";
import Q5_3 from "./slides/Q5/Q5_3";
import Outro from "./slides/Outro/Outro";
import Index from "./slides/Intro/Index";

const slides = [
    <Intro1 key="intro1" />,
    <Intro2 key="intro2" />,
    <Intro3 key="intro3" />,
    <Index key="index" />,
    <Q1_1 key="q1_1" />,
    <Q1_2 key="q1_2" />,
    <Q1_3 key="q1_3" />,
    <Q1_4 key="q1_4" />,
    <Q2_1 key="q2_1" />,
    <Q2_2 key="q2_2" />,
    <Q2_3 key="q2_3" />,
    <Q2_4 key="q2_4" />,
    <Q2_5 key="q2_5" />,
    <Q2_6 key="q2_6" />,
    <Q2_7 key="q2_7" />,
    <Q3_1 key="q3_1" />,
    <Q3_2 key="q3_2" />,
    <Q3_3 key="q3_3" />,
    <Q3_4 key="q3_4" />,
    <Q3_5 key="q3_5" />,
    <Q3_6 key="q3_6" />,
    <Q4_1 key="q4_1" />,
    <Q4_2 key="q4_2" />,
    <Q4_3 key="q4_3" />,
    <Q4_4 key="q4_4" />,
    <Q4_5 key="q4_5" />,
    <Q5_1 key="q5_1" />,
    <Q5_2 key="q5_2" />,
    <Q5_3 key="q5_3" />,
    <Outro key="outro" />,
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
