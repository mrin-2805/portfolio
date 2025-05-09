"use client";
import React, { useEffect, useRef, useState } from "react";

interface Cell {
    x: number;
    y: number;
    r: number;
    col: number;
    row: number;
    xv: number;
    yv: number;
    pressure: number;
    up: Cell;
    down: Cell;
    left: Cell;
    right: Cell;
    up_left: Cell;
    up_right: Cell;
    down_left: Cell;
    down_right: Cell;
}

interface Particle {
    x: number;
    y: number;
    px: number;
    py: number;
    xv: number;
    yv: number;
}

interface MouseState {
    x: number;
    y: number;
    px: number;
    py: number;
    down: boolean;
}

const FluidSimulation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>(0);
    const [dimensions, setDimensions] = useState({ width: 500, height: 500 });

    // Configuration
    const resolution = 10;
    const penSize = 40;
    const speckCount = 5000;
    const [numCols, setNumCols] = useState(Math.floor(dimensions.width / resolution));
    const [numRows, setNumRows] = useState(Math.floor(dimensions.height / resolution));

    const mouseRef = useRef<MouseState>({
        x: 0,
        y: 0,
        px: 0,
        py: 0,
        down: false,
    });

    const particlesRef = useRef<Particle[]>([]);
    const vecCellsRef = useRef<Cell[][]>([]);

    // Handle resize
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const { clientWidth, clientHeight } = containerRef.current;
                setDimensions({ width: clientWidth, height: clientHeight });
                setNumCols(Math.floor(clientWidth / resolution));
                setNumRows(Math.floor(clientHeight / resolution));
            }
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    // Initialize simulation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas dimensions
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        // Initialize empty grid
        const vecCells: Cell[][] = Array(numCols);
        for (let col = 0; col < numCols; col++) {
            vecCells[col] = Array(numRows);
        }

        // Create all cells first
        for (let col = 0; col < numCols; col++) {
            for (let row = 0; row < numRows; row++) {
                vecCells[col][row] = {
                    x: col * resolution,
                    y: row * resolution,
                    r: resolution,
                    col,
                    row,
                    xv: 0,
                    yv: 0,
                    pressure: 0,
                } as unknown as Cell; // Temporary type assertion
            }
        }

        // Connect neighbors
        for (let col = 0; col < numCols; col++) {
            for (let row = 0; row < numRows; row++) {
                const rowUp = row - 1 >= 0 ? row - 1 : numRows - 1;
                const rowDown = row + 1 < numRows ? row + 1 : 0;
                const colLeft = col - 1 >= 0 ? col - 1 : numCols - 1;
                const colRight = col + 1 < numCols ? col + 1 : 0;

                const cell = vecCells[col][row];
                cell.up = vecCells[col][rowUp];
                cell.down = vecCells[col][rowDown];
                cell.left = vecCells[colLeft][row];
                cell.right = vecCells[colRight][row];
                cell.up_left = vecCells[colLeft][rowUp];
                cell.up_right = vecCells[colRight][rowUp];
                cell.down_left = vecCells[colLeft][rowDown];
                cell.down_right = vecCells[colRight][rowDown];
            }
        }

        vecCellsRef.current = vecCells;

        // Initialize particles
        particlesRef.current = Array.from({ length: speckCount }, () => ({
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            px: 0,
            py: 0,
            xv: 0,
            yv: 0,
        }));

        // Event handlers
        const handleMouseDown = (e: MouseEvent) => {
            e.preventDefault();
            mouseRef.current.down = true;
        };

        const handleTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = mouseRef.current.px = e.touches[0].clientX - rect.left;
            mouseRef.current.y = mouseRef.current.py = e.touches[0].clientY - rect.top;
            mouseRef.current.down = true;
        };

        const handleMouseUp = () => {
            mouseRef.current.down = false;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (!e.touches) mouseRef.current.down = false;
        };

        const handleMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.px = mouseRef.current.x;
            mouseRef.current.py = mouseRef.current.y;
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.px = mouseRef.current.x;
            mouseRef.current.py = mouseRef.current.y;
            mouseRef.current.x = e.touches[0].clientX - rect.left;
            mouseRef.current.y = e.touches[0].clientY - rect.top;
        };

        // Add event listeners
        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("touchend", handleTouchEnd);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("touchmove", handleTouchMove);

        // Animation loop
        const animate = () => {
            const mouse = mouseRef.current;
            const vecCells = vecCellsRef.current;
            const particles = particlesRef.current;

            // Calculate mouse velocity
            const mouseXV = mouse.x - mouse.px;
            const mouseYV = mouse.y - mouse.py;

            // Update cells
            for (let col = 0; col < numCols; col++) {
                for (let row = 0; row < numRows; row++) {
                    const cell = vecCells[col][row];

                    if (mouse.down) {
                        const dx = cell.x - mouse.x;
                        const dy = cell.y - mouse.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < penSize) {
                            const power = penSize / (dist < 4 ? penSize : dist);
                            cell.xv += mouseXV * power;
                            cell.yv += mouseYV * power;
                        }
                    }

                    // Update pressure
                    const pressureX = cell.up_left.xv * 0.5 + cell.left.xv + cell.down_left.xv * 0.5 - cell.up_right.xv * 0.5 - cell.right.xv - cell.down_right.xv * 0.5;

                    const pressureY = cell.up_left.yv * 0.5 + cell.up.yv + cell.up_right.yv * 0.5 - cell.down_left.yv * 0.5 - cell.down.yv - cell.down_right.yv * 0.5;

                    cell.pressure = (pressureX + pressureY) * 0.25;
                }
            }

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // ctx.strokeStyle = "var(--color-foreground)";
            ctx.strokeStyle = "#00FFFF";

            // Update and draw particles
            for (const p of particles) {
                if (p.x >= 0 && p.x < dimensions.width && p.y >= 0 && p.y < dimensions.height) {
                    const col = Math.floor(p.x / resolution);
                    const row = Math.floor(p.y / resolution);

                    if (col >= 0 && col < numCols && row >= 0 && row < numRows) {
                        const cell = vecCells[col][row];

                        const ax = (p.x % resolution) / resolution;
                        const ay = (p.y % resolution) / resolution;

                        p.xv += (1 - ax) * cell.xv * 0.05;
                        p.yv += (1 - ay) * cell.yv * 0.05;
                        p.xv += ax * cell.right.xv * 0.05;
                        p.yv += ax * cell.right.yv * 0.05;
                        p.xv += ay * cell.down.xv * 0.05;
                        p.yv += ay * cell.down.yv * 0.05;

                        p.x += p.xv;
                        p.y += p.yv;

                        const dx = p.px - p.x;
                        const dy = p.py - p.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const limit = Math.random() * 0.5;

                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(dist > limit ? p.px : p.x + limit, dist > limit ? p.py : p.y + limit);
                        ctx.stroke();

                        p.px = p.x;
                        p.py = p.y;
                    }
                } else {
                    p.x = p.px = Math.random() * dimensions.width;
                    p.y = p.py = Math.random() * dimensions.height;
                    p.xv = p.yv = 0;
                }

                p.xv *= 0.5;
                p.yv *= 0.5;
            }

            // Update velocities
            for (let col = 0; col < numCols; col++) {
                for (let row = 0; row < numRows; row++) {
                    const cell = vecCells[col][row];

                    cell.xv += (cell.up_left.pressure * 0.5 + cell.left.pressure + cell.down_left.pressure * 0.5 - cell.up_right.pressure * 0.5 - cell.right.pressure - cell.down_right.pressure * 0.5) * 0.25;

                    cell.yv += (cell.up_left.pressure * 0.5 + cell.up.pressure + cell.up_right.pressure * 0.5 - cell.down_left.pressure * 0.5 - cell.down.pressure - cell.down_right.pressure * 0.5) * 0.25;

                    cell.xv *= 0.99;
                    cell.yv *= 0.99;
                }
            }

            mouse.px = mouse.x;
            mouse.py = mouse.y;

            requestRef.current = requestAnimationFrame(animate);
        };

        // Start animation
        requestRef.current = requestAnimationFrame(animate);

        // Cleanup
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchend", handleTouchEnd);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("touchmove", handleTouchMove);
        };
    }, [dimensions, numCols, numRows]);

    return (
        <div ref={containerRef} className="absolute inset-0 bg-black">
            <canvas
                ref={canvasRef}
                width={dimensions.width}
                height={dimensions.height}
                style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                }}
            />
        </div>
    );
};

export default FluidSimulation;
