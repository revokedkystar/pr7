"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const img1Ref = useRef<HTMLDivElement>(null);
    const img2Ref = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!sectionRef.current) return;
            
            // Scrubbing for the first (top/left) image
            gsap.fromTo(img1Ref.current,
                { y: 80 },
                {
                    y: -50,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                    }
                }
            );

            // Scrubbing for the second (bottom/right) image, moves faster
            gsap.fromTo(img2Ref.current,
                { y: 150 },
                {
                    y: -100,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5,
                    }
                }
            );

            // Scrubbing for the text content
            gsap.fromTo(textRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        end: 'top 30%',
                        scrub: 1,
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="about-section" style={{
            width: '100%',
            position: 'relative',
            zIndex: 10,
        }}>
            
            {/* Injected CSS Variables for Responsiveness */}
            <style dangerouslySetInnerHTML={{__html: `
                .about-section {
                    --about-pad: 120px 40px;
                    --about-grid: 1fr 1fr;
                    --about-gap: 60px;
                    --img-container-h: 600px;
                    --p-size: 1.2rem;
                    --details-dir: row;
                    --details-gap: 40px;
                }

                .about-visuals { grid-row: 1; }
                .about-content { grid-row: 1; }

                /* Tablet Breakpoint */
                @media (max-width: 1024px) {
                    .about-section {
                        --about-pad: 80px 40px;
                        --about-grid: 1fr; /* Stacks the columns */
                        --about-gap: 50px;
                        --img-container-h: 500px;
                    }
                    /* Forces Text to sit above the Images on smaller screens */
                    .about-content { grid-row: 1; }
                    .about-visuals { grid-row: 2; }
                }

                /* Mobile Breakpoint */
                @media (max-width: 768px) {
                    .about-section {
                        --about-pad: 60px 20px;
                        --about-gap: 40px;
                        --img-container-h: 350px; /* Shrinks the image area for phones */
                        --p-size: 1rem;
                        --details-dir: column; /* Stacks the lower details */
                        --details-gap: 20px;
                    }
                }
            `}} />

            <div style={{
                maxWidth: '1600px',
                margin: '0 auto',
                padding: 'var(--about-pad)',
                display: 'grid',
                gridTemplateColumns: 'var(--about-grid)',
                gap: 'var(--about-gap)',
                position: 'relative',
                zIndex: 1
            }}>
                
                {/* Left Column (Desktop) / Bottom Row (Mobile): Visual Assets */}
                <div className="about-visuals" style={{ position: 'relative', height: 'var(--img-container-h)' }}>
                    {/* Top Asset - Framed like a UI window */}
                    <div ref={img1Ref} style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '80%',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: 'rgba(20, 20, 20, 0.6)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                        zIndex: 1
                    }}
                    onMouseEnter={(e) => { if(window.innerWidth > 1024) e.currentTarget.style.transform = 'scale(1.02)' }}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        {/* macOS Window Header */}
                        <div style={{ 
                            height: '32px', 
                            background: 'rgba(255, 255, 255, 0.05)', 
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            display: 'flex', 
                            alignItems: 'center', 
                            padding: '0 12px', 
                            gap: '8px' 
                        }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56' }} />
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }} />
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F' }} />
                        </div>
                        {/* Content */}
                        <div style={{ padding: '0', background: '#000' }}>
                            <img src="/gifs/deadsec.gif" alt="Deadsec" style={{ width: '100%', display: 'block', filter: 'var(--media-invert) grayscale(100%) contrast(120%)' }} />
                        </div>
                    </div>

                    {/* Bottom Asset - Offset and overlapping */}
                    <div ref={img2Ref} style={{
                        position: 'absolute',
                        bottom: '20px',
                        right: 0,
                        width: '65%',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: 'rgba(20, 20, 20, 0.6)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.6)',
                        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                        zIndex: 2
                    }}
                    onMouseEnter={(e) => { if(window.innerWidth > 1024) e.currentTarget.style.transform = 'scale(1.02)' }}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        {/* macOS Window Header */}
                        <div style={{ 
                            height: '32px', 
                            background: 'rgba(255, 255, 255, 0.05)', 
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            display: 'flex', 
                            alignItems: 'center', 
                            padding: '0 12px', 
                            gap: '8px' 
                        }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56' }} />
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }} />
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F' }} />
                        </div>
                        {/* Content */}
                        <div style={{ padding: '0', background: '#000' }}>
                            <img src="/gifs/cybercore.gif" alt="Cyber" style={{ width: '100%', display: 'block' }} />
                        </div>
                    </div>
                </div>

                {/* Right Column (Desktop) / Top Row (Mobile): Text Content */}
                <div ref={textRef} className="about-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <span style={{ 
                            color: '#fff', 
                            fontSize: '0.9rem', 
                            fontFamily: 'TitleFont, sans-serif',
                            letterSpacing: '0.3em', 
                            textTransform: 'uppercase',
                            opacity: 0.5 
                        }}>
                            — @H4TFI3LD / 01
                        </span>
                        <h2 style={{
                            color: '#fff',
                            fontSize: 'clamp(3rem, 10vw, 5rem)', // Scaled cleanly for mobile
                            fontWeight: 900,
                            lineHeight: 0.9,
                            letterSpacing: '-0.02em',
                            margin: '10px 0',
                            fontFamily: 'TitleFont, Impact, sans-serif',
                        }}>
                            hello, <br /> 
                            <span style={{ fontFamily: 'SubtitleFont' }}>
                                NEW USER!
                            </span>
                        </h2>
                    </div>

                    <div style={{ maxWidth: '500px' }}>
                        <p style={{
                            color: '#fff',
                            fontSize: 'var(--p-size)',
                            lineHeight: '1.5',
                            opacity: 0.8,
                            marginBottom: '30px',
                            fontFamily: 'TextFont, sans-serif'
                        }}>
                            My name is Joshua, I build immersive physical, digital and experiences at the intersection of street culture and clean interactive design. This website was built with the purpose of meeting the 7 core principles of web design.
                        </p>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'var(--details-dir)' as 'row' | 'column',
                            borderTop: '1px solid rgba(255,255,255,0.2)',
                            paddingTop: '20px',
                            gap: 'var(--details-gap)'
                        }}>
                            <div>
                                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px 0' }}>Specialization</p>
                                <p style={{ color: '#fff', fontSize: '0.9rem', fontFamily: 'TitleFont, sans-serif', margin: 0 }}>Graphic Design & Front-end</p>
                            </div>
                            <div>
                                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px 0' }}>Style</p>
                                <p style={{ color: '#fff', fontSize: '0.9rem', fontFamily: 'TitleFont, sans-serif', margin: 0 }}>Y2K / Brutalism</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}