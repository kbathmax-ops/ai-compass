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

  const isAlreadyDone = progress.completedLessons.includes(lessonId);

  useEffect(() => {
    if (!onboardingComplete) router.replace('/');
  }, [onboardingComplete, router]);

  useEffect(() => {
    if (isAlreadyDone) setCompleted(true);
  }, [isAlreadyDone]);

  if (!lesson || !role) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--stone)' }}>
        <div className="text-center">
          <p className="text-sm mb-4" style={{ color: 'var(--ink-md)' }}>Lesson not found.</p>
          <Link href="/dashboard" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: 'var(--cognac)' }}>
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
      completeLesson(lessonId, {
        reflections,
        criticalThinkingAnswers: ctAnswers,
      });
    }
    setCompleted(true);
    setShowCompletion(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen pt-20 pb-28 px-4" style={{ background: 'var(--stone)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-10">

        {/* Back link + metadata */}
        <div className="flex items-center gap-3 mb-8 pt-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs tracking-wider hover:opacity-70 transition-opacity"
            style={{ color: 'var(--ink-muted)' }}
          >
            ← Curriculum
          </Link>
          <span style={{ color: 'var(--stone-mid)' }}>·</span>
          <span className="text-xs" style={{ color: 'var(--ink-muted)' }}>Day {lesson.day}</span>
          <span style={{ color: 'var(--stone-mid)' }}>·</span>
          <span className="text-xs" style={{ color: 'var(--ink-muted)' }}>{lesson.estimatedMinutes} min</span>
        </div>

        {/* Completion banner */}
        {showCompletion && (
          <CompletionBanner
            lessonTitle={lesson.title}
            nextLesson={nextLesson}
            onDismiss={() => setShowCompletion(false)}
          />
        )}

        {/* Main layout */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* ── Left: lesson content ──────────────────────────────────── */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Lesson header */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {lesson.skillTags.map(tag => (
                  <SkillTagChip key={tag} tag={tag} />
                ))}
                {completed && (
                  <span
                    className="text-xs px-2.5 py-1 font-medium"
                    style={{
                      border: '1px solid var(--cognac)',
                      color: 'var(--cognac)',
                    }}
                  >
                    ✓ Completed
                  </span>
                )}
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                  lineHeight: 1.05,
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: 'var(--ink)',
                  marginBottom: '0.5rem',
                }}
              >
                {lesson.title}
              </h1>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-md)' }}>
                {lesson.subtitle}
              </p>
            </div>

            {/* Step progress */}
            <div>
              <ProgressBar
                value={stepProgress}
                label={`Step ${activeStepIdx + 1} of ${totalSteps}`}
                showPercentage={false}
                size="sm"
                color="forest"
              />
            </div>

            {/* Step tabs */}
            <div className="flex gap-2 flex-wrap">
              {lesson.steps.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStepIdx(idx)}
                  className="w-8 h-8 flex items-center justify-center text-xs font-medium transition-all duration-200"
                  style={{
                    background: idx === activeStepIdx ? 'var(--moss)' : 'transparent',
                    color: idx === activeStepIdx ? 'white' : 'var(--ink-muted)',
                    border: idx === activeStepIdx ? '1px solid var(--moss)' : '1px solid var(--stone-mid)',
                  }}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {/* Active step content */}
            <StepContent
              step={lesson.steps[activeStepIdx]}
              value={reflections[lesson.steps[activeStepIdx]?.id] ?? ''}
              onChange={val => handleReflectionChange(lesson.steps[activeStepIdx].id, val)}
            />

            {/* Step navigation */}
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveStepIdx(i => Math.max(0, i - 1))}
                disabled={activeStepIdx === 0}
              >
                ← Previous
              </Button>
              {activeStepIdx < totalSteps - 1 ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveStepIdx(i => i + 1)}
                >
                  Next step →
                </Button>
              ) : (
                <span className="text-xs" style={{ color: 'var(--ink-muted)' }}>
                  Last step — complete the lesson →
                </span>
              )}
            </div>
          </div>

          {/* ── Right: interactive panel ──────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-5 lg:sticky lg:top-24">
            {/* Micro-task box */}
            <div style={{ border: '1px solid var(--stone-mid)', padding: '1.25rem' }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm">⚡</span>
                <h3 className="font-medium text-sm" style={{ color: 'var(--ink)' }}>Quick Task</h3>
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--ink-md)' }}>
                {lesson.microtask}
              </p>
              <textarea
                className="nature-textarea mt-1 text-sm"
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

            {/* Complete button */}
            {!completed ? (
              <Button variant="primary" size="lg" fullWidth onClick={handleComplete}>
                Mark lesson complete ✓
              </Button>
            ) : (
              <div
                className="p-4 text-center"
                style={{ border: '1px solid var(--stone-mid)' }}
              >
                <p className="text-xs font-medium mb-3" style={{ color: 'var(--cognac)' }}>
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
                    <Button variant="outline" size="md" fullWidth>
                      Back to curriculum
                    </Button>
                  </Link>
                )}
              </div>
            )}

            {lesson.nextLessonTeaser && !completed && (
              <p className="text-xs text-center italic" style={{ color: 'var(--ink-muted)' }}>
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
    text:       { icon: '📖', label: 'Read' },
    example:    { icon: '💡', label: 'Example' },
    task:       { icon: '✏️', label: 'Task' },
    reflection: { icon: '🪞', label: 'Reflect' },
  };

  const { icon, label } = typeConfig[step.type] ?? typeConfig.text;

  return (
    <div style={{ border: '1px solid var(--stone-mid)', padding: '1.5rem' }}>
      {/* Step header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm">{icon}</span>
        <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: 'var(--ink-muted)' }}>
          {label}
        </span>
      </div>

      <h2
        className="font-medium mb-4 leading-snug"
        style={{ fontSize: '1.1rem', color: 'var(--ink)' }}
      >
        {step.title}
      </h2>

      <div className="flex flex-col gap-2">
        {step.content.split('\n').map((line, i) => {
          if (!line.trim()) return <div key={i} className="h-2" />;

          const formatted = line.replace(
            /\*\*(.*?)\*\*/g,
            '<strong style="font-weight:600;color:var(--ink)">$1</strong>',
          );

          if (line.startsWith('• ') || line.startsWith('- ')) {
            return (
              <div key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--ink-md)', lineHeight: '1.6' }}>
                <span className="mt-1 flex-shrink-0" style={{ color: 'var(--cognac)' }}>–</span>
                <span dangerouslySetInnerHTML={{ __html: formatted.replace(/^[•\-] /, '') }} />
              </div>
            );
          }

          return (
            <p
              key={i}
              className="text-sm"
              style={{ color: 'var(--ink-md)', lineHeight: '1.65' }}
              dangerouslySetInnerHTML={{ __html: formatted }}
            />
          );
        })}
      </div>

      {(step.type === 'task' || step.type === 'reflection') && (
        <textarea
          className="nature-textarea mt-5"
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
      className="mb-8 flex items-center justify-between gap-4 p-5"
      style={{ background: 'var(--moss)', color: 'white' }}
    >
      <div>
        <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Lesson complete
        </p>
        <p className="font-medium text-sm">{lessonTitle}</p>
        {nextLesson && (
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Up next: Day {nextLesson.day} — {nextLesson.title}
          </p>
        )}
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        {nextLesson && (
          <Link href={`/lesson/${nextLesson.id}`}>
            <Button variant="amber" size="sm">Continue →</Button>
          </Link>
        )}
        <button
          onClick={onDismiss}
          className="text-xl leading-none hover:opacity-60 transition-opacity"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
