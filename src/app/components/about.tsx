"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Edit your previews here                                           */
/* ------------------------------------------------------------------ */
type Project = {
    name: string;
    url: string;        // text shown in the fake address bar
    src: string;        // gif / image path
    restFilter: string; // look before hover
    hoverFilter: string; // look on hover
};

const PROJECTS: Project[] = [
    {
        name: 'Deadsec',
        url: 'deadsec.gg',
        src: '/gifs/deadsec.gif',
        restFilter: 'var(--media-invert) grayscale(100%) contrast(120%)',
        hoverFilter: 'var(--media-invert) grayscale(0%) contrast(105%) saturate(1.2)',
    },
    {
        name: 'Cybercore',
        url: 'cybercore.app',
        src: '/gifs/cybercore.gif',
        restFilter: 'grayscale(100%) contrast(115%)',
        hoverFilter: 'grayscale(0%) contrast(105%) saturate(1.2)',
    },
];

/* ------------------------------------------------------------------ */
/*  One browser-window preview: 3D tilt + glare + live badge           */
/* ------------------------------------------------------------------ */
function PreviewWindow({ project }: { project: Project }) {
    const winRef = useRef<HTMLDivElement>(null);
    const tiltRef = useRef<HTMLDivElement>(null);
    const quick = useRef<{ rx: (v: number) => void; ry: (v: number) => void } | null>(null);

    useEffect(() => {
        if (!tiltRef.current) return;
        gsap.set(tiltRef.current, { transformPerspective: 900, transformOrigin: 'center' });
        quick.current = {
            rx: gsap.quickTo(tiltRef.current, 'rotationX', { duration: 0.6, ease: 'power3.out' }),
            ry: gsap.quickTo(tiltRef.current, 'rotationY', { duration: 0.6, ease: 'power3.out' }),
        };
    }, []);

    const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== 'mouse' || !winRef.current || !quick.current) return;
        const r = winRef.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        quick.current.ry((px - 0.5) * 16);
        quick.current.rx(-(py - 0.5) * 16);
        winRef.current.style.setProperty('--mx', `${px * 100}%`);
        winRef.current.style.setProperty('--my', `${py * 100}%`);
    };

    const onEnter = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== 'mouse' || !winRef.current || !tiltRef.current) return;
        gsap.to(tiltRef.current, { scale: 1.04, duration: 0.5, ease: 'expo.out' });
    };

    const onLeave = () => {
        if (!tiltRef.current || !quick.current) return;
        quick.current.rx(0);
        quick.current.ry(0);
        gsap.to(tiltRef.current, { scale: 1, duration: 0.6, ease: 'expo.out' });
    };

    return (
        <div ref={tiltRef} style={{ width: '100%', willChange: 'transform' }}>
            <div
                ref={winRef}
                className="pv-window"
                onPointerMove={onMove}
                onPointerEnter={onEnter}
                onPointerLeave={onLeave}
                style={
                    {
                        '--rest-filter': project.restFilter,
                        '--hover-filter': project.hoverFilter,
                    } as React.CSSProperties
                }
            >
                {/* Browser chrome */}
                <div className="pv-chrome">
                    <div className="pv-dots">
                        <i style={{ background: '#FF5F56' }} />
                        <i style={{ background: '#FFBD2E' }} />
                        <i style={{ background: '#27C93F' }} />
                    </div>
                    <div className="pv-url">{project.url}</div>
                    <div className="pv-live">
                        <span className="pv-live-dot" />
                        Live
                    </div>
                </div>

                {/* Screen */}
                <div className="pv-screen">
                    <img className="pv-img" src={project.src} alt={`${project.name} website preview`} />
                    <div className="pv-scan" />
                    <div className="pv-glare" />
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Section                                                           */
/* ------------------------------------------------------------------ */
export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const img1Ref = useRef<HTMLDivElement>(null);
    const img2Ref = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const ctx = gsap.context(() => {
            if (!sectionRef.current || reduce) return;

            // Parallax (scrubbed)
            gsap.fromTo(img1Ref.current, { y: 80 }, {
                y: -50, ease: 'none',
                scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
            });
            gsap.fromTo(img2Ref.current, { y: 150 }, {
                y: -100, ease: 'none',
                scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
            });

            // Text sequence entrance animation
            if (textRef.current) {
                const textElements = textRef.current.querySelectorAll('.animate-text');
                gsap.fromTo(textElements, 
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }

            // The one orchestrated moment: each window "boots up" —
            // wipe-in, then the image un-blurs.
            [img1Ref.current, img2Ref.current].forEach((el, i) => {
                if (!el) return;
                const win = el.querySelector('.pv-window');
                const img = el.querySelector('.pv-img');
                const live = el.querySelector('.pv-live');

                const tl = gsap.timeline({
                    delay: i * 0.25,
                    scrollTrigger: { trigger: el, start: 'top 90%', once: true },
                });
                tl.fromTo(win, { clipPath: 'inset(0 100% 0 0)' },
                    { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'expo.out', clearProps: 'clipPath' })
                    .fromTo(img, { filter: 'blur(14px) brightness(1.8)', scale: 1.12 },
                        { filter: 'blur(0px) brightness(1)', scale: 1, duration: 1.2, ease: 'power3.out', clearProps: 'filter' }, '-=0.7')
                    .fromTo(live, { opacity: 0 },
                        { opacity: 1, duration: 0.15, repeat: 5, yoyo: true, ease: 'steps(1)' }, '-=0.6')
                    .set(live, { opacity: 1 });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="about-section" style={{ width: '100%', position: 'relative', zIndex: 10 }}>
            <style dangerouslySetInnerHTML={{ __html: `
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

                @media (max-width: 1024px) {
                    .about-section {
                        --about-pad: 80px 40px;
                        --about-grid: 1fr;
                        --about-gap: 50px;
                        --img-container-h: 500px;
                    }
                    .about-content { grid-row: 1; }
                    .about-visuals { grid-row: 2; }
                }
                @media (max-width: 768px) {
                    .about-section {
                        --about-pad: 60px 20px;
                        --about-gap: 40px;
                        --img-container-h: 350px;
                        --p-size: 1rem;
                        --details-dir: column;
                        --details-gap: 20px;
                    }
                }

                /* ---------- Stage ---------- */
                .pv-stage { position: relative; }
                .pv-stage::before {
                    content: '';
                    position: absolute;
                    inset: -8% -6%;
                    background:
                        radial-gradient(ellipse at 30% 35%, rgba(255,255,255,0.10), transparent 55%),
                        radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px) 0 0 / 22px 22px;
                    -webkit-mask-image: radial-gradient(ellipse at center, #000 30%, transparent 72%);
                            mask-image: radial-gradient(ellipse at center, #000 30%, transparent 72%);
                    pointer-events: none;
                }
                .pv-slot { position: absolute; }
                .pv-slot--a { top: 0; left: 0; width: 80%; z-index: 1; }
                .pv-slot--b { bottom: 20px; right: 0; width: 65%; z-index: 2; }

                .pv-float { animation: pvFloat 7s ease-in-out infinite alternate; }
                .pv-slot--b .pv-float { animation-duration: 9s; animation-direction: alternate-reverse; }
                @keyframes pvFloat {
                    from { transform: translateY(-6px) rotate(-0.4deg); }
                    to   { transform: translateY(8px)  rotate(0.4deg); }
                }

                /* ---------- Window ---------- */
                .pv-window {
                    position: relative;
                    border: 1px solid rgba(255,255,255,0.18);
                    border-radius: 12px;
                    overflow: hidden;
                    background: rgba(16,16,16,0.7);
                    -webkit-backdrop-filter: blur(16px);
                            backdrop-filter: blur(16px);
                    box-shadow:
                        0 30px 60px -15px rgba(0,0,0,0.65),
                        0 0 0 1px rgba(0,0,0,0.6),
                        0 0 40px -10px rgba(255,255,255,0.08);
                    transition: border-color 0.4s, box-shadow 0.4s;
                    cursor: crosshair;
                }
                .pv-window:hover {
                    border-color: rgba(255,255,255,0.45);
                    box-shadow:
                        0 40px 80px -15px rgba(0,0,0,0.75),
                        0 0 0 1px rgba(0,0,0,0.6),
                        0 0 70px -10px rgba(255,255,255,0.22);
                }

                .pv-chrome {
                    display: grid;
                    grid-template-columns: auto 1fr auto;
                    align-items: center;
                    gap: 12px;
                    height: 34px;
                    padding: 0 12px;
                    background: rgba(255,255,255,0.05);
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }
                .pv-dots { display: flex; gap: 8px; }
                .pv-dots i { width: 12px; height: 12px; border-radius: 50%; display: block; }
                .pv-url {
                    justify-self: center;
                    max-width: 100%;
                    padding: 3px 14px;
                    border-radius: 999px;
                    background: rgba(0,0,0,0.45);
                    border: 1px solid rgba(255,255,255,0.08);
                    color: rgba(255,255,255,0.55);
                    font-family: TextFont, sans-serif;
                    font-size: 0.7rem;
                    letter-spacing: 0.04em;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .pv-live {
                    display: flex; align-items: center; gap: 6px;
                    color: rgba(255,255,255,0.7);
                    font-family: TitleFont, sans-serif;
                    font-size: 0.6rem;
                    letter-spacing: 0.15em;
                }
                .pv-live-dot {
                    width: 6px; height: 6px; border-radius: 50%;
                    background: #27C93F;
                    box-shadow: 0 0 8px #27C93F;
                    animation: pvPulse 1.6s ease-in-out infinite;
                }
                @keyframes pvPulse { 50% { opacity: 0.25; transform: scale(0.7); } }

                /* ---------- Screen ---------- */
                .pv-screen { position: relative; background: #000; overflow: hidden; }
                .pv-img {
                    display: block;
                    width: 100%;
                    filter: var(--rest-filter);
                    transition: filter 0.7s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1);
                }
                .pv-window:hover .pv-img { filter: var(--hover-filter); transform: scale(1.04); }

                .pv-scan {
                    position: absolute; inset: 0; pointer-events: none;
                    background: repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0 2px, rgba(0,0,0,0.28) 2px 3px);
                    mix-blend-mode: multiply;
                    opacity: 0.7;
                    transition: opacity 0.5s;
                }
                .pv-window:hover .pv-scan { opacity: 0.25; }

                .pv-glare {
                    position: absolute; inset: 0; pointer-events: none;
                    background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.28), transparent 45%);
                    mix-blend-mode: soft-light;
                    opacity: 0;
                    transition: opacity 0.4s;
                }
                .pv-window:hover .pv-glare { opacity: 1; }

                @media (prefers-reduced-motion: reduce) {
                    .pv-float, .pv-live-dot { animation: none; }
                    .pv-img { transition: filter 0.2s; }
                    .pv-window:hover .pv-img { transform: none; }
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
                zIndex: 1,
            }}>

                {/* Visuals */}
                <div className="about-visuals pv-stage" style={{ position: 'relative', height: 'var(--img-container-h)' }}>
                    <div ref={img1Ref} className="pv-slot pv-slot--a">
                        <div className="pv-float"><PreviewWindow project={PROJECTS[0]} /></div>
                    </div>
                    <div ref={img2Ref} className="pv-slot pv-slot--b">
                        <div className="pv-float"><PreviewWindow project={PROJECTS[1]} /></div>
                    </div>
                </div>

                {/* Text */}
                <div ref={textRef} className="about-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <span 
                            className="animate-text"
                            style={{
                                display: 'inline-block',
                                color: '#fff',
                                fontSize: '0.9rem',
                                fontFamily: 'TitleFont, sans-serif',
                                letterSpacing: '0.3em',
                                textTransform: 'uppercase',
                                opacity: 0.5,
                            }}
                        >
                            — @H4TFI3LD / 01
                        </span>
                        <h2 style={{
                            color: '#fff',
                            fontSize: 'clamp(3rem, 10vw, 5rem)',
                            fontWeight: 900,
                            lineHeight: 0.9,
                            letterSpacing: '-0.02em',
                            margin: '10px 0',
                            fontFamily: 'TitleFont, Impact, sans-serif',
                            overflow: 'hidden',
                        }}>
                            <span className="animate-text" style={{ display: 'block' }}>hello,</span>
                            <span className="animate-text" style={{ display: 'block', fontFamily: 'SubtitleFont' }}>NEW USER!</span>
                        </h2>
                    </div>

                    <div style={{ maxWidth: '500px' }}>
                        <p 
                            className="animate-text"
                            style={{
                                color: '#fff',
                                fontSize: 'var(--p-size)',
                                lineHeight: '1.5',
                                opacity: 0.8,
                                marginBottom: '30px',
                                fontFamily: 'TextFont, sans-serif',
                            }}
                        >
                            My name is Joshua, I build immersive physical and digital experiences at the intersection of street culture and clean interactive design. This website was built with the purpose of meeting the 7 core principles of web design.
                        </p>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'var(--details-dir)' as 'row' | 'column',
                            borderTop: '1px solid rgba(255,255,255,0.2)',
                            paddingTop: '20px',
                            gap: 'var(--details-gap)',
                        }}>
                            <div className="animate-text">
                                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px 0' }}>Specialization</p>
                                <p style={{ color: '#fff', fontSize: '0.9rem', fontFamily: 'TitleFont, sans-serif', margin: 0 }}>Graphic Design & Front-end</p>
                            </div>
                            <div className="animate-text">
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