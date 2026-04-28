"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollingText() {
    const sectionRef = useRef<HTMLElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!sectionRef.current || !marqueeRef.current) return;

            // Section reveal scrub (fades and slides up the container)
            gsap.fromTo(sectionRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 95%',
                        end: 'top 60%',
                        scrub: 1,
                    }
                }
            );

            // Horizontal scrub for the marquee text (moves it as you scroll past)
            gsap.fromTo(marqueeRef.current,
                { xPercent: 0 },
                {
                    xPercent: -50,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom', // Start moving when section enters from bottom
                        end: 'bottom top',   // Stop moving when section leaves from top
                        scrub: 1, // 1 second smoothing
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} style={{
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
            {/* Inject CSS for the text styling (animations are now handled by GSAP) */}
            <style dangerouslySetInnerHTML={{__html: `
                .marquee-wrapper {
                    display: flex;
                    white-space: nowrap;
                    width: max-content;
                    will-change: transform;
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
                GSAP translates the container exactly 50% to the left during the scroll.
            */}
            <div ref={marqueeRef} className="marquee-wrapper">
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