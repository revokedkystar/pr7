"use client";
import React, { useState } from 'react';

export default function Certificates() {
    return (
        <section style={{
            width: '100%',
            position: 'relative',
            zIndex: 10,
        }}>
            <div style={{
                maxWidth: '1600px',
                margin: '0 auto 120px',
                padding: '120px 40px',
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                gap: '60px',
                position: 'relative',
                zIndex: 1,
                alignItems: 'center'
            }}>
                
                {/* Glassmorphic Carousel */}
                <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <CertificateCarousel 
                        certificates={[
                            { title: 'Cloud Computing', issuer: 'Amazon Web Services', year: '2026', image: '/certificates/cloud_award.png', url: 'https://space.springpod.com/certificate/56tcr4tfsjmm/share' },
                            { title: 'Data Analytics', issuer: 'Barclays', year: '2026', image: '/certificates/analytics_award.jpg', url: 'https://space.springpod.com/certificate/k8d74c6uj4j8/share' },
                            { title: 'Developmer', issuer: 'Barclays', year: '2026', image: '/certificates/dev_award.png', url: 'https://space.springpod.com/certificate/qcbnmfki0ka2/share' },
                            { title: 'Cyber Security', issuer: 'Drax Enterprise', year: '2026', image: '/certificates/drax_award.png', url: 'https://space.springpod.com/certificate/y89vmga09ja5/share' }
                        ]}
                    />
                </div>

                {/* Text Content */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <div style={{ marginBottom: '40px', marginRight: '80px', width: '100%', textAlign: 'right' }}>
                        <span style={{ 
                            color: '#fff', 
                            fontSize: '0.9rem', 
                            fontFamily: 'TitleFont, sans-serif',
                            letterSpacing: '0.3em', 
                            textTransform: 'uppercase',
                            opacity: 0.5 
                        }}>
                            — CERTIFICATES / 08
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
                            verified <br /> 
                            <span style={{ fontFamily: 'SubtitleFont' }}>
                                AWARDS
                            </span>
                        </h2>
                    </div>

                    <div style={{ maxWidth: '500px', textAlign: 'right' }}>
                        <p style={{
                            color: '#fff',
                            fontSize: '1.2rem',
                            lineHeight: '1.5',
                            opacity: 0.8,
                            marginBottom: '30px',
                            marginRight: '80px',
                            fontFamily: 'TextFont, sans-serif'
                        }}>
                            An archive of official certifications and milestones, documenting ongoing education and professional development across various digital disciplines.
                        </p>

                        <div style={{
                            display: 'flex',
                            marginRight: '80px',
                            justifyContent: 'flex-end',
                            borderTop: '1px solid rgba(255,255,255,0.2)',
                            paddingTop: '20px',
                            gap: '40px'
                        }}>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Certs</p>
                                <p style={{ color: '#fff', fontSize: '1.2rem', fontFamily: 'TitleFont, sans-serif', fontWeight: 'bold' }}>04</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Awards</p>
                                <p style={{ color: '#fff', fontSize: '1.2rem', fontFamily: 'TitleFont, sans-serif', fontWeight: 'bold'}}>01</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

function CertificateCarousel({ certificates }: { certificates: { title: string, issuer: string, year: string, image: string, url: string }[] }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault(); 
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % certificates.length);
            setIsAnimating(false);
        }, 300);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setActiveIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
            setIsAnimating(false);
        }, 300);
    };

    const currentCert = certificates[activeIndex];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', width: '100%', maxWidth: '800px' }}>
            
            {/* Carousel Controls & Main Card */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', width: '100%' }}>
                
                {/* Left Arrow */}
                <button onClick={handlePrev} style={{ 
                    background: 'rgba(20, 20, 20, 0.4)', border: '1px solid rgba(255,255,255,0.1)', 
                    color: '#fff', borderRadius: '50%', width: '48px', height: '48px', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', 
                    backdropFilter: 'blur(8px)', transition: 'all 0.3s ease', flexShrink: 0
                }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'scale(1.1)'; }} 
                   onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(20, 20, 20, 0.4)'; e.currentTarget.style.transform = 'scale(1)'; }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>

                {/* macOS Style Card */}
                <a 
                    href={currentCert.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title="Click to verify source"
                    style={{
                        flex: 1,
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: 'rgba(20, 20, 20, 0.6)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.6)',
                        cursor: 'pointer',
                        display: 'block',
                        textDecoration: 'none',
                        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = `scale(1.02) translateY(-5px)`;
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = `scale(1) translateY(0)`;
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
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
                        
                        <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '1px', fontFamily: 'sans-serif', textTransform: 'uppercase' }}>
                            CERT_{currentCert.year}.PDF
                        </span>
                    </div>

                    {/* Image Area */}
                    <div style={{
                        width: '100%',
                        height: '360px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#000',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            opacity: isAnimating ? 0 : 1,
                            transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
                            transition: 'opacity 0.3s ease, transform 0.3s ease',
                        }}>
                            {currentCert.image ? (
                                <img src={currentCert.image} alt={currentCert.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '15px' }}>
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                                    </svg>
                                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>NO IMAGE DATA</span>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Details Footer */}
                    <div style={{ 
                        padding: '24px', 
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(0,0,0,0.2)',
                    }}>
                        <div style={{
                            opacity: isAnimating ? 0 : 1,
                            transform: isAnimating ? 'translateY(10px)' : 'translateY(0)',
                            transition: 'opacity 0.3s ease, transform 0.3s ease',
                        }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700, fontFamily: 'SubtitleFont, system-ui, sans-serif', letterSpacing: '0.05em', marginBottom: '8px' }}>
                                {currentCert.title}
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', fontFamily: 'TextFont, system-ui, sans-serif', marginBottom: '16px' }}>
                                {currentCert.issuer}
                            </p>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: '#000', background: '#fff', fontSize: '0.8rem', fontWeight: 'bold', padding: '4px 12px', borderRadius: '20px', letterSpacing: '0.1em' }}>
                                    {currentCert.year}
                                </span>
                                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'TextFont, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg>
                                    Verify Link
                                </span>
                            </div>
                        </div>
                    </div>
                </a>
                
                {/* Right Arrow */}
                <button onClick={handleNext} style={{ 
                    background: 'rgba(20, 20, 20, 0.4)', border: '1px solid rgba(255,255,255,0.1)', 
                    color: '#fff', borderRadius: '50%', width: '48px', height: '48px', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', 
                    backdropFilter: 'blur(8px)', transition: 'all 0.3s ease', flexShrink: 0
                }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'scale(1.1)'; }} 
                   onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(20, 20, 20, 0.4)'; e.currentTarget.style.transform = 'scale(1)'; }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>

            </div>
            
            {/* Carousel Navigation Dots */}
            <div style={{ display: 'flex', gap: '10px' }}>
                {certificates.map((_, i) => (
                    <button 
                        key={i} 
                        onClick={() => {
                            if (i === activeIndex || isAnimating) return;
                            setIsAnimating(true);
                            setTimeout(() => {
                                setActiveIndex(i);
                                setIsAnimating(false);
                            }, 300);
                        }}
                        style={{
                            width: '8px', 
                            height: '8px', 
                            padding: 0,
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '50%', 
                            background: i === activeIndex ? '#fff' : 'rgba(255,255,255,0.2)',
                            transition: 'background 0.3s ease, transform 0.2s ease',
                            transform: i === activeIndex ? 'scale(1.2)' : 'scale(1)'
                        }} 
                    />
                ))}
            </div>
        </div>
    );
}