import React from 'react';
import { SKILL_TAG_COLORS, SKILL_TAG_LABELS } from '@/data/lessons';
import type { SkillTag } from '@/types';

interface TagProps {
  label: string;
  className?: string;
  size?: 'xs' | 'sm';
}

// Base editorial badge style
const badgeBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  border: '1px solid currentColor',
  background: 'transparent',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-xs)',
  fontWeight: 400,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  lineHeight: 1.4,
  borderRadius: 'var(--radius-sm)',
};

export function Tag({ label, className = '', size = 'sm' }: TagProps) {
  return (
    <span
      className={className}
      style={{
        ...badgeBase,
        padding: size === 'xs' ? '2px 6px' : '3px 8px',
        color: 'var(--color-text-2)',
      }}
    >
      {label}
    </span>
  );
}

interface SkillTagProps {
  tag: SkillTag;
  size?: 'xs' | 'sm';
}

export function SkillTagChip({ tag, size = 'sm' }: SkillTagProps) {
  const label = SKILL_TAG_LABELS[tag] ?? tag;

  // Map old color classes to editorial color values
  const colorMap: Record<string, string> = {
    prompting:          'var(--color-text)',
    verification:       'var(--color-text-2)',
    automation:         'var(--color-text)',
    copywriting:        'var(--color-text-2)',
    research:           'var(--color-text-2)',
    strategy:           'var(--color-text)',
    'critical-thinking':'var(--color-brand)',
    tools:              'var(--color-text-2)',
  };

  const color = colorMap[tag] ?? 'var(--color-text-2)';

  return (
    <span
      style={{
        ...badgeBase,
        padding: size === 'xs' ? '2px 6px' : '3px 8px',
        color,
      }}
    >
      {label}
    </span>
  );
}

// ─── Role badge ───────────────────────────────────────────────────────────────

export function RoleBadge({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  return (
    <span
      style={{
        ...badgeBase,
        padding: size === 'sm' ? '3px 8px' : '4px 10px',
        fontSize: size === 'md' ? 'var(--text-sm)' : 'var(--text-xs)',
        color: 'var(--color-brand)',
        borderColor: 'var(--color-brand)',
      }}
    >
      Business Owner
    </span>
  );
}
