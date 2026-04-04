import React from 'react';

interface Step {
  label: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number; // 0-indexed
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center">
      {steps.map((step, idx) => {
        const status = idx < currentStep ? 'done' : idx === currentStep ? 'active' : 'upcoming';

        return (
          <React.Fragment key={idx}>
            {/* Step node */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 400,
                  border: status === 'done'
                    ? '1px solid var(--color-text)'
                    : status === 'active'
                    ? '1px solid var(--color-text)'
                    : '1px solid var(--color-border-strong)',
                  background: status === 'done'
                    ? 'var(--color-invert)'
                    : status === 'active'
                    ? 'transparent'
                    : 'transparent',
                  color: status === 'done'
                    ? 'var(--color-text-inv)'
                    : status === 'active'
                    ? 'var(--color-text)'
                    : 'var(--color-text-3)',
                  transition: `background var(--duration-fast) var(--ease), color var(--duration-fast) var(--ease)`,
                }}
              >
                {status === 'done' ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>
              <span
                className="hidden sm:block"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  maxWidth: '72px',
                  lineHeight: 1.3,
                  color: status === 'active'
                    ? 'var(--color-text)'
                    : status === 'done'
                    ? 'var(--color-text-2)'
                    : 'var(--color-text-3)',
                }}
              >
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {idx < steps.length - 1 && (
              <div
                style={{
                  height: '1px',
                  width: '64px',
                  margin: '0 4px',
                  marginBottom: '20px',
                  background: idx < currentStep ? 'var(--color-text)' : 'var(--color-border)',
                  transition: `background var(--duration-mid) var(--ease)`,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
