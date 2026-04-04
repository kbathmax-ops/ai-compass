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
    'bg-forest-700 text-white hover:bg-forest-600 active:bg-forest-800 shadow-nature hover:shadow-nature-md',
  secondary:
    'bg-forest-100 text-forest-800 hover:bg-forest-200 active:bg-forest-300',
  ghost:
    'bg-transparent text-forest-700 hover:bg-forest-50 active:bg-forest-100',
  amber:
    'bg-amber-500 text-white hover:bg-amber-400 active:bg-amber-600 shadow-amber hover:shadow-lg',
  outline:
    'border-2 border-forest-300 text-forest-700 hover:border-forest-500 hover:bg-forest-50 bg-white/50',
};

const sizeStyles: Record<Size, string> = {
  sm:  'px-4 py-2 text-sm gap-1.5',
  md:  'px-6 py-2.5 text-sm gap-2',
  lg:  'px-8 py-3 text-base gap-2',
  xl:  'px-10 py-4 text-lg gap-2.5',
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
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={[
        'btn-pill font-semibold transition-all duration-200 select-none',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? 'w-full' : '',
        isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
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
