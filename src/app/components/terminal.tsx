"use client";
import React, { useState, useEffect } from 'react';

export default function TechStack() {
    // Front-End Terminal Code Snippets
    const snippets: Record<string, { file: string, code: string }> = {
        'HTML': { 
            file: "INDEX.HTML",
            code: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>SYS // @H4TFI3LD</title>\n  <link rel=\"stylesheet\" href=\"/core.css\">\n</head>\n<body class=\"dark-mode\">\n  <div id=\"root\"></div>\n  <script type=\"module\" src=\"/main.tsx\"></script>\n</body>\n</html>" 
        },
        'CSS': { 
            file: "STYLES.CSS",
            code: ":root {\n  --bg: #000;\n  --grid: rgba(255, 255, 255, 0.1);\n}\n\n.mac-os-window {\n  border: 1px solid var(--grid);\n  background: rgba(20, 20, 20, 0.8);\n  backdrop-filter: blur(16px);\n}\n\nh1 {\n  text-transform: uppercase;\n}" 
        },
        'JS': { 
            file: "SCRIPT.JS",
            code: "const bootSystem = async () => {\n  console.log('[SYS] Initiating...');\n  try {\n    const res = await fetch('/api/config');\n    if ((await res.json()).status === 'OK') {\n      document.body.classList.add('ready');\n      console.log('[SYS] System Online.');\n    }\n  } catch (err) {\n    console.error('[ERR] Boot failure.', err);\n  }\n};\n\nbootSystem();" 
        },
        'TSX': { 
            file: "PAGE.TSX",
            code: "import { useState } from 'react';\nimport { BrutalistUI } from '@h4tfi3ld';\n\nexport default function SysConsole({ user }) {\n  const [status] = useState<'ON' | 'OFF'>('ON');\n\n  if (!user) return <div>ACCESS DENIED</div>;\n\n  return (\n    <BrutalistUI theme=\"dark\">\n      <h1>WELCOME, {user}</h1>\n      <p>System Status: [{status}]</p>\n    </BrutalistUI>\n  );\n}" 
        }
    };

    const tabs = Object.keys(snippets);
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    // Typewriter Effect Logic
    useEffect(() => {
        let i = 0;
        const fullText = snippets[activeTab].code;
        setDisplayedText("");
        setIsTyping(true);

        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setDisplayedText((prev) => prev + fullText.charAt(i));
                i++;
            } else {
                clearInterval(typingInterval);
                setIsTyping(false);
            }
        }, 20); // Fast typing speed

        return () => clearInterval(typingInterval);
    }, [activeTab]);

    return (
        <section className="techstack-section" style={{
            width: '100%',
            position: 'relative',
            zIndex: 10,
            padding: 'var(--section-pad)',
        }}>
            {/* Responsive CSS & Animations */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes cursorBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }

                /* Default Desktop Variables */
                .techstack-section {
                    --section-pad: 120px 0;
                    --grid-layout: 1fr 1.2fr;
                    --grid-gap: 80px;
                    --p-size: 1.1rem;
                    --term-min-height: 400px;
                    --term-padding: 30px;
                    --tab-padding: 14px 24px;
                }

                /* Tab Scrollbar Hiding for Mobile */
                .tab-container::-webkit-scrollbar {
                    display: none;
                }
                .tab-container {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                /* Tablet Breakpoint */
                @media (max-width: 1024px) {
                    .techstack-section {
                        --section-pad: 100px 0;
                        --grid-layout: 1fr; /* Stacks the columns */
                        --grid-gap: 60px;
                        --term-min-height: 350px;
                    }
                }

                /* Mobile Breakpoint */
                @media (max-width: 768px) {
                    .techstack-section {
                        --section-pad: 80px 0;
                        --grid-gap: 40px;
                        --p-size: 1rem;
                        --term-min-height: 300px;
                        --term-padding: 20px;
                        --tab-padding: 12px 16px;
                    }
                }
            `}} />

            <div style={{
                maxWidth: '1600px',
                margin: '0 auto',
                padding: '0 clamp(20px, 5vw, 40px)', // Fluid container padding
                position: 'relative',
                zIndex: 1,
            }}>
                
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'var(--grid-layout)',
                    gap: 'var(--grid-gap)',
                    alignItems: 'center',
                }}>
                    
                    {/* Left Column: Typography */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                        <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px', width: '100%' }}>
                            <span style={{ 
                                color: 'rgba(255,255,255,0.4)', 
                                fontSize: '0.8rem', 
                                fontFamily: 'TitleFont, sans-serif',
                                letterSpacing: '0.3em', 
                                textTransform: 'uppercase',
                            }}>
                                — FRONT-END / 05
                            </span>
                            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                        </div>
                        
                        <h2 style={{
                            color: '#fff',
                            fontSize: 'clamp(3rem, 10vw, 5.5rem)', // Fluid scaling for massive text
                            fontWeight: 900,
                            lineHeight: 0.9,
                            letterSpacing: '-0.02em',
                            fontFamily: 'TitleFont, Impact, sans-serif',
                            margin: '0 0 30px 0',
                        }}>
                            coding <br />
                            <span style={{ fontFamily: 'SubtitleFont' }}>
                               VIBES
                            </span>
                        </h2>

                        <p style={{
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: 'var(--p-size)',
                            lineHeight: '1.6',
                            fontFamily: 'TextFont, system-ui, sans-serif',
                            maxWidth: '480px',
                            marginBottom: '40px'
                        }}>
                            Extensive experience architecting modern front-end stacks. My focus is on creating seamless, high-performance digital environments using component-driven design and utility-first styling.
                        </p>

                        <button style={{
                            padding: 'clamp(12px, 3vw, 16px) clamp(24px, 5vw, 32px)', // Fluid button padding
                            background: '#fff',
                            border: '1px solid #fff',
                            color: '#000',
                            fontFamily: 'SubtitleFont, system-ui, sans-serif',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            letterSpacing: '0.1em',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            width: 'fit-content' // Keeps button from stretching full width on mobile
                        }}
                        onClick={() => window.open('https://github.com/revokedkystar', '_blank', 'noopener,noreferrer')}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = '#fff';
                            e.currentTarget.style.color = '#000';
                        }}>
                            Explore Github 
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </button>
                    </div>

                    {/* Right Column: macOS Style Glass Container for Console */}
                    <div style={{
                        width: '100%',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: 'rgba(20, 20, 20, 0.27)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.6)',
                        transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={e => {
                        // Only apply hover transform on desktop to prevent mobile jitter
                        if (window.innerWidth > 1024) e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        {/* Strict macOS Window Header (32px) */}
                        <div style={{ 
                            height: '32px', 
                            background: 'rgba(255, 255, 255, 0.05)', 
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            display: 'flex', 
                            alignItems: 'center', 
                            padding: '0 16px', 
                            gap: '8px' 
                        }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56' }} />
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }} />
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F' }} />
                            
                            {/* File Name Tag */}
                            <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '2px', fontFamily: 'sans-serif', textTransform: 'uppercase' }}>
                                {snippets[activeTab].file}
                            </span>
                        </div>

                        {/* Tab Navigation */}
                        <div className="tab-container" style={{ 
                            display: 'flex', 
                            borderBottom: '1px solid rgba(255,255,255,0.1)', 
                            background: 'rgba(0,0,0,0.4)',
                            overflowX: 'auto', // Allows tabs to scroll horizontally on small mobile screens
                            whiteSpace: 'nowrap'
                        }}>
                            {tabs.map((tab) => (
                                <button 
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    style={{
                                        padding: 'var(--tab-padding)',
                                        background: activeTab === tab ? 'rgba(255,255,255,0.05)' : 'transparent',
                                        border: 'none',
                                        borderRight: '1px solid rgba(255,255,255,0.1)',
                                        borderTop: activeTab === tab ? '2px solid #fff' : '2px solid transparent',
                                        color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.4)',
                                        fontFamily: 'TextFont, sans-serif',
                                        fontSize: '0.85rem',
                                        letterSpacing: '0.1em',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {tab}
                                </button>
                            ))}
                            <div style={{ flex: 1 }} />
                        </div>

                        {/* Terminal Body */}
                        <div style={{ 
                            padding: 'var(--term-padding)', 
                            minHeight: 'var(--term-min-height)', 
                            fontFamily: '"Fira Code", "Courier New", Courier, monospace',
                            fontSize: 'clamp(0.8rem, 2vw, 0.95rem)', // Scales code slightly on mobile
                            lineHeight: '1.7',
                            color: '#e0e0e0',
                            position: 'relative',
                            display: 'flex',
                            background: '#000',
                            overflowX: 'auto' // Prevents long code lines from breaking the container width
                        }}>
                            {/* Faint Inner Gridlines / Line Numbers */}
                            <div style={{ 
                                color: 'rgba(255,255,255,0.15)', 
                                display: 'flex', 
                                flexDirection: 'column',
                                userSelect: 'none',
                                paddingRight: '15px',
                                borderRight: '1px solid rgba(255,255,255,0.05)',
                                marginRight: '15px',
                                textAlign: 'right'
                            }}>
                                {Array.from({ length: 15 }).map((_, i) => <span key={i}>{i + 1}</span>)}
                            </div>

                            {/* Actual Typed Code */}
                            <div style={{ whiteSpace: 'pre-wrap', flex: 1, minWidth: 'min-content' }}>
                                <span style={{ color: '#4ade80' }}>{">_ "}</span>
                                {displayedText}
                                <span style={{ 
                                    display: 'inline-block', 
                                    width: '8px', 
                                    height: '1.2em', 
                                    background: '#fff', 
                                    verticalAlign: 'bottom',
                                    marginLeft: '4px',
                                    opacity: isTyping ? 1 : 0,
                                    animation: isTyping ? 'none' : 'cursorBlink 1s infinite step-end' 
                                }} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}