"use client";
import { ReactNode, useLayoutEffect, useRef, useState, useCallback } from "react";

interface Props {
    children: ReactNode;
    className?: string;
}

function debounce<T extends (...args: unknown[]) => void>(func: T, delay: number) {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}

export default function StickyBottom({ children, className = "" }: Props) {
    const containerRef = useRef<HTMLElement>(null);
    const [bottom, setBottom] = useState("0px");

    const updateBottomValue = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const containerHeight = container.getBoundingClientRect().height;
        const screenHeight = window.innerHeight;
        const calculatedBottom = Math.max(containerHeight - screenHeight, 0);
        const newBottom = `-${calculatedBottom}px`;

        // Avoid unnecessary re-renders
        if (newBottom !== bottom) setBottom(newBottom);
    }, [bottom]);

    useLayoutEffect(() => {
        if (typeof window === "undefined") return;

        const debouncedResize = debounce(updateBottomValue, 150);
        updateBottomValue();
        window.addEventListener("resize", debouncedResize);
        return () => window.removeEventListener("resize", debouncedResize);
    }, [updateBottomValue]);

    return (
        <section ref={containerRef} style={{ bottom }} className={"sticky z-0 " + className}>
            {children}
        </section>
    );
}
