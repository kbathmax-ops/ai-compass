'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { AppContextType, AppState, LessonProgress, Role } from '@/types';

// ─── Default state ─────────────────────────────────────────────────────────────

const DEFAULT_STATE: AppState = {
  role: null,
  selectedGoals: [],
  progress: {
    completedLessons: [],
    lessonDetails: {},
    streak: 0,
    lastActiveDate: null,
  },
  onboardingComplete: false,
};

const STORAGE_KEY = 'ai-compass-v1';

// ─── Context ──────────────────────────────────────────────────────────────────

const AppContext = createContext<AppContextType | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<AppState>;
        setState(prev => ({ ...prev, ...parsed }));
      }
    } catch {
      // Corrupted storage — start fresh
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage on every state change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage quota exceeded — fail silently
    }
  }, [state, hydrated]);

  const setRole = useCallback((role: Role) => {
    setState(prev => ({ ...prev, role }));
  }, []);

  const setGoals = useCallback((goals: string[]) => {
    setState(prev => ({ ...prev, selectedGoals: goals }));
  }, []);

  const finishOnboarding = useCallback(() => {
    setState(prev => ({ ...prev, onboardingComplete: true }));
  }, []);

  const completeLesson = useCallback(
    (lessonId: string, details: Omit<LessonProgress, 'lessonId' | 'completedAt'>) => {
      setState(prev => {
        if (prev.progress.completedLessons.includes(lessonId)) return prev;

        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86_400_000).toISOString().split('T')[0];
        const wasActiveYesterday = prev.progress.lastActiveDate === yesterday;
        const newStreak =
          wasActiveYesterday || prev.progress.lastActiveDate === today
            ? prev.progress.streak + (prev.progress.lastActiveDate === today ? 0 : 1)
            : 1;

        return {
          ...prev,
          progress: {
            completedLessons: [...prev.progress.completedLessons, lessonId],
            lessonDetails: {
              ...prev.progress.lessonDetails,
              [lessonId]: { ...details, lessonId, completedAt: new Date().toISOString() },
            },
            streak: newStreak,
            lastActiveDate: today,
          },
        };
      });
    },
    [],
  );

  const resetAll = useCallback(() => {
    setState(DEFAULT_STATE);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Prevent hydration mismatch — render nothing until client-side state is loaded
  if (!hydrated) return null;

  return (
    <AppContext.Provider
      value={{ state, setRole, setGoals, completeLesson, finishOnboarding, resetAll }}
    >
      {children}
    </AppContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
