"use client";

import React, { useEffect, useState, useCallback } from "react";

type LeaderLineData = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    // Removing unused midX/midY, we will calculate path in the SVG.
};

type AnnotationLinesProps = {
    deadsecRef: React.RefObject<HTMLDivElement | null>;
    dunkRef: React.RefObject<HTMLDivElement | null>;
    fadeIn: boolean;
};

export function AnnotationLines({ deadsecRef, dunkRef, fadeIn }: AnnotationLinesProps) {
    const [leaderLines, setLeaderLines] = useState<{
        deadsec: LeaderLineData | null;
        dunk: LeaderLineData | null;
    }>({ deadsec: null, dunk: null });

    const updateLeaderLines = useCallback(() => {
        if (!deadsecRef.current || !dunkRef.current) return;
        
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        
        // Endpoints aligned to laptop model (centered, ~35–65% width)
        // Deadsec → left edge of screen (upper portion)
        const laptopScreenLeft = { x: vw * 0.38, y: vh * 0.44 };
        // Dunk → right edge of keyboard base (lower portion)
        const laptopKeyboardRight = { x: vw * 0.62, y: vh * 0.55 };

        const dr = deadsecRef.current.getBoundingClientRect();
        const dk = dunkRef.current.getBoundingClientRect();

        // Start points at the vertical center of the GIF divs
        const deadsecStart = { x: dr.right, y: dr.top + dr.height / 2 };
        const dunkStart = { x: dk.left, y: dk.top + dk.height / 2 };

        setLeaderLines({
            deadsec: {
                x1: deadsecStart.x,
                y1: deadsecStart.y,
                x2: laptopScreenLeft.x,
                y2: laptopScreenLeft.y,
            },
            dunk: {
                x1: dunkStart.x,
                y1: dunkStart.y,
                x2: laptopKeyboardRight.x,
                y2: laptopKeyboardRight.y,
            },
        });
    }, [deadsecRef, dunkRef]);

    useEffect(() => {
        updateLeaderLines();
        if (fadeIn) {
            // Slight delay to align with laptop entrance animation
            const t = setTimeout(updateLeaderLines, 800); 
            return () => clearTimeout(t);
        }
    }, [updateLeaderLines, fadeIn]);

    useEffect(() => {
        const ro = new ResizeObserver(updateLeaderLines);
        const d1 = deadsecRef.current;
        const d2 = dunkRef.current;
        if (d1) ro.observe(d1);
        if (d2) ro.observe(d2);
        window.addEventListener("resize", updateLeaderLines);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", updateLeaderLines);
        };
    }, [updateLeaderLines]);

    // Stepped path: horizontal → vertical → horizontal (clean elbow)
    const getSuteraPath = (line: LeaderLineData) => {
        const midX = (line.x1 + line.x2) / 2;
        return `M ${line.x1},${line.y1} H ${midX} V ${line.y2} H ${line.x2}`;
    };

    return (
        <svg
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                zIndex: 10,
                // Add a subtle bloom effect matching your Dark Tech look
                filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.3))',
                opacity: fadeIn && leaderLines.deadsec && leaderLines.dunk ? 1 : 0,
                transition: "opacity 1s ease 0.5s, filter 1s ease",
            }}
        >
            {/* Standard "Sutéra" Line Definition for both lines */}
            <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
                    <stop offset="20%" stopColor="rgba(255,255,255,0.7)" />
                    <stop offset="80%" stopColor="rgba(255,255,255,0.7)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
                </linearGradient>
            </defs>

            {leaderLines.deadsec && (
                <>
                    {/* The Clinical Polyline (H -> V -> H) */}
                    <path
                        d={getSuteraPath(leaderLines.deadsec)}
                        fill="none"
                        // stroke="url(#lineGrad)" // Optional gradient effect
                        stroke="rgba(255,255,255,0.5)"
                        strokeWidth={1} // 1px for high detail
                        strokeLinecap="square"
                        strokeLinejoin="miter" // Hard angles
                    />
                    {/* Endpoint line extending right */}
                    <line
                        x1={leaderLines.deadsec.x2}
                        y1={leaderLines.deadsec.y2}
                        x2={leaderLines.deadsec.x2 + 28}
                        y2={leaderLines.deadsec.y2}
                        stroke="rgba(255,255,255,0.5)"
                        strokeWidth={1}
                        strokeLinecap="square"
                    />
                    {/* Diamond Anchor at endpoint */}
                    <rect
                        x={leaderLines.deadsec.x2 + 26}
                        y={leaderLines.deadsec.y2 - 2}
                        width={4}
                        height={4}
                        transform={`rotate(45 ${leaderLines.deadsec.x2 + 28} ${leaderLines.deadsec.y2})`}
                        fill="#fff"
                        style={{
                            animation: 'flicker 2s infinite steps(2)', // Add faint boot-up flicker
                            animationDelay: '1s',
                        }}
                    />
                </>
            )}

            {leaderLines.dunk && (
                <>
                    {/* The Clinical Polyline (H -> V -> H) */}
                    <path
                        d={getSuteraPath(leaderLines.dunk)}
                        fill="none"
                        // stroke="url(#lineGrad)" // Optional gradient effect
                        stroke="rgba(255,255,255,0.5)"
                        strokeWidth={1} // 1px for high detail
                        strokeLinecap="square"
                        strokeLinejoin="miter" // Hard angles
                    />
                    {/* Endpoint line extending left */}
                    <line
                        x1={leaderLines.dunk.x2}
                        y1={leaderLines.dunk.y2}
                        x2={leaderLines.dunk.x2 - 28}
                        y2={leaderLines.dunk.y2}
                        stroke="rgba(255,255,255,0.5)"
                        strokeWidth={1}
                        strokeLinecap="square"
                    />
                    {/* Diamond Anchor at endpoint */}
                    <rect
                        x={leaderLines.dunk.x2 - 30}
                        y={leaderLines.dunk.y2 - 2}
                        width={4}
                        height={4}
                        transform={`rotate(45 ${leaderLines.dunk.x2 - 28} ${leaderLines.dunk.y2})`}
                        fill="#fff"
                        style={{
                            animation: 'flicker 2s infinite steps(2)', // Add faint boot-up flicker
                            animationDelay: '1.2s',
                        }}
                    />
                </>
            )}
        </svg>
    );
}

// Add these to your globals.css to complete the technical look:
// @keyframes flicker {
//   0% { opacity: 1; }
//   50% { opacity: 0.3; }
//   100% { opacity: 1; }
// }