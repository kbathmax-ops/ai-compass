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

  return (
    <>
      {/* Desktop top nav */}
      <nav
        className="hidden md:flex fixed top-0 left-0 right-0 z-50 h-14"
        style={{
          background: 'var(--stone)',
          borderBottom: '1px solid var(--stone-mid)',
        }}
      >
        <div className="max-w-4xl mx-auto px-8 sm:px-14 w-full flex items-center justify-between">
          {/* Wordmark */}
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" style={{ color: 'var(--cognac)' }}>
              <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.2" />
              <line x1="9" y1="1" x2="9" y2="17" stroke="currentColor" strokeWidth="1.2" />
              <line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="9" cy="9" r="1.5" fill="currentColor" />
            </svg>
            <span
              className="text-xs font-medium tracking-[0.22em] uppercase"
              style={{ color: 'var(--ink-md)' }}
            >
              AI Compass
            </span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-6">
            {[
              { href: '/dashboard', label: 'Curriculum' },
              { href: '/profile', label: 'Progress' },
            ].map(({ href, label }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className="text-xs tracking-wider transition-opacity duration-200"
                  style={{
                    color: isActive ? 'var(--cognac)' : 'var(--ink-muted)',
                    fontWeight: isActive ? 500 : 400,
                    opacity: isActive ? 1 : 0.7,
                  }}
                >
                  {label.toUpperCase()}
                </Link>
              );
            })}
          </div>

          {/* Progress counter */}
          <div className="text-xs" style={{ color: 'var(--ink-muted)' }}>
            {completedCount}/{totalCount}
          </div>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: 'var(--stone)',
          borderTop: '1px solid var(--stone-mid)',
        }}
      >
        <div className="flex">
          {[
            { href: '/dashboard', label: 'Curriculum', icon: <BookIcon /> },
            { href: '/profile', label: 'Progress', icon: <ChartIcon /> },
          ].map(({ href, label, icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className="flex-1 flex flex-col items-center gap-1 py-3"
                style={{
                  color: isActive ? 'var(--cognac)' : 'var(--ink-muted)',
                }}
              >
                {icon}
                <span className="text-[10px] tracking-wider uppercase">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

function BookIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}
