'use client';

import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function LandingPage() {
  const router = useRouter();
  const { setRole } = useApp();

  function handleStart() {
    setRole('smb');
    router.push('/goals');
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header
        className="flex items-center justify-between px-4 sm:px-12 py-5"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" style={{ color: 'var(--color-brand)' }}>
            <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.2" />
            <line x1="9" y1="1" x2="9" y2="17" stroke="currentColor" strokeWidth="1.2" />
            <line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="9" cy="9" r="1.5" fill="currentColor" />
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-text-2)',
            }}
          >
            AI Compass
          </span>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-text-3)',
          }}
        >
          7 lessons · No sign-up
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col justify-between px-4 sm:px-12">

        {/* Display heading */}
        <div className="pt-16 sm:pt-24 pb-8">
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-brand)',
              marginBottom: '1.5rem',
            }}
          >
            For small business owners
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 12vw, 9rem)',
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: 'var(--color-text)',
              maxWidth: '14ch',
            }}
          >
            Master AI<br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-brand)' }}>in 7 days.</em>
          </h1>
        </div>

        {/* Bottom split */}
        <div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-12 pb-16 sm:pb-24"
          style={{ borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              lineHeight: 1.6,
              color: 'var(--color-text-2)',
              maxWidth: '30ch',
            }}
          >
            Practical lessons built for real work.
            With the critical thinking to use AI wisely — not blindly.
          </p>

          <button
            onClick={handleStart}
            className="group flex items-center gap-4 flex-shrink-0"
            style={{ cursor: 'pointer' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--color-text)',
                transition: `color var(--duration-fast) var(--ease)`,
              }}
              className="group-hover:opacity-50 transition-opacity"
            >
              Begin your journey
            </span>
            <div
              style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--color-border-strong)',
                transition: `background var(--duration-fast) var(--ease), border-color var(--duration-fast) var(--ease)`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background = 'var(--color-invert)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-invert)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-border-strong)';
              }}
            >
              <svg
                width="14" height="14" viewBox="0 0 16 16" fill="none"
                style={{ color: 'var(--color-text)', transition: 'none' }}
                className="group-hover:[filter:invert(1)]"
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
        </div>
      </main>

      {/* ── Footer values strip ───────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid var(--color-border)' }}>
        <div
          className="flex divide-x"
          style={{ '--tw-divide-opacity': '1', borderColor: 'var(--color-border)' } as React.CSSProperties}
        >
          {VALUES.map(({ label, sub }) => (
            <div
              key={label}
              className="flex-1 px-5 sm:px-8 py-5 flex flex-col gap-1"
              style={{ borderRight: '1px solid var(--color-border)' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 500,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text)',
                }}
              >
                {label}
              </span>
              <span
                className="hidden sm:block"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  lineHeight: 1.5,
                  color: 'var(--color-text-3)',
                }}
              >
                {sub}
              </span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}

const VALUES = [
  { label: 'Roots',     sub: 'Real skills, not shortcuts' },
  { label: 'Clarity',   sub: 'One idea at a time' },
  { label: 'Intention', sub: 'Pause before you trust' },
  { label: 'Growth',    sub: 'Small steps compound' },
];
