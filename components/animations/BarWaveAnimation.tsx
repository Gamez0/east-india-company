"use client";

import { motion } from "framer-motion";

export default function BarWaveAnimation() {
    const bars = [0, 1, 2];
    return (
        <div
            className="flex items-center gap-0.5 text-slate-400"
            aria-hidden="true"
        >
            {bars.map((i) => (
                <motion.span
                    key={i}
                    className="w-0.5 h-1 rounded bg-current"
                    initial={{ scaleY: 0.6, opacity: 0.6 }}
                    animate={{ scaleY: 3, opacity: 1 }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 0.6,
                        ease: "easeInOut",
                        delay: i * 0.15,
                    }}
                    style={{ transformOrigin: "50% 50%" }}
                />
            ))}
        </div>
    );
}
