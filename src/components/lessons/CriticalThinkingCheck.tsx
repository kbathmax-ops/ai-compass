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
    <div
      style={{
        border: '1px solid var(--color-border-strong)',
        background: 'var(--color-surface)',
      }}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(v => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--space-4) var(--space-4)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          borderBottom: expanded ? '1px solid var(--color-border)' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--color-invert)',
              flexShrink: 0,
            }}
          >
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="var(--color-text-inv)" strokeWidth={2.5}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <div style={{ textAlign: 'left' }}>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                color: 'var(--color-text)',
              }}
            >
              Critical Thinking Check
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.04em',
                color: 'var(--color-text-3)',
              }}
            >
              Pause before you trust this output
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          {allAnswered && (
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-success)',
              }}
            >
              ✓ Done
            </span>
          )}
          <svg
            width="14" height="14"
            fill="none" viewBox="0 0 24 24"
            stroke="var(--color-text-3)"
            strokeWidth={2}
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)', transition: `transform var(--duration-fast) var(--ease)` }}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </button>

      {/* Body */}
      {expanded && (
        <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {/* Note */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              lineHeight: 1.55,
              color: 'var(--color-text-2)',
              borderLeft: '2px solid var(--color-brand)',
              paddingLeft: 'var(--space-3)',
            }}
          >
            AI outputs can be confidently wrong. These questions help you spot the gaps before they cost you.
          </p>

          {prompts.map((prompt, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-2)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text)',
                  cursor: 'default',
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    border: '1px solid var(--color-border-strong)',
                    color: 'var(--color-text-3)',
                    marginTop: '1px',
                  }}
                >
                  {idx + 1}
                </span>
                <span style={{ lineHeight: 1.5 }}>{prompt}</span>
              </label>
              <textarea
                value={answers[idx] ?? ''}
                onChange={e => onChange(idx, e.target.value)}
                placeholder="Write your answer here…"
                rows={2}
                style={{
                  width: '100%',
                  padding: 'var(--space-2)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text)',
                  background: 'var(--color-bg)',
                  border: 'none',
                  borderBottom: answers[idx]?.trim()
                    ? '1px solid var(--color-text)'
                    : '1px solid var(--color-border-strong)',
                  borderRadius: 0,
                  resize: 'vertical',
                  transition: `border-bottom-color var(--duration-fast) var(--ease)`,
                  outline: 'none',
                }}
                onFocus={e => { e.currentTarget.style.borderBottomColor = 'var(--color-invert)'; }}
                onBlur={e => {
                  e.currentTarget.style.borderBottomColor = answers[idx]?.trim()
                    ? 'var(--color-text)'
                    : 'var(--color-border-strong)';
                }}
              />
            </div>
          ))}

          {allAnswered && (
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-success)',
                padding: 'var(--space-3)',
                background: 'rgba(74,122,71,0.06)',
                borderLeft: '2px solid var(--color-success)',
              }}
            >
              <strong style={{ fontWeight: 500 }}>Well done.</strong> Pausing to think critically is the most underrated AI skill.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
