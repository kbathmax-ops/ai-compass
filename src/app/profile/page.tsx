'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  getLessons,
  getGoals,
  getRecommendedLesson,
  SKILL_TAG_LABELS,
} from '@/data/lessons';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SkillTagChip } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import type { SkillTag } from '@/types';

export default function ProfilePage() {
  const router = useRouter();
  const { state, resetAll } = useApp();
  const { role, selectedGoals, progress, onboardingComplete } = state;

  useEffect(() => {
    if (!onboardingComplete) router.replace('/');
  }, [onboardingComplete, router]);

  if (!onboardingComplete || !role) return null;

  const lessons = getLessons();
  const goals = getGoals().filter(g => selectedGoals.includes(g.id));
  const completedLessons = lessons.filter(l => progress.completedLessons.includes(l.id));
  const completedCount = completedLessons.length;
  const totalCount = lessons.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const nextLesson = getRecommendedLesson(progress.completedLessons);

  const skillsMap: Record<string, number> = {};
  completedLessons.forEach(l =>
    l.skillTags.forEach(tag => {
      skillsMap[tag] = (skillsMap[tag] ?? 0) + 1;
    }),
  );
  const topSkills = Object.entries(skillsMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag]) => tag as SkillTag);

  const totalMinutes = completedLessons.reduce((sum, l) => sum + l.estimatedMinutes, 0);

  return (
    <div className="min-h-screen pt-20 pb-28" style={{ background: 'var(--stone)', color: 'var(--ink)' }}>
      <div className="max-w-3xl mx-auto px-8 sm:px-14">

        {/* Header */}
        <div className="pt-8 pb-10" style={{ borderBottom: '1px solid var(--stone-mid)' }}>
          <p className="text-xs font-medium tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--cognac)' }}>
            Your progress
          </p>
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
            AI Compass <em style={{ fontStyle: 'italic', color: 'var(--cognac)' }}>profile.</em>
          </h1>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-px" style={{ background: 'var(--stone-mid)' }}>
          {[
            { value: completedCount.toString(), label: 'Lessons done', sub: `of ${totalCount}`, icon: '📚' },
            { value: progress.streak > 0 ? `${progress.streak}` : '—', label: 'Day streak', sub: 'keep it up', icon: '🔥' },
            { value: `${totalMinutes}`, label: 'Minutes learned', sub: 'hands-on', icon: '⏱' },
            { value: topSkills.length > 0 ? `${topSkills.length}` : '0', label: 'Skills', sub: 'and counting', icon: '🧠' },
          ].map(({ value, label, sub, icon }) => (
            <div
              key={label}
              className="px-5 py-6 flex flex-col gap-1"
              style={{ background: 'var(--stone)' }}
            >
              <span className="text-lg">{icon}</span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  fontWeight: 600,
                  lineHeight: 1,
                  color: 'var(--ink)',
                }}
              >
                {value}
              </span>
              <span className="text-xs font-medium" style={{ color: 'var(--ink-md)' }}>{label}</span>
              <span className="text-xs" style={{ color: 'var(--ink-muted)' }}>{sub}</span>
            </div>
          ))}
        </div>

        {/* Progress overview */}
        <div className="mt-8 p-6" style={{ border: '1px solid var(--stone-mid)' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-medium text-base" style={{ color: 'var(--ink)' }}>Curriculum Progress</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--ink-muted)' }}>Small Business Owner track</p>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: 600,
                color: 'var(--cognac)',
              }}
            >
              {progressPercent}%
            </span>
          </div>

          <ProgressBar value={progressPercent} showPercentage={false} size="sm" color="forest" className="mb-5" />

          <div className="flex gap-2 flex-wrap">
            {lessons.map(l => {
              const done = progress.completedLessons.includes(l.id);
              return (
                <div key={l.id} className="flex flex-col items-center gap-1">
                  <div
                    className="w-7 h-7 flex items-center justify-center text-xs font-medium"
                    style={{
                      border: done ? '1px solid var(--cognac)' : '1px solid var(--stone-mid)',
                      color: done ? 'var(--cognac)' : 'var(--ink-muted)',
                    }}
                  >
                    {done ? '✓' : l.day}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mt-6">
          {/* Goals */}
          <div className="p-6" style={{ border: '1px solid var(--stone-mid)' }}>
            <h2 className="font-medium text-sm mb-4" style={{ color: 'var(--ink)' }}>Your Goals</h2>
            {goals.length > 0 ? (
              <div className="flex flex-col gap-2">
                {goals.map(g => (
                  <div key={g.id} className="flex items-center gap-2 text-sm" style={{ color: 'var(--ink-md)' }}>
                    <span className="text-base">{g.icon}</span>
                    {g.label}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs" style={{ color: 'var(--ink-muted)' }}>No goals selected.</p>
            )}

            {topSkills.length > 0 && (
              <div className="mt-5">
                <h3 className="text-xs font-medium tracking-wider uppercase mb-2" style={{ color: 'var(--ink-muted)' }}>
                  Skills Practiced
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {topSkills.map(tag => (
                    <SkillTagChip key={tag} tag={tag} size="xs" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Recommended next */}
          <div
            className="p-6 flex flex-col"
            style={{ background: 'var(--moss)', color: 'white' }}
          >
            <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Recommended next
            </p>
            {nextLesson ? (
              <>
                <h3 className="font-medium text-sm mb-1">
                  Day {nextLesson.day}: {nextLesson.title}
                </h3>
                <p className="text-xs mb-5 flex-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {nextLesson.subtitle}
                </p>
                <Link href={`/lesson/${nextLesson.id}`}>
                  <Button variant="amber" size="sm" fullWidth>
                    Start lesson →
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <p className="font-medium text-sm mb-1">All lessons complete!</p>
                <p className="text-xs mb-5 flex-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Review any lesson or reset to start fresh.
                </p>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm" fullWidth style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
                    Review curriculum
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Reset */}
        <div className="mt-10 text-center pb-4">
          <p className="text-xs mb-3" style={{ color: 'var(--ink-muted)' }}>
            Want to start over with fresh progress?
          </p>
          <button
            onClick={() => {
              if (confirm('This will reset all your progress. Are you sure?')) {
                resetAll();
                router.push('/');
              }
            }}
            className="text-xs hover:opacity-70 transition-opacity underline underline-offset-2"
            style={{ color: 'var(--ink-muted)' }}
          >
            Reset all progress
          </button>
        </div>
      </div>
    </div>
  );
}
