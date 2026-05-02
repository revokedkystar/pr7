"use client";
import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';

export default function DigitalCV() {
    const [activeTab, setActiveTab] = useState('PROFILE');

    // Parsed CV Data
    const cvData = {
        profile: "I'm Joshua, a Computer Scientist with a passion for Graphic Design and the complex architecture of our current digital era. My skills have only improved throughout my 2-year BTEC college course, and through working alongside the NHS in their content creation department.",
        socials: [
            { platform: 'Instagram', handle: '@h4tfi3ld', link: '#' },
            { platform: 'X / Twitter', handle: '@h4tfi3ld', link: '#' },
            { platform: 'LinkedIn', handle: '@Joshua Hatfield', link: '#' },
            { platform: 'GitHub', handle: '@revokedkystar', link: '#' },
            { platform: 'Email', handle: 'hatfij08@gmail.com', link: 'mailto:hatfij08@gmail.com' },
            { platform: 'Web', handle: 'pro7even.vercel.app', link: 'https://pro7even.vercel.app' },
        ],
        experience: [
            {
                type: 'INDUSTRY EXPERIENCE',
                role: 'NHS VOLUNTEER CONTENT CREATOR',
                location: 'St. Edmunds, Victoria Park Rd, Torquay TQ1 3QH',
                period: '03/2025 - PRESENT',
                bullets: [
                    'My first real-world step into the computing industry working in the region of content creation.',
                    'Worked on graphic design projects, interviews, photoshoots and maintaining social platforms throughout a network of peers with unique skills to help better our work.'
                ]
            },
            {
                type: 'WORK EXPERIENCE',
                role: 'OFFSHORE BAR & RESTAURANT | Waiter',
                location: 'Harbour, 13-14 Vaughan Parade, Torquay TQ2 5EG',
                period: '07/2024 - PRESENT',
                bullets: [
                    'My first job, which demonstrated industry standards in a professional workplace, taught me how to interact with customers and provide overall great service to boost company representation.'
                ]
            },
            {
                type: 'WORK EXPERIENCE',
                role: 'RICCAS RESTAURANT | Waiter',
                location: '57 Queen St, Newton Abbot TQ12 2AU',
                period: '01/2025 - 07/2025',
                bullets: [
                    'Furthered my social skills and hospitality experience by working for local companies.'
                ]
            }
        ],
        education: [
            {
                school: 'SOUTH DEVON UTC',
                period: '2024 - PRESENT',
                location: 'Kingsteignton Rd, Newton Abbot TQ12 2QA'
            },
            {
                school: 'NEWTON A. COLLEGE',
                period: '2019 - 2024',
                location: '28 Old Exeter Rd, Newton Abbot TQ12 2NF'
            }
        ],
        projects: [
            { unit: 'UNIT 1 - INFO TECH SYSTEMS', grade: 'P' },
            { unit: 'UNIT 2 - CREATING SYSTEMS', grade: 'M' },
            { unit: 'UNIT 3 - SOCIAL MEDIA IN BUSINESS', grade: 'M' },
            { unit: 'UNIT 4 - PROGRAMMING', grade: 'D' },
            { unit: 'UNIT 6 - WEBSITE DEVELOPMENT', grade: 'D' },
            { unit: 'UNIT 7 - MOBILE APPS DEVELOPMENT', grade: 'D' },
            { unit: 'UNIT 8 - IT PROJECT MANAGEMENT', grade: 'D' },
            { unit: 'UNIT 9 - COMPUTER GAMES DEV', grade: 'P' },
            { unit: 'UNIT 11 - CYBER SECURITY', grade: 'M' },
            { unit: 'UNIT 14 - IT SERVICE DELIVERY', grade: 'P' },
            { unit: 'UNIT 17 - 2D & 3D GRAPHICS', grade: 'P' },
            { unit: 'UNIT 18 - ANIMATION & EFFECTS', grade: 'M' },
            { unit: 'UNIT 19 - INTERNET OF THINGS', grade: 'D' },
        ]
    };

    const tabs = ['PROFILE', 'EXPERIENCE', 'EDUCATION', 'PROJECTS'];

    return (
        <>
            <Navbar />
            <section className="cv-section" style={{
                width: '100%',
                position: 'relative',
                zIndex: 0,
                padding: 'var(--section-pad)',
                minHeight: '100vh',
                fontFamily: 'TextFont, sans-serif',
                display: 'flex',
                justifyContent: 'center'
            }}>
            
            {/* CSS Variables & Animations tailored for macOS Dark Theme */}
            <style dangerouslySetInnerHTML={{__html: `
                .cv-section {
                    /* Increased top padding from 60px to 120px to clear the navbar */
                    --section-pad: 120px 20px 60px 20px; 
                    --grid-layout: 240px 1fr;
                    --menu-dir: column;
                    --window-radius: 12px;
                }

                /* Tablet Breakpoint */
                @media (max-width: 1024px) {
                    .cv-section {
                        --section-pad: 100px 15px 40px 15px; /* Also shifted down for tablet */
                        --grid-layout: 1fr; /* Stack menu on top */
                        --menu-dir: row;
                    }
                    .macos-sidebar {
                        border-right: none !important;
                        border-bottom: 1px solid #000000;
                    }
                    .cv-menu {
                        overflow-x: auto;
                        white-space: nowrap;
                        padding-bottom: 10px;
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                    .cv-menu::-webkit-scrollbar { display: none; }
                }

                .data-reveal {
                    animation: fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* Smooth scrollbar for content area (Dark Mode) */
                .macos-content::-webkit-scrollbar {
                    width: 8px;
                }
                .macos-content::-webkit-scrollbar-track {
                    background: transparent;
                }
                .macos-content::-webkit-scrollbar-thumb {
                    background-color: #555555;
                    border-radius: 20px;
                    border: 3px solid #1e1e1e;
                }
            `}} />

            {/* Main Window Container */}
            <div style={{
                width: '100%',
                maxWidth: '1000px',
                background: '#1e1e1e', // macOS dark window background
                borderRadius: 'var(--window-radius)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)', // Deeper shadow for dark mode
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '75vh',
                minHeight: '550px'
            }}>
                
                {/* macOS Title Bar */}
                <div style={{ 
                    height: '40px', 
                    background: '#2d2d2d', // Dark mode title bar
                    borderBottom: '1px solid #000000', 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '0 16px',
                    position: 'relative'
                }}>
                    {/* Traffic Lights */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56', border: '1px solid #e0443e' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e', border: '1px solid #dea123' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f', border: '1px solid #1aab29' }} />
                    </div>
                    {/* Window Title */}
                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: '#dedede',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        letterSpacing: '0.01em',
                        fontFamily: 'SubtitleFont, sans-serif'
                    }}>
                        Joshua Hatfield — CV
                    </div>
                </div>

                {/* Main Split Layout */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'var(--grid-layout)',
                    flex: 1,
                    overflow: 'hidden'
                }}>
                    
                    {/* Left: Sidebar Menu (Finder Style) */}
                    <div className="macos-sidebar" style={{ 
                        background: '#282828', // Dark mode sidebar
                        borderRight: '1px solid #000000',
                        padding: '20px 12px',
                        display: 'flex', 
                        flexDirection: 'var(--menu-dir)' as 'column' | 'row',
                        gap: '4px'
                    }}>
                        <div style={{ 
                            padding: '0 10px', 
                            marginBottom: '10px', 
                            color: '#98989d', // Apple dark gray
                            fontSize: '0.75rem', 
                            fontWeight: 600, 
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            fontFamily: 'BaseFont, sans-serif'
                        }}>
                            Favorites
                        </div>

                        {tabs.map((tab) => {
                            const isActive = activeTab === tab;
                            return (
                                <button 
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    style={{
                                        padding: '8px 12px',
                                        background: isActive ? '#007aff' : 'transparent', // Apple Blue stays the same
                                        border: 'none',
                                        borderRadius: '6px',
                                        color: isActive ? '#ffffff' : '#dedede',
                                        fontSize: '0.9rem',
                                        fontWeight: isActive ? 600 : 400,
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        transition: 'background 0.1s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        fontFamily: 'SubtitleFont, sans-serif'
                                    }}
                                    onMouseEnter={e => {
                                        if(!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                    }}
                                    onMouseLeave={e => {
                                        if(!isActive) e.currentTarget.style.background = 'transparent';
                                    }}
                                >
                                    {tab.charAt(0) + tab.slice(1).toLowerCase()}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right: Content Pane */}
                    <div className="macos-content" style={{ 
                        padding: '40px', 
                        overflowY: 'auto',
                        background: '#1e1e1e' // Dark mode content background
                    }}>
                        
                        {/* PROFILE VIEW */}
                        {activeTab === 'PROFILE' && (
                            <div className="data-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                                <div>
                                    <h1 style={{ color: '#ffffff', fontSize: '2.5rem', fontWeight: 700, margin: '0 0 20px 0', letterSpacing: '-0.03em', fontFamily: 'TitleFont, sans-serif' }}>
                                        Joshua Hatfield
                                    </h1>
                                    <p style={{ color: '#dedede', fontSize: '1.1rem', lineHeight: '1.6', margin: 0, fontFamily: 'TextFont, sans-serif' }}>
                                        {cvData.profile}
                                    </p>
                                </div>
                                
                                <div>
                                    <h3 style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 600, margin: '0 0 15px 0', fontFamily: 'SubtitleFont, sans-serif' }}>Contact & Links</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
                                        {cvData.socials.map((social) => (
                                            <a key={social.platform} href={social.link} target="_blank" rel="noopener noreferrer" style={{
                                                padding: '16px',
                                                background: '#2c2c2e', // macOS Dark mode secondary bg
                                                borderRadius: '10px',
                                                textDecoration: 'none',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '4px',
                                                transition: 'transform 0.2s ease, background 0.2s ease',
                                                border: '1px solid rgba(255,255,255,0.05)'
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.background = '#3a3a3c';
                                                e.currentTarget.style.transform = 'scale(1.02)';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.background = '#2c2c2e';
                                                e.currentTarget.style.transform = 'scale(1)';
                                            }}>
                                                <span style={{ color: '#98989d', fontSize: '0.8rem', fontWeight: 500, fontFamily: 'SubtitleFont, sans-serif' }}>{social.platform}</span>
                                                <span style={{ color: '#0a84ff', fontSize: '0.95rem', fontWeight: 500, fontFamily: 'TextFont, sans-serif' }}>{social.handle}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* EXPERIENCE VIEW */}
                        {activeTab === 'EXPERIENCE' && (
                            <div className="data-reveal" style={{ display: 'flex', flexDirection: 'column' }}>
                                <h2 style={{ color: '#ffffff', fontSize: '2rem', fontWeight: 700, margin: '0 0 30px 0', letterSpacing: '-0.02em', fontFamily: 'TitleFont, sans-serif' }}>Experience</h2>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                    {cvData.experience.map((job, idx) => (
                                        <div key={idx} style={{ 
                                            paddingBottom: '30px', 
                                            borderBottom: idx === cvData.experience.length - 1 ? 'none' : '1px solid #3a3a3c',
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                                                <div>
                                                    <h3 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: 600, margin: '0 0 4px 0', fontFamily: 'SubtitleFont, sans-serif' }}>{job.role}</h3>
                                                    <div style={{ color: '#98989d', fontSize: '0.9rem', fontWeight: 500, fontFamily: 'TextFont, sans-serif' }}>{job.location}</div>
                                                </div>
                                                <div style={{ background: '#2c2c2e', padding: '4px 10px', borderRadius: '6px', color: '#dedede', fontSize: '0.85rem', fontWeight: 500, fontFamily: 'TextFont, sans-serif' }}>
                                                    {job.period}
                                                </div>
                                            </div>
                                            
                                            <ul style={{ margin: 0, paddingLeft: '18px', color: '#a1a1a6', fontSize: '1rem', lineHeight: '1.5', fontFamily: 'TextFont, sans-serif' }}>
                                                {job.bullets.map((bullet, bIdx) => (
                                                    <li key={bIdx} style={{ marginBottom: '6px' }}>{bullet}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* EDUCATION VIEW */}
                        {activeTab === 'EDUCATION' && (
                            <div className="data-reveal" style={{ display: 'flex', flexDirection: 'column' }}>
                                <h2 style={{ color: '#ffffff', fontSize: '2rem', fontWeight: 700, margin: '0 0 30px 0', letterSpacing: '-0.02em', fontFamily: 'TitleFont, sans-serif' }}>Education</h2>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                                    {cvData.education.map((edu, idx) => (
                                        <div key={idx} style={{ 
                                            padding: '24px', 
                                            background: '#2c2c2e',
                                            borderRadius: '12px',
                                            border: '1px solid #3a3a3c'
                                        }}>
                                            <h3 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600, margin: '0 0 12px 0', fontFamily: 'SubtitleFont, sans-serif' }}>{edu.school}</h3>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <div style={{ color: '#dedede', fontSize: '0.9rem', fontWeight: 500, fontFamily: 'TextFont, sans-serif' }}>
                                                    <span style={{ color: '#98989d', marginRight: '6px' }}>Period:</span> {edu.period}
                                                </div>
                                                <div style={{ color: '#a1a1a6', fontSize: '0.9rem', fontFamily: 'TextFont, sans-serif' }}>
                                                    {edu.location}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* PROJECTS VIEW */}
                        {activeTab === 'PROJECTS' && (
                            <div className="data-reveal">
                                <h2 style={{ color: '#ffffff', fontSize: '2rem', fontWeight: 700, margin: '0 0 30px 0', letterSpacing: '-0.02em', fontFamily: 'TitleFont, sans-serif' }}>BTEC Coursework</h2>
                                
                                <div style={{ 
                                    display: 'flex',
                                    flexDirection: 'column',
                                    background: '#2c2c2e',
                                    borderRadius: '10px',
                                    padding: '0 20px',
                                    border: '1px solid #3a3a3c'
                                }}>
                                    {cvData.projects.map((proj, idx) => {
                                        // macOS dark mode styled grade logic
                                        let gradeBg = '#3a3a3c';
                                        let gradeColor = '#98989d';
                                        
                                        if (proj.grade === 'D') {
                                            gradeBg = '#13301a'; // Dark green bg
                                            gradeColor = '#32d74b'; // Apple bright green
                                        }
                                        if (proj.grade === 'M') {
                                            gradeBg = '#10243e'; // Dark blue bg
                                            gradeColor = '#0a84ff'; // Apple bright blue
                                        }

                                        return (
                                            <div key={idx} style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '16px 0',
                                                borderBottom: idx === cvData.projects.length - 1 ? 'none' : '1px solid #3a3a3c',
                                            }}>
                                                <span style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 500, fontFamily: 'BaseFont, sans-serif' }}>
                                                    {proj.unit}
                                                </span>
                                                <span style={{ 
                                                    background: gradeBg,
                                                    color: gradeColor, 
                                                    fontSize: '0.85rem', 
                                                    fontWeight: 600,
                                                    padding: '4px 10px',
                                                    borderRadius: '20px',
                                                    display: 'inline-block',
                                                    minWidth: '32px',
                                                    textAlign: 'center',
                                                    fontFamily: 'BaseFont, sans-serif'
                                                }}>
                                                    {proj.grade}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            </section>
        </>
    );
}