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
import { ProgressBar, CircularProgress } from '@/components/ui/ProgressBar';
import { RoleBadge, SkillTagChip } from '@/components/ui/Tag';
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

  // Aggregate skills practiced
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

  const roleLabel = role === 'smb' ? 'Small Business Owner' : 'Student';
  const totalMinutes = completedLessons.reduce((sum, l) => sum + l.estimatedMinutes, 0);

  return (
    <div className="min-h-screen pt-20 pb-28 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <p className="text-sm font-semibold text-forest-500 uppercase tracking-widest mb-2">
            Your Progress
          </p>
          <h1 className="text-4xl font-black text-forest-950 leading-tight">
            AI Compass Profile
          </h1>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 animate-slide-up">
          <StatCard
            value={completedCount.toString()}
            label="Lessons done"
            sub={`of ${totalCount}`}
            icon="📚"
          />
          <StatCard
            value={progress.streak > 0 ? `${progress.streak}` : '—'}
            label="Day streak"
            sub="keep it up"
            icon="🔥"
          />
          <StatCard
            value={`${totalMinutes}`}
            label="Minutes learned"
            sub="hands-on"
            icon="⏱"
          />
          <StatCard
            value={topSkills.length > 0 ? `${topSkills.length}` : '0'}
            label="Skills practiced"
            sub="and counting"
            icon="🧠"
          />
        </div>

        {/* Progress overview card */}
        <div className="glass-card rounded-3xl p-6 mb-6 animate-slide-up animation-delay-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-black text-forest-900">Curriculum Progress</h2>
              <p className="text-sm text-forest-500 mt-0.5">{roleLabel} track</p>
            </div>
            <CircularProgress
              value={progressPercent}
              size={64}
              strokeWidth={5}
              label={`${progressPercent}%`}
            />
          </div>

          <ProgressBar
            value={progressPercent}
            showPercentage
            size="md"
            color="forest"
            className="mb-4"
          />

          <div className="flex flex-col sm:flex-row gap-3">
            {lessons.map(l => {
              const done = progress.completedLessons.includes(l.id);
              return (
                <div key={l.id} className="flex-1 text-center">
                  <div
                    className={[
                      'w-7 h-7 rounded-full mx-auto mb-1 flex items-center justify-center text-xs font-bold',
                      done
                        ? 'bg-forest-600 text-white'
                        : 'bg-stone-100 text-stone-400 border-2 border-stone-200',
                    ].join(' ')}
                  >
                    {done ? '✓' : l.day}
                  </div>
                  <p className="text-[0.6rem] text-forest-400 leading-tight hidden sm:block truncate max-w-14 mx-auto">
                    {l.title.split(':')[0]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 animate-slide-up animation-delay-200">
          {/* Role & goals */}
          <div className="glass-card rounded-3xl p-6">
            <h2 className="text-lg font-black text-forest-900 mb-4">Your Setup</h2>
            <div className="mb-4">
              <p className="text-xs text-forest-500 font-medium uppercase tracking-wider mb-2">
                Role
              </p>
              <RoleBadge size="md" />
            </div>
            {goals.length > 0 && (
              <div>
                <p className="text-xs text-forest-500 font-medium uppercase tracking-wider mb-2">
                  Goals
                </p>
                <div className="flex flex-col gap-2">
                  {goals.map(g => (
                    <div key={g.id} className="flex items-center gap-2 text-sm text-forest-700">
                      <span className="text-base">{g.icon}</span>
                      {g.label}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Skills + next action */}
          <div className="flex flex-col gap-4">
            {/* Skills */}
            <div className="glass-card rounded-3xl p-6">
              <h2 className="text-lg font-black text-forest-900 mb-3">Skills Practiced</h2>
              {topSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {topSkills.map(tag => (
                    <SkillTagChip key={tag} tag={tag} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-forest-400">
                  Complete your first lesson to start building skills.
                </p>
              )}
            </div>

            {/* Recommended next action */}
            <div className="glass-card-dark rounded-3xl p-6">
              <p className="text-xs font-semibold text-forest-300 uppercase tracking-wider mb-2">
                Recommended next
              </p>
              {nextLesson ? (
                <>
                  <h3 className="font-bold text-white mb-1">
                    Day {nextLesson.day}: {nextLesson.title}
                  </h3>
                  <p className="text-sm text-forest-300 mb-4">{nextLesson.subtitle}</p>
                  <Link href={`/lesson/${nextLesson.id}`}>
                    <Button variant="amber" size="sm" fullWidth>
                      Start lesson →
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-white font-bold mb-1">All lessons complete!</p>
                  <p className="text-sm text-forest-300 mb-4">
                    Review any lesson or reset to start fresh with a new role.
                  </p>
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm" fullWidth>
                      Review curriculum
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Reset section */}
        <div className="mt-10 text-center animate-fade-in animation-delay-400">
          <p className="text-xs text-forest-400 mb-3">
            Want to start over with a different role or fresh progress?
          </p>
          <button
            onClick={() => {
              if (confirm('This will reset all your progress. Are you sure?')) {
                resetAll();
                router.push('/');
              }
            }}
            className="text-sm text-forest-400 hover:text-red-500 transition-colors underline underline-offset-2"
          >
            Reset all progress
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  value,
  label,
  sub,
  icon,
}: {
  value: string;
  label: string;
  sub: string;
  icon: string;
}) {
  return (
    <div className="glass-card rounded-2xl p-4 flex flex-col gap-1">
      <span className="text-2xl">{icon}</span>
      <span className="text-2xl font-black text-forest-900 leading-none">{value}</span>
      <span className="text-xs font-semibold text-forest-700">{label}</span>
      <span className="text-xs text-forest-400">{sub}</span>
    </div>
  );
}
