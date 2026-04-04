'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { getGoals } from '@/data/lessons';
import type { Goal } from '@/types';

export default function GoalsPage() {
  const router = useRouter();
  const { state, setGoals, finishOnboarding } = useApp();
  const [selected, setSelected] = useState<string[]>(state.selectedGoals);

  const goals = getGoals();

  function toggle(id: string) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id],
    );
  }

  function handleContinue() {
    setGoals(selected);
    finishOnboarding();
    router.push('/dashboard');
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--stone)', color: 'var(--ink)' }}
    >
      {/* ── Header strip ─────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-8 sm:px-14 pt-10">
        <div className="flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ color: 'var(--cognac)' }}>
            <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.2" />
            <line x1="9" y1="1" x2="9" y2="17" stroke="currentColor" strokeWidth="1.2" />
            <line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="9" cy="9" r="1.5" fill="currentColor" />
          </svg>
          <span className="text-xs font-medium tracking-[0.22em] uppercase" style={{ color: 'var(--ink-md)' }}>
            AI Compass
          </span>
        </div>
        <span className="text-xs tracking-wider" style={{ color: 'var(--ink-muted)' }}>
          Step 1 of 2
        </span>
      </header>

      <div className="mt-8 mx-8 sm:mx-14" style={{ borderTop: '1px solid var(--stone-mid)' }} />

      {/* ── Main ─────────────────────────────────────────────────────── */}
      <main className="flex-1 px-8 sm:px-14 py-12 sm:py-16">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="text-xs font-medium tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--cognac)' }}>
            Set your direction
          </p>

          {/* Heading */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
              lineHeight: 1.0,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
              marginBottom: '1.25rem',
            }}
          >
            What do you want<br />
            <em style={{ fontStyle: 'italic', color: 'var(--cognac)' }}>to get better at?</em>
          </h1>

          <p className="text-sm leading-relaxed mb-10" style={{ color: 'var(--ink-md)', maxWidth: '28rem' }}>
            Pick the areas that matter most to your business.
            Your curriculum will be built around these.
          </p>

          {/* Goals grid */}
          <div className="grid sm:grid-cols-2 gap-3 mb-12">
            {goals.map(goal => (
              <GoalCard
                key={goal.id}
                goal={goal}
                selected={selected.includes(goal.id)}
                onToggle={() => toggle(goal.id)}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button
              onClick={handleContinue}
              disabled={selected.length === 0}
              className="group flex items-center gap-5"
              style={{ opacity: selected.length === 0 ? 0.4 : 1, cursor: selected.length === 0 ? 'not-allowed' : 'pointer' }}
            >
              <span
                className="text-sm font-medium tracking-wide transition-colors duration-200 group-hover:opacity-60"
                style={{ color: 'var(--ink)' }}
              >
                {selected.length === 0
                  ? 'Select at least one goal'
                  : `Continue with ${selected.length} goal${selected.length > 1 ? 's' : ''}`}
              </span>
              <div
                className="w-10 h-10 flex items-center justify-center transition-all duration-200 group-hover:translate-x-1"
                style={{ border: '1px solid var(--stone-mid)', background: 'transparent' }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ color: 'var(--ink)' }}>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>

            <button
              onClick={handleContinue}
              className="text-xs tracking-wider transition-opacity duration-200 hover:opacity-60"
              style={{ color: 'var(--ink-muted)' }}
            >
              Skip for now →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Goal card ────────────────────────────────────────────────────────────────

function GoalCard({
  goal,
  selected,
  onToggle,
}: {
  goal: Goal;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="text-left transition-all duration-200"
      style={{
        padding: '1.25rem 1.5rem',
        border: selected ? '1px solid var(--cognac)' : '1px solid var(--stone-mid)',
        background: selected ? 'rgba(184,116,46,0.04)' : 'transparent',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
      }}
    >
      {/* Icon */}
      <span className="text-xl flex-shrink-0 mt-0.5">{goal.icon}</span>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <h3
            className="font-medium text-sm leading-snug"
            style={{ color: selected ? 'var(--cognac)' : 'var(--ink)' }}
          >
            {goal.label}
          </h3>
          {/* Checkmark */}
          <div
            className="flex-shrink-0 w-4 h-4 flex items-center justify-center mt-0.5"
            style={{
              border: selected ? '1px solid var(--cognac)' : '1px solid var(--stone-dk)',
              background: selected ? 'var(--cognac)' : 'transparent',
            }}
          >
            {selected && (
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} className="w-2.5 h-2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        </div>
        <p className="text-xs leading-relaxed mt-1" style={{ color: 'var(--ink-muted)' }}>
          {goal.description}
        </p>
      </div>
    </button>
  );
}
