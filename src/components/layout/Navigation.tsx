'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { getLessons } from '@/data/lessons';

export function Navigation() {
  const pathname = usePathname();
  const { state } = useApp();
  const { role, progress, onboardingComplete } = state;

  if (!onboardingComplete || !role) return null;

  const lessons = getLessons();
  const completedCount = progress.completedLessons.filter(id =>
    lessons.some(l => l.id === id),
  ).length;
  const totalCount = lessons.length;

  const NAV_ITEMS = [
    { href: '/dashboard', label: 'Curriculum' },
    { href: '/profile',   label: 'Progress' },
  ];

  return (
    <>
      {/* Desktop top nav */}
      <nav
        className="hidden md:flex fixed top-0 left-0 right-0 z-50"
        style={{
          height: '52px',
          background: 'var(--color-bg)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div
          className="w-full flex items-center justify-between"
          style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--space-12)' }}
        >
          {/* Wordmark */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2"
            style={{ textDecoration: 'none' }}
          >
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none" style={{ color: 'var(--color-brand)', flexShrink: 0 }}>
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
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'var(--color-text-2)',
              }}
            >
              AI Compass
            </span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center" style={{ gap: 'var(--space-8)' }}>
            {NAV_ITEMS.map(({ href, label }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--color-text)' : 'var(--color-text-2)',
                    textDecoration: 'none',
                    borderBottom: isActive ? '2px solid var(--color-text)' : '2px solid transparent',
                    paddingBottom: '2px',
                    transition: `color var(--duration-fast) var(--ease)`,
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Progress counter */}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-3)',
              letterSpacing: '0.04em',
            }}
          >
            {completedCount}/{totalCount}
          </span>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: 'var(--color-bg)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div className="flex">
          {NAV_ITEMS.map(({ href, label }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className="flex-1 flex flex-col items-center py-3"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--color-text)' : 'var(--color-text-3)',
                  textDecoration: 'none',
                  borderTop: isActive ? '2px solid var(--color-text)' : '2px solid transparent',
                  marginTop: '-1px',
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
