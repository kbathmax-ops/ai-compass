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

const variantStyles: Record<Variant, string> = {
  primary:
    'text-white hover:opacity-80 active:opacity-90',
  secondary:
    'hover:opacity-80',
  ghost:
    'bg-transparent hover:opacity-70',
  amber:
    'text-white hover:opacity-80',
  outline:
    'bg-transparent hover:opacity-80',
};

const variantInline: Record<Variant, React.CSSProperties> = {
  primary:   { background: 'var(--moss)', color: 'white', border: 'none' },
  secondary: { background: 'var(--stone-mid)', color: 'var(--ink)', border: 'none' },
  ghost:     { background: 'transparent', color: 'var(--ink-md)', border: 'none' },
  amber:     { background: 'var(--cognac)', color: 'white', border: 'none' },
  outline:   { background: 'transparent', color: 'var(--ink)', border: '1px solid var(--stone-mid)' },
};

const sizeStyles: Record<Size, string> = {
  sm:  'px-4 py-2 text-xs gap-1.5',
  md:  'px-6 py-2.5 text-sm gap-2',
  lg:  'px-8 py-3 text-sm gap-2',
  xl:  'px-10 py-4 text-base gap-2.5',
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

  return (
    <button
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 select-none',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? 'w-full' : '',
        isDisabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ ...variantInline[variant], ...style }}
      {...props}
    >
      {loading ? (
        <>
          <Spinner />
          <span>Loading…</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
