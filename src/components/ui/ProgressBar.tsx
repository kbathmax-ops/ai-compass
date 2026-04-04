'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ProgressBarProps {
  value: number; // 0–100
  label?: string;
  showPercentage?: boolean;
  size?: 'xs' | 'sm' | 'md';
  color?: 'forest' | 'amber' | 'teal';
  animate?: boolean;
  className?: string;
}

const heightMap = { xs: '2px', sm: '3px', md: '4px' };

// All colors → editorial palette
const colorMap = {
  forest: 'var(--color-text)',
  amber:  'var(--color-brand)',
  teal:   'var(--color-text-2)',
};

export function ProgressBar({
  value,
  label,
  showPercentage = false,
  size = 'sm',
  color = 'forest',
  animate = true,
  className = '',
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const [displayValue, setDisplayValue] = useState(animate ? 0 : clampedValue);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!animate || hasAnimated.current) return;
    hasAnimated.current = true;
    const raf = requestAnimationFrame(() => setDisplayValue(clampedValue));
    return () => cancelAnimationFrame(raf);
  }, [clampedValue, animate]);

  const barColor = colorMap[color];
  const height = heightMap[size];

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center" style={{ marginBottom: '6px' }}>
          {label && (
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-3)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </span>
          )}
          {showPercentage && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-2)',
              }}
            >
              {Math.round(clampedValue)}%
            </span>
          )}
        </div>
      )}
      <div
        style={{
          width: '100%',
          height,
          background: 'var(--color-border)',
          borderRadius: 0,
          overflow: 'hidden',
        }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          style={{
            height,
            width: `${displayValue}%`,
            background: barColor,
            borderRadius: 0,
            transition: 'width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
      </div>
    </div>
  );
}

// ─── Circular progress ─────────────────────────────────────────────────────────

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export function CircularProgress({
  value,
  size = 48,
  strokeWidth = 3,
  color = 'var(--color-text)',
  label,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
        />
      </svg>
      {label && (
        <span
          style={{
            position: 'absolute',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text)',
            transform: 'rotate(0deg)',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
