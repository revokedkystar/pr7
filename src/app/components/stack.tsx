"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Capabilities() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);

    // Flattened array of all your skills with their respective stack types
    const skills = [
        { name: 'Amazon', type: 'CLOUD', src: '/icons/amazon.svg' },
        { name: 'Azure', type: 'CLOUD', src: '/icons/azure.svg' },
        { name: 'Bootstrap', type: 'WEB_FRONTEND', src: '/icons/bootstrap.svg' },
        { name: 'Cloudflare', type: 'INFRASTRUCTURE', src: '/icons/cloudflare.svg' },
        { name: 'CSS', type: 'WEB_FRONTEND', src: '/icons/css.svg' },
        { name: 'HTML', type: 'WEB_FRONTEND', src: '/icons/html.svg' },
        { name: 'MySQL', type: 'DATABASES', src: '/icons/mysql.svg' },
        { name: 'Python', type: 'BACKEND', src: '/icons/python.svg' },
        { name: 'React', type: 'WEB_FRONTEND', src: '/icons/react.svg' },
        { name: 'Tailwind', type: 'WEB_FRONTEND', src: '/icons/tailwind-svgrepo-com.svg' },
        { name: 'TypeScript', type: 'WEB_FRONTEND', src: '/icons/typescript.svg' },
        { name: 'Git', type: 'DEVOPS', src: '/icons/git.svg' },
    ];

    const [activeSkill, setActiveSkill] = useState<typeof skills[0] | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    
    // State to safely track which images failed to load
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    // Mathematical distribution for the circle
    const totalIcons = skills.length;
    const getPosition = (index: number) => {
        const angle = (index / totalIcons) * (2 * Math.PI) - (Math.PI / 2);
        const x = 50 + 40 * Math.cos(angle);
        const y = 50 + 40 * Math.sin(angle);
        return { x: `${x.toFixed(3)}%`, y: `${y.toFixed(3)}%` };
    };

    // GSAP ScrollTrigger Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!sectionRef.current) return;

            // Scrubbing for title
            gsap.fromTo(titleRef.current,
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                        end: 'top 40%',
                        scrub: 1,
                    }
                }
            );

            // Scrubbing for orbit container
            gsap.fromTo(orbitRef.current,
                { scale: 0.8, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        end: 'top 20%',
                        scrub: 1.5,
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="capabilities-wrapper" style={{
            width: '100%',
            position: 'relative',
            zIndex: 10,
            padding: 'var(--section-padding)',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden',
        }}>
            
            {/* Injected CSS Variables for Responsive Scaling */}
            <style dangerouslySetInnerHTML={{__html: `
                .capabilities-wrapper {
                    --section-padding: 100px 0;
                    --orbit-max-width: 600px;
                    --icon-size: 56px;
                    --icon-padding: 12px;
                    --capsule-active-w: 280px;
                    --capsule-active-h: 160px;
                    --capsule-inactive-size: 60px;
                }

                @media (max-width: 768px) {
                    .capabilities-wrapper {
                        --section-padding: 80px 0;
                        --orbit-max-width: 450px;
                        --icon-size: 48px;
                        --icon-padding: 10px;
                        --capsule-active-w: 250px;
                        --capsule-active-h: 140px;
                        --capsule-inactive-size: 50px;
                    }
                }

                @media (max-width: 480px) {
                    .capabilities-wrapper {
                        --section-padding: 60px 0;
                        --orbit-max-width: 85vw; /* Fills screen width nicely */
                        --icon-size: 40px;
                        --icon-padding: 8px;
                        --capsule-active-w: 220px;
                        --capsule-active-h: 130px;
                        --capsule-inactive-size: 44px;
                    }
                }

                @keyframes spin { 100% { transform: rotate(360deg); } }
                @keyframes pulseRing { 
                    0% { box-shadow: 0 0 0 0 rgb(255, 255, 255); } 
                    70% { box-shadow: 0 0 0 20px rgba(255, 255, 255, 0); } 
                    100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); } 
                }
            `}} />

            <div ref={titleRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '40px', zIndex: 1 }}>
                <span style={{ 
                    color: 'rgb(255,255,255,0.4)', 
                    fontSize: '0.8rem', 
                    fontFamily: 'TitleFont, sans-serif',
                    letterSpacing: '0.3em', 
                    marginBottom: '15px'
                }}>
                    — FULL_STACK / 07
                </span>
                
                <h2 style={{
                    color: '#fff',
                    fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                    fontWeight: 900,
                    lineHeight: 0.9,
                    letterSpacing: '-0.02em',
                    fontFamily: 'TitleFont, Impact, sans-serif',
                    margin: 0
                }}>
                    fully <br />
                    <span style={{ fontFamily: 'SubtitleFont' }}>
                        STACKED
                    </span>
                </h2>
            </div>

            {/* Orbital Wheel Container */}
            <div ref={orbitRef} style={{
                position: 'relative',
                width: '100%',
                maxWidth: 'var(--orbit-max-width)',
                aspectRatio: '1 / 1', 
                margin: '0 auto',
                zIndex: 2,
            }}>
                
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: '80%',
                    height: '80%',
                    borderRadius: '50%',
                    border: '1px dashed rgb(255, 255, 255)',
                    pointerEvents: 'none',
                    animation: 'spin 60s linear infinite',
                }} />

                {/* Icons Placed on the Wheel */}
                {skills.map((skill, index) => {
                    const pos = getPosition(index);
                    const isHovered = hoveredIndex === index;
                    const isActive = activeSkill?.name === skill.name;
                    const hasError = imageErrors[skill.name];
                    
                    return (
                        <div 
                            key={skill.name}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => setActiveSkill(isActive ? null : skill)} 
                            style={{
                                position: 'absolute',
                                top: pos.y,
                                left: pos.x,
                                transform: 'translate(-50%, -50%)',
                                width: 'var(--icon-size)',
                                height: 'var(--icon-size)',
                                borderRadius: '12px',
                                background: isActive || isHovered ? 'rgba(255, 255, 255, 0.1)' : 'rgba(10, 10, 10, 0.8)',
                                border: `1px solid ${isActive ? '#fff' : isHovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 'var(--icon-padding)',
                                cursor: 'pointer',
                                backdropFilter: 'blur(8px)',
                                zIndex: isActive || isHovered ? 20 : 10,
                                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
                                scale: isHovered || isActive ? '1.3' : '1', // Slightly reduced hover pop to prevent mobile overlap
                                boxShadow: isActive ? '0 0 30px rgba(255,255,255,0.2)' : 'none',
                            }}
                        >
                            {/* Safe React Fallback for missing images */}
                            {hasError ? (
                                <span style={{ fontFamily: 'monospace', fontSize: 'clamp(8px, 2vw, 11px)', color: '#fff', letterSpacing: '1px' }}>
                                    {skill.name.substring(0,3).toUpperCase()}
                                </span>
                            ) : (
                                <img 
                                    src={skill.src} 
                                    alt={skill.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        filter: isHovered || isActive ? 'var(--media-invert) grayscale(0%) opacity(1)' : 'var(--media-invert) grayscale(100%) opacity(0.4)',
                                        transition: 'all 0.3s ease',
                                    }}
                                    onError={() => {
                                        setImageErrors(prev => ({ ...prev, [skill.name]: true }));
                                    }}
                                />
                            )}
                        </div>
                    );
                })}

                {/* Central Target / Expanding Glass Capsule */}
                <div 
                    onClick={() => setActiveSkill(null)}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: activeSkill ? 'var(--capsule-active-w)' : 'var(--capsule-inactive-size)',
                        height: activeSkill ? 'var(--capsule-active-h)' : 'var(--capsule-inactive-size)',
                        borderRadius: activeSkill ? '32px' : '50%', 
                        border: activeSkill ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.3)',
                        background: activeSkill ? 'rgba(20, 20, 20, 0.8)' : 'transparent', 
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        boxShadow: activeSkill ? '0 20px 40px rgba(0,0,0,0.5)' : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                        zIndex: 5,
                        overflow: 'hidden',
                        cursor: activeSkill ? 'pointer' : 'default', 
                        pointerEvents: 'auto', 
                        animation: activeSkill ? 'none' : 'pulseRing 3s infinite',
                }}>
                    {!activeSkill && (
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '4px', height: '4px', background: 'rgba(255,255,255,0.5)', borderRadius: '50%' }} />
                            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '1px', height: '10px', background: 'rgba(255,255,255,0.3)' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '1px', height: '10px', background: 'rgba(255,255,255,0.3)' }} />
                            <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '10px', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
                            <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '10px', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
                        </div>
                    )}

                    <div style={{ 
                        opacity: activeSkill ? 1 : 0, 
                        transform: activeSkill ? 'scale(1)' : 'scale(0.9)',
                        transition: 'all 0.3s ease 0.1s', 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '100%',
                        padding: '20px'
                    }}>
                        <span style={{ 
                            color: 'rgba(255,255,255,0.5)', 
                            fontSize: 'clamp(0.6rem, 2vw, 0.7rem)', 
                            fontFamily: '"Fira Code", monospace',
                            letterSpacing: '0.2em', 
                            textTransform: 'uppercase',
                            marginBottom: '8px'
                        }}>
                            {activeSkill?.type}
                        </span>
                        
                        <h3 style={{
                            color: '#fff',
                            fontSize: 'clamp(1rem, 5vw, 1.6rem)', 
                            fontFamily: 'SubtitleFont, Impact, sans-serif',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            margin: 0,
                            lineHeight: 1
                        }}>
                            {activeSkill?.name}
                        </h3>

                        <div style={{ 
                            position: 'absolute', 
                            bottom: '0px', 
                            color: 'rgba(255,255,255,0.2)', 
                            fontSize: '0.65rem', 
                            fontFamily: 'monospace',
                            letterSpacing: '0.1em'
                        }}>
                            [ CLICK HERE TO CLOSE ]
                        </div>
                    </div>
                </div>

            </div>
            
            <div style={{
                marginTop: '40px',
                color: 'rgba(255,255,255,0.3)',
                fontSize: 'clamp(0.6rem, 2vw, 0.8rem)',
                fontFamily: 'TextFont, monospace',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                zIndex: 2,
                textAlign: 'center',
                padding: '0 20px'
            }}>
                [ INTERACT TO EXPAND ]
            </div>

        </section>
    );
}