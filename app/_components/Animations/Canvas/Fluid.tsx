"use client";
import { useEffect } from "react";

export default function Fluid() {
    useEffect(() => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const context = canvas.getContext("2d");

        if (!canvas || !context) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const cols = Math.floor(canvas.width / 20) + 1;
        const ypos = Array(cols).fill(0);

        const matrix = () => {
            context.fillStyle = "rgba(0, 0, 0, 0.05)";
            context.fillRect(0, 0, canvas.width, canvas.height);

            context.fillStyle = "#0f0";
            context.font = "15pt monospace";

            ypos.forEach((y, ind) => {
                const text = String.fromCharCode(Math.random() * 128);
                const x = ind * 20;
                context.fillText(text, x, y);

                if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
                else ypos[ind] = y + 20;
            });
        };

        const interval = setInterval(matrix, 50);

        return () => clearInterval(interval);
    }, []);

    return <canvas id="canvas" className="absolute inset-0 z-10" />;
}
