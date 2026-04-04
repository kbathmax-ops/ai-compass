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
    <div style={{ border: '1px solid var(--stone-mid)', overflow: 'hidden' }}>
      {/* Header */}
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-opacity hover:opacity-80"
        style={{ background: 'var(--stone-lt, #f5f2ed)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--ink)', color: 'white' }}
          >
            <MagnifyIcon className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="font-medium text-sm" style={{ color: 'var(--ink)' }}>Critical Thinking Check</h4>
            <p className="text-xs" style={{ color: 'var(--ink-muted)' }}>
              Pause before you trust this output
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {allAnswered && (
            <span className="text-xs font-medium" style={{ color: 'var(--cognac)' }}>
              ✓ Complete
            </span>
          )}
          <ChevronIcon
            className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            style={{ color: 'var(--ink-muted)' }}
          />
        </div>
      </button>

      {/* Body */}
      {expanded && (
        <div className="px-5 py-4 flex flex-col gap-4">
          <p
            className="text-xs leading-relaxed p-3"
            style={{
              background: 'rgba(42,37,32,0.04)',
              color: 'var(--ink-md)',
              borderLeft: '2px solid var(--cognac)',
            }}
          >
            <strong style={{ color: 'var(--ink)' }}>Why this matters:</strong> AI outputs can be confidently wrong.
            These questions help you spot the gaps before they cost you.
          </p>

          {prompts.map((prompt, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <label className="flex items-start gap-2 text-xs font-medium" style={{ color: 'var(--ink)' }}>
                <span
                  className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-xs font-medium"
                  style={{ border: '1px solid var(--stone-mid)', color: 'var(--ink-muted)' }}
                >
                  {idx + 1}
                </span>
                <span className="mt-0.5">{prompt}</span>
              </label>
              <textarea
                value={answers[idx] ?? ''}
                onChange={e => onChange(idx, e.target.value)}
                placeholder="Write your answer here…"
                rows={2}
                className="w-full px-3 py-2.5 text-sm resize-none focus:outline-none transition-all duration-200"
                style={{
                  border: answers[idx]?.trim()
                    ? '1px solid var(--cognac)'
                    : '1px solid var(--stone-mid)',
                  background: 'transparent',
                  color: 'var(--ink)',
                  fontFamily: 'var(--font-sans)',
                }}
              />
            </div>
          ))}

          {allAnswered && (
            <div
              className="flex items-center gap-2 text-xs p-3"
              style={{ background: 'rgba(31,53,40,0.06)', color: 'var(--moss)' }}
            >
              <span className="text-base">🌿</span>
              <span>
                <strong>Well done.</strong> Pausing to think critically is the most underrated AI skill.
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

function ChevronIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
