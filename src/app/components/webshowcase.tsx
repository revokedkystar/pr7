"use client";
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const websites = [
    {
        id: '01',
        title: 'ARTISAN CATERING',
        tab: 'Artisan Catering',
        url: 'https://artisan-web-one.vercel.app',
        image: 'preview2.png',
        desc: 'A simple catering website showcasing events, food and appetizers.',
        stack: ['React', 'Tailwind CSS', 'Vercel'],
    },
    {
        id: '02',
        title: 'OJRFX Trading',
        tab: 'OJRFX Trading',
        url: 'https://ojrfx.vercel.app',
        image: 'preview1.png',
        desc: 'Website to connect a trader with new potential clients.',
        stack: ['Next.js', 'TSX'],
    },
    {
        id: '03',
        title: 'LVAR',
        tab: 'LVAR',
        url: 'https://www.lvar.co.uk',
        image: 'preview3.png',
        desc: 'Garage-based repairs and mobile visits for cars, vans, motorhomes and campervans.',
        stack: ['Garage Repairs', 'Mobile Visits', 'Newton Abbot'],
    },
];

const mod = (a: number, b: number) => ((a % b) + b) % b;
const prefersReduced = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Words > chars, so each letter can rise on its own
const SplitText = ({ text }: { text: string }) => (
    <>
        {text.split(' ').map((word, w) => (
            <span key={w} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', marginRight: '0.28em', paddingBottom: '0.1em' }}>
                {word.split('').map((c, i) => (
                    <span key={i} className="ch" style={{ display: 'inline-block' }}>{c}</span>
                ))}
            </span>
        ))}
    </>
);

// The address bar text "types in" letter by letter
const UrlText = ({ text }: { text: string }) => (
    <span style={{ display: 'inline-flex', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        {text.split('').map((c, i) => (
            <span key={i} className="ch-url" style={{ display: 'inline-block' }}>{c}</span>
        ))}
    </span>
);

const Chevron = ({ dir }: { dir: 'left' | 'right' }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d={dir === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
    </svg>
);

export default function LiveArchives() {
    const sectionRef = useRef<HTMLElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);
    const pillRef = useRef<HTMLDivElement>(null);
    const pageAreaRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const loadBarRef = useRef<HTMLDivElement>(null);
    const reloadIconRef = useRef<SVGSVGElement>(null);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

    const prevActive = useRef(0);
    const activeRef = useRef(0);
    const zTop = useRef(1);
    const pillPlaced = useRef(false);

    const [activeIndex, setActiveIndex] = useState(0);
    const [clock, setClock] = useState('');
    const active = websites[activeIndex];
    activeRef.current = activeIndex;

    const n = websites.length;
    const goTo = (i: number) => setActiveIndex(mod(i, n));
    const next = () => goTo(activeIndex + 1);
    const prev = () => goTo(activeIndex - 1);

    /* ---------- Menu bar clock ---------- */
    useEffect(() => {
        const tick = () => setClock(
            new Date().toLocaleString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).replace(',', '')
        );
        tick();
        const id = setInterval(tick, 30000);
        return () => clearInterval(id);
    }, []);

    /* ---------- Entry: desktop rises and the browser window opens ---------- */
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (prefersReduced()) return;
            const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });
            tl            .fromTo('.col-in', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out' })
              .fromTo('.desktop', { y: 90, opacity: 0, scale: 0.93 }, { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out' }, '-=0.8')
              .fromTo('.browser-win', { y: 40, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'expo.out' }, '-=0.9');
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    /* ---------- Page load: wipe the new site in, run the loading bar, spin reload ---------- */
    const playPage = (idx: number) => {
        const page = pageRefs.current[idx];
        if (!page) return;
        const reduced = prefersReduced();

        pageRefs.current.forEach(p => {
            const sc = p?.querySelector('.scroller');
            if (sc) { gsap.killTweensOf(sc); gsap.set(sc, { y: 0 }); }
        });

        page.style.zIndex = String(++zTop.current);
        gsap.fromTo(page, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: reduced ? 0 : 1.1, ease: 'expo.inOut', overwrite: true });
        gsap.fromTo(page.querySelector('.shot'), { scale: 1.15 }, { scale: 1, duration: reduced ? 0 : 1.5, ease: 'expo.out', delay: 0.15, overwrite: true });

        if (reduced) return;
        gsap.timeline()
            .fromTo(loadBarRef.current, { scaleX: 0, opacity: 1 }, { scaleX: 1, duration: 0.9, ease: 'power2.out' })
            .to(loadBarRef.current, { opacity: 0, duration: 0.3 });
        gsap.fromTo(reloadIconRef.current, { rotate: 0 }, { rotate: 360, duration: 0.8, ease: 'power3.inOut' });
    };

    /* ---------- Tab switch: page wipe + typed URL + letter-by-letter title ---------- */
    useEffect(() => {
        if (prevActive.current === activeIndex) return;
        prevActive.current = activeIndex;
        playPage(activeIndex);

        if (prefersReduced()) return;
        const ctx = gsap.context(() => {
            gsap.fromTo('.ch-url', { yPercent: 120 }, { yPercent: 0, duration: 0.6, stagger: 0.015, ease: 'power4.out', delay: 0.2 });
            gsap.fromTo('.ch', { yPercent: 115 }, { yPercent: 0, duration: 0.9, stagger: 0.025, ease: 'power4.out', delay: 0.3 });
            gsap.fromTo('.swap-in', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.45 });
        }, sectionRef);
        return () => ctx.revert();
    }, [activeIndex]);

    /* ---------- Sliding active-tab highlight ---------- */
    useLayoutEffect(() => {
        const place = (animate: boolean) => {
            const btn = tabRefs.current[activeIndex];
            if (!btn || !pillRef.current) return;
            gsap.to(pillRef.current, {
                x: btn.offsetLeft, y: btn.offsetTop, width: btn.offsetWidth, height: btn.offsetHeight,
                duration: animate ? 0.6 : 0, ease: 'expo.out', overwrite: true,
            });
        };
        place(pillPlaced.current);
        pillPlaced.current = true;
        const onResize = () => place(false);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [activeIndex]);

    /* ---------- Keyboard ---------- */
    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    };

    /* ---------- Hover the page: scroll the full-page screenshot like a real visit ---------- */
    const onPageEnter = () => {
        gsap.to(ctaRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
        if (prefersReduced()) return;
        const page = pageRefs.current[activeRef.current];
        const scroller = page?.querySelector('.scroller');
        const img = page?.querySelector('img') as HTMLImageElement | null;
        const area = pageAreaRef.current;
        if (!scroller || !img || !area) return;
        const max = img.offsetHeight - area.clientHeight;
        if (max <= 0) return;
        gsap.to(scroller, { y: -max, duration: Math.min(Math.max(max / 220, 3), 12), ease: 'power1.inOut', overwrite: true });
    };
    const onPageLeave = () => {
        const scroller = pageRefs.current[activeRef.current]?.querySelector('.scroller');
        gsap.to(scroller ?? [], { y: 0, duration: 1.4, ease: 'power3.inOut', overwrite: true });
        gsap.to(ctaRef.current, { y: 20, opacity: 0, duration: 0.4, ease: 'power3.in' });
    };

    /* ---------- Magnetic CTA ---------- */
    const onMagnet = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (prefersReduced()) return;
        const r = e.currentTarget.getBoundingClientRect();
        gsap.to(e.currentTarget, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.4, duration: 0.4, ease: 'power3.out' });
    };
    const onMagnetOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
        gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' });
    };

    const iconBtn: React.CSSProperties = {
        width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
        background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
    };

    return (
        <section ref={sectionRef} style={{
            width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10,
            padding: 'clamp(60px, 10vh, 120px) clamp(16px, 5vw, 40px)', overflow: 'hidden',
        }}>
            <style dangerouslySetInnerHTML={{ __html: `
                .browser-win {
                    position: absolute; top: 42px; left: 4.5%; right: 4.5%; bottom: 12px;
                    display: flex; flex-direction: column; overflow: hidden;
                    background: #151517; border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.14);
                    box-shadow: 0 40px 80px -20px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,0,0,0.5);
                }
                .wallpaper-glow { animation: drift 14s ease-in-out infinite alternate; }
                @keyframes drift { from { transform: translate(-6%, -4%) scale(1); } to { transform: translate(8%, 6%) scale(1.25); } }

                .tab-btn { transition: color 0.3s ease; }
                .tab-btn:hover { color: #fff !important; }
                .chrome-btn { transition: background 0.25s ease, color 0.25s ease, transform 0.2s ease; }
                .chrome-btn:hover { background: rgba(255,255,255,0.1) !important; color: #fff !important; }
                .chrome-btn:active { transform: scale(0.9); }
                .tab-btn:focus-visible, .chrome-btn:focus-visible, .stage-wrap:focus-visible, .cta-link:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }

                @keyframes sheen { from { transform: translateX(-120%) skewX(-20deg); } to { transform: translateX(220%) skewX(-20deg); } }
                .cta-link:hover .sheen { animation: sheen 0.9s ease; }

                .showcase-layout {
                    width: 100%; display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.8fr);
                    grid-template-rows: auto auto; align-items: center; column-gap: clamp(32px, 6vw, 90px);
                    row-gap: clamp(28px, 5vh, 52px);
                }
                .showcase-header { grid-column: 2; grid-row: 1; align-items: flex-start !important; }
                .showcase-header h2 { text-align: left !important; }
                .showcase-header .col-in:first-child { max-width: 100% !important; }
                .showcase-info { grid-column: 2; grid-row: 2; }
                .stage-wrap { grid-column: 1; grid-row: 1 / span 2; width: 100% !important; max-width: none !important; }
                .desktop { width: 100%; }

                @media (max-width: 1024px) {
                    .footer-grid { grid-template-columns: 1fr !important; justify-items: center; text-align: center; }
                    .info-block { align-items: center !important; }
                    .desc-text { margin-left: auto; margin-right: auto; }
                    .tag-row { justify-content: center; }
                    .hover-cta { opacity: 1 !important; transform: none !important; }
                }
                @media (max-width: 900px) {
                    .showcase-layout { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto; gap: clamp(32px, 6vh, 56px); }
                    .showcase-header, .showcase-info, .stage-wrap { grid-column: 1; grid-row: auto; }
                    .showcase-header { align-items: center !important; }
                    .showcase-header h2 { text-align: center !important; }
                    .stage-wrap { max-width: 1000px !important; justify-self: center; }
                }
                @media (max-width: 700px) {
                    .desktop-screen { aspect-ratio: 3 / 4 !important; }
                    .menu-extra { display: none !important; }
                    .browser-win { top: 36px; left: 3%; right: 3%; bottom: 12px; }
                    .tab-favicon { display: none !important; }
                }
                @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
            `}} />

            <div className="showcase-layout" style={{ maxWidth: '1500px', position: 'relative', zIndex: 1 }}>

                {/* ---------- HEADER ---------- */}
                <div className="showcase-header" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="col-in" style={{ marginBottom: 'clamp(15px, 3vw, 26px)', display: 'flex', alignItems: 'center', gap: '15px', width: '100%', maxWidth: '520px' }}>
                        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(270deg, rgba(255,255,255,0.25), transparent)' }} />
                        <span style={{
                            color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)',
                            fontFamily: 'TitleFont, sans-serif', letterSpacing: '0.3em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                        }}>
                            DEPLOYMENTS / {String(n).padStart(2, '0')}
                        </span>
                        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.25), transparent)' }} />
                    </div>
                    <h2 className="col-in" style={{
                        color: '#fff', fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 900, lineHeight: 0.9,
                        letterSpacing: '-0.02em', fontFamily: 'TitleFont, Impact, sans-serif', margin: 0, textAlign: 'center',
                    }}>
                        live <span style={{ fontFamily: 'SubtitleFont' }}>ARCHIVES</span>
                    </h2>
                </div>

                {/* ---------- PROJECT INFO + CONTROLS ---------- */}
                <div className="footer-grid showcase-info col-in" style={{
                    width: '100%', maxWidth: '1000px', display: 'grid', gridTemplateColumns: '1fr auto',
                    gap: 'clamp(24px, 4vw, 48px)', alignItems: 'end',
                }}>
                    <div ref={infoRef} className="info-block" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0 }}>
                        <div key={activeIndex} style={{ display: 'flex', flexDirection: 'column', alignItems: 'inherit' }}>
                            <div style={{
                                color: '#fff', fontFamily: 'TitleFont, sans-serif', fontSize: 'clamp(1.3rem, 2.8vw, 2.1rem)',
                                letterSpacing: '0.04em', marginBottom: 14, lineHeight: 1.1,
                            }}>
                                <SplitText text={active.title} />
                            </div>
                            <p className="desc-text swap-in" style={{
                                color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', lineHeight: 1.6,
                                fontFamily: 'TextFont, system-ui, sans-serif', maxWidth: 480, margin: '0 0 16px 0',
                            }}>
                                {active.desc}
                            </p>
                            <div className="tag-row swap-in" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {active.stack.map(t => (
                                    <span key={t} style={{
                                        padding: '6px 14px', borderRadius: 20, fontSize: '0.78rem',
                                        fontFamily: 'system-ui, -apple-system, sans-serif', color: '#fff',
                                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)',
                                    }}>{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <span style={{ color: '#fff', fontFamily: 'TitleFont, sans-serif', fontSize: '0.85rem', letterSpacing: '0.2em' }}>
                            {String(activeIndex + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
                        </span>
                        <div style={{ display: 'flex', gap: 6 }}>
                            {websites.map((w, i) => (
                                <div key={w.id} style={{
                                    height: 3, borderRadius: 3,
                                    width: i === activeIndex ? 36 : 14,
                                    background: i === activeIndex ? '#fff' : 'rgba(255,255,255,0.22)',
                                    transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1), background 0.4s ease',
                                }} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* ---------- DESKTOP SCREEN ---------- */}
                <div
                    className="stage-wrap"
                    tabIndex={0}
                    role="group"
                    aria-label="Live website previews"
                    onKeyDown={onKeyDown}
                    style={{ width: '100%', maxWidth: '1000px' }}
                >
                    <div className="desktop" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        {/* Monitor bezel */}
                        <div style={{
                            width: '100%', padding: 'clamp(6px, 1vw, 12px)', background: '#08080a',
                            border: '1px solid rgba(255,255,255,0.14)', borderRadius: 'clamp(14px, 2vw, 22px)',
                            boxShadow: '0 60px 120px -30px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.1)',
                        }}>
                            <div className="desktop-screen" style={{
                                position: 'relative', width: '100%', aspectRatio: '16 / 10', overflow: 'hidden',
                                borderRadius: 'clamp(8px, 1.2vw, 12px)',
                                background: 'radial-gradient(ellipse at 18% 8%, #2c2c30 0%, transparent 55%), radial-gradient(ellipse at 88% 92%, #232327 0%, transparent 50%), #101012',
                            }}>
                                {/* Slow-drifting light on the wallpaper */}
                                <div aria-hidden className="wallpaper-glow" style={{
                                    position: 'absolute', top: '15%', left: '25%', width: '50%', height: '60%',
                                    borderRadius: '50%', background: 'rgba(255,255,255,0.07)', filter: 'blur(80px)', pointerEvents: 'none',
                                }} />

                                {/* Menu bar */}
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, height: 28, zIndex: 5,
                                    background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px',
                                    fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.8)',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#fff' }} />
                                        <span style={{ fontWeight: 700 }}>Browser</span>
                                        <span className="menu-extra" style={{ display: 'flex', gap: 16, opacity: 0.6 }}>
                                            <span>File</span><span>Edit</span><span>View</span><span>History</span>
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <svg width="16" height="10" viewBox="0 0 26 12" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="20" height="10" rx="2.5" /><rect x="3" y="3" width="13" height="6" rx="1" fill="currentColor" stroke="none" /><path d="M23 4v4" strokeLinecap="round" /></svg>
                                        <span style={{ minWidth: 88, textAlign: 'right' }}>{clock}</span>
                                    </div>
                                </div>

                                {/* Browser window */}
                                <div className="browser-win">

                                    {/* Tab strip */}
                                    <div style={{ height: 42, background: '#0e0e10', display: 'flex', alignItems: 'flex-end', padding: '0 12px', gap: 14, flexShrink: 0 }}>
                                        <div style={{ display: 'flex', gap: 8, alignSelf: 'center' }}>
                                            {['#FF5F56', '#FFBD2E', '#27C93F'].map(c => (
                                                <div key={c} style={{ width: 'clamp(10px, 1.2vw, 12px)', height: 'clamp(10px, 1.2vw, 12px)', borderRadius: '50%', background: c, boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)' }} />
                                            ))}
                                        </div>
                                        <div ref={tabsRef} role="tablist" style={{ position: 'relative', display: 'flex', gap: 4, flex: 1, minWidth: 0, height: 'calc(100% - 7px)' }}>
                                            <div ref={pillRef} aria-hidden style={{
                                                position: 'absolute', top: 0, left: 0, background: '#1b1b1e',
                                                borderRadius: '9px 9px 0 0', pointerEvents: 'none',
                                            }} />
                                            {websites.map((site, i) => {
                                                const isActive = i === activeIndex;
                                                return (
                                                    <button
                                                        key={site.id}
                                                        ref={el => { tabRefs.current[i] = el; }}
                                                        role="tab"
                                                        aria-selected={isActive}
                                                        className="tab-btn"
                                                        onClick={() => goTo(i)}
                                                        style={{
                                                            position: 'relative', zIndex: 1, flex: '1 1 0', minWidth: 0, maxWidth: 230,
                                                            display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px',
                                                            background: 'transparent', border: 'none', borderRadius: '9px 9px 0 0', cursor: 'pointer',
                                                            color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                                                            fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 'clamp(0.7rem, 1.4vw, 0.8rem)', fontWeight: isActive ? 600 : 500,
                                                        }}
                                                    >
                                                        <span className="tab-favicon" aria-hidden style={{
                                                            width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                                                            background: isActive ? '#fff' : 'rgba(255,255,255,0.3)', color: '#111',
                                                            fontSize: '0.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            transition: 'background 0.3s ease',
                                                        }}>{site.tab[0]}</span>
                                                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{site.tab}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Toolbar */}
                                    <div style={{ position: 'relative', background: '#1b1b1e', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                        <button className="chrome-btn" style={iconBtn} onClick={prev} aria-label="Previous project"><Chevron dir="left" /></button>
                                        <button className="chrome-btn" style={iconBtn} onClick={next} aria-label="Next project"><Chevron dir="right" /></button>
                                        <button className="chrome-btn" style={iconBtn} onClick={() => playPage(activeIndex)} aria-label="Reload preview">
                                            <svg ref={reloadIconRef} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v5h-5" /></svg>
                                        </button>

                                        <div style={{
                                            flex: 1, maxWidth: 560, margin: '0 auto', minWidth: 0,
                                            background: 'rgba(0,0,0,0.32)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8,
                                            padding: 'clamp(5px, 0.8vw, 7px) clamp(12px, 2vw, 18px)',
                                            color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.7rem, 1.4vw, 0.85rem)',
                                            fontFamily: 'system-ui, -apple-system, sans-serif',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, overflow: 'hidden',
                                        }}>
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                            <span key={activeIndex} style={{ overflow: 'hidden', minWidth: 0 }}>
                                                <UrlText text={active.url.replace('https://', '')} />
                                            </span>
                                        </div>
                                        <div style={{ width: 30 * 3 + 12, flexShrink: 0 }} className="menu-extra" aria-hidden />

                                        {/* Loading bar */}
                                        <div ref={loadBarRef} aria-hidden style={{
                                            position: 'absolute', left: 0, bottom: -1, height: 2, width: '100%',
                                            background: 'rgba(255,255,255,0.9)', transformOrigin: 'left center', transform: 'scaleX(0)', opacity: 0,
                                        }} />
                                    </div>

                                    {/* Page area */}
                                    <div
                                        ref={pageAreaRef}
                                        onMouseEnter={onPageEnter}
                                        onMouseLeave={onPageLeave}
                                        style={{ position: 'relative', flex: 1, minHeight: 0, background: '#000', overflow: 'hidden' }}
                                    >
                                        {websites.map((site, i) => (
                                            <div
                                                key={site.id}
                                                ref={el => { pageRefs.current[i] = el; }}
                                                role="tabpanel"
                                                aria-hidden={i !== activeIndex}
                                                style={{ position: 'absolute', inset: 0, zIndex: i === 0 ? 1 : 0, background: '#000', overflow: 'hidden' }}
                                            >
                                                <div className="scroller" style={{ width: '100%', willChange: 'transform' }}>
                                                    <img
                                                        className="shot"
                                                        src={site.image}
                                                        alt={site.title}
                                                        draggable={false}
                                                        style={{ width: '100%', height: 'auto', display: 'block', transformOrigin: 'top center' }}
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '40%', pointerEvents: 'none', background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', zIndex: 1000000 }} />
                                        <div ref={ctaRef} className="hover-cta" style={{
                                            position: 'absolute', left: 0, right: 0, bottom: 'clamp(14px, 3vw, 28px)', zIndex: 1000001,
                                            display: 'flex', justifyContent: 'center', pointerEvents: 'none',
                                            opacity: 0, transform: 'translateY(20px)',
                                        }}>
                                            <a
                                                className="cta-link"
                                                href={active.url} target="_blank" rel="noopener noreferrer"
                                                onMouseMove={onMagnet} onMouseLeave={onMagnetOut}
                                                style={{
                                                    pointerEvents: 'auto', textDecoration: 'none', color: '#fff', position: 'relative', overflow: 'hidden',
                                                    padding: 'clamp(10px, 1.6vw, 14px) clamp(22px, 3.5vw, 30px)',
                                                    background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)',
                                                    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                                                    borderRadius: 40, fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)', fontWeight: 700,
                                                    fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '0.05em',
                                                    display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                                }}
                                            >
                                                <span className="sheen" aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, width: '40%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', transform: 'translateX(-120%) skewX(-20deg)' }} />
                                                <span style={{ position: 'relative' }}>Open Live Site</span>
                                                <svg style={{ position: 'relative' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Glass reflection over the whole screen */}
                                <div aria-hidden style={{
                                    position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20,
                                    background: 'linear-gradient(115deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 35%)',
                                }} />
                            </div>
                        </div>

                        {/* Monitor stand */}
                        <div aria-hidden style={{
                            width: 'clamp(70px, 14%, 150px)', height: 'clamp(22px, 3.5vw, 40px)',
                            background: 'linear-gradient(to bottom, #1a1a1d, #0b0b0d)',
                            clipPath: 'polygon(14% 0, 86% 0, 100% 100%, 0 100%)',
                        }} />
                        <div aria-hidden style={{
                            width: 'clamp(120px, 26%, 280px)', height: 6, borderRadius: 6,
                            background: 'linear-gradient(to bottom, #2a2a2e, #101012)',
                            boxShadow: '0 20px 30px -8px rgba(0,0,0,0.8)',
                        }} />
                    </div>
                </div>

            </div>
        </section>
    );
}