"use client";
import React from "react";

export default function ScrollingTicker() {
  const text = "JUST KEEP SCROLLING...   ";

  return (
    <div className="scrolling-ticker">
      <div className="ticker-track">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}