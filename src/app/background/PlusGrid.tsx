"use client";
import React, { useEffect, useState } from 'react';

export default function PlusGrid() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateSize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const size = 460; // grid spacing (increased for bigger boxes)
  const plusSize = 8; // plus sign size
  const color = '#929292';
  const { width, height } = dimensions;
  const cols = Math.ceil(width / size);
  const rows = Math.ceil(height / size);

  // Center the grid by offsetting the lines and plus signs
  const centerX = width / 2;
  const centerY = height / 2;
  const offsetCols = Math.floor(cols / 2);
  const offsetRows = Math.floor(rows / 2);

  return (
    <svg
      className="plus-grid-canvas"
      width={width}
      height={height}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        background: '#000',
      }}
    >
      {/* Centered Vertical lines */}
      {Array.from({ length: cols }).map((_, col) => (
        <line
          key={`vline-${col}`}
          x1={centerX + (col - offsetCols) * size}
          y1={0}
          x2={centerX + (col - offsetCols) * size}
          y2={height}
          stroke={color}
          strokeWidth="0.5"
        />
      ))}
      {/* Centered Horizontal lines */}
      {Array.from({ length: rows }).map((_, row) => (
        <line
          key={`hline-${row}`}
          x1={0}
          y1={centerY + (row - offsetRows) * size}
          x2={width}
          y2={centerY + (row - offsetRows) * size}
          stroke={color}
          strokeWidth="0.5"
        />
      ))}
      {/* Centered Plus signs */}
      {Array.from({ length: cols }).map((_, col) =>
        Array.from({ length: rows }).map((_, row) => (
          <g key={`plus-${col}-${row}`}>
            <line
              x1={centerX + (col - offsetCols) * size - plusSize / 2}
              y1={centerY + (row - offsetRows) * size}
              x2={centerX + (col - offsetCols) * size + plusSize / 2}
              y2={centerY + (row - offsetRows) * size}
              stroke={color}
              strokeWidth="1"
            />
            <line
              x1={centerX + (col - offsetCols) * size}
              y1={centerY + (row - offsetRows) * size - plusSize / 2}
              x2={centerX + (col - offsetCols) * size}
              y2={centerY + (row - offsetRows) * size + plusSize / 2}
              stroke={color}
              strokeWidth="1"
            />
          </g>
        ))
      )}
    </svg>
  );
}
