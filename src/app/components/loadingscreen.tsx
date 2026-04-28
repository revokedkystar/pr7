"use client";
import React, { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
    const [progress, setProgress] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    // Simulate loading progress
    useEffect(() => {
        // Adjust these values to make the loading faster or slower
        const totalDuration = 2500; // Total time in ms (2.5 seconds)
        const updateInterval = 20; // How often the counter updates in ms
        const increment = 100 / (totalDuration / updateInterval);

        const timer = setInterval(() => {
            setProgress((prev) => {
                const nextProgress = prev + increment;
                if (nextProgress >= 100) {
                    clearInterval(timer);
                    // Slight delay at 100% before triggering the exit animation
                    setTimeout(() => setIsFinished(true), 400); 
                    return 100;
                }
                return nextProgress;
            });
        }, updateInterval);

        return () => clearInterval(timer);
    }, []);

    // Handle removing the element from the DOM entirely after the animation finishes
    useEffect(() => {
        if (isFinished) {
            const timeout = setTimeout(() => {
                setIsHidden(true);
                if (onComplete) onComplete();
            }, 1000); // Wait for the split animation to complete (1s)
            return () => clearTimeout(timeout);
        }
    }, [isFinished, onComplete]);

    if (isHidden) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999, // Ensure it covers absolutely everything
            display: 'flex',
            pointerEvents: isFinished ? 'none' : 'auto', // Stop blocking clicks once it starts opening
            overflow: 'hidden',
        }}>
            {/* Global CSS for the split animation */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes slideUp {
                    to { transform: translateY(-100%); }
                }
                @keyframes slideDown {
                    to { transform: translateY(100%); }
                }
                .panel-top.finished { animation: slideUp 1s cubic-bezier(0.77, 0, 0.175, 1) forwards; }
                .panel-bottom.finished { animation: slideDown 1s cubic-bezier(0.77, 0, 0.175, 1) forwards; }
            `}} />

            {/* Top Split Panel */}
            <div className={`panel-top ${isFinished ? 'finished' : ''}`} style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '50vh',
                background: '#000',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 1,
            }} />

            {/* Bottom Split Panel */}
            <div className={`panel-bottom ${isFinished ? 'finished' : ''}`} style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '50vh',
                background: '#000',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 1,
            }} />

            {/* Main Content Container (Fades out when finished) */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '40px',
                opacity: isFinished ? 0 : 1,
                transition: 'opacity 0.4s ease', // Quick fade before panels split
            }}>
                
                {/* Top Section: Loading Message */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        {/* Blinking Status Indicator */}
                        <div style={{ 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            background: '#4ade80',
                            animation: 'pulseStatus 1s infinite alternate' 
                        }} />
                        <style dangerouslySetInnerHTML={{__html: `@keyframes pulseStatus { from { opacity: 0.4; } to { opacity: 1; } }`}} />
                        
                        <span style={{ 
                            color: 'rgba(255, 255, 255, 0.6)', 
                            fontSize: '0.8rem', 
                            fontFamily: '"Fira Code", monospace',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em'
                        }}>
                            {Math.floor(progress) < 100 ? 'FETCHING ASSETS...' : 'SYSTEM READY.'}
                        </span>
                    </div>

                    <span style={{ 
                        color: 'rgba(255, 255, 255, 0.3)', 
                        fontSize: '0.8rem', 
                        fontFamily: '"Fira Code", monospace',
                        letterSpacing: '0.1em'
                    }}>
                        INITIALIZING
                    </span>
                </div>

                {/* Center Section: Giant Percentage Counter */}
                <div style={{ 
                    flex: 1, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                }}>
                    <div style={{ position: 'relative' }}>
                        <h1 style={{
                            fontSize: 'clamp(5rem, 15vw, 12rem)',
                            fontWeight: 900,
                            color: '#fff',
                            margin: 0,
                            lineHeight: 0.8,
                            fontFamily: 'SubtitleFont, Impact, sans-serif',
                            letterSpacing: '-0.05em'
                        }}>
                            {Math.floor(progress)}<span style={{ fontSize: 'clamp(2rem, 5vw, 5rem)', verticalAlign: 'top', opacity: 0.5 }}>%</span>
                        </h1>
                        
                        {/* Secondary styling shadow/offset text behind the main counter */}
                        <h1 style={{
                            position: 'absolute',
                            top: '4px',
                            left: '4px',
                            fontSize: 'clamp(5rem, 15vw, 12rem)',
                            fontWeight: 900,
                            color: 'transparent',
                            WebkitTextStroke: '1px rgba(255, 255, 255, 0.2)',
                            margin: 0,
                            lineHeight: 0.8,
                            fontFamily: 'SubtitleFont, Impact, sans-serif',
                            letterSpacing: '-0.05em',
                            zIndex: -1
                        }}>
                            {Math.floor(progress)}<span style={{ fontSize: 'clamp(2rem, 5vw, 5rem)', verticalAlign: 'top', opacity: 0.5 }}>%</span>
                        </h1>
                    </div>
                </div>

                {/* Bottom Section: Full Width Progress Bar */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.7rem', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                            LOADING_CORE_MODULES
                        </span>
                        <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.7rem', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                            {Math.floor(progress) === 100 ? 'COMPLETE' : 'IN_PROGRESS'}
                        </span>
                    </div>
                    
                    {/* The Bar */}
                    <div style={{
                        width: '100%',
                        height: '2px', // Very thin, brutalist line
                        background: 'rgba(255, 255, 255, 0.1)',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            background: '#fff',
                            width: `${progress}%`,
                            // A slight transition makes the width updates smooth even if interval is fast
                            transition: 'width 0.05s linear' 
                        }} />
                    </div>
                </div>

            </div>
        </div>
    );
}