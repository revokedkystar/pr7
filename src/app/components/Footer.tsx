"use client";
import React from 'react';

export default function Footer() {
    return (
        <footer style={{
            width: '100%',
            backgroundColor: '#000',
            position: 'relative',
            zIndex: 10,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'hidden',
            paddingTop: '80px',
        }}>
            {/* Injected CSS for Responsiveness */}
            <style dangerouslySetInnerHTML={{__html: `
                .footer-grid {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr auto;
                    gap: 60px;
                    padding-bottom: 80px;
                    align-items: end;
                }
                .footer-links {
                    display: flex;
                    gap: 80px;
                    margin-left: 60px;
                }
                .footer-punk {
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                    padding-bottom: 10px;
                }
                .footer-bottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 24px 0;
                    flex-wrap: wrap;
                    gap: 20px;
                    background: #000;
                }

                /* Tablet Breakpoint */
                @media (max-width: 1100px) {
                    .footer-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 50px;
                    }
                    .footer-links {
                        margin-left: 0;
                        gap: 40px;
                    }
                    .footer-punk {
                        grid-column: span 2;
                        justify-content: flex-start;
                    }
                }

                /* Mobile Breakpoint */
                @media (max-width: 768px) {
                    .footer-grid {
                        grid-template-columns: 1fr;
                        gap: 40px;
                    }
                    .footer-punk {
                        grid-column: span 1;
                    }
                    .footer-bottom {
                        flex-direction: column;
                        justify-content: center;
                        text-align: center;
                    }
                }
            `}} />

            <div style={{
                maxWidth: '1600px',
                margin: '0 auto',
                padding: '0 40px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                zIndex: 1,
            }}>
                
                {/* Top Section: Giant Branding & Links */}
                <div className="footer-grid">
                    
                    {/* Left: Branding */}
                    <div>
                        <span style={{ 
                            color: '#fff', 
                            fontSize: '0.8rem', 
                            fontFamily: 'TitleFont, sans-serif',
                            letterSpacing: '0.3em', 
                            textTransform: 'uppercase',
                            opacity: 0.5,
                            display: 'block',
                            marginBottom: '20px'
                        }}>
                            — FOOTER / 05
                        </span>
                        <h2 style={{
                            color: '#fff',
                            fontSize: 'clamp(3rem, 8vw, 7rem)', // Scales smoothly based on screen width
                            fontWeight: 900,
                            lineHeight: 0.85,
                            letterSpacing: '-0.03em',
                            margin: 0,
                            fontFamily: 'SubtitleFont, Impact, sans-serif',
                            textTransform: 'uppercase'
                        }}>
                            PROJECT 7EVEN*
                        </h2>
                    </div>
                    
                    {/* Middle: Technical Link Directories */}
                    <div className="footer-links">
                        
                        {/* Socials Directory */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                                DIR_SOCIALS
                            </span>
                            {['Twitter / X', 'Instagram', 'LinkedIn'].map((link) => (
                                <a key={link} href="#" style={{ 
                                    color: 'rgba(255,255,255,0.8)', 
                                    textDecoration: 'none', 
                                    fontSize: '1rem', 
                                    fontFamily: 'TextFont, sans-serif', 
                                    transition: 'all 0.3s ease',
                                    display: 'inline-block'
                                }} 
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = '#fff';
                                    e.currentTarget.style.transform = 'translateX(8px)';
                                }} 
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}>
                                    {'> '} {link}
                                </a>
                            ))}
                        </div>

                        {/* Connect Directory */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                                DIR_CONNECT
                            </span>
                            {[
                                { name: 'Email', url: 'mailto:hatfij08@gmail.com' },
                                { name: 'GitHub', url: 'https://github.com/revokedkystar' }
                            ].map((link) => (
                                <a key={link.name} href={link.url} style={{ 
                                    color: 'rgba(255,255,255,0.8)', 
                                    textDecoration: 'none', 
                                    fontSize: '1rem', 
                                    fontFamily: 'TextFont, sans-serif', 
                                    transition: 'all 0.3s ease',
                                    display: 'inline-block'
                                }} 
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = '#fff';
                                    e.currentTarget.style.transform = 'translateX(8px)';
                                }} 
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}>
                                    {'> '} {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Far Right: Punk GIF */}
                    <div className="footer-punk">
                        <img src="/gifs/punk.gif" alt="Punk" style={{ width: 'clamp(120px, 15vw, 200px)', display: 'block', borderRadius: '12px' }} />
                    </div>

                </div>

                {/* Bottom Section: macOS System Bar */}
                <div className="footer-bottom">
                    
                    {/* Copyright */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontFamily: 'TextFont, sans-serif', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            © 2026 PROJECT 7EVEN*
                        </p>
                        <span style={{ width: '4px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }} />
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontFamily: 'TextFont, sans-serif', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            MADE BY @H4TFI3LD
                        </p>
                    </div>

                    {/* Status Display & macOS Dots */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', letterSpacing: '2px', fontFamily: 'sans-serif', textTransform: 'uppercase' }}>
                            SYS.STATUS: ONLINE
                        </span>
                        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '6px 10px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F56' }} />
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }} />
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27C93F' }} />
                        </div>
                    </div>
                    
                </div>
            </div>
        </footer>
    );
}