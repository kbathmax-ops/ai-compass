'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { getLessons, getGoals, getRecommendedLesson } from '@/data/lessons';
import { LessonCard } from '@/components/lessons/LessonCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { RoleBadge } from '@/components/ui/Tag';
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
  const progressPercent = Math.round((completedCount / totalCount) * 100);
  const nextLesson = getRecommendedLesson(progress.completedLessons);

  const greeting = getGreeting();

  return (
    <div className="min-h-screen pt-20 pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 animate-fade-in">
          <div>
            <p className="text-sm font-semibold text-forest-500 uppercase tracking-widest mb-2">
              {greeting}
            </p>
            <h1 className="text-4xl font-black text-forest-950 mb-3 leading-tight">
              Your AI Journey
            </h1>
            <div className="flex items-center gap-2 flex-wrap">
              <RoleBadge />
              {progress.streak > 0 && (
                <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
                  🔥 {progress.streak} day streak
                </span>
              )}
            </div>
          </div>

          {/* Overall progress circle */}
          <div className="flex-shrink-0 glass-card rounded-2xl px-6 py-4 flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-black text-forest-800">{completedCount}</div>
              <div className="text-xs text-forest-500 font-medium">of {totalCount}</div>
              <div className="text-xs text-forest-400">lessons done</div>
            </div>
            <div className="w-px h-12 bg-forest-100" />
            <div className="min-w-32">
              <ProgressBar
                value={progressPercent}
                label={`${progressPercent}% complete`}
                showPercentage={false}
                size="md"
                color="forest"
              />
              {completedCount === 0 && (
                <p className="text-xs text-forest-400 mt-1.5">Start Day 1 to begin</p>
              )}
            </div>
          </div>
        </div>

        {/* "Next up" banner — if not all done */}
        {nextLesson && completedCount > 0 && (
          <NextUpBanner lesson={nextLesson} />
        )}

        {/* Goals reminder */}
        {goals.length > 0 && (
          <div className="mb-8 animate-slide-up animation-delay-100">
            <p className="text-xs font-semibold text-forest-500 uppercase tracking-wider mb-3">
              Your goals
            </p>
            <div className="flex flex-wrap gap-2">
              {goals.map(g => (
                <span
                  key={g.id}
                  className="glass-card text-xs font-medium text-forest-700 px-3 py-1.5 rounded-xl border border-forest-100 flex items-center gap-1.5"
                >
                  <span>{g.icon}</span>
                  {g.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Curriculum heading */}
        <div className="mb-6 animate-slide-up animation-delay-200">
          <h2 className="text-2xl font-black text-forest-900">
            Your Curriculum
          </h2>
          <p className="text-sm text-forest-500 mt-1">
            7 focused lessons · 15–35 min each · builds week over week
          </p>
        </div>

        {/* Lesson cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-slide-up animation-delay-300">
          {lessons.map((lesson, idx) => {
            const isCompleted = progress.completedLessons.includes(lesson.id);
            // Lock lessons that are 2+ ahead of the furthest completed
            const isLocked = !isCompleted && idx > completedCount + 1;

            return (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                isCompleted={isCompleted}
                isLocked={isLocked}
              />
            );
          })}
        </div>

        {/* Completion state */}
        {completedCount === totalCount && (
          <CompletionBanner />
        )}
      </div>
    </div>
  );
}

// ─── Next up banner ───────────────────────────────────────────────────────────

function NextUpBanner({ lesson }: { lesson: Lesson }) {
  return (
    <Link
      href={`/lesson/${lesson.id}`}
      className="block mb-8 animate-scale-in"
    >
      <div className="glass-card-dark rounded-2xl p-6 flex items-center justify-between gap-4 hover:opacity-90 transition-opacity">
        <div>
          <p className="text-xs font-semibold text-forest-200 uppercase tracking-widest mb-1">
            Up next
          </p>
          <h3 className="text-xl font-black text-white">
            Day {lesson.day}: {lesson.title}
          </h3>
          <p className="text-sm text-forest-300 mt-1">{lesson.subtitle}</p>
        </div>
        <div className="flex-shrink-0 flex flex-col items-end gap-2">
          <span className="text-xs font-medium text-forest-300">
            ⏱ {lesson.estimatedMinutes} min
          </span>
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold text-lg">
            →
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Completion banner ────────────────────────────────────────────────────────

function CompletionBanner() {
  return (
    <div className="mt-10 glass-card rounded-3xl p-8 text-center animate-scale-in">
      <div className="text-5xl mb-4">🌿</div>
      <h3 className="text-2xl font-black text-forest-900 mb-2">
        You&rsquo;ve completed the full curriculum!
      </h3>
      <p className="text-forest-600 max-w-md mx-auto text-sm">
        You now have a solid foundation in practical AI — with the critical thinking skills
        to use it wisely. Return to any lesson to review or deepen your practice.
      </p>
      {/* TODO: Add "Next level" path or link to advanced curriculum once available */}
    </div>
  );
}

// ─── Utility ──────────────────────────────────────────────────────────────────

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
