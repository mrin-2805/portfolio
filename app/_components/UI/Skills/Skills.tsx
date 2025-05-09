"use client";
import { useLayoutEffect, useRef, useState, useCallback } from "react";
import SkillsContent from "./SkillsContent";
import { websiteContent } from "@/app/WebsiteContent";

function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number) {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

function updateSkillBgPosition(skillBgElement: HTMLDivElement, contentBlock: HTMLDivElement, parentRect: DOMRect, imgBg: string) {
    const contentRect = contentBlock.getBoundingClientRect();
    Object.assign(skillBgElement.style, {
        top: `${contentRect.top - parentRect.top}px`,
        left: `${contentRect.left - parentRect.left}px`,
        width: `${contentRect.width}px`,
        height: `${contentRect.height}px`,
        backgroundColor: imgBg,
    });
}

const skillsContent = websiteContent.skills;

export default function Skills() {
    const skillBgRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState<string>("");

    const resetBg = useCallback(() => {
        setActive("");
        if (skillBgRef.current) {
            skillBgRef.current.style.backgroundColor = "transparent";
        }
    }, []);

    useLayoutEffect(() => {
        const handleResize = debounce(resetBg, 200);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [resetBg]);

    const handleMouseEnter = (evt: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, skill: string) => {
        if (skill === active) return;
        setActive(skill);

        const wrap = evt.currentTarget as HTMLDivElement;
        const contentBlock = wrap.querySelector<HTMLDivElement>(".contentBlock");
        const imgBg = wrap.dataset.imagebg;

        if (skillBgRef.current && contentBlock && imgBg) {
            const parentRect = skillBgRef.current.offsetParent?.getBoundingClientRect();
            if (parentRect) {
                updateSkillBgPosition(skillBgRef.current, contentBlock, parentRect, imgBg);
            }
        }
    };

    if (!skillsContent?.length) return null;

    return (
        <>
            <div ref={skillBgRef} id="skillBg" className="pointer-events-none absolute top-0 left-0 transition-[color,background-color,top,left] duration-300" />
            {skillsContent.map((skill, index) => (
                <div
                    key={skill.title}
                    onMouseEnter={(e) => handleMouseEnter(e, skill.title)}
                    onTouchStart={(e) => handleMouseEnter(e, skill.title)}
                    data-imagebg={skill.imageBg}
                    className={`skillBlockWrap relative z-1 flex w-full flex-col overflow-hidden ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} ${index > 0 && "max-md:mt-5"} ${active === skill.title && "active"}`}>
                    <SkillsContent index={index} {...skill} />
                </div>
            ))}
        </>
    );
}
