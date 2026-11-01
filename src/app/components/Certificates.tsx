"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  EDIT YOUR CERTIFICATES HERE                                        */
/* ------------------------------------------------------------------ */
type Cert = {
    title: string;
    issuer: string;
    year: string;
    image: string;
    url: string;
};

const CERTS: Cert[] = [
    { title: "Cloud Computing", issuer: "Amazon Web Services", year: "2026", image: "/certificates/cloud_award.png", url: "https://space.springpod.com/certificate/56tcr4tfsjmm/share" },
    { title: "Data Analytics", issuer: "Barclays", year: "2026", image: "/certificates/analytics_award.jpg", url: "https://space.springpod.com/certificate/k8d74c6uj4j8/share" },
    { title: "Developer", issuer: "Barclays", year: "2026", image: "/certificates/dev_award.png", url: "https://space.springpod.com/certificate/qcbnmfki0ka2/share" },
    { title: "Cyber Security", issuer: "Drax Enterprise", year: "2026", image: "/certificates/drax_award.png", url: "https://space.springpod.com/certificate/y89vmga09ja5/share" },
];

const TOTAL_AWARDS = 1;

/* How the deck fans out behind the front card (index = depth) */
const FAN = [
    { x: 0, y: 0, r: 0, s: 1 },
    { x: 44, y: -28, r: 3.5, s: 0.95 },
    { x: -38, y: -52, r: -3, s: 0.9 },
    { x: 70, y: -76, r: 5, s: 0.85 },
];

const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export default function Certificates() {
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
                .fromTo(".cc-eyebrow", { y: 28, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out" })
                .fromTo(".cc-line-in", { yPercent: 110 }, { yPercent: 0, stagger: 0.25, ease: "power3.out" }, "<0.1")
                .fromTo(
                    ".cc-lead, .cc-meta, .cc-meta > div",
                    { y: 28, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.1, ease: "power2.out" },
                    "<0.35"
                );

            /* ---- Stat numbers count up once ---- */
            gsap.utils.toArray<HTMLElement>(".cc-count-up").forEach((el) => {
                const target = Number(el.dataset.count || 0);
                const state = { v: 0 };
                el.textContent = pad(0);
                gsap.to(state, {
                    v: target,
                    duration: 1.4,
                    ease: "power2.out",
                    onUpdate: () => (el.textContent = pad(Math.round(state.v))),
                    scrollTrigger: { trigger: el, start: "top 90%", once: true },
                });
            });

            /* ---- Deck parallax (scrubbed) ---- */
            gsap.fromTo(
                ".cc-stack",
                { y: 70 },
                {
                    y: -40,
                    ease: "none",
                    scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.2 },
                }
            );

            /* ---- Boot-up: front card wipes in, un-blurs, VERIFIED flickers on,
                   the rest of the deck follows ---- */
            const stack = section.querySelector<HTMLElement>(".cc-stack");
            const front = ".cc-card.is-front";
            const back = ".cc-card:not(.is-front)";

            gsap.timeline({
                scrollTrigger: { trigger: ".cc-visuals", start: "top 85%", once: true },
            })
                .fromTo(
                    `${front} .cc-face`,
                    { clipPath: "inset(0 100% 0 0)" },
                    { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "expo.out", clearProps: "clipPath" }
                )
                .fromTo(
                    `${front} .cc-screen`,
                    { filter: "blur(14px) brightness(1.8)" },
                    { filter: "blur(0px) brightness(1)", duration: 1.2, ease: "power3.out", clearProps: "filter" },
                    "-=0.7"
                )
                .fromTo(
                    `${front} .cc-img`,
                    { scale: 1.12 },
                    { scale: 1, duration: 1.2, ease: "power3.out", clearProps: "transform,scale" },
                    "<"
                )
                .call(() => stack?.classList.add("is-live"), [], "-=1.1") // starts the stamp
                .fromTo(
                    ".cc-verified",
                    { opacity: 0 },
                    { opacity: 1, duration: 0.15, repeat: 5, yoyo: true, ease: "steps(1)" },
                    "-=0.6"
                )
                .set(".cc-verified", { opacity: 1 })
                .fromTo(
                    `${back} .cc-face`,
                    { clipPath: "inset(0 100% 0 0)" },
                    { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "expo.out", stagger: 0.15, clearProps: "clipPath" },
                    "-=1.2"
                )
                .fromTo(
                    ".cc-controls, .cc-hint",
                    { y: 16, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.1 },
                    "-=0.6"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="cc-section" style={{ width: "100%", position: "relative", zIndex: 10 }}>
            <style dangerouslySetInnerHTML={{ __html: CSS }} />
            <div className="cc-glow" aria-hidden="true" />

            <div className="cc-grid">
                {/* Deck */}
                <div className="cc-visuals">
                    <CertificateDeck certs={CERTS} />
                </div>

                {/* Copy */}
                <div className="cc-copy">
                    <span className="cc-eyebrow">— Certificates / 08</span>
                    <h2 className="cc-title">
                        <span className="cc-line">
                            <span className="cc-line-in">verified</span>
                        </span>
                        <span className="cc-line">
                            <span className="cc-line-in" style={{ fontFamily: "SubtitleFont, sans-serif" }}>
                                AWARDS
                            </span>
                        </span>
                    </h2>

                    <p className="cc-lead">
                        An archive of official certifications and milestones, documenting ongoing education and
                        professional development across various digital disciplines.
                    </p>

                    <div className="cc-meta">
                        <div>
                            <p className="cc-meta-label">Total Certs</p>
                            <p className="cc-meta-value cc-count-up" data-count={CERTS.length}>
                                {pad(CERTS.length)}
                            </p>
                        </div>
                        <div>
                            <p className="cc-meta-label">Total Awards</p>
                            <p className="cc-meta-value cc-count-up" data-count={TOTAL_AWARDS}>
                                {pad(TOTAL_AWARDS)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*  Deck                                                               */
/* ------------------------------------------------------------------ */
function CertificateDeck({ certs }: { certs: Cert[] }) {
    const n = certs.length;
    const [active, setActive] = useState(0);

    const startX = useRef<number | null>(null);
    const dragged = useRef(false);

    const go = useCallback((dir: number) => setActive((p) => (p + dir + n) % n), [n]);
    const open = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

    return (
        <div className="cc-deck">
            <div
                className="cc-stack"
                tabIndex={0}
                role="group"
                aria-roledescription="carousel"
                aria-label="Certificates"
                onKeyDown={(e) => {
                    if (e.key === "ArrowRight") go(1);
                    else if (e.key === "ArrowLeft") go(-1);
                    else if (e.key === "Enter" && e.target === e.currentTarget) open(certs[active].url);
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
                {certs.map((c, i) => {
                    const d = (i - active + n) % n; // 0 = front, 1.. = behind
                    return (
                        <CertCard
                            key={c.title}
                            cert={c}
                            d={d}
                            onClick={() => {
                                if (dragged.current) return;
                                if (d === 0) open(c.url);
                                else setActive(i);
                            }}
                        />
                    );
                })}
            </div>

            <div className="cc-controls">
                <button className="cc-arrow" onClick={() => go(-1)} aria-label="Previous certificate">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                </button>

                <div className="cc-dots" role="tablist" aria-label="Choose a certificate">
                    {certs.map((c, i) => (
                        <button
                            key={c.title}
                            role="tab"
                            aria-selected={i === active}
                            aria-label={`Show ${c.title}`}
                            className={`cc-dot ${i === active ? "is-active" : ""}`}
                            onClick={() => setActive(i)}
                        />
                    ))}
                </div>

                <span className="cc-counter" aria-live="polite">
                    <span key={active} className="cc-counter-num">{pad(active + 1)}</span>
                    <span className="cc-counter-total"> / {pad(n)}</span>
                </span>

                <button className="cc-arrow" onClick={() => go(1)} aria-label="Next certificate">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                </button>
            </div>

            <p className="cc-hint">Click the front card to verify it. Drag or use the arrow keys to shuffle.</p>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Card                                                               */
/* ------------------------------------------------------------------ */
function CertCard({ cert, d, onClick }: { cert: Cert; d: number; onClick: () => void }) {
    const isFront = d === 0;
    const visible = d < FAN.length;
    const p = FAN[Math.min(d, FAN.length - 1)];

    const tiltRef = useRef<HTMLDivElement>(null);
    const screenRef = useRef<HTMLDivElement>(null);
    const glitchTimer = useRef<number | undefined>(undefined);
    const wasFront = useRef(isFront);

    // RGB-split glitch burst when a card is shuffled to the front
    const burst = useCallback(() => {
        const el = screenRef.current;
        if (!el) return;
        el.classList.add("is-glitching");
        window.clearTimeout(glitchTimer.current);
        glitchTimer.current = window.setTimeout(() => el.classList.remove("is-glitching"), 500);
    }, []);

    useEffect(() => {
        if (isFront && !wasFront.current) burst();
        wasFront.current = isFront;
    }, [isFront, burst]);

    useEffect(() => () => window.clearTimeout(glitchTimer.current), []);

    const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const el = tiltRef.current;
        if (!el || !isFront || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--ry", `${(px - 0.5) * 14}deg`);
        el.style.setProperty("--rx", `${-(py - 0.5) * 14}deg`);
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
    };

    const onLeave = () => {
        const el = tiltRef.current;
        if (!el) return;
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--ts", "1");
    };

    return (
        <div
            className={`cc-card ${isFront ? "is-front" : ""}`}
            onClick={onClick}
            style={{
                transform: `translate(calc(${p.x}px * var(--fan, 1)), calc(${p.y}px * var(--fan, 1))) rotate(${p.r}deg) scale(${p.s})`,
                opacity: visible ? 1 : 0,
                zIndex: 20 - d,
                pointerEvents: visible ? "auto" : "none",
            }}
        >
            <div ref={tiltRef} className="cc-tilt" onPointerMove={onMove} onPointerLeave={onLeave}>
                <div className="cc-face">
                    {/* window bar */}
                    <div className="cc-bar">
                        <span className="cc-light" style={{ background: "#FF5F56" }} />
                        <span className="cc-light" style={{ background: "#FFBD2E" }} />
                        <span className="cc-light" style={{ background: "#27C93F" }} />
                        <span className="cc-file">CERT_{cert.year}.PDF</span>
                        <span className="cc-verified">
                            <span className="cc-verified-dot" />
                            Verified
                        </span>
                    </div>

                    {/* certificate image */}
                    <div ref={screenRef} className="cc-screen">
                        <img className="cc-img" src={cert.image} alt={`${cert.title} certificate`} draggable={false} />
                        <div className="cc-scanlines" aria-hidden="true" />
                        <div className="cc-foil" aria-hidden="true" />
                        <div className="cc-stamp" aria-hidden="true">✓ Verified</div>
                        <div className="cc-dim" style={{ opacity: isFront ? 0 : 0.2 + d * 0.12 }} aria-hidden="true" />
                    </div>

                    {/* details */}
                    <div className="cc-foot">
                        <div>
                            <h3 className="cc-foot-title">{cert.title}</h3>
                            <p className="cc-foot-issuer">{cert.issuer}</p>
                        </div>
                        <div className="cc-foot-row">
                            <span className="cc-year">{cert.year}</span>
                            <a
                                className="cc-verify"
                                href={cert.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                tabIndex={isFront ? 0 : -1}
                                onClick={(e) => e.stopPropagation()}
                            >
                                Verify link
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M8 7h9v9" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */
const CSS = `
.cc-section {
    --section-pad: 120px 40px;
    --grid-cols: 1.2fr 1fr;
    --grid-gap: 60px;
    --copy-inset: 60px;
    --stack-pad: 90px 70px 24px;
    --fan: 1;
    --arrow-size: 44px;
    --copy-align: flex-end;
    --copy-text: right;
    --meta-justify: flex-end;
    overflow: hidden;
}
@media (max-width: 1024px) {
    .cc-section {
        --section-pad: 80px 40px;
        --grid-cols: 1fr;
        --grid-gap: 50px;
        --copy-inset: 0px;
        --copy-align: flex-start;
        --copy-text: left;
        --meta-justify: flex-start;
    }
    .cc-copy { order: -1; }
}
@media (max-width: 768px) {
    .cc-section {
        --section-pad: 60px 20px;
        --grid-gap: 36px;
        --stack-pad: 70px 34px 16px;
        --fan: 0.6;
        --arrow-size: 40px;
    }
}

/* ---------- layout + copy ---------- */
.cc-glow {
    position: absolute;
    left: -10%;
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
.cc-grid {
    max-width: 1600px;
    margin: 0 auto;
    padding: var(--section-pad);
    display: grid;
    grid-template-columns: var(--grid-cols);
    gap: var(--grid-gap);
    align-items: center;
    position: relative;
    z-index: 1;
}
.cc-visuals { min-width: 0; display: flex; justify-content: center; }
.cc-copy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: var(--copy-align);
    text-align: var(--copy-text);
    padding-right: var(--copy-inset);
}
.cc-eyebrow {
    color: #fff;
    opacity: 0.5;
    font-family: TitleFont, sans-serif;
    font-size: 0.9rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
}
.cc-title {
    color: #fff;
    font-family: TitleFont, Impact, sans-serif;
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: 900;
    line-height: 0.9;
    letter-spacing: -0.02em;
    margin: 10px 0 36px;
}
.cc-line { display: block; overflow: hidden; padding: 0.08em 0; margin: -0.08em 0; }
.cc-line-in { display: block; will-change: transform; }
.cc-lead {
    color: #fff;
    opacity: 0.8;
    max-width: 500px;
    font-family: TextFont, sans-serif;
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.5;
    margin: 0 0 30px;
}
.cc-meta {
    display: flex;
    justify-content: var(--meta-justify);
    gap: 40px;
    width: 100%;
    max-width: 500px;
    padding-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.2);
}
.cc-meta-label {
    color: rgba(255,255,255,0.4);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 0 0 4px;
}
.cc-meta-value { color: #fff; font-family: TitleFont, sans-serif; font-size: 1.4rem; font-weight: bold; margin: 0; font-variant-numeric: tabular-nums; }

/* ---------- deck ---------- */
.cc-deck { width: 100%; max-width: 640px; display: flex; flex-direction: column; align-items: center; gap: 22px; }
.cc-stack {
    position: relative;
    width: 100%;
    display: grid;
    padding: var(--stack-pad);
    touch-action: pan-y;
    user-select: none;
    outline: none;
}
.cc-stack:focus-visible { outline: 2px solid rgba(255,255,255,0.5); outline-offset: 6px; border-radius: 16px; }
/* faint dot grid behind the deck */
.cc-stack::before {
    content: '';
    position: absolute;
    inset: -4% -2%;
    background: radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px) 0 0 / 22px 22px;
    -webkit-mask-image: radial-gradient(ellipse at center, #000 25%, transparent 70%);
            mask-image: radial-gradient(ellipse at center, #000 25%, transparent 70%);
    pointer-events: none;
}

.cc-card {
    grid-area: 1 / 1;
    cursor: pointer;
    transform-origin: 50% 100%;
    transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
    will-change: transform;
}
.cc-tilt {
    transform: perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(var(--ts, 1));
    transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}
/* idle drift on the front card (separate "translate" prop so it never fights the tilt) */
.cc-card.is-front .cc-tilt { animation: cc-float 7s ease-in-out infinite alternate; }
@keyframes cc-float { from { translate: 0 -5px; } to { translate: 0 7px; } }

.cc-face {
    overflow: hidden;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(18,18,18,0.72);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 18px 36px -12px rgba(0,0,0,0.55);
    transition: border-color 0.4s ease, box-shadow 0.4s ease;
}
.cc-card.is-front .cc-face {
    border-color: rgba(255,255,255,0.28);
    box-shadow: 0 40px 80px -20px rgba(0,0,0,0.85), 0 0 60px -10px rgba(255,255,255,0.12);
}
.cc-card.is-front .cc-tilt:hover .cc-face {
    border-color: rgba(255,255,255,0.5);
    box-shadow: 0 50px 90px -20px rgba(0,0,0,0.9), 0 0 80px -10px rgba(255,255,255,0.25);
}

/* window bar */
.cc-bar {
    height: 34px;
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 0 12px;
    background: rgba(255,255,255,0.05);
    border-bottom: 1px solid rgba(255,255,255,0.1);
}
.cc-light { width: 11px; height: 11px; border-radius: 50%; flex-shrink: 0; }
.cc-file {
    flex: 1;
    min-width: 0;
    margin-left: 10px;
    padding: 3px 10px;
    border-radius: 999px;
    background: rgba(255,255,255,0.07);
    color: rgba(255,255,255,0.45);
    font-family: sans-serif;
    font-size: 10px;
    letter-spacing: 0.08em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.cc-verified {
    display: flex;
    align-items: center;
    gap: 5px;
    color: rgba(255,255,255,0.7);
    font-family: TitleFont, sans-serif;
    font-size: 0.55rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
}
.cc-verified-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #27C93F;
    box-shadow: 0 0 8px #27C93F;
    animation: cc-pulse 1.6s ease-in-out infinite;
}
@keyframes cc-pulse { 50% { opacity: 0.25; transform: scale(0.7); } }

/* screen */
.cc-screen { position: relative; aspect-ratio: 16 / 10; overflow: hidden; background: #000; }
.cc-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.85;
    transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
}
.cc-card.is-front .cc-tilt:hover .cc-img { transform: scale(1.05); opacity: 1; }

.cc-scanlines {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0 2px, rgba(0,0,0,0.26) 2px 3px);
    mix-blend-mode: multiply;
    opacity: 0.6;
    transition: opacity 0.5s ease;
}
.cc-card.is-front .cc-tilt:hover .cc-scanlines { opacity: 0.15; }

/* holographic foil that follows the cursor */
.cc-foil {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    mix-blend-mode: screen;
    background: linear-gradient(110deg,
        transparent 25%,
        rgba(255,60,172,0.38) 38%,
        rgba(0,240,255,0.38) 50%,
        rgba(255,240,80,0.32) 62%,
        transparent 75%) no-repeat;
    background-size: 240% 100%;
    background-position: calc(100% - var(--mx, 50%)) 0;
    transition: opacity 0.4s ease;
}
.cc-card.is-front .cc-tilt:hover .cc-foil { opacity: 1; }

/* rubber stamp that slams down on the front card */
.cc-stamp {
    position: absolute;
    right: 14px;
    bottom: 14px;
    padding: 5px 12px;
    border: 2px solid rgba(255,255,255,0.9);
    border-radius: 6px;
    color: #fff;
    font-family: TitleFont, sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    background: rgba(0,0,0,0.45);
    opacity: 0;
    transform: rotate(-8deg);
    pointer-events: none;
}
.cc-stack.is-live .cc-card.is-front .cc-stamp { animation: cc-stamp 0.6s cubic-bezier(0.2, 1.4, 0.4, 1) 0.45s both; }
@keyframes cc-stamp {
    from { opacity: 0; transform: scale(2.4) rotate(-24deg); }
    to   { opacity: 0.92; transform: scale(1) rotate(-8deg); }
}

/* RGB-split glitch burst */
.cc-screen.is-glitching { animation: cc-glitch 0.5s steps(2, end); }
@keyframes cc-glitch {
    0%   { transform: translate(0,0);      clip-path: inset(0 0 0 0);
           filter: drop-shadow(4px 0 0 rgba(255,0,60,0.8)) drop-shadow(-4px 0 0 rgba(0,255,240,0.8)); }
    20%  { transform: translate(-6px,2px); clip-path: inset(12% 0 62% 0); }
    40%  { transform: translate(5px,-2px); clip-path: inset(58% 0 14% 0); }
    60%  { transform: translate(-3px,0);   clip-path: inset(30% 0 40% 0); }
    80%  { transform: translate(2px,1px);  clip-path: inset(0 0 0 0); }
    100% { transform: translate(0,0);      clip-path: inset(0 0 0 0); filter: none; }
}

.cc-dim { position: absolute; inset: 0; background: #000; pointer-events: none; transition: opacity 0.6s ease; }

/* footer */
.cc-foot {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px 22px 22px;
    border-top: 1px solid rgba(255,255,255,0.1);
    background: rgba(0,0,0,0.25);
}
.cc-foot-title {
    margin: 0 0 6px;
    color: #fff;
    font-family: SubtitleFont, system-ui, sans-serif;
    font-size: clamp(1.1rem, 2.4vw, 1.4rem);
    font-weight: 700;
    letter-spacing: 0.05em;
}
.cc-foot-issuer { margin: 0; color: rgba(255,255,255,0.6); font-family: TextFont, system-ui, sans-serif; font-size: 0.95rem; }
.cc-foot-row { display: flex; justify-content: space-between; align-items: center; }
.cc-year {
    padding: 4px 12px;
    border-radius: 20px;
    background: #fff;
    color: #000;
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 0.1em;
}
.cc-verify {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    font-family: TextFont, sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: color 0.3s ease, gap 0.3s ease;
}
.cc-verify:hover, .cc-card.is-front:hover .cc-verify { color: #fff; gap: 10px; }
.cc-verify:focus-visible, .cc-arrow:focus-visible, .cc-dot:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }

/* ---------- controls ---------- */
.cc-controls { display: flex; align-items: center; gap: 18px; }
.cc-arrow {
    width: var(--arrow-size);
    height: var(--arrow-size);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: background 0.3s ease, transform 0.3s ease;
}
.cc-arrow:hover { background: rgba(255,255,255,0.22); transform: scale(1.08); }
.cc-dots { display: flex; align-items: center; gap: 8px; }
.cc-dot {
    width: 10px;
    height: 10px;
    padding: 0;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    background: rgba(255,255,255,0.25);
    transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease;
}
.cc-dot:hover { background: rgba(255,255,255,0.5); }
.cc-dot.is-active { width: 40px; background: #fff; }

.cc-counter { min-width: 64px; text-align: center; font-family: TitleFont, sans-serif; color: #fff; font-size: 0.95rem; letter-spacing: 0.1em; overflow: hidden; }
.cc-counter-num { display: inline-block; animation: cc-counter-in 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.cc-counter-total { opacity: 0.4; }
@keyframes cc-counter-in { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

.cc-hint { margin: 0; color: rgba(255,255,255,0.4); font-family: TextFont, sans-serif; font-size: 0.8rem; text-align: center; }

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
    .cc-card, .cc-tilt, .cc-img, .cc-dim, .cc-dot { transition-duration: 0.01ms !important; }
    .cc-card.is-front .cc-tilt, .cc-verified-dot, .cc-screen.is-glitching, .cc-counter-num { animation: none !important; }
    .cc-stack .cc-card.is-front .cc-stamp { animation: none !important; opacity: 0.92; }
}
`;