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

const heightMap = {
  xs: 'h-1',
  sm: 'h-2',
  md: 'h-3',
};

const colorMap = {
  forest: 'bg-forest-500',
  amber:  'bg-amber-500',
  teal:   'bg-teal-500',
};

const trackColorMap = {
  forest: 'bg-forest-100',
  amber:  'bg-amber-100',
  teal:   'bg-teal-100',
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
    const raf = requestAnimationFrame(() => {
      setDisplayValue(clampedValue);
    });
    return () => cancelAnimationFrame(raf);
  }, [clampedValue, animate]);

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && (
            <span className="text-xs font-medium text-forest-600">{label}</span>
          )}
          {showPercentage && (
            <span className="text-xs font-semibold text-forest-700">
              {Math.round(clampedValue)}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full ${heightMap[size]} ${trackColorMap[color]} rounded-full overflow-hidden`}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`${heightMap[size]} ${colorMap[color]} rounded-full progress-bar-fill`}
          style={{ width: `${displayValue}%` }}
        />
      </div>
    </div>
  );
}

// ─── Circular progress indicator ─────────────────────────────────────────────

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
  strokeWidth = 4,
  color = '#2e7d5a',
  label,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#d9ede0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      {label && (
        <span
          className="absolute text-xs font-bold text-forest-800"
          style={{ transform: 'rotate(0deg)' }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
