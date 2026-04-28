"use client";
import React from 'react';

export default function CustomScrollbar() {
    return (
        <style dangerouslySetInnerHTML={{ __html: `
            /* Custom Scrollbar for Webkit (Chrome, Edge, Safari) */
            ::-webkit-scrollbar {
                width: 14px;
                background: #000;
                border-left: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            ::-webkit-scrollbar-track {
                background: #000;
            }
            
            ::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2);
                border: 3px solid #000;
                border-radius: 8px;
                transition: background 0.3s ease;
            }
            
            ::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.4);
            }
            
            ::-webkit-scrollbar-corner {
                background: #000;
            }

            /* Custom Scrollbar for Firefox */
            * {
                scrollbar-width: auto;
                scrollbar-color: rgba(255, 255, 255, 0.2) #000;
            }
        `}} />
    );
}
