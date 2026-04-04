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
  const pct = Math.round((completedCount / totalCount) * 100);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
        paddingTop: '52px', // nav height
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'var(--space-12) var(--space-4)',
        }}
      >
        {/* ── Page header ────────────────────────────────────────────────── */}
        <div
          style={{
            paddingBottom: 'var(--space-8)',
            marginBottom: 'var(--space-8)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-brand)',
              marginBottom: 'var(--space-3)',
            }}
          >
            Your curriculum
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
            }}
            className="sm:flex-row sm:items-end sm:justify-between"
          >
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1.0,
                color: 'var(--color-text)',
              }}
            >
              {completedCount === 0
                ? <>Your <em style={{ fontStyle: 'italic', color: 'var(--color-brand)' }}>journey</em> begins.</>
                : completedCount === totalCount
                ? <>Journey <em style={{ fontStyle: 'italic', color: 'var(--color-brand)' }}>complete.</em></>
                : <>Day {completedCount + 1} <em style={{ fontStyle: 'italic', color: 'var(--color-brand)' }}>awaits.</em></>
              }
            </h1>

            {/* Progress block */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 'var(--space-4)',
                flexShrink: 0,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '3rem',
                    fontWeight: 400,
                    lineHeight: 1,
                    color: 'var(--color-text)',
                  }}
                >
                  {completedCount}
                  <span style={{ fontSize: '1.5rem', color: 'var(--color-text-3)' }}>/{totalCount}</span>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-3)',
                    marginTop: '4px',
                  }}
                >
                  Complete
                </div>
              </div>
              {/* Thin vertical progress */}
              <div
                style={{
                  width: '2px',
                  height: '56px',
                  background: 'var(--color-border)',
                  marginBottom: '20px',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '2px',
                    height: `${pct}%`,
                    background: 'var(--color-brand)',
                    transition: 'height 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Goals */}
          {goals.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-2)',
                marginTop: 'var(--space-4)',
              }}
            >
              {goals.map(g => (
                <span
                  key={g.id}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-2)',
                    border: '1px solid var(--color-border)',
                    padding: '3px 8px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {g.label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Next up / Start banner ──────────────────────────────────────── */}
        {nextLesson && (
          <Link
            href={`/lesson/${nextLesson.id}`}
            style={{ display: 'block', textDecoration: 'none', marginBottom: 'var(--space-8)' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
                padding: 'var(--space-6)',
                background: 'var(--color-surface-3)',
                transition: `opacity var(--duration-fast) var(--ease)`,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.opacity = '0.85'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.opacity = '1'; }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,242,237,0.4)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {completedCount === 0 ? 'Start here' : 'Up next'}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                    color: 'var(--color-text-inv)',
                  }}
                >
                  Day {nextLesson.day} — {nextLesson.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'rgba(245,242,237,0.55)',
                    marginTop: '4px',
                  }}
                >
                  {nextLesson.subtitle}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexShrink: 0 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'rgba(245,242,237,0.4)',
                  }}
                >
                  {nextLesson.estimatedMinutes} min
                </span>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(245,242,237,0.2)',
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="var(--color-text-inv)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* ── Lesson list ─────────────────────────────────────────────────── */}
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: 'var(--color-text-3)',
            marginBottom: 'var(--space-4)',
          }}
        >
          All 7 lessons
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
            background: 'var(--color-border)',
          }}
        >
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

        {/* Completion */}
        {completedCount === totalCount && (
          <div
            style={{
              marginTop: 'var(--space-12)',
              paddingTop: 'var(--space-8)',
              borderTop: '1px solid var(--color-border)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-brand)',
                marginBottom: 'var(--space-3)',
              }}
            >
              Curriculum complete
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--color-text)',
              }}
            >
              You&rsquo;ve done the work.
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                color: 'var(--color-text-2)',
                marginTop: 'var(--space-3)',
                maxWidth: '36ch',
                margin: 'var(--space-3) auto 0',
                lineHeight: 1.6,
              }}
            >
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
  const inner = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        padding: 'var(--space-4) var(--space-6)',
        background: isCurrent ? 'var(--color-surface)' : 'var(--color-bg)',
        opacity: isLocked ? 0.35 : 1,
        transition: `background var(--duration-fast) var(--ease)`,
      }}
    >
      {/* Day square */}
      <div
        style={{
          flexShrink: 0,
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          borderRadius: 'var(--radius-sm)',
          border: isCompleted ? '1px solid var(--color-text)' : '1px solid var(--color-border-strong)',
          background: isCompleted ? 'var(--color-invert)' : 'transparent',
          color: isCompleted ? 'var(--color-text-inv)' : 'var(--color-text-3)',
        }}
      >
        {isCompleted ? '✓' : lesson.day}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-base)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: isLocked ? 'var(--color-text-3)' : 'var(--color-text)',
            lineHeight: 1.2,
          }}
        >
          {lesson.title}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-3)',
            marginTop: '2px',
          }}
          className="truncate"
        >
          {lesson.subtitle}
        </div>
      </div>

      {/* Meta */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-4)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-3)',
          }}
          className="hidden sm:inline"
        >
          {lesson.estimatedMinutes}m
        </span>
        {isCurrent && (
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--color-brand)',
            }}
            className="hidden sm:inline"
          >
            Start →
          </span>
        )}
        {isCompleted && (
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--color-text-3)',
            }}
            className="hidden sm:inline"
          >
            Review →
          </span>
        )}
      </div>
    </div>
  );

  if (isLocked) return <div>{inner}</div>;

  return (
    <Link
      href={`/lesson/${lesson.id}`}
      style={{ display: 'block', textDecoration: 'none' }}
      onMouseEnter={e => {
        const el = e.currentTarget.firstElementChild as HTMLElement;
        if (el) el.style.background = 'var(--color-surface)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget.firstElementChild as HTMLElement;
        if (el) el.style.background = isCurrent ? 'var(--color-surface)' : 'var(--color-bg)';
      }}
    >
      {inner}
    </Link>
  );
}
