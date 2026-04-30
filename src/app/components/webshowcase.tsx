"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LiveArchives() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Live Website Data
    const websites = [
        { 
            id: '01',
            title: "ARTISAN CATERING",
            url: "https://artisan-web-one.vercel.app",
            image: "preview2.png", 
            desc: "The primary design portfolio featuring a high-contrast brutalist grid and technical typography."
        },
        { 
            id: '02',
            title: "BTEC UNIT TRACKER",
            url: "https://unit-pal-progress.lovable.app",
            image: "preview1.png",  
            desc: "A digital architecture manifesto built with glassmorphism and ambient lighting effects."
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    // Smooth entry animation for the whole section
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!containerRef.current) return;

            gsap.fromTo(containerRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} style={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
            // Fluid padding: shrinks on mobile, expands on desktop
            padding: 'clamp(60px, 10vh, 120px) clamp(16px, 5vw, 40px)',
            overflow: 'hidden',
        }}>
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(1.02); }
                    to { opacity: 1; transform: scale(1); }
                }
                
                /* Responsive Grid Stacking */
                @media (max-width: 1024px) {
                    .archive-grid {
                        grid-template-columns: 1fr !important;
                        gap: clamp(40px, 8vw, 60px) !important;
                    }
                    .text-column {
                        align-items: center !important;
                        text-align: center !important;
                    }
                    .desc-text {
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .controls-container {
                        justify-content: center;
                    }
                }
            `}} />

            <div ref={containerRef} className="archive-grid" style={{
                width: '100%',
                maxWidth: '1500px',
                display: 'grid',
                gridTemplateColumns: '1.6fr 1fr', 
                // Fluid gap between window and text
                gap: 'clamp(40px, 6vw, 80px)',
                alignItems: 'center',
                zIndex: 1,
            }}>
                
                {/* --- LEFT SECTION: LARGE macOS WINDOW --- */}
                <div style={{
                    width: '100%',
                    background: 'rgba(20, 20, 22, 0.65)',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '16px',
                    boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255,255,255,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={e => {
                    if (window.innerWidth > 1024) e.currentTarget.style.transform = 'translateY(-8px)';
                }}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    {/* macOS Title Bar */}
                    <div style={{ 
                        height: 'clamp(36px, 4vw, 44px)', // Fluid height
                        background: 'rgba(255, 255, 255, 0.03)', 
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex', 
                        alignItems: 'center', 
                        padding: '0 clamp(12px, 2vw, 16px)', 
                    }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <div style={{ width: 'clamp(10px, 1.2vw, 12px)', height: 'clamp(10px, 1.2vw, 12px)', borderRadius: '50%', background: '#FF5F56', boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)' }} />
                            <div style={{ width: 'clamp(10px, 1.2vw, 12px)', height: 'clamp(10px, 1.2vw, 12px)', borderRadius: '50%', background: '#FFBD2E', boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)' }} />
                            <div style={{ width: 'clamp(10px, 1.2vw, 12px)', height: 'clamp(10px, 1.2vw, 12px)', borderRadius: '50%', background: '#27C93F', boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)' }} />
                        </div>
                    </div>

                    {/* Safari Address Bar Fake Chrome */}
                    <div style={{ 
                        background: 'rgba(0,0,0,0.3)', 
                        padding: 'clamp(12px, 2vw, 16px)', 
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{ 
                            background: 'rgba(255,255,255,0.05)', 
                            border: '1px solid rgba(255,255,255,0.05)',
                            padding: 'clamp(6px, 1vw, 8px) clamp(16px, 3vw, 32px)', // Fluid padding
                            borderRadius: '8px',
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)', // Fluid text
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            width: '100%',
                            maxWidth: '500px',
                            justifyContent: 'center',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {websites[activeIndex].url.replace('https://', '')}
                            </span>
                        </div>
                    </div>

                    {/* Clickable Image Preview */}
                    <a 
                        href={websites[activeIndex].url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                            display: 'block',
                            width: '100%',
                            aspectRatio: '16/9', 
                            background: '#000',
                            position: 'relative',
                            textDecoration: 'none',
                            overflow: 'hidden'
                        }}
                    >
                        <div key={activeIndex} style={{ width: '100%', height: '100%', animation: 'fadeIn 0.5s ease-in-out' }}>
                            <img 
                                src={websites[activeIndex].image} 
                                alt={websites[activeIndex].title} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                        </div>
                        
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0,0,0,0.4)',
                            backdropFilter: 'blur(4px)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                            color: '#fff',
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                        >
                            <div style={{
                                padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 32px)',
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '40px',
                                fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
                                fontWeight: 'bold',
                                fontFamily: 'system-ui, -apple-system, sans-serif',
                                letterSpacing: '0.05em',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                            }}>
                                Open Live Site
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </div>
                        </div>
                    </a>
                </div>

                {/* --- RIGHT SECTION: TYPOGRAPHY --- */}
                <div className="text-column" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', justifyContent: 'center' }}>
                    
                    <div style={{ marginBottom: 'clamp(15px, 3vw, 30px)', display: 'flex', alignItems: 'center', gap: '15px', width: '100%' }}>
                        <span style={{ 
                            color: 'rgba(255,255,255,0.4)', 
                            fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)', 
                            fontFamily: 'TitleFont, sans-serif',
                            letterSpacing: '0.3em', 
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap'
                        }}>
                            — DEPLOYMENTS / 06
                        </span>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                    </div>
                    
                    <h2 style={{
                        color: '#fff',
                        fontSize: 'clamp(3rem, 8vw, 6rem)', 
                        fontWeight: 900,
                        lineHeight: 0.9,
                        letterSpacing: '-0.02em',
                        fontFamily: 'TitleFont, Impact, sans-serif',
                        margin: '0 0 clamp(15px, 3vw, 30px) 0',
                    }}>
                        live <br />
                        <span style={{ fontFamily: 'SubtitleFont' }}>
                            ARCHIVES
                        </span>
                    </h2>

                    <p className="desc-text" style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: 'clamp(0.95rem, 2vw, 1.25rem)', 
                        lineHeight: '1.6',
                        fontFamily: 'TextFont, system-ui, sans-serif',
                        width: '100%',
                        maxWidth: '480px', // Prevents desktop lines from getting too long
                        marginBottom: 'clamp(20px, 4vw, 40px)',
                        minHeight: 'clamp(40px, 8vw, 60px)', 
                    }}>
                        {websites[activeIndex].desc}
                    </p>

                    {/* macOS Segmented Controls for Projects */}
                    <div className="controls-container" style={{
                        display: 'flex',
                        flexWrap: 'wrap', // Allows buttons to stack on tiny screens
                        gap: '4px',
                        background: 'rgba(30, 30, 32, 0.8)',
                        padding: 'clamp(4px, 1vw, 6px)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(20px)',
                    }}>
                        {websites.map((site, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <button 
                                    key={site.id}
                                    onClick={() => setActiveIndex(index)}
                                    style={{
                                        padding: 'clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 28px)', // Fluid padding
                                        background: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                                        color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.1)' : 'none',
                                        fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)', // Fluid text
                                        fontWeight: isActive ? 600 : 500,
                                        letterSpacing: '0.05em',
                                        fontFamily: 'system-ui, -apple-system, sans-serif',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        flex: '1 1 auto', // Allows stretching to fill space on mobile
                                        textAlign: 'center'
                                    }}
                                >
                                    {site.title}
                                </button>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}