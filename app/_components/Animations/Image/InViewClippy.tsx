"use client";

import { useRef, ReactNode, useState, useEffect, CSSProperties } from "react";

interface Props {
    children: ReactNode;
    className?: string;
    direction?: "top" | "bottom" | "left" | "right";
    index: number;
}

export default function InViewClippy({ children, className = "", index = 0, direction = "left" }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkVisibility = () => {
            const element = containerRef.current;
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const triggerPoint = window.innerHeight * 0.6;
            const isInView = rect.top < triggerPoint && rect.bottom > 0;

            if (isInView) {
                setIsVisible(true);
                window.removeEventListener("scroll", checkVisibility);
                window.removeEventListener("resize", checkVisibility);
            }
        };

        checkVisibility(); // Initial check
        window.addEventListener("scroll", checkVisibility);
        window.addEventListener("resize", checkVisibility);

        return () => {
            window.removeEventListener("scroll", checkVisibility);
            window.removeEventListener("resize", checkVisibility);
        };
    }, []);

    const hiddenClipPaths = {
        top: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        bottom: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
        left: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        right: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
    };

    const clipPath = isVisible ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" : hiddenClipPaths[direction || "bottom"];
    const transform = isVisible ? "scale(1)" : "scale(1.7)";

    const style: CSSProperties = {
        clipPath,
        transform,
        WebkitClipPath: clipPath,
        willChange: "clip-path,transform",
        transition: "clip-path 1s ease-in-out, transform 1s ease-in-out",
    };

    return (
        <div ref={containerRef} style={style} className={`${className} ${index === 0 ? "delay-500" : ""}`}>
            {children}
        </div>
    );
}
