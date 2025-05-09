import Image from "next/image";
import { CSSProperties, memo } from "react";

import { ISkill } from "@/app/_lib/definations/content-definations";
import SplitDigit from "../../Animations/Text/SplitDigit";

interface Props extends ISkill {
    index: number;
}

const SkillsContent = memo(function SkillsContent({ index, title, image, level, imageText }: Props) {
    return (
        <>
            <div className="skillBlock contentBlock w-full transition-colors duration-300" style={{ "--imageText": imageText } as CSSProperties}>
                <div className="border-foreground flex min-h-80 flex-col justify-between border p-4">
                    <p>{index + 1 < 10 ? "0" + (index + 1) : index + 1}</p>
                    <div className="flex items-center justify-center">
                        <div className="imgWrapper skillImg">
                            <Image width={150} height={150} src={image} alt={title} />
                        </div>
                    </div>
                    <h3 className="text-3xl">{title}</h3>
                </div>
            </div>
            <div className="secondBlock relative flex min-h-80 w-full items-center justify-center" style={{ "--skillLevel": `${307.919 - (307.919 * level) / 100}` } as CSSProperties}>
                <div className="numberBlock flex p-4">
                    <SplitDigit countNumber={level} fontSize={50} />%
                </div>
                <div className="iconBlock absolute inset-8">
                    <svg fill="transparent" width="40" height="40" viewBox="-1 -1 102 102">
                        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"></path>
                    </svg>
                </div>
            </div>
        </>
    );
});

export default SkillsContent;
