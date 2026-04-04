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
    <div className="flex items-center justify-center gap-0">
      {steps.map((step, idx) => {
        const status =
          idx < currentStep ? 'done' : idx === currentStep ? 'active' : 'upcoming';

        return (
          <React.Fragment key={idx}>
            {/* Step node */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={[
                  'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300',
                  status === 'done'
                    ? 'bg-forest-600 text-white shadow-nature'
                    : status === 'active'
                    ? 'bg-white border-2 border-forest-500 text-forest-700 shadow-nature-md scale-110'
                    : 'bg-stone-100 border-2 border-stone-200 text-stone-400',
                ].join(' ')}
              >
                {status === 'done' ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>
              <span
                className={[
                  'text-[0.65rem] font-medium text-center max-w-[72px] leading-tight hidden sm:block',
                  status === 'active'
                    ? 'text-forest-700'
                    : status === 'done'
                    ? 'text-forest-500'
                    : 'text-stone-400',
                ].join(' ')}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {idx < steps.length - 1 && (
              <div
                className={[
                  'h-0.5 w-12 sm:w-20 mx-1 rounded-full transition-all duration-300',
                  idx < currentStep ? 'bg-forest-400' : 'bg-stone-200',
                ].join(' ')}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
