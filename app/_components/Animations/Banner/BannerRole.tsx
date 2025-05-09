"use client";

import { useEffect, useState } from "react";
import SplitText from "../Text/SplitText";
import { websiteContent } from "@/app/WebsiteContent";

const roles = websiteContent.roles;

function getTextDuration(text: string, delayPerLetter = 100): number {
    const letterCount = text.replace(/\s/g, "").length;
    return letterCount * delayPerLetter + 500;
}

export default function BannerRole() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentRole, setCurrentRole] = useState<string>(roles[0]);

    useEffect(() => {
        const duration = getTextDuration(currentRole);

        const timeout = setTimeout(() => {
            const nextIndex = (currentIndex + 1) % roles.length;
            setCurrentIndex(nextIndex);
            setCurrentRole(roles[nextIndex]);
        }, duration);

        return () => clearTimeout(timeout);
    }, [currentIndex, currentRole]);

    return (
        <h1>
            <SplitText staggerDuration={0.08} text={currentRole} />
        </h1>
    );
}
