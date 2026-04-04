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

  // Local lesson state
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
    if (isAlreadyDone) {
      setCompleted(true);
    }
  }, [isAlreadyDone]);

  if (!lesson || !role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-forest-600 mb-4">Lesson not found.</p>
          <Link href="/dashboard" className="text-forest-700 font-semibold hover:underline">
            ← Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Compute what the "next lesson" is
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
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen pt-20 pb-28 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back link + metadata strip */}
        <div className="flex items-center gap-3 mb-8 animate-fade-in">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-sm text-forest-500 hover:text-forest-700 transition-colors"
          >
            <span>←</span> Curriculum
          </Link>
          <span className="text-stone-300">·</span>
          <span className="text-sm text-forest-500">Day {lesson.day}</span>
          <span className="text-stone-300">·</span>
          <span className="text-sm text-forest-500">⏱ {lesson.estimatedMinutes} min</span>
        </div>

        {/* Completion banner */}
        {showCompletion && (
          <CompletionBanner
            lessonTitle={lesson.title}
            nextLesson={nextLesson}
            onDismiss={() => setShowCompletion(false)}
          />
        )}

        {/* Main layout: left content + right interactive */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* ─── Left: lesson content (3/5) ─────────────────────────────── */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Lesson header */}
            <div className="animate-slide-up">
              <div className="flex flex-wrap gap-2 mb-4">
                {lesson.skillTags.map(tag => (
                  <SkillTagChip key={tag} tag={tag} />
                ))}
                {completed && (
                  <span className="tag-chip bg-forest-100 text-forest-700 text-xs px-2.5 py-1 font-semibold">
                    ✓ Completed
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-forest-950 leading-tight mb-2">
                {lesson.title}
              </h1>
              <p className="text-lg text-forest-600 font-light">{lesson.subtitle}</p>
            </div>

            {/* Step progress bar */}
            <div className="animate-slide-up animation-delay-100">
              <ProgressBar
                value={stepProgress}
                label={`Step ${activeStepIdx + 1} of ${totalSteps}`}
                showPercentage={false}
                size="sm"
                color="forest"
              />
            </div>

            {/* Step tabs */}
            <div className="flex gap-2 flex-wrap animate-slide-up animation-delay-100">
              {lesson.steps.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStepIdx(idx)}
                  className={[
                    'px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200',
                    idx === activeStepIdx
                      ? 'bg-forest-700 text-white shadow-nature'
                      : 'bg-forest-50 text-forest-600 hover:bg-forest-100',
                  ].join(' ')}
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
            <div className="flex items-center justify-between gap-4 animate-fade-in">
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
                  variant="secondary"
                  size="sm"
                  onClick={() => setActiveStepIdx(i => i + 1)}
                >
                  Next step →
                </Button>
              ) : (
                <div className="text-xs text-forest-500 font-medium">
                  Last step — complete the lesson on the right →
                </div>
              )}
            </div>
          </div>

          {/* ─── Right: interactive panel (2/5) ─────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-6 lg:sticky lg:top-24 animate-slide-in-right animation-delay-200">
            {/* Micro-task box */}
            <div className="glass-card rounded-2xl p-5 border border-forest-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-forest-100 flex items-center justify-center">
                  <span className="text-sm">⚡</span>
                </div>
                <h3 className="font-bold text-sm text-forest-800">Quick Task</h3>
              </div>
              <p className="text-sm text-forest-600 leading-relaxed">{lesson.microtask}</p>
              <textarea
                className="nature-textarea mt-3 text-sm"
                placeholder="Work through the task here…"
                rows={3}
                value={reflections['__microtask__'] ?? ''}
                onChange={e => handleReflectionChange('__microtask__', e.target.value)}
              />
            </div>

            {/* Critical thinking check */}
            <CriticalThinkingCheck
              prompts={lesson.criticalThinkingPrompts}
              answers={ctAnswers}
              onChange={handleCtChange}
            />

            {/* Complete button */}
            {!completed ? (
              <Button
                variant="amber"
                size="lg"
                fullWidth
                onClick={handleComplete}
                className="mt-2"
              >
                Mark lesson complete ✓
              </Button>
            ) : (
              <div className="rounded-2xl bg-forest-50 border border-forest-200 p-4 text-center">
                <p className="text-sm font-semibold text-forest-700 mb-3">
                  ✓ Lesson completed!
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
                      Back to dashboard
                    </Button>
                  </Link>
                )}
              </div>
            )}

            {/* Next lesson teaser */}
            {lesson.nextLessonTeaser && !completed && (
              <p className="text-xs text-forest-400 text-center italic">
                {lesson.nextLessonTeaser}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Step content renderer ────────────────────────────────────────────────────

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

  const typeConfig: Record<string, { icon: string; color: string; label: string }> = {
    text:       { icon: '📖', color: 'bg-forest-50 border-forest-100', label: 'Read' },
    example:    { icon: '💡', color: 'bg-amber-50 border-amber-100', label: 'Example' },
    task:       { icon: '✏️', color: 'bg-teal-50 border-teal-100', label: 'Task' },
    reflection: { icon: '🪞', color: 'bg-stone-50 border-stone-200', label: 'Reflect' },
  };

  const { icon, color, label } = typeConfig[step.type] ?? typeConfig.text;

  return (
    <div className={`rounded-2xl p-6 border ${color} animate-scale-in`}>
      {/* Step header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-base">{icon}</span>
        <span className="text-xs font-bold uppercase tracking-wider text-forest-500">{label}</span>
      </div>

      <h2 className="text-xl font-bold text-forest-900 mb-4 leading-snug">{step.title}</h2>

      {/* Content — render with basic markdown-like formatting */}
      <div className="prose-nature">
        {step.content.split('\n').map((line, i) => {
          if (!line.trim()) return <div key={i} className="h-3" />;

          // Bold text: **text**
          const formatted = line.replace(
            /\*\*(.*?)\*\*/g,
            '<strong class="font-semibold text-forest-900">$1</strong>',
          );
          // Bullet points
          if (line.startsWith('• ') || line.startsWith('- ')) {
            return (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-forest-700 leading-relaxed"
              >
                <span className="mt-1 text-forest-400 flex-shrink-0">•</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: formatted.replace(/^[•\-] /, ''),
                  }}
                />
              </div>
            );
          }

          return (
            <p
              key={i}
              className="text-sm text-forest-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatted }}
            />
          );
        })}
      </div>

      {/* Input area for task/reflection steps */}
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
    <div className="mb-8 glass-card-dark rounded-2xl p-6 flex items-center justify-between gap-4 animate-scale-in">
      <div>
        <p className="text-green-300 text-sm font-semibold mb-1">🎉 Lesson complete!</p>
        <p className="text-white font-bold">{lessonTitle}</p>
        {nextLesson && (
          <p className="text-forest-300 text-sm mt-1">
            Up next: Day {nextLesson.day} — {nextLesson.title}
          </p>
        )}
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        {nextLesson && (
          <Link href={`/lesson/${nextLesson.id}`}>
            <Button variant="amber" size="sm">
              Continue →
            </Button>
          </Link>
        )}
        <button
          onClick={onDismiss}
          className="text-forest-400 hover:text-forest-200 transition-colors text-xl leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}
