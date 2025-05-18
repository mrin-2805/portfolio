"use client";

import { useEffect } from "react";

function debounce<T extends (...args: unknown[]) => void>(func: T, delay: number) {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}

const updateClassList = () => {
    if (window.scrollY > 350) {
        document.body.classList.add("scrolled");
    } else {
        document.body.classList.remove("scrolled");
    }
};

const debouncedUpdateClassList = debounce(updateClassList, 200);

const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

    document.body.style.setProperty("--scrollPercentage", scrollPercentage.toFixed(2) + "%");

    debouncedUpdateClassList();
};

export default function ClientJS() {
    useEffect(() => {
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return null;
}
