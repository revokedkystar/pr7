"use client";
import './globals.css';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import Navbar from './navbar/Navbar';
import { Model } from './components/asset';
import { AnnotationLines } from './components/AnnotationLines';
import { Canvas } from '@react-three/fiber';
import ScrollingTicker from './components/ScrollingTicker';
import TechnicalMarquee from './components/TechnicalMarquee';
// Removed ProfileCard import

export default function Page() {
    const [isModelReady, setIsModelReady] = useState(false);
    const [phase2, setPhase2] = useState(false);

    const handleModelReady = useCallback(() => setIsModelReady(true), []);
    const handlePhase2 = useCallback(() => setPhase2(true), []);

    // Fade-in state for GIFs and title
    const [fadeIn, setFadeIn] = useState(false);
    useEffect(() => {
        if (phase2) {
            setTimeout(() => setFadeIn(true), 100);
        }
    }, [phase2]);

    const deadsecRef = useRef<HTMLDivElement>(null);
    const dunkRef = useRef<HTMLDivElement>(null);



    return (
        <>
            {/* Navbar Fade-In from Top */}
            <div style={{
                overflow: 'hidden',
                position: 'fixed', top: 0, left: 0, width: '100vw', zIndex: 101,
                height: '64px',
            }}>
                <div style={{
                    transform: phase2 ? 'translateY(0)' : 'translateY(-100%)',
                    opacity: phase2 ? 1 : 0,
                    transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s',
                    height: '64px',
                }}>
                    <Navbar />
                </div>
            </div>

            {/* Main scrollable content */}
            <div style={{ width: '100vw', maxWidth: '100%', marginTop: 64, opacity: isModelReady ? 1 : 0, transition: 'opacity 1s' }}>
                <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
                    <Canvas camera={{ position: [0, 0, 2], fov: 60 }} style={{ width: '100vw', height: '100vh' }}>
                        <ambientLight intensity={0.7} />
                        <directionalLight position={[2, 2, 2]} intensity={0.8} />
                        <Model onReady={handleModelReady} onPhase2={handlePhase2} />
                    </Canvas>
                    {/* Drag to Spin Tag - fixed above model */}
                    <div style={{ position: 'fixed', left: '50%', top: '32%', transform: 'translate(-50%, -50%)', zIndex: 110, background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '8px 18px', borderRadius: '12px', fontSize: '1rem', fontFamily: 'BaseFont, system-ui, sans-serif', boxShadow: '0 2px 8px #0003', pointerEvents: 'none', letterSpacing: '0.08em' }}>
                        drag to spin
                    </div>
                </div>

            <AnnotationLines deadsecRef={deadsecRef} dunkRef={dunkRef} fadeIn={fadeIn} />

            {/* Top left Title Section (now scrolls with content) */}
            <div style={{
                marginTop: 64,
                marginLeft: 32,
                fontFamily: 'TitleFont, system-ui, sans-serif',
                color: '#fff',
                letterSpacing: '0.12em',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                opacity: fadeIn ? 1 : 0,
                transform: fadeIn ? 'translateY(0)' : 'translateY(-40px)',
                transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s',
            }}>
                <span style={{ fontWeight: 700, fontSize: '4.2rem', lineHeight: '1' }}>
                    HOME OF,
                </span>
                <div style={{ fontWeight: 700, fontSize: '4.2rem', lineHeight: '1' }}>
                    <TextCycle texts={["PROJECT 7EVEN*", "PROGRAMMING", "GRAPHIC ART"]} />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
                {/* Deadsec section */}
                <div>
                    <div style={{
                        color: '#fff',
                        fontFamily: 'NavFont, system-ui, sans-serif',
                        fontSize: '0.95rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                    }}>
                        welcome new friend!
                    </div>
                    <div style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontFamily: 'TitleFont, system-ui, sans-serif',
                        fontSize: '0.8rem',
                        maxWidth: 280,
                        lineHeight: 1.4,
                    }}>
                        thank you for viewing my portfolio, i hope you find everything you need to know about me and my work through this visual experiance.
                    </div>
                    <div ref={deadsecRef} style={{
                        background: 'rgba(0,0,0,0.7)',
                        border: '2px solid #fff',
                        borderRadius: 0,
                        boxShadow: '0 4px 24px #000a',
                        padding: 0,
                        display: 'inline-block',
                        position: 'relative',
                        pointerEvents: 'auto',
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            position: 'absolute', top: 4, right: 8, color: '#fff', fontWeight: 700, fontSize: 18, cursor: 'pointer', userSelect: 'none',
                            textShadow: '0 1px 4px #000a',
                        }} title="Close">×</div>
                        <img src="/deadsec.gif" alt="Deadsec GIF" style={{ display: 'block', borderRadius: 0, maxWidth: 300, maxHeight: 200 }} />
                    </div>
                </div>
                {/* Slam Dunk section */}
                <div>
                    <div ref={dunkRef} style={{
                        background: 'rgba(0,0,0,0.7)',
                        border: '2px solid #fff',
                        borderRadius: 0,
                        boxShadow: '0 4px 24px #000a',
                        padding: 0,
                        display: 'inline-block',
                        position: 'relative',
                        pointerEvents: 'auto',
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            position: 'absolute', top: 4, right: 8, color: '#fff', fontWeight: 700, fontSize: 18, cursor: 'pointer', userSelect: 'none',
                            textShadow: '0 1px 4px #000a',
                        }} title="Close">×</div>
                        <img src="/dunk.gif" alt="Dunk GIF" style={{ display: 'block', borderRadius: 0, maxWidth: 400, maxHeight: 260 }} />
                    </div>
                    <div style={{
                        color: '#fff',
                        fontFamily: 'NavFont, system-ui, sans-serif',
                        fontSize: '0.95rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                    }}>
                        why a slam dunk?
                    </div>
                    <div style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontFamily: 'TitleFont, system-ui, sans-serif',
                        fontSize: '0.8rem',
                        maxWidth: 280,
                        lineHeight: 1.4,
                        textAlign: 'right',
                    }}>
                        yeah its a bit random, but im slamming dunks so hard i had to visualize it. in all seriousness, i have played ball all my life.
                    </div>
                </div>
            </div>
            {/* Scrolling Ticker as section separator under GIFs */}
            <div style={{ width: '100%', margin: '48px 0 0 0', opacity: fadeIn ? 1 : 0, transition: 'opacity 1s ease 1s' }}>
                <ScrollingTicker />
            </div>
            {/* Description under the keep scrolling section */}
            <div style={{
                width: '100%',
                textAlign: 'center',
                color: '#fff',
                fontFamily: 'TitleFont, system-ui, sans-serif',
                fontSize: '1.2rem',
                margin: '24px 0 0 0',
                opacity: fadeIn ? 1 : 0,
                transition: 'opacity 1s ease 1.2s',
            }}>
                Welcome to the next section! Here you'll find more about my work, skills, and creative journey.
            </div>
        </div>
    </>
    );
}

function TextCycle({ texts }: { texts: string[] }) {
    const [index, setIndex] = useState(0);
    const [isRevealing, setIsRevealing] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsRevealing(false);
            setTimeout(() => {
                setIndex((i) => (i + 1) % texts.length);
                setIsRevealing(true);
            }, 400);
        }, 2500);

        return () => clearInterval(interval);
    }, [texts.length]);

    return (
        <span
            style={{
                fontFamily: 'SubtitleFont, TitleFont, system-ui, sans-serif',
                display: 'inline-block',
                overflow: 'hidden',
                verticalAlign: 'bottom',
            }}
        >
            <span
                style={{
                    display: 'inline-block',
                    clipPath: isRevealing ? 'inset(0 0 0 0)' : 'inset(0 0 0 100%)',
                    transition: 'clip-path 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                {texts[index]}
            </span>
        </span>
    );
}