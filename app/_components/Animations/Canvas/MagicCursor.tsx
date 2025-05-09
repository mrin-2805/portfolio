"use client";

import { useEffect, useRef } from "react";

interface Particle {
    size: number;
    position: { x: number; y: number };
    offset: { x: number; y: number };
    shift: { x: number; y: number };
    speed: number;
    targetSize: number;
    fillColor: string;
    orbit: number;
}

const MagicCursor = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        let SCREEN_WIDTH = window.innerWidth;
        let SCREEN_HEIGHT = window.innerHeight;
        const RADIUS = 70;
        let RADIUS_SCALE = 1;
        const RADIUS_SCALE_MIN = 1;
        const RADIUS_SCALE_MAX = 1.5;
        const QUANTITY = 25;

        let mouseX = SCREEN_WIDTH * 0.5;
        let mouseY = SCREEN_HEIGHT * 0.5;
        let mouseIsDown = false;

        let context: CanvasRenderingContext2D | null = null;
        let particles: Particle[] = [];

        const canvas = canvasRef.current;
        if (canvas) {
            context = canvas.getContext("2d");
        }

        function createParticles() {
            particles = [];
            for (let i = 0; i < QUANTITY; i++) {
                const particle = {
                    size: 1,
                    position: { x: mouseX, y: mouseY },
                    offset: { x: 0, y: 0 },
                    shift: { x: mouseX, y: mouseY },
                    speed: 0.01 + Math.random() * 0.04,
                    targetSize: 1,
                    // fillColor: "#" + ((Math.random() * 0x404040 + 0xaaaaaa) | 0).toString(16),
                    // fillColor:
                    //     "#" +
                    //     (
                    //         (1 << 24) +
                    //         (Math.floor(Math.random() * 156 + 100) << 16) + // Red: 100–255
                    //         (Math.floor(Math.random() * 156 + 100) << 8) + // Green: 100–255
                    //         Math.floor(Math.random() * 156 + 100) // Blue: 100–255
                    //     )
                    //         .toString(16)
                    //         .slice(1),
                    fillColor: "#" + (((1 << 24) + (Math.random() * 0xffffff * 0.5 + 0x808080)) | 0).toString(16).slice(1),
                    orbit: RADIUS * 0.5 + RADIUS * 0.5 * Math.random(),
                };
                particles.push(particle);
            }
        }

        function resizeCanvas() {
            SCREEN_WIDTH = window.innerWidth;
            SCREEN_HEIGHT = window.innerHeight;
            if (canvas) {
                canvas.width = SCREEN_WIDTH;
                canvas.height = SCREEN_HEIGHT;
                context = canvas.getContext("2d");
            }
        }

        function loop() {
            if (!context) return;

            if (mouseIsDown) {
                RADIUS_SCALE += (RADIUS_SCALE_MAX - RADIUS_SCALE) * 0.02;
            } else {
                RADIUS_SCALE -= (RADIUS_SCALE - RADIUS_SCALE_MIN) * 0.02;
            }

            RADIUS_SCALE = Math.min(RADIUS_SCALE, RADIUS_SCALE_MAX);

            context.fillStyle = "rgba(245, 228, 231, 0.05)";
            context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

            for (let i = 0, len = particles.length; i < len; i++) {
                const particle = particles[i];
                const lp = { x: particle.position.x, y: particle.position.y };

                particle.offset.x += particle.speed;
                particle.offset.y += particle.speed;

                particle.shift.x += (mouseX - particle.shift.x) * particle.speed;
                particle.shift.y += (mouseY - particle.shift.y) * particle.speed;

                particle.position.x = particle.shift.x + Math.cos(i + particle.offset.x) * (particle.orbit * RADIUS_SCALE);
                particle.position.y = particle.shift.y + Math.sin(i + particle.offset.y) * (particle.orbit * RADIUS_SCALE);

                particle.position.x = Math.max(Math.min(particle.position.x, SCREEN_WIDTH), 0);
                particle.position.y = Math.max(Math.min(particle.position.y, SCREEN_HEIGHT), 0);

                particle.size += (particle.targetSize - particle.size) * 0.05;
                if (Math.round(particle.size) === Math.round(particle.targetSize)) {
                    particle.targetSize = 1 + Math.random() * 7;
                }

                context.beginPath();
                context.fillStyle = particle.fillColor;
                context.strokeStyle = particle.fillColor;
                context.lineWidth = particle.size;
                context.moveTo(lp.x, lp.y);
                context.lineTo(particle.position.x, particle.position.y);
                context.stroke();
                context.arc(particle.position.x, particle.position.y, particle.size / 2, 0, Math.PI * 2);
                context.fill();
            }
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length === 1) {
                e.preventDefault();
                mouseX = e.touches[0].pageX;
                mouseY = e.touches[0].pageY;
            }
        };

        createParticles();
        resizeCanvas();

        const interval = setInterval(loop, 1000 / 60);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", () => (mouseIsDown = true));
        window.addEventListener("mouseup", () => (mouseIsDown = false));
        window.addEventListener("resize", resizeCanvas);
        document.addEventListener("touchstart", handleTouchMove, { passive: false });
        document.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            clearInterval(interval);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", () => (mouseIsDown = true));
            window.removeEventListener("mouseup", () => (mouseIsDown = false));
            window.removeEventListener("resize", resizeCanvas);
            document.removeEventListener("touchstart", handleTouchMove);
            document.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    return <canvas ref={canvasRef} id="world" className="absolute inset-0" />;
};

export default MagicCursor;
