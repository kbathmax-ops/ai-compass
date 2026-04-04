'use client';

import Link from 'next/link';
import type { Lesson } from '@/types';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SkillTagChip } from '@/components/ui/Tag';

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  isLocked: boolean;
  progress?: number;
}

export function LessonCard({ lesson, isCompleted, isLocked, progress = 0 }: LessonCardProps) {
  const cardContent = (
    <div
      style={{
        padding: 'var(--space-6)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        height: '100%',
        background: 'var(--color-surface)',
        border: `1px solid ${isCompleted ? 'var(--color-border-strong)' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-1)',
        opacity: isLocked ? 0.38 : 1,
        transition: `box-shadow var(--duration-fast) var(--ease), border-color var(--duration-fast) var(--ease)`,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Day indicator — square */}
          <div
            style={{
              width: '32px',
              height: '32px',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              border: isCompleted
                ? '1px solid var(--color-text)'
                : '1px solid var(--color-border-strong)',
              background: isCompleted ? 'var(--color-invert)' : 'transparent',
              color: isCompleted ? 'var(--color-text-inv)' : 'var(--color-text-3)',
            }}
          >
            {isCompleted ? '✓' : isLocked ? '—' : `${lesson.day}`}
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-text-3)',
                marginBottom: '2px',
              }}
            >
              Day {lesson.day}
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-base)',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
                color: isLocked ? 'var(--color-text-3)' : 'var(--color-text)',
              }}
            >
              {lesson.title}
            </h3>
          </div>
        </div>

        {isCompleted && (
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text-2)',
              flexShrink: 0,
            }}
          >
            Done
          </span>
        )}
      </div>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          lineHeight: 1.5,
          color: isLocked ? 'var(--color-text-3)' : 'var(--color-text-2)',
        }}
      >
        {lesson.subtitle}
      </p>

      {/* Skill tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {lesson.skillTags.slice(0, 3).map(tag => (
          <SkillTagChip key={tag} tag={tag} size="xs" />
        ))}
      </div>

      {/* Footer */}
      <div style={{ marginTop: 'auto' }}>
        {progress > 0 && progress < 100 && !isCompleted && (
          <div style={{ marginBottom: '10px' }}>
            <ProgressBar value={progress} size="xs" color="forest" />
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-3)',
            }}
          >
            {lesson.estimatedMinutes} min
          </span>
          {!isLocked && (
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: isCompleted ? 'var(--color-text-2)' : 'var(--color-text)',
              }}
            >
              {isCompleted ? 'Review →' : 'Start →'}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (isLocked) return <div style={{ height: '100%' }}>{cardContent}</div>;

  return (
    <Link
      href={`/lesson/${lesson.id}`}
      style={{ height: '100%', display: 'block', textDecoration: 'none' }}
      onMouseEnter={e => {
        const card = e.currentTarget.firstElementChild as HTMLElement;
        if (card) {
          card.style.boxShadow = 'var(--shadow-2)';
          card.style.borderColor = 'var(--color-border-strong)';
        }
      }}
      onMouseLeave={e => {
        const card = e.currentTarget.firstElementChild as HTMLElement;
        if (card) {
          card.style.boxShadow = 'var(--shadow-1)';
          card.style.borderColor = 'var(--color-border)';
        }
      }}
    >
      {cardContent}
    </Link>
  );
}
