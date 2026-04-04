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
      style={{ background: 'var(--stone)', color: 'var(--stone-dark)' }}
    >
      {/* ── Header strip ─────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-8 sm:px-14 pt-10">
        <div className="flex items-center gap-3">
          {/* Compass mark — minimal circle with crosshair */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ color: 'var(--cognac)' }}>
            <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.2" />
            <line x1="9" y1="1" x2="9" y2="17" stroke="currentColor" strokeWidth="1.2" />
            <line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="9" cy="9" r="1.5" fill="currentColor" />
          </svg>
          <span
            className="text-xs font-medium tracking-[0.22em] uppercase"
            style={{ color: 'var(--charcoal)' }}
          >
            AI Compass
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs tracking-wider" style={{ color: 'var(--charcoal)' }}>
          <span style={{ opacity: 0.5 }}>7 lessons</span>
          <span style={{ opacity: 0.5 }}>/</span>
          <span style={{ opacity: 0.5 }}>No sign-up</span>
        </div>
      </header>

      {/* ── Divider ───────────────────────────────────────────────────── */}
      <div className="mt-8 mx-8 sm:mx-14" style={{ borderTop: '1px solid var(--stone-mid)' }} />

      {/* ── Main ─────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col justify-between px-8 sm:px-14 py-12 sm:py-20">

        {/* Headline block */}
        <div className="flex flex-col gap-6">
          <p
            className="text-xs font-medium tracking-[0.3em] uppercase"
            style={{ color: 'var(--cognac)' }}
          >
            For small business owners
          </p>

          <h1
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(4rem, 13vw, 11rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              fontWeight: 600,
              color: 'var(--stone-dark)',
            }}
          >
            Master AI<br />
            <em style={{ fontStyle: 'italic', color: 'var(--cognac)' }}>in 7 days.</em>
          </h1>
        </div>

        {/* Bottom split — description + CTA */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-12 mt-20 sm:mt-0">
          <p
            className="max-w-sm text-base leading-relaxed"
            style={{ color: 'var(--charcoal)', fontFamily: '"DM Sans", sans-serif' }}
          >
            Practical lessons built for real work.
            With the critical thinking to use AI wisely — not blindly.
          </p>

          <button
            onClick={handleStart}
            className="group flex items-center gap-5 flex-shrink-0"
          >
            <span
              className="text-base font-medium tracking-wide transition-colors duration-200 group-hover:opacity-60"
              style={{ color: 'var(--stone-dark)' }}
            >
              Begin your journey
            </span>
            <div
              className="w-12 h-12 flex items-center justify-center transition-all duration-200 group-hover:translate-x-1"
              style={{
                border: '1px solid var(--stone-mid)',
                background: 'transparent',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background = 'var(--cognac)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--cognac)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--stone-mid)';
              }}
            >
              <ArrowIcon />
            </div>
          </button>
        </div>
      </main>

      {/* ── Footer values strip ───────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid var(--stone-mid)' }}>
        <div className="flex divide-x" style={{ borderColor: 'var(--stone-mid)' }}>
          {VALUES.map(({ label, sub }) => (
            <div
              key={label}
              className="flex-1 px-6 sm:px-10 py-6 flex flex-col gap-1"
            >
              <span
                className="text-[10px] font-semibold tracking-[0.25em] uppercase"
                style={{ color: 'var(--cognac)' }}
              >
                {label}
              </span>
              <span
                className="text-xs leading-snug hidden sm:block"
                style={{ color: 'var(--charcoal)', opacity: 0.7 }}
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

// ─── Data ─────────────────────────────────────────────────────────────────────

const VALUES = [
  { label: 'Roots',     sub: 'Real skills, not shortcuts' },
  { label: 'Clarity',   sub: 'One idea at a time' },
  { label: 'Intention', sub: 'Pause before you trust' },
  { label: 'Growth',    sub: 'Small steps compound' },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: 'var(--stone-dark)' }}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
