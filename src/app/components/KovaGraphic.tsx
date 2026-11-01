"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  EDIT YOUR WORK HERE                                                */
/*  Add, remove or rename pieces. Each one becomes a card.             */
/* ------------------------------------------------------------------ */
type Project = {
    id: number;
    title: string;
    domain: string; // shown in the fake browser address bar
    file: string; // image path in /public
    blurb: string;
    tools: string;
    href: string;
};

const PROJECTS: Project[] = [
    {
        id: 1,
        title: "Brand Study 01",
        domain: "kova.studio/gd1",
        file: "/graphics/gd1.png",
        blurb: "A bold rebuild of an existing brand. Brutalist structure, Y2K shine.",
        tools: "Photoshop, Illustrator",
        href: "https://instagram.com/kovagraphic",
    },
    {
        id: 2,
        title: "Brand Study 02",
        domain: "kova.studio/gd2",
        file: "/graphics/gd2.png",
        blurb: "Heavy type, tight grids and a chrome finish pushed past the logo.",
        tools: "Photoshop, Canva",
        href: "https://instagram.com/kovagraphic",
    },
    {
        id: 3,
        title: "Brand Study 03",
        domain: "kova.studio/gd3",
        file: "/graphics/gd3.png",
        blurb: "A quieter take: the same brand, stripped back and made modern.",
        tools: "Photoshop, Illustrator",
        href: "https://instagram.com/kovagraphic",
    },
];

const AUTOPLAY_MS = 6000;

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export default function KovaGraphic() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ctx = gsap.context(() => {
            const section = sectionRef.current;
            if (!section) return;

            /* ---- Copy: scrubbed rise, title lines slide up out of a mask ---- */
            gsap.timeline({
                scrollTrigger: { trigger: section, start: "top 80%", end: "top 25%", scrub: 1 },
            })
                .fromTo(".kv-eyebrow", { y: 28, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out" })
                .fromTo(".kv-line-in", { yPercent: 110 }, { yPercent: 0, stagger: 0.25, ease: "power3.out" }, "<0.1")
                .fromTo(
                    ".kv-lead, .kv-meta > div, .kv-cta",
                    { y: 28, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.12, ease: "power2.out" },
                    "<0.35"
                );

            /* ---- Stage parallax (scrubbed) ---- */
            gsap.fromTo(
                ".kv-stage",
                { y: 70 },
                {
                    y: -40,
                    ease: "none",
                    scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.2 },
                }
            );

                 /* ---- Boot-up: centre card wipes in, un-blurs, LIVE flickers,
                   then the side cards follow ---- */
            const centre = ".kv-slot.is-center";
            const sides = ".kv-slot:not(.is-center)";

            gsap.timeline({
                scrollTrigger: { trigger: ".kv-cycler", start: "top 85%", once: true },
            })
                .fromTo(
                    `${centre} .kv-front`,
                    { clipPath: "inset(0 100% 0 0)" },
                    { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "expo.out", clearProps: "clipPath" }
                )
                .fromTo(
                    `${centre} .kv-screen`,
                    { filter: "blur(14px) brightness(1.8)" },
                    { filter: "blur(0px) brightness(1)", duration: 1.2, ease: "power3.out", clearProps: "filter" },
                    "-=0.7"
                )
                .fromTo(
                    `${centre} .kv-shot`,
                    { scale: 1.12 },
                    { scale: 1, duration: 1.2, ease: "power3.out", clearProps: "transform,scale" },
                    "<"
                )
                .fromTo(
                    ".kv-live",
                    { opacity: 0 },
                    { opacity: 1, duration: 0.15, repeat: 5, yoyo: true, ease: "steps(1)" },
                    "-=0.6"
                )
                .set(".kv-live", { opacity: 1 })
                .fromTo(
                    `${sides} .kv-front`,
                    { clipPath: "inset(0 100% 0 0)" },
                    { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "expo.out", stagger: 0.18, clearProps: "clipPath" },
                    "-=1.2"
                )
                .fromTo(
                    ".kv-controls, .kv-hint",
                    { y: 16, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.1 },
                    "-=0.6"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="kova-section" style={{ width: "100%", position: "relative", zIndex: 10 }}>
            <style dangerouslySetInnerHTML={{ __html: CSS }} />

            {/* soft light behind the previews */}
            <div className="kv-glow" aria-hidden="true" />

            <div className="kv-grid">
                {/* Left column */}
                <div className="kv-copy">
                    <span className="kv-eyebrow">Kova / 02</span>
                    <h2 className="kv-title">
                        <span className="kv-line">
                            <span className="kv-line-in">kova</span>
                        </span>
                        <span className="kv-line">
                            <span className="kv-line-in" style={{ fontFamily: "SubtitleFont, sans-serif" }}>
                                ARCHIVE
                            </span>
                        </span>
                    </h2>

                    <p className="kv-lead">
                        Brands I've rebuilt from scratch with a sharper, more modern look. Each piece
                        mixes brutalist structure with a little Y2K shine.
                    </p>

                    <div className="kv-meta">
                        <div>
                            <p className="kv-meta-label">Made with</p>
                            <p className="kv-meta-value">Canva, Adobe Photoshop</p>
                        </div>
                        <div>
                            <p className="kv-meta-label">Find me on</p>
                            <p className="kv-meta-value">Instagram</p>
                        </div>
                    </div>

                    <a className="kv-cta" href="https://instagram.com/kovagraphic" target="_blank" rel="noreferrer">
                        See more work
                    </a>
                </div>

                {/* Right column */}
                <GraphicCycler projects={PROJECTS} />
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*  Cycler                                                             */
/* ------------------------------------------------------------------ */
function GraphicCycler({ projects }: { projects: Project[] }) {
    const n = projects.length;
    const [active, setActive] = useState(0);
    const [flipped, setFlipped] = useState<number | null>(null);
    const [hovering, setHovering] = useState(false);
    const [reduced, setReduced] = useState(false);

    const startX = useRef<number | null>(null);
    const dragged = useRef(false);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduced(mq.matches);
        const on = () => setReduced(mq.matches);
        mq.addEventListener("change", on);
        return () => mq.removeEventListener("change", on);
    }, []);

    const go = useCallback(
        (dir: number) => {
            setActive((p) => (p + dir + n) % n);
            setFlipped(null);
        },
        [n]
    );

    const goTo = (i: number) => {
        setActive(i);
        setFlipped(null);
    };

    const paused = hovering || flipped !== null || reduced;

    return (
        <div className="kv-cycler">
            <div
                className="kv-stage"
                tabIndex={0}
                role="group"
                aria-roledescription="carousel"
                aria-label="Graphic design previews"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                onFocus={() => setHovering(true)}
                onBlur={() => setHovering(false)}
                onKeyDown={(e) => {
                    if (e.key === "ArrowRight") go(1);
                    else if (e.key === "ArrowLeft") go(-1);
                    else if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setFlipped((f) => (f === active ? null : active));
                    }
                }}
                onPointerDown={(e) => {
                    startX.current = e.clientX;
                }}
                onPointerUp={(e) => {
                    if (startX.current === null) return;
                    const dx = e.clientX - startX.current;
                    startX.current = null;
                    if (Math.abs(dx) > 50) {
                        dragged.current = true;
                        go(dx < 0 ? 1 : -1);
                        setTimeout(() => (dragged.current = false), 0);
                    }
                }}
            >
                {projects.map((p, i) => {
                    const half = Math.floor(n / 2);
                    const d = ((i - active + n + half) % n) - half; // -half..+half, 0 = centre
                    return (
                        <ShowcaseCard
                            key={p.id}
                            project={p}
                            d={d}
                            isFlipped={flipped === i}
                            onClick={() => {
                                if (dragged.current) return;
                                if (d < 0) go(-1);
                                else if (d > 0) go(1);
                                else setFlipped((f) => (f === i ? null : i));
                            }}
                        />
                    );
                })}

                {/* floor shadow */}
                <div className="kv-floor" aria-hidden="true" />
            </div>

            {/* Controls: arrows + progress dots + counter */}
            <div className="kv-controls">
                <button className="kv-arrow" onClick={() => go(-1)} aria-label="Previous piece">
                    &#8592;
                </button>

                <div className="kv-dots" role="tablist" aria-label="Choose a piece">
                    {projects.map((p, i) => (
                        <button
                            key={p.id}
                            role="tab"
                            aria-selected={i === active}
                            aria-label={`Show ${p.title}`}
                            className={`kv-dot ${i === active ? "is-active" : ""}`}
                            onClick={() => goTo(i)}
                        >
                            {i === active && !reduced && (
                                <span
                                    key={active}
                                    className={`kv-dot-fill ${paused ? "is-paused" : ""}`}
                                    style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                                    onAnimationEnd={() => go(1)}
                                />
                            )}
                            {i === active && reduced && <span className="kv-dot-fill is-static" />}
                        </button>
                    ))}
                </div>

                <span className="kv-count" aria-live="polite">
                    <span key={active} className="kv-count-num">
                        {String(active + 1).padStart(2, "0")}
                    </span>
                    <span className="kv-count-total"> / {String(n).padStart(2, "0")}</span>
                </span>

                <button className="kv-arrow" onClick={() => go(1)} aria-label="Next piece">
                    &#8594;
                </button>
            </div>

            <p className="kv-hint">Click the centre card to flip it. Drag or use the arrow keys to browse.</p>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Card                                                               */
/* ------------------------------------------------------------------ */
function ShowcaseCard({
    project,
    d,
    isFlipped,
    onClick,
}: {
    project: Project;
    d: number;
    isFlipped: boolean;
    onClick: () => void;
}) {
    const isCenter = d === 0;
    const abs = Math.abs(d);
    const visible = abs <= 1;

    const tiltRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const glitchTimer = useRef<number | undefined>(undefined);
    const wasCenter = useRef(isCenter);

    // Work out how far the screenshot can scroll inside its "browser window"
    const measure = useCallback(() => {
        const frame = frameRef.current;
        const img = imgRef.current;
        if (!frame || !img) return;
        const overflow = Math.max(0, img.offsetHeight - frame.offsetHeight);
        frame.style.setProperty("--scroll", `${overflow}px`);
        frame.style.setProperty("--scroll-time", `${Math.max(2.5, overflow / 110)}s`);
    }, []);

    useEffect(() => {
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [measure]);

    // RGB-split glitch burst when a card "tunes in" as the new centre
    const burst = useCallback(() => {
        const el = frameRef.current;
        if (!el) return;
        el.classList.add("is-glitching");
        window.clearTimeout(glitchTimer.current);
        glitchTimer.current = window.setTimeout(() => el.classList.remove("is-glitching"), 500);
    }, []);

    useEffect(() => {
        if (isCenter && !wasCenter.current) burst();
        wasCenter.current = isCenter;
    }, [isCenter, burst]);

    useEffect(() => () => window.clearTimeout(glitchTimer.current), []);

    const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const el = tiltRef.current;
        if (!el || !isCenter || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--ry", `${(px - 0.5) * 16}deg`);
        el.style.setProperty("--rx", `${-(py - 0.5) * 16}deg`);
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
    };

    const handleLeave = () => {
        const el = tiltRef.current;
        if (!el) return;
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--ts", "1");
    };

    return (
        <div
            className={`kv-slot ${isCenter ? "is-center" : ""}`}
            onClick={onClick}
            style={{
                transform: `translateX(calc(var(--slide-x) * ${d})) translateZ(${-abs * 150}px) rotateY(${-d * 28}deg)`,
                opacity: visible ? (isCenter ? 1 : 0.55) : 0,
                zIndex: 30 - abs * 10,
                pointerEvents: visible ? "auto" : "none",
            }}
        >
            <div
                ref={tiltRef}
                className="kv-tilt"
                onPointerMove={handleMove}
                onPointerLeave={handleLeave}
            >
                <div className={`kv-flip ${isFlipped ? "is-flipped" : ""}`}>
                    {/* FRONT */}
                    <div className="kv-face kv-front">
                        <WindowBar live>
                            <span className="kv-url">
                                <span className="kv-lock" aria-hidden="true" />
                                {project.domain}
                            </span>
                        </WindowBar>

                        <div ref={frameRef} className="kv-screen">
                            <img
                                ref={imgRef}
                                className="kv-shot"
                                src={project.file}
                                alt={project.title}
                                draggable={false}
                                onLoad={measure}
                            />
                            <div className="kv-scanlines" aria-hidden="true" />
                            <div className="kv-glare" aria-hidden="true" />
                            <div className="kv-dim" style={{ opacity: isCenter ? 0 : 0.45 }} aria-hidden="true" />
                        </div>
                    </div>

                    {/* BACK */}
                    <div className="kv-face kv-back">
                        <WindowBar>
                            <span className="kv-url">
                                <span className="kv-lock" aria-hidden="true" />
                                about.txt
                            </span>
                        </WindowBar>
                        <div className="kv-back-body">
                            <h3 className="kv-back-title">{project.title}</h3>
                            <p className="kv-back-text">{project.blurb}</p>
                            <p className="kv-back-tools">{project.tools}</p>
                            <a
                                className="kv-back-btn"
                                href={project.href}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                            >
                                View full piece
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function WindowBar({ children, live }: { children: React.ReactNode; live?: boolean }) {
    return (
        <div className="kv-bar">
            <span className="kv-light" style={{ background: "#FF5F56" }} />
            <span className="kv-light" style={{ background: "#FFBD2E" }} />
            <span className="kv-light" style={{ background: "#27C93F" }} />
            {children}
            {live && (
                <span className="kv-live">
                    <span className="kv-live-dot" />
                    Live
                </span>
            )}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */
const CSS = `
.kova-section {
    --section-pad: 120px 40px;
    --grid-cols: 1fr 1.2fr;
    --grid-gap: 60px;
    --stage-height: 600px;
    --card-width: 380px;
    --slide-x: 250px;
    --arrow-size: 44px;
    --meta-dir: row;
    overflow: hidden;
}
@media (max-width: 1024px) {
    .kova-section {
        --section-pad: 80px 40px;
        --grid-cols: 1fr;
        --grid-gap: 50px;
        --stage-height: 520px;
        --card-width: 340px;
        --slide-x: 220px;
    }
}
@media (max-width: 768px) {
    .kova-section {
        --section-pad: 60px 20px;
        --grid-gap: 36px;
        --stage-height: 420px;
        --card-width: 250px;
        --slide-x: 150px;
        --arrow-size: 40px;
        --meta-dir: column;
    }
}

/* ---------- layout + copy ---------- */
.kv-glow {
    position: absolute;
    right: -10%;
    top: 50%;
    width: 60vw;
    height: 60vw;
    max-width: 900px;
    max-height: 900px;
    transform: translateY(-50%);
    background: radial-gradient(circle, rgba(255,255,255,0.09), transparent 62%);
    filter: blur(20px);
    pointer-events: none;
    z-index: 0;
}
.kv-grid {
    max-width: 1600px;
    margin: 0 auto;
    padding: var(--section-pad);
    display: grid;
    grid-template-columns: var(--grid-cols);
    gap: var(--grid-gap);
    position: relative;
    z-index: 1;
    align-items: center;
}
.kv-copy { display: flex; flex-direction: column; justify-content: center; }
.kv-eyebrow {
    color: #fff;
    opacity: 0.5;
    font-family: TitleFont, sans-serif;
    font-size: 0.9rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
}
.kv-title {
    color: #fff;
    font-family: TitleFont, Impact, sans-serif;
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: 900;
    line-height: 0.9;
    letter-spacing: -0.02em;
    margin: 10px 0 36px;
}
/* each title line is a mask the text slides up out of */
.kv-line { display: block; overflow: hidden; padding: 0.08em 0; margin: -0.08em 0; }
.kv-line-in { display: block; will-change: transform; }
.kv-lead {
    color: #fff;
    opacity: 0.8;
    max-width: 480px;
    font-family: TextFont, sans-serif;
    font-size: clamp(1rem, 2vw, 1.15rem);
    line-height: 1.6;
    margin: 0 0 30px;
}
.kv-meta {
    display: flex;
    flex-direction: var(--meta-dir);
    gap: clamp(20px, 4vw, 40px);
    max-width: 480px;
    padding-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.2);
}
.kv-meta-label {
    color: rgba(255,255,255,0.4);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 0 0 4px;
}
.kv-meta-value { color: #fff; font-family: TitleFont, sans-serif; font-size: 0.9rem; margin: 0; }
.kv-cta {
    align-self: flex-start;
    margin-top: 36px;
    padding: 12px 24px;
    color: #fff;
    text-decoration: none;
    font-family: SubtitleFont, system-ui, sans-serif;
    font-size: 0.9rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 8px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: background 0.3s ease, transform 0.3s ease;
}
.kv-cta:hover { background: rgba(255,255,255,0.2); transform: translateY(-2px); }
.kv-cta:focus-visible, .kv-arrow:focus-visible, .kv-dot:focus-visible, .kv-back-btn:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 3px;
}

/* ---------- cycler ---------- */
.kv-cycler { display: flex; flex-direction: column; align-items: center; gap: 22px; min-width: 0; }
.kv-stage {
    position: relative;
    width: 100%;
    height: var(--stage-height);
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1600px;
    touch-action: pan-y;
    user-select: none;
    outline: none;
}
.kv-stage:focus-visible { outline: 2px solid rgba(255,255,255,0.5); outline-offset: 6px; border-radius: 16px; }

/* faint dot grid behind the cards */
.kv-stage::before {
    content: '';
    position: absolute;
    inset: -6% -4%;
    background: radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px) 0 0 / 22px 22px;
    -webkit-mask-image: radial-gradient(ellipse at center, #000 25%, transparent 70%);
            mask-image: radial-gradient(ellipse at center, #000 25%, transparent 70%);
    pointer-events: none;
    z-index: 0;
}

.kv-slot {
    position: absolute;
    width: var(--card-width);
    cursor: pointer;
    transform-style: preserve-3d;
    transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease;
    will-change: transform;
}
.kv-tilt {
    transform-style: preserve-3d;
    transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(var(--ts, 1));
    transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}
/* idle drift on the centre card. Uses the separate "translate" property
   so it never fights the tilt transform. */
.kv-slot.is-center .kv-tilt { animation: kv-float 7s ease-in-out infinite alternate; }
@keyframes kv-float {
    from { translate: 0 -6px; }
    to   { translate: 0 8px; }
}
.kv-flip {
    position: relative;
    width: 100%;
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.kv-flip.is-flipped { transform: rotateY(180deg); }

.kv-face {
    width: 100%;
    overflow: hidden;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.16);
    background: rgba(18,18,18,0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    box-shadow: 0 18px 36px -12px rgba(0,0,0,0.55);
    transition: box-shadow 0.5s ease, border-color 0.5s ease;
}
.kv-slot.is-center .kv-face {
    border-color: rgba(255,255,255,0.28);
    box-shadow: 0 40px 80px -20px rgba(0,0,0,0.85), 0 0 60px -10px rgba(255,255,255,0.12);
}
.kv-slot.is-center .kv-tilt:hover .kv-face {
    border-color: rgba(255,255,255,0.5);
    box-shadow: 0 50px 90px -20px rgba(0,0,0,0.9), 0 0 80px -10px rgba(255,255,255,0.25);
}
.kv-front { position: relative; z-index: 2; }
.kv-back {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    transform: rotateY(180deg);
    background: rgba(10,10,10,0.92);
}

/* ---------- browser window ---------- */
.kv-bar {
    height: 34px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 0 12px;
    background: rgba(255,255,255,0.05);
    border-bottom: 1px solid rgba(255,255,255,0.1);
}
.kv-light { width: 11px; height: 11px; border-radius: 50%; }
.kv-url {
    flex: 1;
    min-width: 0;
    margin-left: 10px;
    height: 20px;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 10px;
    border-radius: 999px;
    background: rgba(255,255,255,0.07);
    color: rgba(255,255,255,0.45);
    font-family: sans-serif;
    font-size: 10px;
    letter-spacing: 0.04em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.kv-lock {
    width: 6px; height: 6px; border-radius: 50%;
    background: #27C93F;
    box-shadow: 0 0 8px #27C93F;
    flex-shrink: 0;
}
.kv-live {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-left: 6px;
    color: rgba(255,255,255,0.7);
    font-family: TitleFont, sans-serif;
    font-size: 0.55rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
}
.kv-live-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #FF3B5C;
    box-shadow: 0 0 8px #FF3B5C;
    animation: kv-pulse 1.6s ease-in-out infinite;
}
@keyframes kv-pulse { 50% { opacity: 0.25; transform: scale(0.7); } }

.kv-screen {
    position: relative;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    background: #000;
}
.kv-shot {
    display: block;
    width: 100%;
    min-height: 100%;
    height: auto;
    object-fit: cover;
    object-position: top;
    filter: var(--media-invert, invert(0));
    transform: translateY(0);
    transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
/* the "site" slowly scrolls while you look at it */
.kv-slot.is-center:hover .kv-shot {
    transform: translateY(calc(var(--scroll, 0px) * -1));
    transition: transform var(--scroll-time, 4s) cubic-bezier(0.45, 0.05, 0.55, 0.95);
}

/* CRT scanlines, fade out when you engage with the card */
.kv-scanlines {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0 2px, rgba(0,0,0,0.26) 2px 3px);
    mix-blend-mode: multiply;
    opacity: 0.65;
    transition: opacity 0.5s ease;
}
.kv-slot.is-center .kv-tilt:hover .kv-scanlines { opacity: 0.2; }

.kv-glare {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.28), transparent 55%);
    mix-blend-mode: soft-light;
    transition: opacity 0.4s ease;
}
.kv-slot.is-center .kv-tilt:hover .kv-glare { opacity: 1; }

/* RGB-split glitch burst */
.kv-screen.is-glitching { animation: kv-glitch 0.5s steps(2, end); }
@keyframes kv-glitch {
    0%   { transform: translate(0,0);      clip-path: inset(0 0 0 0);
           filter: drop-shadow(4px 0 0 rgba(255,0,60,0.8)) drop-shadow(-4px 0 0 rgba(0,255,240,0.8)); }
    20%  { transform: translate(-6px,2px); clip-path: inset(12% 0 62% 0); }
    40%  { transform: translate(5px,-2px); clip-path: inset(58% 0 14% 0); }
    60%  { transform: translate(-3px,0);   clip-path: inset(30% 0 40% 0); }
    80%  { transform: translate(2px,1px);  clip-path: inset(0 0 0 0); }
    100% { transform: translate(0,0);      clip-path: inset(0 0 0 0); filter: none; }
}

.kv-dim { position: absolute; inset: 0; background: #000; pointer-events: none; transition: opacity 0.6s ease; }

/* ---------- card back ---------- */
.kv-back-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 28px;
}
.kv-back-title { color: #fff; font-family: TitleFont, sans-serif; font-size: 1.5rem; margin: 0 0 14px; }
.kv-back-text { color: rgba(255,255,255,0.72); font-family: TextFont, sans-serif; font-size: 0.9rem; line-height: 1.6; margin: 0; }
.kv-back-tools { color: rgba(255,255,255,0.4); font-size: 0.75rem; letter-spacing: 0.08em; margin: 18px 0 0; }
.kv-back-btn {
    margin-top: 26px;
    padding: 9px 18px;
    border-radius: 6px;
    background: #fff;
    color: #000;
    text-decoration: none;
    font-family: SubtitleFont, sans-serif;
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: transform 0.25s ease;
}
.kv-back-btn:hover { transform: scale(1.05); }

.kv-floor {
    position: absolute;
    bottom: 4%;
    width: calc(var(--card-width) * 0.9);
    height: 40px;
    background: radial-gradient(ellipse at center, rgba(255,255,255,0.14), transparent 70%);
    filter: blur(14px);
    pointer-events: none;
    z-index: 0;
}

/* ---------- controls ---------- */
.kv-controls { display: flex; align-items: center; gap: 18px; }
.kv-arrow {
    width: var(--arrow-size);
    height: var(--arrow-size);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.1rem;
    cursor: pointer;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: background 0.3s ease, transform 0.3s ease;
}
.kv-arrow:hover { background: rgba(255,255,255,0.22); transform: scale(1.08); }

.kv-dots { display: flex; align-items: center; gap: 8px; }
.kv-dot {
    position: relative;
    width: 10px;
    height: 10px;
    padding: 0;
    border: none;
    border-radius: 999px;
    overflow: hidden;
    cursor: pointer;
    background: rgba(255,255,255,0.25);
    transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease;
}
.kv-dot:hover { background: rgba(255,255,255,0.5); }
.kv-dot.is-active { width: 44px; }
.kv-dot-fill {
    position: absolute;
    inset: 0;
    background: #fff;
    transform-origin: left center;
    transform: scaleX(0);
    animation-name: kv-fill;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
}
.kv-dot-fill.is-paused { animation-play-state: paused; }
.kv-dot-fill.is-static { transform: scaleX(1); animation: none; }
@keyframes kv-fill { to { transform: scaleX(1); } }

.kv-count { min-width: 64px; text-align: center; font-family: TitleFont, sans-serif; color: #fff; font-size: 0.95rem; letter-spacing: 0.1em; overflow: hidden; }
.kv-count-num { display: inline-block; animation: kv-count-in 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.kv-count-total { opacity: 0.4; }
@keyframes kv-count-in { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

.kv-hint { margin: 0; color: rgba(255,255,255,0.4); font-family: TextFont, sans-serif; font-size: 0.8rem; text-align: center; }

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
    .kv-slot, .kv-tilt, .kv-flip, .kv-shot, .kv-dim, .kv-dot { transition-duration: 0.01ms !important; }
    .kv-slot.is-center .kv-tilt, .kv-live-dot, .kv-screen.is-glitching, .kv-count-num { animation: none !important; }
    .kv-slot.is-center:hover .kv-shot { transform: none; }
}
`;