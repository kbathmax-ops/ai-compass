'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { getGoals } from '@/data/lessons';
import { Button } from '@/components/ui/Button';
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
    <div className="min-h-screen flex flex-col items-center px-4 py-16">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10 animate-slide-up">
        <p className="text-sm font-semibold text-forest-500 uppercase tracking-widest mb-3">
          Step 1 — Your goals
        </p>
        <h1 className="text-4xl font-black text-forest-950 mb-4 leading-tight">
          What do you want to<br />get better at?
        </h1>
        <p className="text-forest-600">
          Pick as many as you like. We&rsquo;ll build your curriculum around these.
        </p>
      </div>

      {/* Goals grid */}
      <div className="w-full max-w-2xl grid sm:grid-cols-2 gap-4 mb-10 animate-slide-up animation-delay-200">
        {goals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            selected={selected.includes(goal.id)}
            onToggle={() => toggle(goal.id)}
          />
        ))}
      </div>

      {/* Continue button */}
      <div className="animate-slide-up animation-delay-300 flex flex-col items-center gap-3">
        <Button
          variant="amber"
          size="lg"
          onClick={handleContinue}
          disabled={selected.length === 0}
          className="min-w-52"
        >
          {selected.length === 0
            ? 'Select at least one goal'
            : `Start learning (${selected.length} goal${selected.length > 1 ? 's' : ''}) →`}
        </Button>
        <button
          onClick={handleContinue}
          className="text-sm text-forest-400 hover:text-forest-600 transition-colors"
        >
          Skip for now
        </button>
      </div>

      {/* Back link */}
      <button
        onClick={() => router.back()}
        className="mt-8 text-sm text-forest-400 hover:text-forest-600 transition-colors"
      >
        ← Back
      </button>
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
      className={[
        'group rounded-2xl p-5 flex items-start gap-4 text-left transition-all duration-200',
        'border-2',
        selected
          ? 'bg-forest-50 border-forest-400 shadow-nature-md scale-[1.02]'
          : 'glass-card border-white/60 hover:border-forest-200 hover:-translate-y-0.5 hover:shadow-nature-md',
      ].join(' ')}
    >
      {/* Icon */}
      <div
        className={[
          'w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-all duration-200',
          selected ? 'bg-forest-200' : 'bg-forest-50 group-hover:bg-forest-100',
        ].join(' ')}
      >
        {goal.icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3
            className={[
              'font-bold text-sm leading-tight',
              selected ? 'text-forest-900' : 'text-forest-800',
            ].join(' ')}
          >
            {goal.label}
          </h3>
          {/* Checkmark */}
          <div
            className={[
              'flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200',
              selected
                ? 'bg-forest-600 border-forest-600'
                : 'border-stone-300 group-hover:border-forest-300',
            ].join(' ')}
          >
            {selected && (
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} className="w-2.5 h-2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        </div>
        <p className="text-xs text-forest-500 mt-1 leading-snug">{goal.description}</p>
      </div>
    </button>
  );
}
