'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean; // kept for compat — ignored
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const paddingMap = {
  none: '0',
  sm:   'var(--space-4)',
  md:   'var(--space-6)',
  lg:   'var(--space-8)',
};

export function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
  onClick,
}: CardProps) {
  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      onClick={onClick}
      className={className}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-1)',
        padding: paddingMap[padding],
        ...(hover && { cursor: 'pointer', transition: `box-shadow var(--duration-fast) var(--ease), border-color var(--duration-fast) var(--ease)` }),
        ...(onClick && { textAlign: 'left', width: '100%' }),
      }}
      onMouseEnter={hover ? e => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-2)';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-strong)';
      } : undefined}
      onMouseLeave={hover ? e => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-1)';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
      } : undefined}
    >
      {children}
    </Tag>
  );
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={className} style={{ marginBottom: 'var(--space-4)' }}>{children}</div>;
}

export function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h3
      className={className}
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-lg)',
        fontWeight: 400,
        letterSpacing: '-0.02em',
        color: 'var(--color-text)',
        lineHeight: 1.3,
      }}
    >
      {children}
    </h3>
  );
}

export function CardBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-base)',
        color: 'var(--color-text-2)',
        lineHeight: 1.6,
      }}
    >
      {children}
    </div>
  );
}
