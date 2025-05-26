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

    useEffect(() => {
        const duration = getTextDuration(roles[currentIndex]);

        const timeout = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length);
        }, duration);

        return () => clearTimeout(timeout);
    }, [currentIndex]);

    const handleBulletClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="roles-wrap relative text-center">
            <div className="bg-foreground text-background inline-block rounded p-2">
                <h2>
                    <SplitText staggerDuration={0.08} text={roles[currentIndex]} />
                </h2>
            </div>

            <div className="absolute -bottom-5 flex w-full flex-wrap justify-center gap-2">
                {roles.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleBulletClick(index)}
                        className={`h-2 w-2 rounded-full transition-opacity duration-300 ${currentIndex === index ? "bg-foreground scale-125" : "bg-foreground opacity-50"}`}
                        aria-label={`Switch to role ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
