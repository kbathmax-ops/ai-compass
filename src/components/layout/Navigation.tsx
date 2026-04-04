'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { RoleBadge } from '@/components/ui/Tag';
import { getLessons } from '@/data/lessons';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Learn', icon: BookIcon },
  { href: '/profile',   label: 'Progress', icon: ChartIcon },
];

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
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 h-16 glass-card border-b border-white/50">
        <div className="max-w-5xl mx-auto px-6 w-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-forest-700 flex items-center justify-center shadow-nature group-hover:bg-forest-600 transition-colors">
              <CompassIcon className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-forest-900 text-lg tracking-tight">
              AI Compass
            </span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-forest-100 text-forest-800'
                      : 'text-forest-600 hover:text-forest-800 hover:bg-forest-50',
                  ].join(' ')}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right side: role + progress */}
          <div className="flex items-center gap-3">
            <div className="text-xs text-forest-600 font-medium">
              {completedCount}/{totalCount} lessons
            </div>
            <RoleBadge />
          </div>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-white/50 safe-area-pb">
        <div className="flex">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={[
                  'flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors',
                  isActive ? 'text-forest-700' : 'text-forest-400',
                ].join(' ')}
              >
                <Icon className="w-5 h-5" />
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-forest-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}
