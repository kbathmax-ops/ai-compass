'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { getLessons, getGoals, getRecommendedLesson } from '@/data/lessons';
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
  const totalMinutes = completedLessons.reduce((sum, l) => sum + l.estimatedMinutes, 0);

  const skillsMap: Record<string, number> = {};
  completedLessons.forEach(l =>
    l.skillTags.forEach(tag => { skillsMap[tag] = (skillsMap[tag] ?? 0) + 1; }),
  );
  const topSkills = Object.entries(skillsMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag]) => tag as SkillTag);

  const stats = [
    { value: completedCount.toString(), label: 'Lessons', sub: `of ${totalCount}` },
    { value: progress.streak > 0 ? `${progress.streak}` : '—', label: 'Streak', sub: 'days' },
    { value: `${totalMinutes}`, label: 'Minutes', sub: 'hands-on' },
    { value: topSkills.length > 0 ? `${topSkills.length}` : '0', label: 'Skills', sub: 'practiced' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
        paddingTop: '52px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'var(--space-12) var(--space-4) var(--space-16)',
        }}
      >
        {/* Header */}
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
            Your progress
          </div>
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
            AI Compass <em style={{ fontStyle: 'italic', color: 'var(--color-brand)' }}>profile.</em>
          </h1>
        </div>

        {/* Stats grid — hairline-bordered cells */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            background: 'var(--color-border)',
            marginBottom: 'var(--space-8)',
          }}
          className="grid-cols-2 sm:grid-cols-4"
        >
          {stats.map(({ value, label, sub }) => (
            <div
              key={label}
              style={{
                padding: 'var(--space-6)',
                background: 'var(--color-bg)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-1)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  fontWeight: 400,
                  lineHeight: 1,
                  color: 'var(--color-text)',
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-2)',
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-3)',
                }}
              >
                {sub}
              </div>
            </div>
          ))}
        </div>

        {/* Progress section */}
        <div
          style={{
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            padding: 'var(--space-6)',
            marginBottom: 'var(--space-6)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-3)',
                  marginBottom: 'var(--space-1)',
                }}
              >
                Curriculum
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 400,
                  color: 'var(--color-text)',
                }}
              >
                {progressPercent}% complete
              </div>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
              {lessons.map(l => {
                const done = progress.completedLessons.includes(l.id);
                return (
                  <div
                    key={l.id}
                    style={{
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      border: done ? '1px solid var(--color-text)' : '1px solid var(--color-border-strong)',
                      background: done ? 'var(--color-invert)' : 'transparent',
                      color: done ? 'var(--color-text-inv)' : 'var(--color-text-3)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                    title={`Day ${l.day}: ${l.title}`}
                  >
                    {done ? '✓' : l.day}
                  </div>
                );
              })}
            </div>
          </div>

          <ProgressBar value={progressPercent} showPercentage={false} size="sm" color="forest" />
        </div>

        {/* Two-col bottom */}
        <div
          style={{
            display: 'grid',
            gap: 'var(--space-6)',
          }}
          className="sm:grid-cols-2"
        >
          {/* Goals + skills */}
          <div
            style={{
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
              padding: 'var(--space-6)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-text-3)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Goals
            </div>
            {goals.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
                {goals.map(g => (
                  <div
                    key={g.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-2)',
                    }}
                  >
                    <span style={{ fontSize: '15px' }}>{g.icon}</span>
                    {g.label}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-3)', marginBottom: 'var(--space-6)', fontStyle: 'italic' }}>
                No goals selected.
              </p>
            )}

            {topSkills.length > 0 && (
              <>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-3)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  Skills Practiced
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {topSkills.map(tag => (
                    <SkillTagChip key={tag} tag={tag} />
                  ))}
                </div>
              </>
            )}

            {topSkills.length === 0 && (
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-3)',
                  fontStyle: 'italic',
                }}
              >
                Complete a lesson to start building skills.
              </p>
            )}
          </div>

          {/* Recommended next */}
          <div
            style={{
              background: 'var(--color-surface-3)',
              padding: 'var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'rgba(245,242,237,0.4)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Recommended next
            </div>
            {nextLesson ? (
              <>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                    color: 'var(--color-text-inv)',
                    marginBottom: 'var(--space-2)',
                    lineHeight: 1.2,
                  }}
                >
                  Day {nextLesson.day}: {nextLesson.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'rgba(245,242,237,0.55)',
                    flex: 1,
                    lineHeight: 1.5,
                    marginBottom: 'var(--space-6)',
                  }}
                >
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
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 400, color: 'var(--color-text-inv)', marginBottom: 'var(--space-2)' }}>
                  All lessons complete.
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'rgba(245,242,237,0.5)', flex: 1, marginBottom: 'var(--space-6)' }}>
                  Review any lesson or reset to start fresh.
                </p>
                <Link href="/dashboard">
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    style={{ borderColor: 'rgba(245,242,237,0.3)', color: 'var(--color-text-inv)' }}
                  >
                    Review curriculum
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Reset */}
        <div
          style={{
            marginTop: 'var(--space-12)',
            textAlign: 'center',
            paddingTop: 'var(--space-8)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-3)',
              marginBottom: 'var(--space-3)',
            }}
          >
            Want to start over?
          </p>
          <button
            onClick={() => {
              if (confirm('This will reset all your progress. Are you sure?')) {
                resetAll();
                router.push('/');
              }
            }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--color-text-3)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              transition: `color var(--duration-fast) var(--ease)`,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-brand)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-3)'; }}
          >
            Reset all progress
          </button>
        </div>
      </div>
    </div>
  );
}
