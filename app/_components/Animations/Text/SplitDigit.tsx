import { CSSProperties } from "react";

interface Props {
    countNumber: number;
    fontSize: number;
}

export default function SplitDigit({ countNumber, fontSize }: Props) {
    const numbers = countNumber.toString().split("");

    return (
        <div style={{ "--fontSize": `${fontSize}px` } as CSSProperties} className="relative flex items-center overflow-hidden">
            {numbers.map((value, index) => (
                <div key={index} style={{ "--value": value } as CSSProperties} className="digitWrap">
                    <div className="allDigits">
                        <div className="digit">0</div>
                        <div className="digit">1</div>
                        <div className="digit">2</div>
                        <div className="digit">3</div>
                        <div className="digit">4</div>
                        <div className="digit">5</div>
                        <div className="digit">6</div>
                        <div className="digit">7</div>
                        <div className="digit">8</div>
                        <div className="digit">9</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
