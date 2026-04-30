"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only initialize custom cursor on devices with a fine pointer (e.g. mouse)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      const { clientX, clientY, target } = e;
      
      const isInteractable = (target as HTMLElement)?.closest?.('a, button, input, textarea, select, [role="button"]');
      setIsHovering(!!isInteractable);

      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: clientX,
          y: clientY,
          duration: 0,
        });
      }

      if (followerRef.current) {
        gsap.to(followerRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.15,
          ease: "power2.out"
        });
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  return (
    <>
      <div 
        className="custom-cursor-follower"
        ref={followerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? '60px' : '40px',
          height: isHovering ? '60px' : '40px',
          borderRadius: '50%',
          border: isHovering ? '1.5px solid rgba(255, 255, 255, 0.1)' : '1.5px solid rgba(255, 255, 255, 0.5)',
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, border 0.3s ease',
          opacity: isVisible ? 1 : 0,
          mixBlendMode: 'difference',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      />
      <div 
        className="custom-cursor-dot"
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? (isHovering ? 0 : 1) : 0,
          transition: 'opacity 0.3s ease',
          mixBlendMode: 'difference'
        }}
      />
      <style>{`
        @media (pointer: fine) {
          body, a, button, [role="button"], input, select, textarea {
            cursor: none !important;
          }
        }
        @media (pointer: coarse) {
          .custom-cursor-follower, .custom-cursor-dot {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
