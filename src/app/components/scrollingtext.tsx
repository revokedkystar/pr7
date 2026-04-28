"use client";
import React from 'react';

export default function ScrollingText() {
    return (
        <section style={{
            width: '100%',
            overflow: 'hidden',
            background: '#000',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '60px 0',
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center'
        }}>
            {/* Inject CSS for the seamless marquee loop */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes scrollMarquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-wrapper {
                    display: flex;
                    white-space: nowrap;
                    /* Adjust the 30s value to make it scroll faster or slower */
                    animation: scrollMarquee 30s linear infinite;
                    width: max-content;
                    will-change: transform;
                }
                .marquee-wrapper:hover {
                    /* Optional: pauses the scroll when hovered */
                    animation-play-state: paused; 
                }
                .marquee-text {
                    font-family: BaseFont, Impact, sans-serif;
                    font-size: clamp(4rem, 12vw, 10rem); /* Scales massively on desktop, fits on mobile */
                    font-weight: 900;
                    text-transform: uppercase;
                    line-height: 0.9;
                    margin: 0 40px; /* Spacing between phrases */
                }
                .text-filled {
                    color: #fff;
                }
                .text-outline {
                    color: transparent;
                    -webkit-text-stroke: 2px rgba(255, 255, 255, 0.8);
                }
                .text-asterisk {
                    color: #ffffff; /* Subtle terminal green accent */
                }
            `}} />

            {/* To create a seamless loop, we render the exact same block of text twice.
                The animation translates the container exactly 50% to the left, and then instantly snaps back to 0%.
            */}
            <div className="marquee-wrapper">
                {/* Block 1 */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="marquee-text text-filled">THANK YOU FOR THE VISIT</span>
                    <span className="marquee-text text-asterisk">*</span>
                    <span className="marquee-text text-outline">THANK YOU FOR THE VISIT</span>
                    <span className="marquee-text text-asterisk">*</span>
                </div>
                
                {/* Block 2 (Exact Duplicate for Seamless Loop) */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="marquee-text text-filled">THANK YOU FOR THE VISIT</span>
                    <span className="marquee-text text-asterisk">*</span>
                    <span className="marquee-text text-outline">THANK YOU FOR THE VISIT</span>
                    <span className="marquee-text text-asterisk">*</span>
                </div>
            </div>
        </section>
    );
}