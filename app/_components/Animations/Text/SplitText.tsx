import { CSSProperties } from "react";

interface Props {
    text: string;
    staggerDuration?: number;
}

export default function SplitText({ text, staggerDuration = 0.1 }: Props) {
    const words: string[][] = text.split(" ").map((word) => word.split(""));
    let letterIdx = 0;

    return (
        <span aria-label={text} className="splitText">
            {words.map((word, i) => {
                const wordDelay = letterIdx * staggerDuration;

                return (
                    <span aria-hidden="true" className="splitWord" key={`${text}-word-${i}`}>
                        {word.map((letter, j) => {
                            const letterDelay = wordDelay + j * staggerDuration;
                            letterIdx = letterIdx + 1;
                            return (
                                <span style={{ "--delay": letterDelay.toFixed(2) + "s" } as CSSProperties} className="splitLetter" key={`${text}-letter-${i}-${j}-${letter}`}>
                                    {letter}
                                </span>
                            );
                        })}
                        {i + 1 < words.length && <span>&nbsp;</span>}
                    </span>
                );
            })}
        </span>
    );
}
