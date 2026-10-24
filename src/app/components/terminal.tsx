"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  EDIT YOUR SNIPPETS HERE                                            */
/* ------------------------------------------------------------------ */
const SNIPPETS: Record<string, { file: string; code: string }> = {
    HTML: {
        file: "INDEX.HTML",
        code: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>SYS // @H4TFI3LD</title>\n  <link rel=\"stylesheet\" href=\"/core.css\">\n</head>\n<body class=\"dark-mode\">\n  <div id=\"root\"></div>\n  <script type=\"module\" src=\"/main.tsx\"></script>\n</body>\n</html>",
    },
    CSS: {
        file: "STYLES.CSS",
        code: ":root {\n  --bg: #000;\n  --grid: rgba(255, 255, 255, 0.1);\n}\n\n.mac-os-window {\n  border: 1px solid var(--grid);\n  background: rgba(20, 20, 20, 0.8);\n  backdrop-filter: blur(16px);\n}\n\nh1 {\n  text-transform: uppercase;\n}",
    },
    JS: {
        file: "SCRIPT.JS",
        code: "const bootSystem = async () => {\n  console.log('[SYS] Initiating...');\n  try {\n    const res = await fetch('/api/config');\n    if ((await res.json()).status === 'OK') {\n      document.body.classList.add('ready');\n      console.log('[SYS] System Online.');\n    }\n  } catch (err) {\n    console.error('[ERR] Boot failure.', err);\n  }\n};\n\nbootSystem();",
    },
    TSX: {
        file: "PAGE.TSX",
        code: "import { useState } from 'react';\nimport { BrutalistUI } from '@h4tfi3ld';\n\nexport default function SysConsole({ user }) {\n  const [status] = useState<'ON' | 'OFF'>('ON');\n\n  if (!user) return <div>ACCESS DENIED</div>;\n\n  return (\n    <BrutalistUI theme=\"dark\">\n      <h1>WELCOME, {user}</h1>\n      <p>System Status: [{status}]</p>\n    </BrutalistUI>\n  );\n}",
    },
};

const TABS = Object.keys(SNIPPETS);
const MAX_LINES = Math.max(...TABS.map((t) => SNIPPETS[t].code.split("\n").length));
const TYPE_MS = 14;
const GITHUB = "https://github.com/revokedkystar";

const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ */
/*  Tiny syntax highlighter (works on partially-typed code)            */
/* ------------------------------------------------------------------ */
const JS_RULE =
    /(?<c>\/\/.*$|\/\*[\s\S]*?(?:\*\/|$))|(?<s>'[^'\n]*(?:'|$)|"[^"\n]*(?:"|$)|`[^`]*(?:`|$))|(?<t><\/?[A-Za-z][\w.]*)|(?<k>\b(?:const|let|var|async|await|try|catch|if|return|import|from|export|default|function|new|typeof)\b)|(?<n>\b\d+(?:\.\d+)?\b)|(?<f>\b[A-Za-z_$][\w$]*(?=\())/gm;

const RULES: Record<string, RegExp> = {
    HTML: /(?<c><!--[\s\S]*?(?:-->|$))|(?<s>"[^"\n]*(?:"|$))|(?<t><\/?[A-Za-z!][\w!-]*)|(?<a>\b[\w-]+(?==))/gm,
    CSS: /(?<c>\/\*[\s\S]*?(?:\*\/|$))|(?<v>--[\w-]+)|(?<p>\b[a-z-]+(?=\s*:))|(?<n>#[0-9a-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|s)?)|(?<f>\b[a-z-]+(?=\())|(?<k>^[.#:]?[\w-]+(?=\s*\{))/gm,
    JS: JS_RULE,
    TSX: JS_RULE,
};

function highlight(code: string, lang: string): React.ReactNode[] {
    const out: React.ReactNode[] = [];
    let last = 0;
    let key = 0;
    for (const m of Array.from(code.matchAll(RULES[lang]))) {
        const idx = m.index ?? 0;
        if (!m[0]) continue;
        if (idx > last) out.push(code.slice(last, idx));
        const groups = m.groups ?? {};
        const kind = Object.keys(groups).find((g) => groups[g] !== undefined);
        out.push(
            <span key={key++} className={`tk tk-${kind}`}>
                {m[0]}
            </span>
        );
        last = idx + m[0].length;
    }
    if (last < code.length) out.push(code.slice(last));
    return out;
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export default function TechStack() {
    const sectionRef = useRef<HTMLElement>(null);
    const tiltRef = useRef<HTMLDivElement>(null);
    const screenRef = useRef<HTMLDivElement>(null);
    const glitchTimer = useRef<number | undefined>(undefined);
    const reducedRef = useRef(false);
    const firstTab = useRef(true);

    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [count, setCount] = useState(0); // characters typed so far
    const [started, setStarted] = useState(false); // typing begins after the boot-up

    const code = SNIPPETS[activeTab].code;
    const shown = code.slice(0, count);
    const lines = shown.split("\n");
    const ln = lines.length;
    const col = lines[ln - 1].length + 1;
    const typing = started && count < code.length;
    const totalLines = code.split("\n").length;

    /* ---- RGB-split glitch burst ---- */
    const burst = useCallback(() => {
        const el = screenRef.current;
        if (!el) return;
        el.classList.add("is-glitching");
        window.clearTimeout(glitchTimer.current);
        glitchTimer.current = window.setTimeout(() => el.classList.remove("is-glitching"), 500);
    }, []);

    useEffect(() => () => window.clearTimeout(glitchTimer.current), []);

    /* ---- Scroll animations ---- */
    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        reducedRef.current = reduce;
        if (reduce) {
            setStarted(true);
            return;
        }

        const ctx = gsap.context(() => {
            const section = sectionRef.current;
            if (!section) return;

            /* Copy: scrubbed rise, title lines slide up out of a mask */
            gsap.timeline({
                scrollTrigger: { trigger: section, start: "top 80%", end: "top 25%", scrub: 1 },
            })
                .fromTo(".ts-eyebrow", { y: 28, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out" })
                .fromTo(".ts-rule", { scaleX: 0 }, { scaleX: 1, ease: "power2.out" }, "<")
                .fromTo(".ts-line-in", { yPercent: 110 }, { yPercent: 0, stagger: 0.25, ease: "power3.out" }, "<0.1")
                .fromTo(
                    ".ts-lead, .ts-meta, .ts-cta",
                    { y: 28, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.12, ease: "power2.out" },
                    "<0.35"
                );

            /* Language count ticks up once */
            gsap.utils.toArray<HTMLElement>(".ts-count-up").forEach((el) => {
                const target = Number(el.dataset.count || 0);
                const state = { v: 0 };
                el.textContent = pad(0);
                gsap.to(state, {
                    v: target,
                    duration: 1.2,
                    ease: "power2.out",
                    onUpdate: () => (el.textContent = pad(Math.round(state.v))),
                    scrollTrigger: { trigger: el, start: "top 90%", once: true },
                });
            });

            /* Terminal parallax (scrubbed) */
            gsap.fromTo(
                ".ts-term",
                { y: 80 },
                {
                    y: -30,
                    ease: "none",
                    scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.2 },
                }
            );

                /* Boot-up: window wipes in, un-blurs, LIVE flickers on,
               tabs + status bar settle in, then the code starts typing */
            gsap.timeline({
                scrollTrigger: { trigger: ".ts-term", start: "top 85%", once: true },
            })
                .fromTo(
                    ".ts-window",
                    { clipPath: "inset(0 100% 0 0)" },
                    { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "expo.out", clearProps: "clipPath" }
                )
                .fromTo(
                    ".ts-screen",
                    { filter: "blur(14px) brightness(1.8)" },
                    { filter: "blur(0px) brightness(1)", duration: 1.2, ease: "power3.out", clearProps: "filter" },
                    "-=0.7"
                )
                .fromTo(
                    ".ts-live",
                    { opacity: 0 },
                    { opacity: 1, duration: 0.15, repeat: 5, yoyo: true, ease: "steps(1)" },
                    "-=0.6"
                )
                .set(".ts-live", { opacity: 1 })
                .fromTo(
                    ".ts-tabs, .ts-status",
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 },
                    "-=0.7"
                )
                .call(() => setStarted(true), [], "-=0.2");
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    /* ---- Typewriter (restarts on tab change, waits for boot-up) ---- */
    useEffect(() => {
        if (!started) return;
        const total = SNIPPETS[activeTab].code.length;
        if (reducedRef.current) {
            setCount(total);
            return;
        }
        setCount(0);
        let i = 0;
        const id = window.setInterval(() => {
            i += 1;
            setCount(i);
            if (i >= total) window.clearInterval(id);
        }, TYPE_MS);
        return () => window.clearInterval(id);
    }, [activeTab, started]);

    /* glitch whenever the file changes */
    useEffect(() => {
        if (firstTab.current) {
            firstTab.current = false;
            return;
        }
        burst();
    }, [activeTab, burst]);

    /* ---- Tilt + glare ---- */
    const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const el = tiltRef.current;
        if (!el || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--ry", `${(px - 0.5) * 8}deg`);
        el.style.setProperty("--rx", `${-(py - 0.5) * 8}deg`);
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
    };
    const onEnter = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== "mouse") return;
        tiltRef.current?.style.setProperty("--ts", "1.015");
    };
    const onLeave = () => {
        const el = tiltRef.current;
        if (!el) return;
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--ts", "1");
    };

    const onTabKey = (e: React.KeyboardEvent) => {
        const i = TABS.indexOf(activeTab);
        if (e.key === "ArrowRight") setActiveTab(TABS[(i + 1) % TABS.length]);
        else if (e.key === "ArrowLeft") setActiveTab(TABS[(i - 1 + TABS.length) % TABS.length]);
    };

    return (
        <section ref={sectionRef} className="ts-section" style={{ width: "100%", position: "relative", zIndex: 10 }}>
            <style dangerouslySetInnerHTML={{ __html: CSS }} />
            <div className="ts-glow" aria-hidden="true" />

            <div className="ts-container">
                <div className="ts-grid">
                    {/* Copy */}
                    <div className="ts-copy">
                        <div className="ts-eyebrow-row">
                            <span className="ts-eyebrow">— Front-end / 05</span>
                            <div className="ts-rule" />
                        </div>

                        <h2 className="ts-title">
                            <span className="ts-line">
                                <span className="ts-line-in">coding</span>
                            </span>
                            <span className="ts-line">
                                <span className="ts-line-in" style={{ fontFamily: "SubtitleFont, sans-serif" }}>
                                    VIBES
                                </span>
                            </span>
                        </h2>

                        <p className="ts-lead">
                            Extensive experience architecting modern front-end stacks. My focus is on creating
                            seamless, high-performance digital environments using component-driven design and
                            utility-first styling.
                        </p>

                        <div className="ts-meta">
                            <div>
                                <p className="ts-meta-label">Languages</p>
                                <p className="ts-meta-value ts-count-up" data-count={TABS.length}>
                                    {pad(TABS.length)}
                                </p>
                            </div>
                            <div>
                                <p className="ts-meta-label">Approach</p>
                                <p className="ts-meta-value">Component-driven</p>
                            </div>
                        </div>

                        <a className="ts-cta" href={GITHUB} target="_blank" rel="noopener noreferrer">
                            <span className="ts-cta-label">
                                Explore Github
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </span>
                        </a>
                    </div>

                    {/* Terminal */}
                    <div className="ts-term">
                        <div ref={tiltRef} className="ts-tilt" onPointerMove={onMove} onPointerEnter={onEnter} onPointerLeave={onLeave}>
                            <div className="ts-window">
                                {/* window bar */}
                                <div className="ts-bar">
                                    <span className="ts-light" style={{ background: "#FF5F56" }} />
                                    <span className="ts-light" style={{ background: "#FFBD2E" }} />
                                    <span className="ts-light" style={{ background: "#27C93F" }} />
                                    <span className="ts-file">{SNIPPETS[activeTab].file}</span>
                                    <span className="ts-live">
                                        <span className="ts-live-dot" />
                                        Live
                                    </span>
                                </div>

                                {/* tabs */}
                                <div className="ts-tabs" role="tablist" aria-label="Language" onKeyDown={onTabKey}>
                                    {TABS.map((tab) => (
                                        <button
                                            key={tab}
                                            type="button"
                                            role="tab"
                                            aria-selected={activeTab === tab}
                                            className={`ts-tab ${activeTab === tab ? "is-active" : ""}`}
                                            onClick={() => setActiveTab(tab)}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                    <div style={{ flex: 1 }} />
                                </div>

                                {/* code */}
                                <div
                                    ref={screenRef}
                                    className="ts-screen"
                                    title={typing ? "Click to skip the typing" : undefined}
                                    onClick={() => started && setCount(code.length)}
                                >
                                    <div className="ts-code-wrap" style={{ "--ln": ln, minHeight: `${MAX_LINES * 1.7}em` } as React.CSSProperties}>
                                        <div className="ts-curline" aria-hidden="true" />
                                        <div className="ts-gutter" aria-hidden="true">
                                            {Array.from({ length: totalLines }, (_, i) => (
                                                <span key={i} className={i + 1 === ln && started ? "is-cur" : ""}>
                                                    {i + 1}
                                                </span>
                                            ))}
                                        </div>
                                        <pre className="ts-code" aria-label={`${SNIPPETS[activeTab].file} code sample`}>
                                            {highlight(shown, activeTab)}
                                            <span className={`ts-cursor ${typing ? "" : "is-blink"}`} />
                                        </pre>
                                    </div>

                                    <div className="ts-scanlines" aria-hidden="true" />
                                    <div className="ts-glare" aria-hidden="true" />
                                </div>

                                {/* status bar */}
                                <div className="ts-status">
                                    <span className="ts-state">
                                        <i className={typing ? "is-typing" : ""} />
                                        {typing ? "Typing" : "Ready"}
                                    </span>
                                    <span className="ts-progress" aria-hidden="true">
                                        <span style={{ transform: `scaleX(${code.length ? count / code.length : 0})` }} />
                                    </span>
                                    <span className="ts-status-pos">Ln {ln}, Col {col}</span>
                                    <span className="ts-status-enc">UTF-8</span>
                                    <span className="ts-status-lang">{activeTab}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */
const CSS = `
.ts-section {
    --section-pad: 120px 0;
    --grid-layout: 1fr 1.2fr;
    --grid-gap: 80px;
    --term-padding: 24px;
    --tab-padding: 14px 24px;
    --meta-dir: row;
    padding: var(--section-pad);
    overflow: hidden;
}
@media (max-width: 1024px) {
    .ts-section { --section-pad: 100px 0; --grid-layout: 1fr; --grid-gap: 60px; }
}
@media (max-width: 768px) {
    .ts-section {
        --section-pad: 80px 0;
        --grid-gap: 40px;
        --term-padding: 16px;
        --tab-padding: 12px 16px;
        --meta-dir: column;
    }
}

.ts-glow {
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
.ts-container { max-width: 1600px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 40px); position: relative; z-index: 1; }
.ts-grid { display: grid; grid-template-columns: var(--grid-layout); gap: var(--grid-gap); align-items: center; }

/* ---------- copy ---------- */
.ts-copy { display: flex; flex-direction: column; align-items: flex-start; text-align: left; }
.ts-eyebrow-row { display: flex; align-items: center; gap: 15px; width: 100%; margin-bottom: 30px; }
.ts-eyebrow {
    color: rgba(255,255,255,0.4);
    font-family: TitleFont, sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    white-space: nowrap;
}
.ts-rule { flex: 1; height: 1px; background: rgba(255,255,255,0.15); transform-origin: left center; }
.ts-title {
    color: #fff;
    font-family: TitleFont, Impact, sans-serif;
    font-size: clamp(3rem, 10vw, 5.5rem);
    font-weight: 900;
    line-height: 0.9;
    letter-spacing: -0.02em;
    margin: 0 0 30px;
}
.ts-line { display: block; overflow: hidden; padding: 0.08em 0; margin: -0.08em 0; }
.ts-line-in { display: block; will-change: transform; }
.ts-lead {
    color: rgba(255,255,255,0.7);
    font-family: TextFont, system-ui, sans-serif;
    font-size: clamp(1rem, 2vw, 1.1rem);
    line-height: 1.6;
    max-width: 480px;
    margin: 0 0 32px;
}
.ts-meta {
    display: flex;
    flex-direction: var(--meta-dir);
    gap: clamp(20px, 4vw, 40px);
    width: 100%;
    max-width: 480px;
    padding-top: 20px;
    margin-bottom: 40px;
    border-top: 1px solid rgba(255,255,255,0.2);
}
.ts-meta-label { color: rgba(255,255,255,0.4); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 4px; }
.ts-meta-value { color: #fff; font-family: TitleFont, sans-serif; font-size: 0.95rem; margin: 0; font-variant-numeric: tabular-nums; }

/* button: white fill wipes away on hover */
.ts-cta {
    position: relative;
    display: inline-flex;
    width: fit-content;
    overflow: hidden;
    padding: clamp(12px, 3vw, 16px) clamp(24px, 5vw, 32px);
    border: 1px solid #fff;
    color: #000;
    text-decoration: none;
    font-family: SubtitleFont, system-ui, sans-serif;
    font-size: 0.9rem;
    font-weight: bold;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: color 0.35s ease;
}
.ts-cta::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #fff;
    transform-origin: right center;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.ts-cta-label { position: relative; display: inline-flex; align-items: center; gap: 10px; }
.ts-cta svg { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.ts-cta:hover { color: #fff; }
.ts-cta:hover::before { transform: scaleX(0); }
.ts-cta:hover svg { transform: translateX(5px); }
.ts-cta:focus-visible, .ts-tab:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }

/* ---------- terminal ---------- */
.ts-term { position: relative; min-width: 0; }
.ts-term::before { /* faint dot grid behind the window */
    content: '';
    position: absolute;
    inset: -8% -5%;
    background: radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px) 0 0 / 22px 22px;
    -webkit-mask-image: radial-gradient(ellipse at center, #000 25%, transparent 70%);
            mask-image: radial-gradient(ellipse at center, #000 25%, transparent 70%);
    pointer-events: none;
}
.ts-tilt {
    position: relative;
    transform: perspective(1200px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(var(--ts, 1));
    transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    animation: ts-float 8s ease-in-out infinite alternate;
}
@keyframes ts-float { from { translate: 0 -5px; } to { translate: 0 7px; } }

.ts-window {
    position: relative;
    width: 100%;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 12px;
    background: rgba(16,16,16,0.7);
    -webkit-backdrop-filter: blur(16px);
            backdrop-filter: blur(16px);
    box-shadow: 0 30px 60px -15px rgba(0,0,0,0.65), 0 0 40px -10px rgba(255,255,255,0.08);
    transition: border-color 0.4s ease, box-shadow 0.4s ease;
}
.ts-tilt:hover .ts-window {
    border-color: rgba(255,255,255,0.45);
    box-shadow: 0 40px 80px -15px rgba(0,0,0,0.75), 0 0 70px -10px rgba(255,255,255,0.2);
}

.ts-bar {
    height: 34px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 14px;
    background: rgba(255,255,255,0.05);
    border-bottom: 1px solid rgba(255,255,255,0.1);
}
.ts-light { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
.ts-file {
    flex: 1;
    min-width: 0;
    margin-left: 10px;
    padding: 3px 12px;
    border-radius: 999px;
    background: rgba(255,255,255,0.07);
    color: rgba(255,255,255,0.45);
    font-family: sans-serif;
    font-size: 10px;
    letter-spacing: 0.12em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.ts-live {
    display: flex;
    align-items: center;
    gap: 6px;
    color: rgba(255,255,255,0.7);
    font-family: TitleFont, sans-serif;
    font-size: 0.55rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
}
.ts-live-dot { width: 6px; height: 6px; border-radius: 50%; background: #27C93F; box-shadow: 0 0 8px #27C93F; animation: ts-pulse 1.6s ease-in-out infinite; }
@keyframes ts-pulse { 50% { opacity: 0.25; transform: scale(0.7); } }

/* tabs */
.ts-tabs {
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    background: rgba(0,0,0,0.4);
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.ts-tabs::-webkit-scrollbar { display: none; }
.ts-tab {
    position: relative;
    padding: var(--tab-padding);
    background: transparent;
    border: none;
    border-right: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.4);
    font-family: TextFont, sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: color 0.25s ease, background 0.25s ease;
}
.ts-tab::before { /* top bar grows in */
    content: '';
    position: absolute;
    left: 0; right: 0; top: 0;
    height: 2px;
    background: #fff;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.ts-tab:hover { color: rgba(255,255,255,0.75); }
.ts-tab.is-active { color: #fff; background: rgba(255,255,255,0.05); }
.ts-tab.is-active::before { transform: scaleX(1); }

/* code screen */
.ts-screen {
    position: relative;
    padding: var(--term-padding);
    background: #000;
    overflow-x: auto;
    overflow-y: hidden;
    cursor: text;
    font-family: "Fira Code", "JetBrains Mono", "Courier New", Courier, monospace;
    font-size: clamp(0.78rem, 2vw, 0.92rem);
    line-height: 1.7;
    color: #e6e6e6;
}
.ts-code-wrap { position: relative; display: flex; min-width: min-content; }
.ts-curline {
    position: absolute;
    left: calc(var(--term-padding) * -1);
    right: calc(var(--term-padding) * -1);
    top: calc((var(--ln, 1) - 1) * 1.7em);
    height: 1.7em;
    background: linear-gradient(90deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02));
    border-left: 2px solid rgba(255,255,255,0.5);
    transition: top 0.12s linear;
    pointer-events: none;
}
.ts-gutter {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    text-align: right;
    user-select: none;
    margin-right: 16px;
    padding-right: 14px;
    min-width: 2.2ch;
    color: rgba(255,255,255,0.18);
    border-right: 1px solid rgba(255,255,255,0.06);
}
.ts-gutter .is-cur { color: rgba(255,255,255,0.8); }
.ts-code { position: relative; z-index: 1; flex: 1; margin: 0; font: inherit; white-space: pre; }

.ts-cursor { display: inline-block; width: 0.6em; height: 1.2em; margin-left: 2px; vertical-align: text-bottom; background: #fff; }
.ts-cursor.is-blink { animation: ts-blink 1s steps(1) infinite; }
@keyframes ts-blink { 50% { opacity: 0; } }

/* syntax colours */
.tk-c { color: rgba(255,255,255,0.35); font-style: italic; }
.tk-s { color: #b6ff6a; }
.tk-t, .tk-p { color: #7fe7ff; }
.tk-a, .tk-v, .tk-n { color: #ffd166; }
.tk-k { color: #ff7ad9; }
.tk-f { color: #fff; font-weight: 600; }

/* overlays */
.ts-scanlines {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0 2px, rgba(0,0,0,0.2) 2px 3px);
    mix-blend-mode: multiply;
    opacity: 0.7;
    transition: opacity 0.5s ease;
}
.ts-tilt:hover .ts-scanlines { opacity: 0.25; }
.ts-glare {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.2), transparent 50%);
    mix-blend-mode: soft-light;
    transition: opacity 0.4s ease;
}
.ts-tilt:hover .ts-glare { opacity: 1; }

/* RGB-split glitch burst */
.ts-screen.is-glitching { animation: ts-glitch 0.5s steps(2, end); }
@keyframes ts-glitch {
    0%   { transform: translate(0,0);      clip-path: inset(0 0 0 0);
           filter: drop-shadow(4px 0 0 rgba(255,0,60,0.8)) drop-shadow(-4px 0 0 rgba(0,255,240,0.8)); }
    20%  { transform: translate(-6px,2px); clip-path: inset(12% 0 62% 0); }
    40%  { transform: translate(5px,-2px); clip-path: inset(58% 0 14% 0); }
    60%  { transform: translate(-3px,0);   clip-path: inset(30% 0 40% 0); }
    80%  { transform: translate(2px,1px);  clip-path: inset(0 0 0 0); }
    100% { transform: translate(0,0);      clip-path: inset(0 0 0 0); filter: none; }
}

/* status bar */
.ts-status {
    display: flex;
    align-items: center;
    gap: 16px;
    height: 30px;
    padding: 0 14px;
    border-top: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
    color: rgba(255,255,255,0.45);
    font-family: sans-serif;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    white-space: nowrap;
}
.ts-state { display: flex; align-items: center; gap: 7px; min-width: 62px; color: rgba(255,255,255,0.7); }
.ts-state i { width: 6px; height: 6px; border-radius: 50%; background: #27C93F; box-shadow: 0 0 6px #27C93F; }
.ts-state i.is-typing { background: #ffd166; box-shadow: 0 0 6px #ffd166; animation: ts-pulse 0.8s ease-in-out infinite; }
.ts-progress { flex: 1; height: 2px; background: rgba(255,255,255,0.1); overflow: hidden; }
.ts-progress span { display: block; height: 100%; background: #fff; transform-origin: left center; }
.ts-status-lang { color: #fff; }
@media (max-width: 520px) { .ts-status-enc, .ts-status-pos { display: none; } }

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
    .ts-tilt { animation: none !important; transition-duration: 0.01ms !important; }
    .ts-live-dot, .ts-state i.is-typing, .ts-cursor.is-blink, .ts-screen.is-glitching { animation: none !important; }
    .ts-tab::before, .ts-cta::before, .ts-cta svg { transition-duration: 0.01ms !important; }
}
`;