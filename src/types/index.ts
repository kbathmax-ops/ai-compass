// ─── Core domain types ────────────────────────────────────────────────────────

export type Role = 'smb' | null;

export type SkillTag =
  | 'prompting'
  | 'verification'
  | 'automation'
  | 'copywriting'
  | 'research'
  | 'strategy'
  | 'critical-thinking'
  | 'tools';

export interface Goal {
  id: string;
  label: string;
  icon: string;
  description: string;
}

// ─── Lesson types ─────────────────────────────────────────────────────────────

export type StepType = 'text' | 'task' | 'reflection' | 'example';

export interface LessonStep {
  id: string;
  title: string;
  content: string;
  type: StepType;
  placeholder?: string; // for task/reflection steps
}

export interface Lesson {
  id: string;
  day: number;
  title: string;
  subtitle: string;
  description: string;
  estimatedMinutes: number;
  skillTags: SkillTag[];
  goalIds: string[]; // which goals this lesson serves
  steps: LessonStep[];
  criticalThinkingPrompts: string[];
  microtask: string; // quick action at bottom
  nextLessonTeaser?: string;
}

// ─── User / Progress types ─────────────────────────────────────────────────────

export interface LessonProgress {
  lessonId: string;
  completedAt: string; // ISO date string
  reflections: Record<string, string>; // stepId → user text
  criticalThinkingAnswers: string[];
}

export interface UserProgress {
  completedLessons: string[];
  lessonDetails: Record<string, LessonProgress>;
  streak: number;
  lastActiveDate: string | null;
}

// ─── App state ────────────────────────────────────────────────────────────────

export interface AppState {
  role: Role;
  selectedGoals: string[];
  progress: UserProgress;
  onboardingComplete: boolean;
}

// ─── Context types ────────────────────────────────────────────────────────────

export interface AppContextType {
  state: AppState;
  setRole: (role: Role) => void;
  setGoals: (goals: string[]) => void;
  completeLesson: (lessonId: string, details: Omit<LessonProgress, 'lessonId' | 'completedAt'>) => void;
  finishOnboarding: () => void;
  resetAll: () => void;
}
