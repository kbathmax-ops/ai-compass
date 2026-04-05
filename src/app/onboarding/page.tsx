'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

// ─── Quiz data ────────────────────────────────────────────────────────────────

interface Option {
  value: string;
  label: string;
  sub?: string; // optional sub-label
}

interface Question {
  id: string;
  phase: string;        // narrative phase label shown in progress
  question: string;
  sub?: string;         // optional question subtitle
  type: 'single' | 'multi';
  options: Option[];
}

const QUESTIONS: Question[] = [
  // ── Phase 1: Situation ─────────────────────────────────────────────────────
  {
    id: 'business_type',
    phase: 'Your situation',
    question: 'What kind of business do you run?',
    type: 'single',
    options: [
      { value: 'service', label: 'Service business', sub: 'Consulting, agency, freelance, trades' },
      { value: 'product', label: 'Product business', sub: 'Physical goods, e-commerce, manufacturing' },
      { value: 'both',    label: 'A bit of both',    sub: 'Products and services combined' },
      { value: 'new',     label: 'Just getting started', sub: 'Still figuring out the model' },
    ],
  },
  {
    id: 'team_size',
    phase: 'Your situation',
    question: 'How many people work with you?',
    type: 'single',
    options: [
      { value: 'solo',    label: 'Just me',    sub: 'I wear every hat' },
      { value: 'micro',   label: '2–5 people', sub: 'Small and tight-knit' },
      { value: 'small',   label: '6–20 people', sub: 'Small but growing' },
      { value: 'medium',  label: 'More than 20', sub: 'An actual team' },
    ],
  },
  {
    id: 'typical_week',
    phase: 'Your situation',
    question: 'Which sounds most like your typical week?',
    type: 'single',
    options: [
      { value: 'tasks',    label: 'Drowning in repetitive tasks',              sub: 'Same things, every week' },
      { value: 'content',  label: 'Always behind on content and communication', sub: 'Writing takes forever' },
      { value: 'strategy', label: 'No time for strategy',                       sub: 'Too busy working in the business' },
      { value: 'capacity', label: 'Saying no to growth',                        sub: 'Can\'t take on more without more hours' },
    ],
  },

  // ── Phase 2: History with AI ───────────────────────────────────────────────
  {
    id: 'ai_experience',
    phase: 'Your history',
    question: 'Have you tried using AI tools before?',
    type: 'single',
    options: [
      { value: 'never',   label: 'Never touched one',      sub: 'Complete beginner' },
      { value: 'dabbled', label: 'Dabbled but gave up',    sub: 'Tried it, wasn\'t sure what to do with it' },
      { value: 'some',    label: 'Use a few occasionally', sub: 'ChatGPT, Canva AI, that sort of thing' },
      { value: 'regular', label: 'Use them regularly',     sub: 'Part of my workflow already' },
    ],
  },
  {
    id: 'blocker',
    phase: 'Your history',
    question: 'What\'s gotten in the way?',
    sub: 'Pick the one that hits closest.',
    type: 'single',
    options: [
      { value: 'start',   label: 'Didn\'t know where to start',   sub: 'Too many options, no clear path' },
      { value: 'trust',   label: 'Couldn\'t trust the results',   sub: 'It kept getting things wrong' },
      { value: 'skill',   label: 'Felt like a real skill gap',     sub: 'Like everyone else knew something I didn\'t' },
      { value: 'time',    label: 'No time to learn properly',      sub: 'Added to my plate, not removed from it' },
    ],
  },

  // ── Phase 3: Pain ─────────────────────────────────────────────────────────
  {
    id: 'biggest_impact',
    phase: 'What matters',
    question: 'Which of these would have the biggest impact on your business?',
    type: 'single',
    options: [
      { value: 'writing',   label: 'Writing faster',                    sub: 'Emails, proposals, content' },
      { value: 'customers', label: 'Handling customer communication',   sub: 'FAQs, support, follow-ups' },
      { value: 'decisions', label: 'Making better decisions',           sub: 'Research, analysis, planning' },
      { value: 'systems',   label: 'Building systems that run without me', sub: 'Automation and delegation' },
    ],
  },
  {
    id: 'time_lost',
    phase: 'What matters',
    question: 'How much time do you lose each week to tasks that feel replaceable?',
    type: 'single',
    options: [
      { value: 'lt2',   label: 'Under 2 hours',   sub: 'It\'s not huge, but it adds up' },
      { value: '2to5',  label: '2–5 hours',       sub: 'Noticeable but manageable' },
      { value: '5to10', label: '5–10 hours',      sub: 'A real drain on the week' },
      { value: 'gt10',  label: 'More than 10 hours', sub: 'It\'s becoming a problem' },
    ],
  },
  {
    id: 'fear',
    phase: 'What matters',
    question: 'What concerns you most about using AI in your business?',
    type: 'single',
    options: [
      { value: 'quality',    label: 'It\'ll produce work I can\'t be proud of', sub: 'Quality and authenticity' },
      { value: 'dependency', label: 'I\'ll become dependent on it',             sub: 'Losing real skills' },
      { value: 'trust',      label: 'Customers will notice',                    sub: 'It\'ll feel less human' },
      { value: 'ethics',     label: 'The ethical questions',                    sub: 'What am I supporting?' },
    ],
  },

  // ── Phase 4: Identity ─────────────────────────────────────────────────────
  {
    id: 'tech_comfort',
    phase: 'Who you are',
    question: 'How would you describe your relationship with technology?',
    type: 'single',
    options: [
      { value: 'avoider',    label: 'I avoid it when I can',    sub: 'Tools stress me out' },
      { value: 'functional', label: 'I manage, but it\'s work', sub: 'I get there eventually' },
      { value: 'comfortable',label: 'Pretty comfortable',        sub: 'I pick things up reasonably fast' },
      { value: 'early',      label: 'I\'m usually the early adopter', sub: 'First to try new tools' },
    ],
  },
  {
    id: 'learning_style',
    phase: 'Who you are',
    question: 'How do you learn something new?',
    type: 'single',
    options: [
      { value: 'dive',      label: 'I just dive in',                  sub: 'Learn by doing, figure it out as I go' },
      { value: 'structure', label: 'I like a clear structure',         sub: 'Give me steps, I\'ll follow them' },
      { value: 'observe',   label: 'I watch others first',             sub: 'I want to see it work before I try' },
      { value: 'read',      label: 'I research before starting',       sub: 'I need context to feel confident' },
    ],
  },

  // ── Phase 5: Hope ─────────────────────────────────────────────────────────
  {
    id: 'extra_time',
    phase: 'What you want',
    question: 'If AI gave you 5 extra hours every week, what would you do with them?',
    type: 'single',
    options: [
      { value: 'love',   label: 'Work on the parts I actually love',   sub: 'The reason I started this' },
      { value: 'family', label: 'Spend more time with family',          sub: 'Reclaim the evenings and weekends' },
      { value: 'grow',   label: 'Finally grow the thing I\'ve neglected', sub: 'That project or channel sitting on the backburner' },
      { value: 'breathe','label': 'Just breathe',                       sub: 'Stop feeling constantly behind' },
    ],
  },
  {
    id: 'success_90',
    phase: 'What you want',
    question: 'What does success look like in 90 days?',
    type: 'single',
    options: [
      { value: 'time',    label: 'Spending less time on operations', sub: 'More thinking, less doing' },
      { value: 'growth',  label: 'The business is visibly growing',  sub: 'More output, same hours' },
      { value: 'control', label: 'I feel in control again',           sub: 'Not reactive, but intentional' },
      { value: 'skill',   label: 'AI is a real skill I own',          sub: 'Not a crutch — a capability' },
    ],
  },

  // ── Phase 6: Commitment ────────────────────────────────────────────────────
  {
    id: 'speed',
    phase: 'Your commitment',
    question: 'How fast do you want to see results?',
    type: 'single',
    options: [
      { value: 'now',     label: 'This week — I need something working now', sub: 'Urgency is real' },
      { value: 'month',   label: 'This month is fine',                        sub: 'Building something solid' },
      { value: 'quarter', label: 'I\'m thinking long-term',                   sub: 'Sustainable over fast' },
      { value: 'unsure',  label: 'Not sure yet',                              sub: 'Depends on how it goes' },
    ],
  },
  {
    id: 'myth',
    phase: 'Your commitment',
    question: 'Which AI myth worries you most?',
    sub: 'Be honest — we\'ll address it directly in the course.',
    type: 'single',
    options: [
      { value: 'accuracy',    label: 'It makes mistakes that look like facts',  sub: 'Confident hallucinations' },
      { value: 'thinking',    label: 'It\'ll replace real thinking',            sub: 'Intellectual laziness' },
      { value: 'authenticity','label': 'My work won\'t really be mine anymore', sub: 'Ownership and credit' },
      { value: 'access',      label: 'It\'s still only for tech people',        sub: 'Not built for people like me' },
    ],
  },
  {
    id: 'worth_it',
    phase: 'Your commitment',
    question: 'One honest question — what would make this worth it to you?',
    sub: 'This shapes everything. Pick the one that matters most.',
    type: 'single',
    options: [
      { value: 'time',    label: 'Saving time I can actually feel',      sub: 'Real hours back, not marginal gains' },
      { value: 'work',    label: 'Producing work I\'m proud of',         sub: 'Quality that represents me' },
      { value: 'anxiety', label: 'Feeling less anxious about falling behind', sub: 'Confidence, not stress' },
      { value: 'skill',   label: 'A real skill — not just another tool', sub: 'Something I carry with me' },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const router = useRouter();
  const { setRole } = useApp();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [selected, setSelected] = useState<string | string[] | null>(null);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');

  const question = QUESTIONS[currentIdx];
  const progress = ((currentIdx) / QUESTIONS.length) * 100;
  const isLast = currentIdx === QUESTIONS.length - 1;

  function handleSelect(value: string) {
    if (question.type === 'single') {
      setSelected(value);
    } else {
      const current = Array.isArray(selected) ? selected : [];
      setSelected(
        current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value],
      );
    }
  }

  function handleNext() {
    if (!selected) return;

    const newAnswers = { ...answers, [question.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    setDirection('forward');

    if (isLast) {
      setRole('smb');
      // Store answers in sessionStorage for the summary screen
      sessionStorage.setItem('quiz_answers', JSON.stringify(newAnswers));
      router.push('/your-plan');
    } else {
      setCurrentIdx(i => i + 1);
    }
  }

  function handleBack() {
    if (currentIdx === 0) {
      router.push('/');
      return;
    }
    setDirection('back');
    const prev = QUESTIONS[currentIdx - 1];
    setSelected(answers[prev.id] ?? null);
    setCurrentIdx(i => i - 1);
  }

  const isOptionSelected = (value: string) => {
    if (Array.isArray(selected)) return selected.includes(value);
    return selected === value;
  };

  const canAdvance = selected !== null && (Array.isArray(selected) ? selected.length > 0 : true);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Top bar ────────────────────────────────────────────────────────── */}
      <div
        style={{
          padding: 'var(--space-4) var(--space-4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <button
          onClick={handleBack}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-text-3)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            transition: 'color var(--duration-fast) var(--ease)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-2)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-3)'; }}
        >
          ← Back
        </button>

        {/* Phase label */}
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: 'var(--color-text-3)',
          }}
        >
          {question.phase}
        </span>

        {/* Question counter */}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-3)',
          }}
        >
          {currentIdx + 1}/{QUESTIONS.length}
        </span>
      </div>

      {/* ── Progress bar ───────────────────────────────────────────────────── */}
      <div style={{ height: '2px', background: 'var(--color-border)', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '2px',
            width: `${progress}%`,
            background: 'var(--color-brand)',
            transition: 'width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
      </div>

      {/* ── Question ───────────────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '640px',
          width: '100%',
          margin: '0 auto',
          padding: 'var(--space-12) var(--space-4) var(--space-8)',
        }}
      >
        {/* Question text */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: 'var(--color-text)',
              marginBottom: question.sub ? 'var(--space-3)' : 0,
            }}
          >
            {question.question}
          </h1>
          {question.sub && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-3)',
                lineHeight: 1.5,
              }}
            >
              {question.sub}
            </p>
          )}
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flex: 1 }}>
          {question.options.map(option => {
            const isSelected = isOptionSelected(option.value);
            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--space-4)',
                  padding: 'var(--space-4)',
                  background: isSelected ? 'var(--color-invert)' : 'var(--color-surface)',
                  border: `1px solid ${isSelected ? 'var(--color-invert)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'background var(--duration-fast) var(--ease), border-color var(--duration-fast) var(--ease)',
                }}
                onMouseEnter={e => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border-strong)';
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-surface-2)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-surface)';
                  }
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 400,
                      color: isSelected ? 'var(--color-text-inv)' : 'var(--color-text)',
                      lineHeight: 1.3,
                    }}
                  >
                    {option.label}
                  </div>
                  {option.sub && (
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-xs)',
                        color: isSelected ? 'rgba(245,242,237,0.55)' : 'var(--color-text-3)',
                        marginTop: '2px',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {option.sub}
                    </div>
                  )}
                </div>

                {/* Indicator */}
                <div
                  style={{
                    flexShrink: 0,
                    width: '20px',
                    height: '20px',
                    borderRadius: question.type === 'multi' ? 'var(--radius-sm)' : '50%',
                    border: `1px solid ${isSelected ? 'rgba(245,242,237,0.4)' : 'var(--color-border-strong)'}`,
                    background: isSelected ? 'var(--color-brand)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background var(--duration-fast) var(--ease)',
                  }}
                >
                  {isSelected && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* ── CTA ────────────────────────────────────────────────────────────── */}
        <div style={{ paddingTop: 'var(--space-8)' }}>
          <button
            onClick={handleNext}
            disabled={!canAdvance}
            style={{
              width: '100%',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: canAdvance ? 'var(--color-invert)' : 'var(--color-surface-2)',
              color: canAdvance ? 'var(--color-text-inv)' : 'var(--color-text-3)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: canAdvance ? 'pointer' : 'not-allowed',
              opacity: canAdvance ? 1 : 0.5,
              transition: 'background var(--duration-fast) var(--ease), opacity var(--duration-fast) var(--ease)',
            }}
            onMouseEnter={e => {
              if (canAdvance) (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-brand)';
            }}
            onMouseLeave={e => {
              if (canAdvance) (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-invert)';
            }}
          >
            {isLast ? 'Build my plan →' : 'Continue →'}
          </button>

          {currentIdx === 0 && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-3)',
                textAlign: 'center',
                marginTop: 'var(--space-3)',
                letterSpacing: '0.02em',
              }}
            >
              Takes 2 minutes · No account required
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
