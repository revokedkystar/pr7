"use client";
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './navbar/Navbar';
import PlusGrid from './background/PlusGrid';
import Certificates from './components/Certificates';
import BusinessPartnerships from './components/BusinessPartnerships';
import Terminal from './components/terminal';
import Stack from './components/stack';
import KovaGraphic from './components/KovaGraphic';
import MoreGraphics from './components/MoreGraphics';
import About from './components/about';
import ScrollingText from './components/scrollingtext';
import Footer from './components/Footer';
import CustomScrollbar from './components/CustomScrollbar';
import LoadingScreen from './components/loadingscreen';
import { Model } from './components/asset';
import { Canvas } from '@react-three/fiber';
gsap.registerPlugin(ScrollTrigger);

export default function Page() {
    const [isModelReady, setIsModelReady] = useState(false);
    const [phase2, setPhase2] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleModelReady = useCallback(() => setIsModelReady(true), []);
    const handlePhase2 = useCallback(() => setPhase2(true), []);
    const handleLoadingComplete = useCallback(() => setIsLoading(false), []);

    const [fadeIn, setFadeIn] = useState(false);
    useEffect(() => {
        if (phase2 && !isLoading) {
            const timeout = setTimeout(() => setFadeIn(true), 100);
            return () => clearTimeout(timeout);
        }

        setFadeIn(false);
    }, [isLoading, phase2]);

    // Ref for scroll-to-explore text
    const scrollTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!scrollTextRef.current) return;
        gsap.fromTo(
            scrollTextRef.current,
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: scrollTextRef.current,
                    start: 'top 90%', // when top of element hits 90% of viewport
                    end: 'top 60%',
                    scrub: true,
                },
            }
        );
        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div style={{
            width: '100vw',
            minHeight: '100vh',
            overflowX: 'hidden',
            position: 'relative',
            background: '#000',
        }}>
            {/* Loading screen overlay */}
            {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

            {/* Custom Scrollbar Styles */}
            <CustomScrollbar />
            
            {/* PlusGrid background */}
            <PlusGrid />
            {/* Navbar (fixed) */}
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
            <main style={{ width: '100%', marginTop: 20 }}>
                {/* Title Section */}
                <section style={{
                    width: '100%',
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: 'clamp(60px, 15vh, 100px) 20px 0 20px',
                    fontFamily: 'TitleFont, system-ui, sans-serif',
                    color: '#fff',
                    letterSpacing: '0.02em',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    opacity: fadeIn ? 1 : 0,
                    transform: fadeIn ? 'translateY(0)' : 'translateY(-40px)',
                    transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                    <span style={{ fontWeight: 700, fontSize: 'clamp(2.5rem, 8vw, 4.2rem)', lineHeight: '1', textAlign: 'center', width: '100%' }}>
                        home of,
                    </span>
                    <div style={{ fontFamily: 'SubtitleFont, system-ui, sans-serif', fontWeight: 700, fontSize: 'clamp(2.5rem, 8vw, 4.2rem)', lineHeight: '1', textAlign: 'center', width: '100%' }}>
                        <TextCycle texts={["PROJECT 7EVEN*", "@H4TI3LD", "KOVA GRAPHIC"]} />
                    </div>
                </section>

                <section style={{
                    width: '100vw',
                    height: '60vh',
                    margin: '-50px 0 0 0',
                    zIndex: 5,
                    opacity: isModelReady ? 1 : 0,
                    transition: 'opacity 1s',
                    pointerEvents: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Canvas camera={{ position: [0, 0, 2], fov: 60 }} style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}>
                        <ambientLight intensity={0.7} />
                        <directionalLight position={[2, 2, 2]} intensity={0.8} />
                        <Model onReady={handleModelReady} onPhase2={handlePhase2} />
                    </Canvas>
                </section>

                {/* Scroll Indicator */}
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '20px',
                    marginBottom: '40px',
                    opacity: isModelReady ? 0.7 : 0,
                    transition: 'opacity 1s 0.5s',
                    color: '#fff',
                    fontFamily: 'SubtitleFont, system-ui, sans-serif',
                    fontSize: '0.9rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    zIndex: 10,
                    position: 'relative',
                }}>
                    <span style={{ marginBottom: '8px' }}>please scroll to continue</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'bounce 2s infinite' }}>
                        <path d="M12 5v14M19 12l-7 7-7-7"/>
                    </svg>
                    <style>{`
                        @keyframes bounce {
                            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                            40% { transform: translateY(-10px); }
                            60% { transform: translateY(-5px); }
                        }
                    `}</style>
                </div>

            {/* About Me Section */}
            <About />

            {/* Graphics Gallery Section */}
            <KovaGraphic />

            {/* Rest of Graphics */}
            <MoreGraphics />

            {/* Terminal Section */}
            <Terminal />

            {/* Stack Section */}
            <Stack />

                        {/* Business Partnerships Section */}
            <BusinessPartnerships />

            {/* Certificates Section */}
            <Certificates />

            {/* Scrolling Text Section */}
            <ScrollingText />

            {/* Footer Section */}
            <Footer />
            </main>
        </div>
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
        <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', minWidth: 'clamp(140px, 20vw, 220px)' }}>
            <span
                style={{
                    display: 'inline-block',
                    opacity: isRevealing ? 1 : 0,
                    transition: 'opacity 0.4s',
                    fontWeight: 700,
                    fontSize: 'clamp(2.5rem, 8vw, 4.2rem)',
                    color: '#fff',
                    letterSpacing: '0em',
                    }}
                    >
                {texts[index]}
            </span>
        </span>
        );
    }
