"use client";
import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';

export default function DigitalCV() {
    const [activeTab, setActiveTab] = useState('EXPERIENCE');

    // Parsed CV Data
    const cvData = {
        profile: "I'm Joshua, A Computer Scientist with a passion for Graphic Design and the complex architecture of our current digital era. My skills have only changed for the better through-out my 2 year BTEC college course and working alongside the NHS in their content creation department.",
        socials: [
            { platform: 'Instagram', handle: '@h4tfi3ld', link: '#' },
            { platform: 'X / Twitter', handle: '@h4tfi3ld', link: '#' },
            { platform: 'LinkedIn', handle: '@Joshua Hatfield', link: '#' },
            { platform: 'GitHub', handle: '@revokedkystar', link: '#' },
            { platform: 'Email', handle: 'hatfij08@gmail.com', link: 'mailto:hatfij08@gmail.com' },
            { platform: 'Web', handle: 'project7even.site', link: 'https://project7even.site' },
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
                    'My first job which demonstrated the industry-standards to a professional workplace, how to interact with customers and provide overall great service to boost company representation.'
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
            { unit: 'UNIT 8 - IT PROJECT MANAGEMENT', grade: 'P' },
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
                zIndex: 10,
                padding: 'var(--section-pad)',
            }}>
            
            {/* CSS Variables & Animations */}
            <style dangerouslySetInnerHTML={{__html: `
                .cv-section {
                    --section-pad: 120px 0;
                    --container-pad: 0 40px;
                    --grid-layout: 280px 1fr;
                    --menu-dir: column;
                    --content-pad: 0 0 0 60px;
                    --border-divider: 1px solid rgba(255,255,255,0.1);
                }

                /* Tablet Breakpoint */
                @media (max-width: 1024px) {
                    .cv-section {
                        --section-pad: 80px 0;
                        --grid-layout: 1fr; /* Stack menu on top */
                        --menu-dir: row;
                        --content-pad: 40px 0 0 0;
                        --border-divider: none;
                    }
                    .cv-menu {
                        overflow-x: auto;
                        white-space: nowrap;
                        padding-bottom: 20px;
                        border-bottom: 1px solid rgba(255,255,255,0.1);
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                    .cv-menu::-webkit-scrollbar { display: none; }
                }

                /* Mobile Breakpoint */
                @media (max-width: 768px) {
                    .cv-section {
                        --section-pad: 60px 0;
                        --container-pad: 0 20px;
                    }
                }

                .data-reveal {
                    animation: revealData 0.3s cubic-bezier(0, 0.55, 0.45, 1) forwards;
                }

                @keyframes revealData {
                    from { opacity: 0; clip-path: inset(0 100% 0 0); transform: translateX(-10px); }
                    to { opacity: 1; clip-path: inset(0 0 0 0); transform: translateX(0); }
                }
            `}} />

            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: 'var(--container-pad)',
            }}>
                
                {/* Header */}
                <div style={{ marginBottom: '80px' }}>
                    <span style={{ 
                        color: 'rgba(255,255,255,0.4)', 
                        fontSize: '0.8rem', 
                        fontFamily: 'TitleFont, sans-serif',
                        letterSpacing: '0.3em', 
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '15px'
                    }}>
                        — CV_MY_SEE / 1.1
                    </span>
                    <h2 style={{
                        color: '#fff',
                        fontSize: 'clamp(3rem, 8vw, 6rem)',
                        fontWeight: 900,
                        lineHeight: 0.85,
                        letterSpacing: '-0.02em',
                        margin: 0,
                        fontFamily: 'SubtitleFont, Impact, sans-serif',
                        textTransform: 'uppercase'
                    }}>
                        JOSHUA <br />
                        <span style={{ color: 'transparent', WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}>HATFIELD</span>
                    </h2>
                </div>

                {/* Main Split Layout */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'var(--grid-layout)',
                    alignItems: 'start',
                }}>
                    
                    {/* Left: Directory Menu */}
                    <div className="cv-menu" style={{ 
                        display: 'flex', 
                        flexDirection: 'var(--menu-dir)' as 'column' | 'row',
                        gap: '10px',
                        borderRight: 'var(--border-divider)'
                    }}>
                        {tabs.map((tab, index) => {
                            const isActive = activeTab === tab;
                            return (
                                <button 
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    style={{
                                        padding: '16px 20px',
                                        background: isActive ? '#fff' : 'transparent',
                                        border: '1px solid',
                                        borderColor: isActive ? '#fff' : 'rgba(255,255,255,0.1)',
                                        color: isActive ? '#000' : 'rgba(255,255,255,0.5)',
                                        fontFamily: '"Fira Code", monospace',
                                        fontSize: '0.85rem',
                                        letterSpacing: '0.1em',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                    onMouseEnter={e => {
                                        if(!isActive) {
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                                            e.currentTarget.style.color = '#fff';
                                        }
                                    }}
                                    onMouseLeave={e => {
                                        if(!isActive) {
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                            e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                                        }
                                    }}
                                >
                                    <span>0{index + 1} // {tab}</span>
                                    {isActive && <span>■</span>}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right: Data Output Pane */}
                    <div style={{ padding: 'var(--content-pad)', minHeight: '500px' }}>
                        
                        {/* PROFILE VIEW */}
                        {activeTab === 'PROFILE' && (
                            <div className="data-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
                                <div>
                                    <span style={{ color: '#4ade80', fontSize: '0.8rem', fontFamily: 'monospace', letterSpacing: '0.1em', display: 'block', marginBottom: '20px' }}>&gt; EXECUTE PROFILE_READ</span>
                                    <p style={{ color: '#fff', fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', lineHeight: '1.4', fontFamily: 'TextFont, sans-serif', margin: 0 }}>
                                        {cvData.profile}
                                    </p>
                                </div>
                                
                                <div>
                                    <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '30px' }} />
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        {cvData.socials.map((social) => (
                                            <a key={social.platform} href={social.link} target="_blank" rel="noopener noreferrer" style={{
                                                padding: '24px',
                                                background: '#000',
                                                textDecoration: 'none',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '10px',
                                                transition: 'background 0.2s ease'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                            onMouseLeave={e => e.currentTarget.style.background = '#000'}>
                                                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{social.platform}</span>
                                                <span style={{ color: '#fff', fontSize: '0.9rem', fontFamily: 'TextFont, sans-serif' }}>{social.handle}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* EXPERIENCE VIEW */}
                        {activeTab === 'EXPERIENCE' && (
                            <div className="data-reveal" style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ color: '#4ade80', fontSize: '0.8rem', fontFamily: 'monospace', letterSpacing: '0.1em', display: 'block', marginBottom: '40px' }}>&gt; QUERY EXPERIENCE_DB</span>
                                
                                {cvData.experience.map((job, idx) => (
                                    <div key={idx} style={{ 
                                        padding: '40px 0', 
                                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                                        borderTop: idx === 0 ? '1px solid rgba(255,255,255,0.1)' : 'none'
                                    }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                                            <div>
                                                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', fontFamily: 'monospace', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>[{job.type}]</span>
                                                <h3 style={{ color: '#fff', fontSize: '1.5rem', fontFamily: 'TitleFont, sans-serif', margin: 0, textTransform: 'uppercase' }}>{job.role}</h3>
                                            </div>
                                            <div style={{ textAlign: 'left' }}>
                                                <div style={{ color: '#fff', fontSize: '0.9rem', fontFamily: 'monospace', marginBottom: '4px' }}>{job.period}</div>
                                                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontFamily: 'TextFont, sans-serif' }}>{job.location}</div>
                                            </div>
                                        </div>
                                        
                                        <ul style={{ margin: 0, paddingLeft: '20px', color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: '1.6', fontFamily: 'TextFont, sans-serif' }}>
                                            {job.bullets.map((bullet, bIdx) => (
                                                <li key={bIdx} style={{ marginBottom: '8px' }}>{bullet}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* EDUCATION VIEW */}
                        {activeTab === 'EDUCATION' && (
                            <div className="data-reveal" style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ color: '#4ade80', fontSize: '0.8rem', fontFamily: 'monospace', letterSpacing: '0.1em', display: 'block', marginBottom: '40px' }}>&gt; FETCH ACADEMIC_RECORDS</span>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    {cvData.education.map((edu, idx) => (
                                        <div key={idx} style={{ 
                                            padding: '40px', 
                                            background: '#000',
                                        }}>
                                            <h3 style={{ color: '#fff', fontSize: '1.4rem', fontFamily: 'SubtitleFont, sans-serif', margin: '0 0 20px 0', textTransform: 'uppercase' }}>{edu.school}</h3>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <div style={{ color: '#fff', fontSize: '0.85rem', fontFamily: 'monospace', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                                                    <span style={{ color: 'rgba(255,255,255,0.4)', marginRight: '10px' }}>TERM:</span> {edu.period}
                                                </div>
                                                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontFamily: 'TextFont, sans-serif', paddingTop: '8px' }}>
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
                                <span style={{ color: '#4ade80', fontSize: '0.8rem', fontFamily: 'monospace', letterSpacing: '0.1em', display: 'block', marginBottom: '40px' }}>&gt; LOAD BTEC_WORKLIST_ARRAY</span>
                                
                                <div style={{ 
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderTop: '1px solid rgba(255,255,255,0.2)'
                                }}>
                                    {cvData.projects.map((proj, idx) => {
                                        // Stark color logic for grades
                                        let gradeColor = '#fff';
                                        if (proj.grade === 'D') gradeColor = '#4ade80'; // Distinction = Green
                                        if (proj.grade === 'M') gradeColor = '#FFBD2E'; // Merit = Yellow
                                        if (proj.grade === 'P') gradeColor = 'rgba(255,255,255,0.4)'; // Pass = Dim

                                        return (
                                            <div key={idx} style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '20px 0',
                                                borderBottom: '1px solid rgba(255,255,255,0.1)',
                                                transition: 'background 0.2s ease',
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                                e.currentTarget.style.paddingLeft = '15px';
                                                e.currentTarget.style.paddingRight = '15px';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.background = 'transparent';
                                                e.currentTarget.style.paddingLeft = '0';
                                                e.currentTarget.style.paddingRight = '0';
                                            }}
                                            >
                                                <span style={{ color: '#fff', fontSize: 'clamp(0.8rem, 2vw, 1rem)', fontFamily: 'TitleFont, sans-serif', textTransform: 'uppercase' }}>
                                                    {proj.unit}
                                                </span>
                                                <span style={{ 
                                                    color: gradeColor, 
                                                    fontSize: '1rem', 
                                                    fontFamily: '"Fira Code", monospace',
                                                    fontWeight: 'bold',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '15px'
                                                }}>
                                                    <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem', fontWeight: 'normal' }}>GRADE</span> 
                                                    [{proj.grade}]
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