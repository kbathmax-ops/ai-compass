'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { getLessons, getGoals, getRecommendedLesson } from '@/data/lessons';
import type { Lesson } from '@/types';

export default function DashboardPage() {
  const router = useRouter();
  const { state } = useApp();
  const { role, progress, selectedGoals, onboardingComplete } = state;

  useEffect(() => {
    if (!onboardingComplete) router.replace('/');
  }, [onboardingComplete, router]);

  if (!onboardingComplete || !role) return null;

  const lessons = getLessons();
  const goals = getGoals().filter(g => selectedGoals.includes(g.id));
  const completedCount = progress.completedLessons.filter(id =>
    lessons.some(l => l.id === id),
  ).length;
  const totalCount = lessons.length;
  const nextLesson = getRecommendedLesson(progress.completedLessons);

  return (
    <div className="min-h-screen pt-20 pb-24" style={{ background: 'var(--stone)', color: 'var(--ink)' }}>
      <div className="max-w-4xl mx-auto px-8 sm:px-14">

        {/* ── Page header ────────────────────────────────────────────── */}
        <div className="pt-8 pb-10" style={{ borderBottom: '1px solid var(--stone-mid)' }}>
          <p className="text-xs font-medium tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--cognac)' }}>
            Your curriculum
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: 1.0,
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: 'var(--ink)',
              }}
            >
              {completedCount === 0
                ? <>Your <em style={{ fontStyle: 'italic', color: 'var(--cognac)' }}>journey</em> begins.</>
                : completedCount === totalCount
                ? <>Journey <em style={{ fontStyle: 'italic', color: 'var(--cognac)' }}>complete.</em></>
                : <>Day {completedCount + 1} <em style={{ fontStyle: 'italic', color: 'var(--cognac)' }}>awaits.</em></>
              }
            </h1>

            {/* Progress fraction */}
            <div className="flex items-end gap-4 flex-shrink-0">
              <div className="text-right">
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem',
                    fontWeight: 600,
                    lineHeight: 1,
                    color: 'var(--ink)',
                  }}
                >
                  {completedCount}<span style={{ color: 'var(--stone-dk)', fontSize: '1.5rem' }}>/{totalCount}</span>
                </div>
                <div className="text-xs tracking-wider mt-1" style={{ color: 'var(--ink-muted)' }}>
                  lessons complete
                </div>
              </div>
              {/* Thin progress bar */}
              <div className="w-24 mb-3">
                <div className="h-px w-full" style={{ background: 'var(--stone-mid)' }}>
                  <div
                    className="h-px transition-all duration-700"
                    style={{
                      width: `${Math.round((completedCount / totalCount) * 100)}%`,
                      background: 'var(--cognac)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Goals pills */}
          {goals.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {goals.map(g => (
                <span
                  key={g.id}
                  className="flex items-center gap-1.5 text-xs"
                  style={{
                    padding: '4px 12px',
                    border: '1px solid var(--stone-mid)',
                    color: 'var(--ink-md)',
                  }}
                >
                  <span>{g.icon}</span>
                  {g.label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Next up banner ──────────────────────────────────────────── */}
        {nextLesson && completedCount > 0 && (
          <Link href={`/lesson/${nextLesson.id}`} className="block mt-8">
            <div
              className="flex items-center justify-between gap-4 p-6 transition-opacity duration-200 hover:opacity-80"
              style={{ background: 'var(--moss)', color: 'white' }}
            >
              <div>
                <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Up next
                </p>
                <h3 className="font-medium text-base">
                  Day {nextLesson.day} — {nextLesson.title}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {nextLesson.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {nextLesson.estimatedMinutes} min
                </span>
                <div
                  className="w-9 h-9 flex items-center justify-center"
                  style={{ border: '1px solid rgba(255,255,255,0.25)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* First lesson prompt when nothing completed */}
        {completedCount === 0 && nextLesson && (
          <Link href={`/lesson/${nextLesson.id}`} className="block mt-8">
            <div
              className="flex items-center justify-between gap-4 p-6 transition-opacity duration-200 hover:opacity-80"
              style={{ background: 'var(--moss)', color: 'white' }}
            >
              <div>
                <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Start here
                </p>
                <h3 className="font-medium text-base">
                  Day {nextLesson.day} — {nextLesson.title}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {nextLesson.subtitle}
                </p>
              </div>
              <div
                className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                style={{ border: '1px solid rgba(255,255,255,0.25)' }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </div>
            </div>
          </Link>
        )}

        {/* ── Lesson list ─────────────────────────────────────────────── */}
        <div className="mt-10">
          <p className="text-xs font-medium tracking-[0.25em] uppercase mb-6" style={{ color: 'var(--ink-muted)' }}>
            All 7 lessons
          </p>

          <div className="flex flex-col" style={{ gap: '1px', background: 'var(--stone-mid)' }}>
            {lessons.map((lesson, idx) => {
              const isCompleted = progress.completedLessons.includes(lesson.id);
              const isLocked = !isCompleted && idx > completedCount + 1;
              const isCurrent = !isCompleted && idx === completedCount;

              return (
                <LessonRow
                  key={lesson.id}
                  lesson={lesson}
                  isCompleted={isCompleted}
                  isLocked={isLocked}
                  isCurrent={isCurrent}
                />
              );
            })}
          </div>
        </div>

        {/* Completion state */}
        {completedCount === totalCount && (
          <div className="mt-12 py-10 text-center" style={{ borderTop: '1px solid var(--stone-mid)' }}>
            <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: 'var(--cognac)' }}>
              Curriculum complete
            </p>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: 600,
                color: 'var(--ink)',
              }}
            >
              You&rsquo;ve done the work.
            </h3>
            <p className="text-sm mt-3 max-w-sm mx-auto" style={{ color: 'var(--ink-md)' }}>
              Return to any lesson to review or deepen your practice.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Lesson row ───────────────────────────────────────────────────────────────

function LessonRow({
  lesson,
  isCompleted,
  isLocked,
  isCurrent,
}: {
  lesson: Lesson;
  isCompleted: boolean;
  isLocked: boolean;
  isCurrent: boolean;
}) {
  const content = (
    <div
      className="flex items-center gap-6 px-6 py-5 transition-colors duration-150"
      style={{
        background: isCompleted
          ? 'rgba(184,116,46,0.03)'
          : isCurrent
          ? 'var(--stone-lt, #f5f2ed)'
          : 'var(--stone)',
        opacity: isLocked ? 0.4 : 1,
        cursor: isLocked ? 'default' : 'pointer',
      }}
    >
      {/* Day indicator */}
      <div
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-xs font-medium"
        style={{
          border: isCompleted
            ? '1px solid var(--cognac)'
            : '1px solid var(--stone-mid)',
          color: isCompleted ? 'var(--cognac)' : 'var(--ink-muted)',
        }}
      >
        {isCompleted ? '✓' : lesson.day}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3
          className="font-medium text-sm leading-snug"
          style={{ color: isLocked ? 'var(--ink-muted)' : 'var(--ink)' }}
        >
          {lesson.title}
        </h3>
        <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--ink-muted)' }}>
          {lesson.subtitle}
        </p>
      </div>

      {/* Meta */}
      <div className="flex-shrink-0 flex items-center gap-4">
        <span className="text-xs hidden sm:block" style={{ color: 'var(--ink-muted)' }}>
          {lesson.estimatedMinutes} min
        </span>
        {isCurrent && (
          <span
            className="text-xs font-medium tracking-wide hidden sm:block"
            style={{ color: 'var(--cognac)' }}
          >
            Start →
          </span>
        )}
        {isCompleted && (
          <span
            className="text-xs tracking-wide hidden sm:block"
            style={{ color: 'var(--cognac)' }}
          >
            Review →
          </span>
        )}
        {isLocked && (
          <span className="text-xs" style={{ color: 'var(--stone-dk)' }}>🔒</span>
        )}
      </div>
    </div>
  );

  if (isLocked) return <div>{content}</div>;

  return (
    <Link
      href={`/lesson/${lesson.id}`}
      className="block hover:brightness-[0.97] transition-all duration-150"
    >
      {content}
    </Link>
  );
}
