'use client';

import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'amber' | 'outline';
type Size = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

// Height / padding per size — all uppercase, 13px, no pills
const sizeMap: Record<Size, React.CSSProperties> = {
  sm: { height: '32px', padding: '0 16px', fontSize: 'var(--text-xs)' },
  md: { height: '40px', padding: '0 24px', fontSize: 'var(--text-sm)' },
  lg: { height: '44px', padding: '0 28px', fontSize: 'var(--text-sm)' },
  xl: { height: '52px', padding: '0 36px', fontSize: 'var(--text-base)' },
};

// Color scheme per variant
const variantMap: Record<Variant, { base: React.CSSProperties; hover: React.CSSProperties }> = {
  primary: {
    base:  { background: 'var(--color-invert)', color: 'var(--color-text-inv)', border: '1px solid transparent' },
    hover: { background: 'var(--color-brand)' },
  },
  secondary: {
    base:  { background: 'transparent', color: 'var(--color-text)', border: '1px solid var(--color-border-strong)' },
    hover: { background: 'var(--color-surface-2)', borderColor: 'var(--color-text)' },
  },
  ghost: {
    base:  { background: 'transparent', color: 'var(--color-text-2)', border: '1px solid transparent' },
    hover: { color: 'var(--color-text)' },
  },
  // amber → brand (legacy compat)
  amber: {
    base:  { background: 'var(--color-brand)', color: 'var(--color-text-inv)', border: '1px solid transparent' },
    hover: { background: 'var(--color-brand-2)' },
  },
  outline: {
    base:  { background: 'transparent', color: 'var(--color-text)', border: '1px solid var(--color-border-strong)' },
    hover: { background: 'var(--color-surface-2)' },
  },
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  disabled,
  className = '',
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const { base } = variantMap[variant];
  const { hover } = variantMap[variant];

  return (
    <button
      disabled={isDisabled}
      onMouseEnter={e => {
        if (isDisabled) return;
        const el = e.currentTarget;
        Object.assign(el.style, hover);
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        Object.assign(el.style, base);
        // Re-apply combined style prop overrides
        if (style) Object.assign(el.style, style);
      }}
      className={[
        fullWidth ? 'w-full' : '',
        className,
      ].filter(Boolean).join(' ')}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        borderRadius: 'var(--radius-sm)',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.35 : 1,
        pointerEvents: isDisabled ? 'none' : 'auto',
        whiteSpace: 'nowrap',
        transition: `background-color var(--duration-fast) var(--ease), color var(--duration-fast) var(--ease), border-color var(--duration-fast) var(--ease)`,
        ...base,
        ...sizeMap[size],
        ...style,
      }}
      {...props}
    >
      {loading ? (
        <>
          <Spinner />
          <span>Loading…</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span style={{ flexShrink: 0 }}>{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span style={{ flexShrink: 0 }}>{icon}</span>}
        </>
      )}
    </button>
  );
}

function Spinner() {
  return (
    <svg
      style={{ animation: 'spin 1s linear infinite', width: '14px', height: '14px' }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
