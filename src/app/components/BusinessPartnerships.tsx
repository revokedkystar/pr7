"use client";
import React from 'react';

export default function BusinessPartnerships() {
    const partners = [
        { id: 1, name: 'AWS', src: '/svg/aws.svg' },
        { id: 2, name: 'NHS', src: '/svg/nhs.svg' },
        { id: 3, name: 'Drax', src: '/svg/drax.svg' },
        { id: 4, name: 'Barclays', src: '/svg/barclays.svg' },
        { id: 5, name: 'Google', src: '/svg/google.svg' }
    ];

    return (
        <section style={{
            width: '100%',
            position: 'relative',
            zIndex: 10,
            padding: '80px 0 120px',
        }}>
            <div style={{
                maxWidth: '1600px',
                margin: '0 auto',
                padding: '0 40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
                position: 'relative',
                zIndex: 1,
            }}>
                
                {/* Header Typography */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <span style={{ 
                        color: '#fff', 
                        fontSize: '0.9rem', 
                        fontFamily: 'TitleFont, sans-serif',
                        letterSpacing: '0.3em', 
                        textTransform: 'uppercase',
                        opacity: 0.5,
                        marginBottom: '10px'
                    }}>
                        — Partnerships / 04
                    </span>
                    <h2 style={{
                        color: '#fff',
                        fontSize: 'clamp(3rem, 7vw, 5rem)',
                        fontWeight: 900,
                        lineHeight: 0.9,
                        letterSpacing: '-0.02em',
                        fontFamily: 'TitleFont, Impact, sans-serif',
                        margin: 0
                    }}>
                        business <br />
                        <span style={{ fontFamily: 'SubtitleFont' }}>
                            PARTNERS
                        </span>
                    </h2>
                </div>

                {/* macOS Style Glass Container */}
                <div style={{
                    width: '100%',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: 'rgba(20, 20, 20, 0.27)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.6)',
                    marginTop: '20px'
                }}>
                    {/* macOS Window Header */}
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
                        
                        <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '2px', fontFamily: 'sans-serif', textTransform: 'uppercase' }}>
                            NETWORK_LINKS.SYS
                        </span>
                    </div>

                    {/* Logos Grid Area */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        background: 'rgba(0,0,0,0.4)'
                    }}>
                        {partners.map((partner, index) => (
                            <div key={partner.id} style={{
                                height: '160px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '30px',
                                // Adds grid lines between logos
                                borderRight: index !== partners.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                            onMouseEnter={(e) => {
                                const img = e.currentTarget.querySelector('img');
                                const label = e.currentTarget.querySelector('span');
                                if (img) {
                                    img.style.filter = 'grayscale(0%) opacity(1)';
                                    img.style.transform = 'scale(1.05)';
                                }
                                if (label) {
                                    label.style.opacity = '1';
                                    label.style.transform = 'translateY(0)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                const img = e.currentTarget.querySelector('img');
                                const label = e.currentTarget.querySelector('span');
                                if (img) {
                                    img.style.filter = 'grayscale(100%) opacity(0.4)';
                                    img.style.transform = 'scale(1)';
                                }
                                if (label) {
                                    label.style.opacity = '0';
                                    label.style.transform = 'translateY(10px)';
                                }
                            }}
                            >
                                {/* Floating Tech Label (Hidden until hover) */}
                                <span style={{
                                    position: 'absolute',
                                    top: '16px',
                                    left: '16px',
                                    color: 'rgba(255,255,255,0.8)',
                                    fontSize: '10px',
                                    fontFamily: 'TextFont, sans-serif',
                                    letterSpacing: '0.1em',
                                    opacity: 0,
                                    transform: 'translateY(10px)',
                                    transition: 'all 0.3s ease',
                                    pointerEvents: 'none'
                                }}>
                                    ID_{partner.id} / {partner.name}
                                </span>

                                <img 
                                    src={partner.src} 
                                    alt={`${partner.name} Logo`} 
                                    style={{ 
                                        maxWidth: '100%', 
                                        maxHeight: '100%', 
                                        objectFit: 'contain',
                                        filter: 'grayscale(100%) opacity(0.4)',
                                        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                                    }} 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}