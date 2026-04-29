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
            url: "https://your-kova-site.com",
            image: "/images/kova-preview.jpg", // Replace with your actual image path
            desc: "The primary design portfolio featuring a high-contrast brutalist grid and technical typography."
        },
        { 
            id: '02',
            title: "BTEC UNIT TRACKER",
            url: "https://unit-pal-progress.lovable.app",
            image: "preview1.png",   // Replace with your actual image path
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
            padding: '100px 20px',
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
                        gap: 60px !important;
                    }
                    .text-column {
                        align-items: center !important;
                        text-align: center !important;
                    }
                }
            `}} />

            <div ref={containerRef} className="archive-grid" style={{
                width: '100%',
                maxWidth: '1500px', // Expanded for a massive window presence
                display: 'grid',
                gridTemplateColumns: '1.6fr 1fr', // Shifts visual weight heavily to the window
                gap: '80px',
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
                        height: '44px', 
                        background: 'rgba(255, 255, 255, 0.03)', 
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex', 
                        alignItems: 'center', 
                        padding: '0 16px', 
                    }}>
                        <div style={{ display: 'flex', gap: '8px', width: '80px' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56', boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)' }} />
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E', boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)' }} />
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F', boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)' }} />
                        </div>
                    </div>

                    {/* Safari Address Bar Fake Chrome */}
                    <div style={{ 
                        background: 'rgba(0,0,0,0.3)', 
                        padding: '16px', 
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{ 
                            background: 'rgba(255,255,255,0.05)', 
                            border: '1px solid rgba(255,255,255,0.05)',
                            padding: '8px 32px', 
                            borderRadius: '8px',
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: '0.9rem',
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            width: '100%',
                            maxWidth: '500px',
                            justifyContent: 'center'
                        }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            {websites[activeIndex].url.replace('https://', '')}
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
                                padding: '16px 32px',
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '40px',
                                fontSize: '1rem',
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
                    
                    <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px', width: '100%' }}>
                        <span style={{ 
                            color: 'rgba(255,255,255,0.4)', 
                            fontSize: '0.8rem', 
                            fontFamily: 'TitleFont, sans-serif',
                            letterSpacing: '0.3em', 
                            textTransform: 'uppercase',
                        }}>
                            — DEPLOYMENTS / 06
                        </span>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                    </div>
                    
                    <h2 style={{
                        color: '#fff',
                        fontSize: 'clamp(3.5rem, 6vw, 6rem)', // Increased max font size to match the larger scale
                        fontWeight: 900,
                        lineHeight: 0.9,
                        letterSpacing: '-0.02em',
                        fontFamily: 'TitleFont, Impact, sans-serif',
                        margin: '0 0 30px 0',
                    }}>
                        live <br />
                        <span style={{ fontFamily: 'SubtitleFont' }}>
                            ARCHIVES
                        </span>
                    </h2>

                    <p style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', // Slightly larger readable text
                        lineHeight: '1.6',
                        fontFamily: 'TextFont, system-ui, sans-serif',
                        maxWidth: '480px',
                        marginBottom: '40px',
                        minHeight: '60px', 
                    }}>
                        {websites[activeIndex].desc}
                    </p>

                    {/* macOS Segmented Controls for Projects */}
                    <div style={{
                        display: 'inline-flex',
                        background: 'rgba(30, 30, 32, 0.8)',
                        padding: '6px',
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
                                        padding: '12px 28px',
                                        background: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                                        color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.1)' : 'none',
                                        fontSize: '0.9rem',
                                        fontWeight: isActive ? 600 : 500,
                                        letterSpacing: '0.05em',
                                        fontFamily: 'system-ui, -apple-system, sans-serif',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
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