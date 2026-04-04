'use client';

import React, { useState } from 'react';

interface CriticalThinkingCheckProps {
  prompts: string[];
  answers: string[];
  onChange: (idx: number, value: string) => void;
}

export function CriticalThinkingCheck({
  prompts,
  answers,
  onChange,
}: CriticalThinkingCheckProps) {
  const [expanded, setExpanded] = useState(true);
  const allAnswered = prompts.every((_, i) => answers[i]?.trim().length > 0);

  return (
    <div className="rounded-2xl overflow-hidden border border-amber-200 shadow-amber/20 shadow-md">
      {/* Header */}
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-amber-50 to-amber-100/60 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0">
            <MagnifyIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-amber-900 text-sm">Critical Thinking Check</h4>
            <p className="text-xs text-amber-700">
              Pause before you trust this output
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {allAnswered && (
            <span className="text-xs font-semibold bg-forest-100 text-forest-700 px-2 py-0.5 rounded-full">
              ✓ Complete
            </span>
          )}
          <ChevronIcon
            className={`w-4 h-4 text-amber-600 transition-transform duration-200 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Body */}
      {expanded && (
        <div className="px-5 py-4 bg-amber-50/40 flex flex-col gap-4">
          <p className="text-xs text-amber-800 bg-amber-100/60 rounded-lg p-3 leading-relaxed">
            <strong>Why this matters:</strong> AI outputs can be confidently wrong. These 3 questions
            help you spot the gaps before they cost you.
          </p>

          {prompts.map((prompt, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <label className="flex items-start gap-2 text-sm font-medium text-amber-900">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-xs flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                {prompt}
              </label>
              <textarea
                value={answers[idx] ?? ''}
                onChange={e => onChange(idx, e.target.value)}
                placeholder="Write your answer here — even a sentence is enough…"
                rows={2}
                className={[
                  'w-full px-3 py-2.5 text-sm rounded-xl border resize-none transition-all duration-200',
                  'bg-white/80 placeholder:text-amber-300 text-amber-900',
                  answers[idx]?.trim()
                    ? 'border-forest-300 focus:border-forest-500 focus:ring-2 focus:ring-forest-100'
                    : 'border-amber-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100',
                  'focus:outline-none',
                ].join(' ')}
              />
            </div>
          ))}

          {allAnswered && (
            <div className="flex items-center gap-2 text-xs text-forest-700 bg-forest-50 rounded-xl p-3">
              <span className="text-base">🌿</span>
              <span>
                <strong>Nice work.</strong> Pausing to think critically is the most underrated AI skill.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MagnifyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
