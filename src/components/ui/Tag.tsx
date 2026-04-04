import React from 'react';
import { SKILL_TAG_COLORS, SKILL_TAG_LABELS } from '@/data/lessons';
import type { SkillTag } from '@/types';

interface TagProps {
  label: string;
  className?: string;
  size?: 'xs' | 'sm';
}

export function Tag({ label, className = '', size = 'sm' }: TagProps) {
  return (
    <span
      className={[
        'tag-chip',
        size === 'xs' ? 'text-[0.65rem] px-2 py-0.5' : 'text-xs px-3 py-1',
        className,
      ].join(' ')}
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
  const colorClass = SKILL_TAG_COLORS[tag] ?? 'bg-stone-200 text-stone-700';
  const label = SKILL_TAG_LABELS[tag] ?? tag;

  return (
    <span
      className={[
        'tag-chip',
        colorClass,
        size === 'xs' ? 'text-[0.65rem] px-2 py-0.5' : 'text-xs px-2.5 py-1',
      ].join(' ')}
    >
      {label}
    </span>
  );
}

// ─── Role badge ───────────────────────────────────────────────────────────────

export function RoleBadge({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  return (
    <span
      className={[
        'tag-chip font-semibold bg-amber-100 text-amber-800',
        size === 'sm' ? 'text-xs px-2.5 py-1' : 'text-sm px-3 py-1.5',
      ].join(' ')}
    >
      💼 Business Owner
    </span>
  );
}
