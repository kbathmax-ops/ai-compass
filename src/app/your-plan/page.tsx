'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// ─── Answer interpretation ────────────────────────────────────────────────────

function getPersonalization(answers: Record<string, string | string[]>) {
  const a = (key: string) => answers[key] as string | undefined;

  const businessLabel: Record<string, string> = {
    service:  'service business',
    product:  'product business',
    both:     'business',
    new:      'new venture',
  };

  const painLabel: Record<string, string> = {
    tasks:    'buried in repetitive tasks',
    content:  'constantly behind on content and communication',
    strategy: 'unable to find time for strategy',
    capacity: 'turning down growth because there aren\'t enough hours',
  };

  const impactLabel: Record<string, string> = {
    writing:   'writing and communication',
    customers: 'customer communication',
    decisions: 'decision-making and research',
    systems:   'building systems that don\'t need you',
  };

  const worthLabel: Record<string, string> = {
    time:    'saving time you can actually feel',
    work:    'producing work you\'re proud of',
    anxiety: 'feeling less anxious about falling behind',
    skill:   'owning AI as a real skill — not just another tool',
  };

  const business = businessLabel[a('business_type') ?? ''] ?? 'business';
  const pain = painLabel[a('typical_week') ?? ''] ?? 'stretched thin';
  const impact = impactLabel[a('biggest_impact') ?? ''] ?? 'your most time-consuming work';
  const worth = worthLabel[a('worth_it') ?? ''] ?? 'real, measurable results';
  const speed = a('speed') === 'now' ? 'this week' : a('speed') === 'month' ? 'this month' : 'over the next 90 days';

  return { business, pain, impact, worth, speed };
}

function getInsight(answers: Record<string, string | string[]>) {
  const exp = answers['ai_experience'] as string;
  const blocker = answers['blocker'] as string;

  if (exp === 'never') {
    return 'You\'re starting from zero — which is actually the cleanest place to start. No bad habits to undo.';
  }
  if (exp === 'dabbled' && blocker === 'start') {
    return 'You\'ve tried AI before but got lost in the options. That\'s the most common story. AI Compass fixes the starting point.';
  }
  if (exp === 'dabbled' && blocker === 'trust') {
    return 'You\'ve been burned by confident-sounding AI that was quietly wrong. That\'s the most important thing to learn to detect.';
  }
  if (exp === 'some' || exp === 'regular') {
    return 'You already use AI — but there\'s a gap between using it and using it well. That gap is what AI Compass closes.';
  }
  return 'Whatever your starting point, the gap between where you are and where AI can take you is smaller than you think.';
}

// ─── Generating animation ─────────────────────────────────────────────────────

function GeneratingScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);

  const steps = [
    'Analysing your situation…',
    'Mapping your pain points…',
    'Selecting your modules…',
    'Building your plan…',
  ];

  useEffect(() => {
    if (step >= steps.length) {
      setTimeout(onDone, 400);
      return;
    }
    const t = setTimeout(() => setStep(s => s + 1), 700);
    return () => clearTimeout(t);
  }, [step]);

  const pct = Math.round((step / steps.length) * 100);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-8)',
      }}
    >
      {/* Compass mark — animating */}
      <div style={{ marginBottom: 'var(--space-8)', position: 'relative' }}>
        <svg
          width="48" height="48" viewBox="0 0 18 18" fill="none"
          style={{
            color: 'var(--color-brand)',
            animation: 'spin 2s linear infinite',
          }}
        >
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.2" />
          <line x1="9" y1="1" x2="9" y2="17" stroke="currentColor" strokeWidth="1.2" />
          <line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="9" cy="9" r="1.5" fill="currentColor" />
        </svg>
      </div>

      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          color: 'var(--color-text)',
          textAlign: 'center',
          marginBottom: 'var(--space-8)',
        }}
      >
        Building your plan.
      </div>

      {/* Step labels */}
      <div style={{ width: '100%', maxWidth: '320px', marginBottom: 'var(--space-6)' }}>
        {steps.map((label, idx) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-2) 0',
              opacity: idx < step ? 1 : idx === step ? 0.5 : 0.15,
              transition: 'opacity 0.4s ease',
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                flexShrink: 0,
                border: `1px solid ${idx < step ? 'var(--color-text)' : 'var(--color-border-strong)'}`,
                background: idx < step ? 'var(--color-invert)' : 'transparent',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {idx < step && (
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-inv)" strokeWidth={3.5}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: idx < step ? 'var(--color-text-2)' : 'var(--color-text-3)',
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ width: '100%', maxWidth: '320px', height: '2px', background: 'var(--color-border)' }}>
        <div
          style={{
            height: '2px',
            width: `${pct}%`,
            background: 'var(--color-brand)',
            transition: 'width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
      </div>
    </div>
  );
}

// ─── Summary screen ───────────────────────────────────────────────────────────

function SummaryScreen({ answers }: { answers: Record<string, string | string[]> }) {
  const router = useRouter();
  const { business, pain, impact, worth, speed } = getPersonalization(answers);
  const insight = getInsight(answers);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: 'var(--space-4)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}
      >
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

      <div
        style={{
          flex: 1,
          maxWidth: '600px',
          width: '100%',
          margin: '0 auto',
          padding: 'var(--space-12) var(--space-4) var(--space-8)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-8)',
        }}
      >
        {/* Headline */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-brand)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Your plan is ready
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: 'var(--color-text)',
            }}
          >
            7 days to change how your {business} runs.
          </h1>
        </div>

        {/* Personal diagnosis */}
        <div
          style={{
            borderLeft: '2px solid var(--color-brand)',
            paddingLeft: 'var(--space-4)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              lineHeight: 1.65,
              color: 'var(--color-text-2)',
            }}
          >
            Right now, you&rsquo;re{' '}
            <strong style={{ color: 'var(--color-text)', fontWeight: 500 }}>{pain}</strong>.
            The biggest opportunity is in{' '}
            <strong style={{ color: 'var(--color-text)', fontWeight: 500 }}>{impact}</strong>.
            AI Compass will show you how to fix that {speed}.
          </p>
        </div>

        {/* Insight */}
        <div
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            padding: 'var(--space-4)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text-3)',
              marginBottom: 'var(--space-2)',
            }}
          >
            Our read on you
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              lineHeight: 1.6,
              color: 'var(--color-text-2)',
              fontStyle: 'italic',
            }}
          >
            &ldquo;{insight}&rdquo;
          </p>
        </div>

        {/* What they'll get */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text-3)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Your 7-day curriculum
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--color-border)' }}>
            {CURRICULUM_PREVIEW.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'var(--color-bg)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-3)',
                    flexShrink: 0,
                    width: '24px',
                  }}
                >
                  {idx + 1}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-2)',
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* The "worth it" mirror */}
        <div
          style={{
            background: 'var(--color-surface-3)',
            padding: 'var(--space-6)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-lg)',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              color: 'var(--color-text-inv)',
              lineHeight: 1.3,
            }}
          >
            You said it&rsquo;s worth it if it means{' '}
            <em style={{ fontStyle: 'italic', color: 'rgba(245,242,237,0.65)' }}>{worth}</em>.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'rgba(245,242,237,0.5)',
              marginTop: 'var(--space-3)',
              lineHeight: 1.5,
            }}
          >
            That&rsquo;s what we built this for.
          </p>
        </div>

        {/* CTA to paywall */}
        <div style={{ paddingBottom: 'var(--space-8)' }}>
          <button
            onClick={() => router.push('/paywall')}
            style={{
              width: '100%',
              height: '52px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: 'var(--color-invert)',
              color: 'var(--color-text-inv)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              transition: 'background var(--duration-fast) var(--ease)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-brand)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-invert)'; }}
          >
            Start my 7-day plan →
          </button>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-3)',
              textAlign: 'center',
              marginTop: 'var(--space-3)',
            }}
          >
            Unlock full access · Cancel any time
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Page controller ──────────────────────────────────────────────────────────

export default function YourPlanPage() {
  const [answers, setAnswers] = useState<Record<string, string | string[]> | null>(null);
  const [generating, setGenerating] = useState(true);

  useEffect(() => {
    const raw = sessionStorage.getItem('quiz_answers');
    if (raw) {
      try { setAnswers(JSON.parse(raw)); } catch { setAnswers({}); }
    } else {
      setAnswers({});
    }
  }, []);

  if (!answers) return null;

  if (generating) {
    return <GeneratingScreen onDone={() => setGenerating(false)} />;
  }

  return <SummaryScreen answers={answers} />;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CURRICULUM_PREVIEW = [
  'What AI is actually doing — and what it isn\'t',
  'Writing prompts that get usable results',
  'Fact-checking AI output before it costs you',
  'AI for customer communication and sales writing',
  'Research, decisions, and competitive intelligence',
  'Automating the repeatable parts of your week',
  'Building an AI workflow that runs without you',
];
