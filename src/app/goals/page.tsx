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
      style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--space-4) var(--space-4)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
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
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-3)',
          }}
        >
          Step 1 / 2
        </span>
      </header>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <main
        style={{
          flex: 1,
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          padding: 'var(--space-12) var(--space-4)',
        }}
      >
        {/* Heading block */}
        <div style={{ maxWidth: '480px', marginBottom: 'var(--space-12)' }}>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-brand)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Set your direction
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              color: 'var(--color-text)',
              marginBottom: 'var(--space-4)',
            }}
          >
            What do you want<br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-brand)' }}>to get better at?</em>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              lineHeight: 1.6,
              color: 'var(--color-text-2)',
            }}
          >
            Pick the areas that matter most to your business.
            Your curriculum will be built around these.
          </p>
        </div>

        {/* Goals grid — asymmetric: first item wider */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1px',
            background: 'var(--color-border)',
            marginBottom: 'var(--space-12)',
            maxWidth: '800px',
          }}
        >
          {goals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              selected={selected.includes(goal.id)}
              onToggle={() => toggle(goal.id)}
            />
          ))}
        </div>

        {/* CTA block */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
          <button
            onClick={handleContinue}
            disabled={selected.length === 0}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '40px',
              padding: '0 var(--space-6)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              background: selected.length === 0 ? 'transparent' : 'var(--color-invert)',
              color: selected.length === 0 ? 'var(--color-text-3)' : 'var(--color-text-inv)',
              border: selected.length === 0 ? '1px solid var(--color-border-strong)' : '1px solid transparent',
              borderRadius: 'var(--radius-sm)',
              cursor: selected.length === 0 ? 'not-allowed' : 'pointer',
              opacity: selected.length === 0 ? 0.5 : 1,
              transition: `background var(--duration-fast) var(--ease)`,
            }}
            onMouseEnter={e => {
              if (selected.length > 0) (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-brand)';
            }}
            onMouseLeave={e => {
              if (selected.length > 0) (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-invert)';
            }}
          >
            {selected.length === 0
              ? 'Select at least one goal'
              : `Continue — ${selected.length} selected`}
          </button>

          <button
            onClick={handleContinue}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text-3)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: `color var(--duration-fast) var(--ease)`,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-2)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-3)'; }}
          >
            Skip →
          </button>
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
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--space-3)',
        padding: 'var(--space-6)',
        textAlign: 'left',
        background: selected ? 'var(--color-surface-2)' : 'var(--color-bg)',
        border: 'none',
        cursor: 'pointer',
        transition: `background var(--duration-fast) var(--ease)`,
        width: '100%',
      }}
    >
      {/* Icon */}
      <span style={{ fontSize: '18px', flexShrink: 0, marginTop: '1px', lineHeight: 1 }}>{goal.icon}</span>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-2)' }}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-base)',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              color: selected ? 'var(--color-text)' : 'var(--color-text)',
            }}
          >
            {goal.label}
          </h3>
          {/* Checkbox — square */}
          <div
            style={{
              flexShrink: 0,
              width: '16px',
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: selected ? '1px solid var(--color-text)' : '1px solid var(--color-border-strong)',
              background: selected ? 'var(--color-invert)' : 'transparent',
              marginTop: '2px',
            }}
          >
            {selected && (
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-inv)" strokeWidth={3}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            lineHeight: 1.5,
            color: 'var(--color-text-2)',
            marginTop: 'var(--space-1)',
          }}
        >
          {goal.description}
        </p>
      </div>
    </button>
  );
}
