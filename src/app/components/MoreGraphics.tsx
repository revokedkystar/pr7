"use client";
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MoreGraphics() {
    const gridRef = useRef<HTMLDivElement>(null);
    const [expandedItem, setExpandedItem] = useState<{id: string, src: string, label: string} | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Randomized array mixing GIFs and PNGs to create a dynamic bento layout
    const galleryItems = [
        { id: 'img-7', src: '/graphics/gd7.png', label: 'GD_7.PNG' },
        { id: 'img-5', src: '/graphics/gd5.png', label: 'GD_5.PNG' },
        { id: 'img-4', src: '/graphics/gd4.png', label: 'GD_4.PNG' },
        { id: 'gif-deadsec', src: '/gifs/shadow.gif', label: 'SYS_SHADOW.GIF' },
        { id: 'gif-cyber', src: '/gifs/love.gif', label: 'SYS_LOVE.GIF' },
        { id: 'img-0', src: '/graphics/gd0.png', label: 'GD_0.PNG' },
        { id: 'gif-dunk', src: '/gifs/dunk.gif', label: 'SYS_DUNK.GIF' },
        { id: 'img-9', src: '/graphics/gd9.png', label: 'GD_9.PNG' },
        { id: 'img-8', src: '/graphics/gd8.png', label: 'GD_8.PNG' },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!gridRef.current) return;
            const cards = gridRef.current.querySelectorAll('.bento-item-anim');
            cards.forEach((card, index) => {
                // Apply different scrubbing speeds/delays based on index to make it dynamic
                const yOffset = 50 + (index % 3) * 30;
                gsap.fromTo(card,
                    { y: yOffset, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 95%',
                            end: 'top 75%',
                            scrub: 1,
                        }
                    }
                );
            });
        }, gridRef);

        return () => ctx.revert();
    }, []);

    // Prevent body scrolling when modal is open
    useEffect(() => {
        if (expandedItem) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [expandedItem]);

    return (
        <section style={{
            width: '100%',
            position: 'relative',
            zIndex: 10,
            paddingTop: '80px'
        }}>
            {/* Inject CSS for the Bento Grid and Responsive Breakpoints */}
            <style dangerouslySetInnerHTML={{__html: `
                .kova-bento-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-auto-rows: 350px;
                    gap: 30px;
                    width: 100%;
                }
                
                /* Desktop Layout */
                .bento-card-0 { grid-column: span 2; grid-row: span 1; } /* Wide */
                .bento-card-1 { grid-column: span 1; grid-row: span 2; } /* Tall */
                .bento-card-2 { grid-column: span 1; grid-row: span 1; } /* Square */
                .bento-card-3 { grid-column: span 1; grid-row: span 1; } /* Square */
                .bento-card-4 { grid-column: span 2; grid-row: span 1; } /* Wide */
                .bento-card-5 { grid-column: span 1; grid-row: span 1; } /* Square */
                
                /* New GIF Squares (Row 4) */
                .bento-card-6 { grid-column: span 1; grid-row: span 1; } /* Square */
                .bento-card-7 { grid-column: span 1; grid-row: span 1; } /* Square */
                .bento-card-8 { grid-column: span 1; grid-row: span 1; } /* Square */

                /* Tablet Layout (2 Columns) */
                @media (max-width: 900px) {
                    .kova-bento-grid {
                        grid-template-columns: repeat(2, 1fr);
                        grid-auto-rows: 300px;
                    }
                    .bento-card-0 { grid-column: span 2; grid-row: span 1; }
                    .bento-card-1 { grid-column: span 1; grid-row: span 1; }
                    .bento-card-2 { grid-column: span 1; grid-row: span 1; }
                    .bento-card-3 { grid-column: span 2; grid-row: span 1; }
                    .bento-card-4 { grid-column: span 1; grid-row: span 1; }
                    .bento-card-5 { grid-column: span 1; grid-row: span 1; }
                    .bento-card-6 { grid-column: span 1; grid-row: span 1; }
                    .bento-card-7 { grid-column: span 1; grid-row: span 1; }
                    .bento-card-8 { grid-column: span 2; grid-row: span 1; } /* Spans 2 to fill the bottom row neatly */
                }

                /* Mobile Layout (1 Column) */
                @media (max-width: 600px) {
                    .kova-bento-grid {
                        grid-template-columns: 1fr;
                        grid-auto-rows: 300px;
                    }
                    .bento-card-0, .bento-card-1, .bento-card-2, 
                    .bento-card-3, .bento-card-4, .bento-card-5,
                    .bento-card-6, .bento-card-7, .bento-card-8 { 
                        grid-column: span 1; 
                        grid-row: span 1; 
                    }
                }

                /* Modal Animation */
                .modal-enter {
                    animation: modalFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .modal-content-enter {
                    animation: modalScaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes modalFadeIn {
                    from { opacity: 0; backdrop-filter: blur(0px); }
                    to { opacity: 1; backdrop-filter: blur(20px); }
                }
                @keyframes modalScaleUp {
                    from { transform: scale(0.95) translateY(20px); opacity: 0; }
                    to { transform: scale(1) translateY(0); opacity: 1; }
                }
            `}} />

            <div style={{
                maxWidth: '1600px',
                margin: '0 auto',
                padding: '40px 40px 120px 40px',
            }}>
                {/* Header Typography */}
                <div style={{ marginBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                        <span style={{ 
                            color: 'rgba(255,255,255,0.4)', 
                            fontSize: '0.8rem', 
                            fontFamily: 'TitleFont, sans-serif',
                            letterSpacing: '0.2em', 
                            textTransform: 'uppercase',
                        }}>
                            — STUDIO / 03
                        </span>
                        <div style={{ width: '100px', height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                    </div>
                    
                    <h2 style={{
                        color: '#fff',
                        fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                        fontWeight: 900,
                        lineHeight: 0.9,
                        letterSpacing: '-0.02em',
                        margin: 0,
                        fontFamily: 'TitleFont, Impact, sans-serif',
                    }}>
                        explore <br /> 
                        <span style={{ fontFamily: 'SubtitleFont, Impact, sans-serif' }}>
                            THE REST
                        </span>
                    </h2>
                </div>

                {/* Bento Box Grid */}
                <div ref={gridRef} className="kova-bento-grid">
                    {galleryItems.map((item, index) => (
                        <div key={item.id} className={`bento-card-${index} bento-item-anim`} style={{ height: '100%' }}>
                            <div 
                                onClick={() => setExpandedItem(item)}
                                style={{
                                width: '100%',
                                height: '100%',
                                border: '1px solid rgba(255,255,255,0.15)',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                background: 'rgba(20, 20, 20, 0.6)',
                                backdropFilter: 'blur(16px)',
                                WebkitBackdropFilter: 'blur(16px)',
                                display: 'flex',
                                flexDirection: 'column',
                                cursor: 'pointer',
                                position: 'relative',
                                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-6px)';
                                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.8)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                                const imgEl = e.currentTarget.querySelector('img');
                                if (imgEl) imgEl.style.filter = 'var(--media-invert) grayscale(0%) brightness(100%)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                                const imgEl = e.currentTarget.querySelector('img');
                                if (imgEl) imgEl.style.filter = 'var(--media-invert) grayscale(100%) brightness(70%)';
                            }}
                            >
                                {/* macOS Window Header */}
                                <div style={{ 
                                    height: '36px', 
                                    background: 'rgba(255, 255, 255, 0.03)', 
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    padding: '0 16px', 
                                    gap: '8px',
                                    flexShrink: 0,
                                    zIndex: 2
                                }}>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56' }} />
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }} />
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F' }} />
                                    
                                    <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.3)', fontSize: '10px', letterSpacing: '2px', fontFamily: 'sans-serif' }}>
                                        {item.label}
                                    </span>
                                </div>
                                
                                {/* Visual Content */}
                                <div style={{ flex: 1, position: 'relative', background: '#000', overflow: 'hidden' }}>
                                    <img 
                                        src={item.src} 
                                        alt={`Archive visual ${item.label}`} 
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'block',
                                            objectFit: 'cover',
                                            filter: 'var(--media-invert) grayscale(100%) brightness(70%)',
                                            transition: 'filter 0.5s ease',
                                        }} 
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Expanded Modal Overlay */}
            {mounted && expandedItem && createPortal(
                <div 
                    className="modal-enter"
                    onClick={() => setExpandedItem(null)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 9999, // Super high z-index to cover everything
                        background: 'rgba(0, 0, 0, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 'clamp(20px, 5vw, 60px)',
                        cursor: 'pointer',
                    }}
                >
                    <div 
                        className="modal-content-enter"
                        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
                        style={{
                            width: '100%',
                            maxWidth: '1200px',
                            maxHeight: '90vh',
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            background: 'rgba(20, 20, 20, 0.95)',
                            boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 1)',
                            cursor: 'default',
                        }}
                    >
                        {/* Modal macOS Header */}
                        <div style={{ 
                            height: '48px', 
                            background: 'rgba(255, 255, 255, 0.05)', 
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            display: 'flex', 
                            alignItems: 'center', 
                            padding: '0 20px', 
                            gap: '12px',
                            flexShrink: 0,
                        }}>
                            <div 
                                onClick={() => setExpandedItem(null)}
                                style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#FF5F56', cursor: 'pointer' }} 
                            />
                            <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#FFBD2E' }} />
                            <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#27C93F' }} />
                            
                            <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.5)', fontSize: '12px', letterSpacing: '2px', fontFamily: 'sans-serif' }}>
                                {expandedItem.label}
                            </span>
                        </div>
                        
                        {/* Expanded Image */}
                        <div style={{ flex: 1, background: '#000', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img 
                                src={expandedItem.src} 
                                alt={`Expanded view of ${expandedItem.label}`} 
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    maxHeight: 'calc(90vh - 48px)',
                                    objectFit: 'contain',
                                    display: 'block',
                                    filter: 'var(--media-invert)', // Original colors
                                }} 
                            />
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </section>
    );
}
