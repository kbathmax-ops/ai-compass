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
      className="p-6 flex flex-col gap-4 h-full transition-all duration-200"
      style={{
        border: isCompleted
          ? '1px solid var(--cognac)'
          : '1px solid var(--stone-mid)',
        background: isCompleted
          ? 'rgba(184,116,46,0.03)'
          : isLocked
          ? 'transparent'
          : 'var(--stone)',
        opacity: isLocked ? 0.4 : 1,
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 flex items-center justify-center text-xs font-medium flex-shrink-0"
            style={{
              border: isCompleted
                ? '1px solid var(--cognac)'
                : '1px solid var(--stone-mid)',
              color: isCompleted ? 'var(--cognac)' : 'var(--ink-muted)',
            }}
          >
            {isCompleted ? '✓' : isLocked ? '🔒' : `D${lesson.day}`}
          </div>
          <div>
            <p className="text-xs tracking-wider uppercase" style={{ color: 'var(--ink-muted)' }}>
              Day {lesson.day}
            </p>
            <h3 className="font-medium text-sm leading-snug" style={{ color: isLocked ? 'var(--ink-muted)' : 'var(--ink)' }}>
              {lesson.title}
            </h3>
          </div>
        </div>

        {isCompleted && (
          <span className="flex-shrink-0 text-xs" style={{ color: 'var(--cognac)' }}>Done</span>
        )}
        {!isCompleted && !isLocked && progress > 0 && (
          <span className="flex-shrink-0 text-xs" style={{ color: 'var(--ink-muted)' }}>In progress</span>
        )}
      </div>

      <p className="text-xs leading-relaxed" style={{ color: isLocked ? 'var(--stone-dk)' : 'var(--ink-md)' }}>
        {lesson.subtitle}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {lesson.skillTags.slice(0, 3).map(tag => (
          <SkillTagChip key={tag} tag={tag} size="xs" />
        ))}
      </div>

      <div className="mt-auto">
        {progress > 0 && progress < 100 && !isCompleted && (
          <div className="mb-3">
            <ProgressBar value={progress} size="xs" color="forest" />
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: 'var(--ink-muted)' }}>
            {lesson.estimatedMinutes} min
          </span>
          {!isLocked && (
            <span className="text-xs" style={{ color: 'var(--cognac)' }}>
              {isCompleted ? 'Review →' : 'Start →'}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (isLocked) return <div className="h-full">{cardContent}</div>;

  return (
    <Link href={`/lesson/${lesson.id}`} className="h-full block">
      {cardContent}
    </Link>
  );
}
