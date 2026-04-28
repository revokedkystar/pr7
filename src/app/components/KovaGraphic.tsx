"use client";
import React, { useState } from 'react';

export default function KovaGraphic() {
    return (
        <section className="kova-section" style={{
            width: '100%',
            position: 'relative',
            zIndex: 10,
        }}>
            {/* Injected CSS Variables for Responsiveness */}
            <style dangerouslySetInnerHTML={{__html: `
                .kova-section {
                    --section-pad: 120px 40px;
                    --grid-cols: 1fr 1.2fr;
                    --grid-gap: 60px;
                    --cycler-height: 600px;
                    --card-width: 380px;
                    --slide-offset: 45%;
                    --nav-btn-size: 48px;
                    --details-dir: row;
                }

                /* Tablet Breakpoint */
                @media (max-width: 1024px) {
                    .kova-section {
                        --section-pad: 80px 40px;
                        --grid-cols: 1fr; /* Stack columns */
                        --grid-gap: 50px;
                        --cycler-height: 500px;
                        --card-width: 340px;
                    }
                }

                /* Mobile Breakpoint */
                @media (max-width: 768px) {
                    .kova-section {
                        --section-pad: 60px 20px;
                        --grid-gap: 40px;
                        --cycler-height: 400px;
                        --card-width: 260px;
                        --slide-offset: 30%; /* Pulls side cards closer to fit screen */
                        --nav-btn-size: 40px;
                        --details-dir: column; /* Stacks the Software/Socials area */
                    }
                }
            `}} />

            <div style={{
                maxWidth: '1600px',
                margin: '0 auto',
                padding: 'var(--section-pad)',
                display: 'grid',
                gridTemplateColumns: 'var(--grid-cols)',
                gap: 'var(--grid-gap)',
                position: 'relative',
                zIndex: 1
            }}>
                
                {/* Left Column: Text Content */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <span style={{ 
                            color: '#fff', 
                            fontSize: '0.9rem', 
                            fontFamily: 'TitleFont, sans-serif',
                            letterSpacing: '0.3em', 
                            textTransform: 'uppercase',
                            opacity: 0.5 
                        }}>
                            — KOVA / 02
                        </span>
                        <h2 style={{
                            color: '#fff',
                            fontSize: 'clamp(3rem, 8vw, 5rem)',
                            fontWeight: 900,
                            lineHeight: 0.9,
                            letterSpacing: '-0.02em',
                            margin: '10px 0',
                            fontFamily: 'TitleFont, Impact, sans-serif',
                        }}>
                            kova <br /> 
                            <span style={{ fontFamily: 'SubtitleFont' }}>
                               ARCHIVE
                               </span>
                        </h2>
                    </div>

                    <div style={{ maxWidth: '500px' }}>
                        <p style={{
                            color: '#fff',
                            fontSize: 'clamp(1rem, 2vw, 1.2rem)', // Fluid typography
                            lineHeight: '1.5',
                            opacity: 0.8,
                            marginBottom: '30px',
                            fontFamily: 'TextFont, sans-serif'
                        }}>
                            Welcome to my collection of brands reimagined with a modern twist. Each design is created with a blend of creativity and uniqueness, showcasing my passion for graphical art.
                        </p>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'var(--details-dir)' as 'row' | 'column',
                            borderTop: '1px solid rgba(255,255,255,0.2)',
                            paddingTop: '20px',
                            gap: 'clamp(20px, 4vw, 40px)'
                        }}>
                            <div>
                                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px 0' }}>Software</p>
                                <p style={{ color: '#fff', fontSize: '0.9rem', fontFamily: 'TitleFont, sans-serif', margin: 0 }}>Canva, Adobe Photoshop</p>
                            </div>
                            <div>
                                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px 0' }}>Socials</p>
                                <p style={{ color: '#fff', fontSize: '0.9rem', fontFamily: 'TitleFont, sans-serif', margin: 0 }}>Instagram</p>
                            </div>
                        </div>
                        
                        <button style={{
                            marginTop: '40px',
                            padding: '12px 24px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontFamily: 'SubtitleFont, system-ui, sans-serif',
                            fontSize: '0.9rem',
                            letterSpacing: '0.1em',
                            cursor: 'pointer',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            transition: 'all 0.3s ease',
                            textTransform: 'uppercase',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}>
                            View More
                        </button>
                    </div>
                </div>

                {/* Right Column: Visual Assets (Cycler) */}
                <div style={{ position: 'relative', height: 'var(--cycler-height)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <GraphicCycler images={[1, 2, 3]} />
                </div>

            </div>
        </section>
    );
}

function GraphicCycler({ images }: { images: number[] }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => setActiveIndex((prev) => (prev + 1) % images.length);
    const handlePrev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            
            <button 
                onClick={handlePrev}
                style={{
                    position: 'absolute',
                    left: '0px',
                    zIndex: 40,
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    width: 'var(--nav-btn-size)',
                    height: 'var(--nav-btn-size)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: '#fff',
                    fontSize: '1.2rem',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                aria-label="Previous image"
            >
                &#8592;
            </button>

            <button 
                onClick={handleNext}
                style={{
                    position: 'absolute',
                    right: '0px',
                    zIndex: 40,
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    width: 'var(--nav-btn-size)',
                    height: 'var(--nav-btn-size)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: '#fff',
                    fontSize: '1.2rem',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                aria-label="Next image"
            >
                &#8594;
            </button>

            {images.map((img, index) => {
                const diff = (index - activeIndex + images.length) % images.length;
                
                let position = 'center';
                if (diff === 0) position = 'center';
                else if (diff === 1) position = 'right';
                else if (diff === images.length - 1) position = 'left';
                else position = 'hidden';

                const isCenter = position === 'center';
                const isLeft = position === 'left';
                const isRight = position === 'right';
                const isVisible = position !== 'hidden';

                // Use CSS variables for fluid translation
                let translateX = '0';
                let scale = 0.85;
                let opacity = 0;
                let zIndex = 10;

                if (isCenter) {
                    translateX = '0';
                    scale = 1;
                    opacity = 1;
                    zIndex = 30;
                } else if (isLeft) {
                    translateX = 'calc(var(--slide-offset) * -1)';
                    scale = 0.85;
                    opacity = 0.6;
                    zIndex = 20;
                } else if (isRight) {
                    translateX = 'var(--slide-offset)';
                    scale = 0.85;
                    opacity = 0.6;
                    zIndex = 20;
                }

                return (
                    <div 
                        key={img}
                        onClick={() => {
                            if (isLeft) handlePrev();
                            else if (isRight) handleNext();
                        }}
                        style={{
                            position: 'absolute',
                            width: 'var(--card-width)', // Dynamically scaled
                            border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            background: 'rgba(20, 20, 20, 0.6)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            boxShadow: isCenter ? '0 30px 60px -15px rgba(0, 0, 0, 0.8)' : '0 15px 30px -10px rgba(0, 0, 0, 0.5)',
                            cursor: isCenter ? 'default' : 'pointer',
                            transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                            transform: `translateX(${translateX}) scale(${scale})`,
                            opacity: isVisible ? opacity : 0,
                            zIndex: zIndex,
                            pointerEvents: isVisible ? 'auto' : 'none',
                        }}
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
                            
                            <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.3)', fontSize: '10px', letterSpacing: '1px', fontFamily: 'sans-serif' }}>
                                GD_{img}.PNG
                            </span>
                        </div>
                        
                        {/* Content */}
                        <div style={{ padding: '0', background: '#000' }}>
                            <img 
                                src={`/graphics/gd${img}.png`} 
                                alt={`Graphic Design ${img}`} 
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    objectFit: 'cover',
                                    filter: isCenter ? 'none' : 'brightness(0.5)',
                                    transition: 'filter 0.5s ease'
                                }} 
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}