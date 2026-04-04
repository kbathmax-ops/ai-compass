'use client';

import Link from 'next/link';
import type { Lesson } from '@/types';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SkillTagChip } from '@/components/ui/Tag';

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  isLocked: boolean;
  progress?: number; // 0–100 if in progress
}

export function LessonCard({ lesson, isCompleted, isLocked, progress = 0 }: LessonCardProps) {
  const cardContent = (
    <div
      className={[
        'rounded-2xl p-6 flex flex-col gap-4 h-full transition-all duration-200',
        'border',
        isCompleted
          ? 'bg-forest-50/80 border-forest-200 shadow-nature'
          : isLocked
          ? 'bg-stone-50/60 border-stone-200 opacity-60'
          : 'glass-card card-hover border-white/60',
      ].join(' ')}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={[
              'w-10 h-10 rounded-xl flex items-center justify-center text-base font-black flex-shrink-0',
              isCompleted
                ? 'bg-forest-600 text-white'
                : isLocked
                ? 'bg-stone-200 text-stone-400'
                : 'bg-forest-100 text-forest-700',
            ].join(' ')}
          >
            {isCompleted ? '✓' : isLocked ? '🔒' : `D${lesson.day}`}
          </div>
          <div>
            <p className="text-xs font-medium text-forest-500 uppercase tracking-wider">
              Day {lesson.day}
            </p>
            <h3
              className={[
                'font-bold leading-snug',
                isLocked ? 'text-stone-400' : 'text-forest-900',
              ].join(' ')}
            >
              {lesson.title}
            </h3>
          </div>
        </div>

        {/* Status badge */}
        {isCompleted && (
          <span className="flex-shrink-0 text-xs font-semibold bg-forest-100 text-forest-700 px-2.5 py-1 rounded-full">
            Done
          </span>
        )}
        {!isCompleted && !isLocked && progress > 0 && (
          <span className="flex-shrink-0 text-xs font-semibold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">
            In progress
          </span>
        )}
      </div>

      {/* Subtitle */}
      <p className={`text-sm leading-relaxed ${isLocked ? 'text-stone-400' : 'text-forest-600'}`}>
        {lesson.subtitle}
      </p>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-1.5">
        {lesson.skillTags.slice(0, 3).map(tag => (
          <SkillTagChip key={tag} tag={tag} size="xs" />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto">
        {/* Progress bar (if in-progress) */}
        {progress > 0 && progress < 100 && !isCompleted && (
          <div className="mb-3">
            <ProgressBar value={progress} size="xs" color="amber" />
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className={`text-xs ${isLocked ? 'text-stone-400' : 'text-forest-500'}`}>
            ⏱ {lesson.estimatedMinutes} min
          </span>
          {!isLocked && (
            <span
              className={[
                'text-xs font-semibold',
                isCompleted ? 'text-forest-600' : 'text-forest-700',
              ].join(' ')}
            >
              {isCompleted ? 'Review →' : 'Start →'}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (isLocked) {
    return <div className="h-full">{cardContent}</div>;
  }

  return (
    <Link href={`/lesson/${lesson.id}`} className="h-full block focus-visible:ring-2 ring-forest-400 rounded-2xl">
      {cardContent}
    </Link>
  );
}
