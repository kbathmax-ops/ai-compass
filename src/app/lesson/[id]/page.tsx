'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { getLessonById, getLessons } from '@/data/lessons';
import { CriticalThinkingCheck } from '@/components/lessons/CriticalThinkingCheck';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SkillTagChip } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import type { LessonStep } from '@/types';

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.id as string;

  const { state, completeLesson } = useApp();
  const { role, progress, onboardingComplete } = state;

  const lesson = getLessonById(lessonId);

  const [reflections, setReflections] = useState<Record<string, string>>({});
  const [ctAnswers, setCtAnswers] = useState<string[]>([]);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  // Mobile: which panel is active — 'read' | 'practice'
  const [mobilePanel, setMobilePanel] = useState<'read' | 'practice'>('read');

  const isAlreadyDone = progress.completedLessons.includes(lessonId);

  useEffect(() => {
    if (!onboardingComplete) router.replace('/');
  }, [onboardingComplete, router]);

  useEffect(() => {
    if (isAlreadyDone) setCompleted(true);
  }, [isAlreadyDone]);

  if (!lesson || !role) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-bg)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-2)', marginBottom: 'var(--space-4)' }}>
            Lesson not found.
          </p>
          <Link
            href="/dashboard"
            style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-brand)', textDecoration: 'none', letterSpacing: '0.04em' }}
          >
            ← Back to curriculum
          </Link>
        </div>
      </div>
    );
  }

  const allLessons = getLessons();
  const currentIdx = allLessons.findIndex(l => l.id === lessonId);
  const nextLesson = allLessons[currentIdx + 1] ?? null;

  const totalSteps = lesson.steps.length;
  const stepProgress = ((activeStepIdx + 1) / totalSteps) * 100;

  function handleReflectionChange(stepId: string, value: string) {
    setReflections(prev => ({ ...prev, [stepId]: value }));
  }

  function handleCtChange(idx: number, value: string) {
    setCtAnswers(prev => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  }

  function handleComplete() {
    if (!isAlreadyDone) {
      completeLesson(lessonId, { reflections, criticalThinkingAnswers: ctAnswers });
    }
    setCompleted(true);
    setShowCompletion(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
        paddingTop: '52px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'var(--space-8) var(--space-4) var(--space-16)',
        }}
      >
        {/* Breadcrumb */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-8)',
            paddingTop: 'var(--space-4)',
          }}
        >
          <Link
            href="/dashboard"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text-3)',
              textDecoration: 'none',
              transition: `color var(--duration-fast) var(--ease)`,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-2)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-3)'; }}
          >
            ← Curriculum
          </Link>
          <span style={{ color: 'var(--color-border-strong)', fontSize: '10px' }}>·</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-3)' }}>
            Day {lesson.day}
          </span>
          <span style={{ color: 'var(--color-border-strong)', fontSize: '10px' }}>·</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-3)' }}>
            {lesson.estimatedMinutes} min
          </span>
        </div>

        {/* Completion banner */}
        {showCompletion && (
          <CompletionBanner
            lessonTitle={lesson.title}
            nextLesson={nextLesson}
            onDismiss={() => setShowCompletion(false)}
          />
        )}

        {/* Mobile tab switcher — hidden on desktop */}
        <div
          className="lg:hidden"
          style={{
            display: 'flex',
            marginBottom: 'var(--space-6)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          {(['read', 'practice'] as const).map(panel => (
            <button
              key={panel}
              onClick={() => setMobilePanel(panel)}
              style={{
                flex: 1,
                padding: 'var(--space-3) 0',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: mobilePanel === panel ? 500 : 400,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: mobilePanel === panel ? 'var(--color-text)' : 'var(--color-text-3)',
                background: 'none',
                border: 'none',
                borderBottom: mobilePanel === panel
                  ? '2px solid var(--color-text)'
                  : '2px solid transparent',
                marginBottom: '-1px',
                cursor: 'pointer',
                transition: `color var(--duration-fast) var(--ease)`,
              }}
            >
              {panel === 'read' ? 'Lesson' : 'Practice'}
            </button>
          ))}
        </div>

        {/* 3/5 + 2/5 layout */}
        <div
          style={{
            display: 'grid',
            gap: 'var(--space-8)',
            alignItems: 'start',
          }}
          className="lg:grid-cols-5"
        >
          {/* ── Left: content ─────────────────────────────────────────── */}
          <div
            className={`lg:col-span-3 ${mobilePanel !== 'read' ? 'hidden lg:flex' : 'flex'} flex-col`}
            style={{ gap: 'var(--space-6)' }}
          >
            {/* Lesson header */}
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                {lesson.skillTags.map(tag => (
                  <SkillTagChip key={tag} tag={tag} />
                ))}
                {completed && (
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-success)',
                      border: '1px solid var(--color-success)',
                      padding: '3px 8px',
                    }}
                  >
                    ✓ Completed
                  </span>
                )}
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  color: 'var(--color-text)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                {lesson.title}
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-base)',
                  lineHeight: 1.6,
                  color: 'var(--color-text-2)',
                }}
              >
                {lesson.subtitle}
              </p>
            </div>

            {/* Step progress */}
            <ProgressBar
              value={stepProgress}
              label={`Step ${activeStepIdx + 1} of ${totalSteps}`}
              size="xs"
              color="forest"
            />

            {/* Step selectors */}
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {lesson.steps.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStepIdx(idx)}
                  style={{
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    borderRadius: 'var(--radius-sm)',
                    border: idx === activeStepIdx
                      ? '1px solid var(--color-text)'
                      : '1px solid var(--color-border-strong)',
                    background: idx === activeStepIdx ? 'var(--color-invert)' : 'transparent',
                    color: idx === activeStepIdx ? 'var(--color-text-inv)' : 'var(--color-text-3)',
                    cursor: 'pointer',
                    transition: `background var(--duration-fast) var(--ease), color var(--duration-fast) var(--ease)`,
                  }}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {/* Active step */}
            <StepContent
              step={lesson.steps[activeStepIdx]}
              value={reflections[lesson.steps[activeStepIdx]?.id] ?? ''}
              onChange={val => handleReflectionChange(lesson.steps[activeStepIdx].id, val)}
            />

            {/* Step nav */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveStepIdx(i => Math.max(0, i - 1))}
                disabled={activeStepIdx === 0}
              >
                ← Prev
              </Button>
              {activeStepIdx < totalSteps - 1 ? (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setActiveStepIdx(i => i + 1)}
                >
                  Next →
                </Button>
              ) : (
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-3)',
                  }}
                >
                  Last step
                </span>
              )}
            </div>
          </div>

          {/* ── Right: interactive ─────────────────────────────────────── */}
          <div
            className={`lg:col-span-2 lg:sticky lg:top-20 ${mobilePanel !== 'practice' ? 'hidden lg:flex' : 'flex'} flex-col`}
            style={{ gap: 'var(--space-4)' }}
          >
            {/* Quick task */}
            <div
              style={{
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface)',
                padding: 'var(--space-4)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    background: 'var(--color-invert)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    color: 'var(--color-text-inv)',
                    flexShrink: 0,
                  }}
                >
                  ⚡
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500,
                    color: 'var(--color-text)',
                  }}
                >
                  Quick Task
                </h3>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  lineHeight: 1.55,
                  color: 'var(--color-text-2)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                {lesson.microtask}
              </p>
              <textarea
                className="nature-textarea"
                style={{ fontSize: 'var(--text-sm)' }}
                placeholder="Work through the task here…"
                rows={3}
                value={reflections['__microtask__'] ?? ''}
                onChange={e => handleReflectionChange('__microtask__', e.target.value)}
              />
            </div>

            {/* Critical thinking */}
            <CriticalThinkingCheck
              prompts={lesson.criticalThinkingPrompts}
              answers={ctAnswers}
              onChange={handleCtChange}
            />

            {/* Complete / next */}
            {!completed ? (
              <Button variant="primary" size="lg" fullWidth onClick={handleComplete}>
                Mark complete ✓
              </Button>
            ) : (
              <div
                style={{
                  border: '1px solid var(--color-border)',
                  padding: 'var(--space-4)',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-success)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  ✓ Lesson completed
                </p>
                {nextLesson ? (
                  <Link href={`/lesson/${nextLesson.id}`}>
                    <Button variant="primary" size="md" fullWidth>
                      Next: Day {nextLesson.day} →
                    </Button>
                  </Link>
                ) : (
                  <Link href="/dashboard">
                    <Button variant="secondary" size="md" fullWidth>
                      Back to curriculum
                    </Button>
                  </Link>
                )}
              </div>
            )}

            {lesson.nextLessonTeaser && !completed && (
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  fontStyle: 'italic',
                  color: 'var(--color-text-3)',
                  textAlign: 'center',
                  lineHeight: 1.5,
                }}
              >
                {lesson.nextLessonTeaser}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Step content ─────────────────────────────────────────────────────────────

function StepContent({
  step,
  value,
  onChange,
}: {
  step: LessonStep;
  value: string;
  onChange: (val: string) => void;
}) {
  if (!step) return null;

  const typeConfig: Record<string, { icon: string; label: string }> = {
    text:       { icon: '▸', label: 'Read' },
    example:    { icon: '◈', label: 'Example' },
    task:       { icon: '◻', label: 'Task' },
    reflection: { icon: '◉', label: 'Reflect' },
  };

  const { icon, label } = typeConfig[step.type] ?? typeConfig.text;

  return (
    <div
      style={{
        border: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        padding: 'var(--space-6)',
      }}
    >
      {/* Step type indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-4)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: 'var(--color-brand)',
            lineHeight: 1,
          }}
        >
          {icon}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: 'var(--color-text-3)',
          }}
        >
          {label}
        </span>
      </div>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-lg)',
          fontWeight: 400,
          letterSpacing: '-0.01em',
          lineHeight: 1.2,
          color: 'var(--color-text)',
          marginBottom: 'var(--space-4)',
        }}
      >
        {step.title}
      </h2>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {step.content.split('\n').map((line, i) => {
          if (!line.trim()) return <div key={i} style={{ height: 'var(--space-2)' }} />;

          const formatted = line.replace(
            /\*\*(.*?)\*\*/g,
            '<strong style="font-weight:500;color:var(--color-text)">$1</strong>',
          );

          if (line.startsWith('• ') || line.startsWith('- ')) {
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-3)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-2)',
                  lineHeight: 1.6,
                }}
              >
                <span style={{ color: 'var(--color-brand)', flexShrink: 0, marginTop: '2px', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>—</span>
                <span dangerouslySetInnerHTML={{ __html: formatted.replace(/^[•\-] /, '') }} />
              </div>
            );
          }

          return (
            <p
              key={i}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                lineHeight: 1.65,
                color: 'var(--color-text-2)',
              }}
              dangerouslySetInnerHTML={{ __html: formatted }}
            />
          );
        })}
      </div>

      {(step.type === 'task' || step.type === 'reflection') && (
        <textarea
          className="nature-textarea"
          style={{ marginTop: 'var(--space-6)' }}
          rows={5}
          placeholder={step.placeholder ?? 'Write your thoughts here…'}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

// ─── Completion banner ────────────────────────────────────────────────────────

function CompletionBanner({
  lessonTitle,
  nextLesson,
  onDismiss,
}: {
  lessonTitle: string;
  nextLesson: { id: string; day: number; title: string } | null;
  onDismiss: () => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
        padding: 'var(--space-4) var(--space-6)',
        background: 'var(--color-surface-3)',
        marginBottom: 'var(--space-6)',
      }}
    >
      <div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: 'rgba(245,242,237,0.45)',
            marginBottom: 'var(--space-1)',
          }}
        >
          Lesson complete
        </div>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 400, color: 'var(--color-text-inv)' }}>
          {lessonTitle}
        </p>
        {nextLesson && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'rgba(245,242,237,0.5)', marginTop: '2px' }}>
            Up next: Day {nextLesson.day} — {nextLesson.title}
          </p>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexShrink: 0 }}>
        {nextLesson && (
          <Link href={`/lesson/${nextLesson.id}`}>
            <Button variant="amber" size="sm">Continue →</Button>
          </Link>
        )}
        <button
          onClick={onDismiss}
          style={{
            color: 'rgba(245,242,237,0.4)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '18px',
            lineHeight: 1,
            transition: `color var(--duration-fast) var(--ease)`,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,242,237,0.8)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,242,237,0.4)'; }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
