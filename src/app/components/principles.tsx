"use client";
import React, { useState } from 'react';

export default function Principles() {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const principles = [
        { id: '01', title: 'Function', fullTitle: 'Function > Form', desc: 'Aesthetic follows utility. Every component must serve a distinct architectural purpose before it is styled.' },
        { id: '02', title: 'Typography', fullTitle: 'Typographic Architecture', desc: 'Text is the interface. The scale, weight, and layout of typography dictate the user journey.' },
        { id: '03', title: 'Spacing', fullTitle: 'Spatial Tension', desc: 'Deliberate use of negative space. Elements must breathe, creating visual friction.' },
        { id: '04', title: 'Contrast', fullTitle: 'Absolute Contrast', desc: 'Clarity through stark juxtaposition. No washed-out midtones. High contrast ensures accessibility.' },
        { id: '05', title: 'Motion', fullTitle: 'Kinetic Feedback', desc: 'Motion is data. Animations must instantly confirm user actions, never serving as decoration.' },
        { id: '06', title: 'Fluidity', fullTitle: 'Fluid Scalability', desc: 'Code that adapts relentlessly. Layouts must expand mathematically across all dimensions.' },
        { id: '07', title: 'Honesty', fullTitle: 'Digital Honesty', desc: 'No skeuomorphism. Let the screen be a screen, native to its environment.' }
    ];

    return (
        <section style={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: "'BaseFont', system-ui, sans-serif",
            padding: '40px 20px'
        }}>
            
            {/* Ambient background glows for the glass to refract */}
            <div style={{ position: 'absolute', top: '10%', left: '20%', width: '500px', height: '500px', background: 'rgba(59, 130, 246, 0.15)', filter: 'blur(120px)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: '400px', height: '400px', background: 'rgba(168, 85, 247, 0.15)', filter: 'blur(120px)', borderRadius: '50%' }} />

            {/* macOS Application Window */}
            <div style={{
                width: '100%',
                maxWidth: '1100px',
                background: 'rgba(30, 30, 32, 0.65)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '16px',
                boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                zIndex: 10
            }}>
                
                {/* Window Title Bar */}
                <div style={{
                    height: '52px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(255, 255, 255, 0.03)'
                }}>
                    {/* Traffic Lights */}
                    <div style={{ display: 'flex', gap: '8px', width: '80px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56', boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E', boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F', boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)' }} />
                    </div>
                    
                    {/* Centered App Title */}
                    <div style={{ 
                        flex: 1, 
                        textAlign: 'center', 
                        color: 'rgba(255, 255, 255, 0.7)', 
                        fontFamily: "'SubtitleFont', system-ui, sans-serif",
                        fontSize: '0.9rem', 
                        fontWeight: 600, 
                        letterSpacing: '0.02em',
                    }}>
                        Core Principles
                    </div>

                    <div style={{ width: '80px' }} /> {/* Spacer to balance traffic lights */}
                </div>

                {/* Main Content Area */}
                <div style={{ padding: '60px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    
                    {/* macOS Segmented Control (The 7 Tabs) */}
                    <div style={{
                        display: 'flex',
                        background: 'rgba(0, 0, 0, 0.4)',
                        padding: '6px',
                        borderRadius: '12px',
                        marginBottom: '80px',
                        width: '100%',
                        maxWidth: '950px',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.1)'
                    }}>
                        {principles.map((item, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveIndex(index)}
                                    style={{
                                        flex: 1,
                                        padding: '10px 0',
                                        background: isActive ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)' : 'transparent',
                                        color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.2)' : 'none',
                                        fontFamily: "'NavFont', system-ui, sans-serif",
                                        fontSize: '0.9rem',
                                        fontWeight: isActive ? 600 : 500,
                                        letterSpacing: '0.02em',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                    }}
                                >
                                    {item.title}
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Content Display */}
                    <div style={{ 
                        textAlign: 'center', 
                        maxWidth: '700px', 
                        minHeight: '260px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        animation: 'fadeIn 0.5s ease-out'
                    }}>
                        {/* Apple-style Icon/Badge */}
                        <div style={{ 
                            width: '64px', 
                            height: '64px', 
                            borderRadius: '18px', 
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))', 
                            border: '1px solid rgba(255,255,255,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontFamily: "'TitleFont', system-ui, sans-serif",
                            fontSize: '1.4rem',
                            fontWeight: '600',
                            marginBottom: '32px',
                            boxShadow: '0 12px 24px rgba(0,0,0,0.3)'
                        }}>
                            {principles[activeIndex].id}
                        </div>
                        
                        <h3 style={{ 
                            fontFamily: "'TitleFont', system-ui, sans-serif",
                            fontSize: '2.5rem', 
                            fontWeight: 700, 
                            color: '#fff',
                            marginBottom: '20px',
                            letterSpacing: '0.02em',
                            textShadow: '0 2px 12px rgba(0,0,0,0.3)'
                        }}>
                            {principles[activeIndex].fullTitle}
                        </h3>
                        
                        <p style={{ 
                            fontFamily: "'TextFont', system-ui, sans-serif",
                            fontSize: '1.2rem', 
                            lineHeight: '1.7', 
                            color: 'rgba(255, 255, 255, 0.8)',
                            textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                        }}>
                            {principles[activeIndex].desc}
                        </p>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}
