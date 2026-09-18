import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { modules } from "./study-data";

export type QuizResult = {
  moduleId: string;
  score: number;
  total: number;
  wrongTopics: string[];
  wrongQuestionIds: string[];
  at: number;
};

export type Profile = {
  name: string;
  goal: string;
  dailyMinutes: number;
  activeSubjects: string[];
};

type ProgressState = {
  completed: string[];
  results: QuizResult[];
  lastModuleId: string | null;
  profile: Profile;
};

const STORAGE_KEY = "studyflow-state-v1";

const defaultState: ProgressState = {
  completed: [],
  results: [],
  lastModuleId: "cell-division",
  profile: {
    name: "Maya Chen",
    goal: "Pass end-of-term exams with 80%+",
    dailyMinutes: 30,
    activeSubjects: ["biology", "chemistry", "physics"],
  },
};

type Ctx = ProgressState & {
  markComplete: (moduleId: string) => void;
  setLastModule: (moduleId: string) => void;
  recordResult: (result: QuizResult) => void;
  updateProfile: (patch: Partial<Profile>) => void;
  resetProgress: () => void;
  moduleScore: (moduleId: string) => QuizResult | undefined;
  subjectProgress: (subjectId: string) => { done: number; total: number; percent: number };
  weakTopics: { topic: string; misses: number }[];
  averageScore: number | null;
};

const ProgressContext = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(defaultState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...defaultState, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const markComplete = useCallback((moduleId: string) => {
    setState((s) =>
      s.completed.includes(moduleId) ? s : { ...s, completed: [...s.completed, moduleId] },
    );
  }, []);

  const setLastModule = useCallback((moduleId: string) => {
    setState((s) => ({ ...s, lastModuleId: moduleId }));
  }, []);

  const recordResult = useCallback((result: QuizResult) => {
    setState((s) => ({
      ...s,
      results: [result, ...s.results.filter((r) => r.moduleId !== result.moduleId)].slice(0, 20),
      completed: s.completed.includes(result.moduleId) ? s.completed : [...s.completed, result.moduleId],
    }));
  }, []);

  const updateProfile = useCallback((patch: Partial<Profile>) => {
    setState((s) => ({ ...s, profile: { ...s.profile, ...patch } }));
  }, []);

  const resetProgress = useCallback(() => {
    setState((s) => ({ ...defaultState, profile: s.profile }));
  }, []);

  const value = useMemo<Ctx>(() => {
    const moduleScore = (moduleId: string) => state.results.find((r) => r.moduleId === moduleId);

    const subjectProgress = (subjectId: string) => {
      const list = modules.filter((m) => m.subjectId === subjectId);
      const done = list.filter((m) => state.completed.includes(m.id)).length;
      return { done, total: list.length, percent: list.length ? Math.round((done / list.length) * 100) : 0 };
    };

    const counts = new Map<string, number>();
    for (const r of state.results) {
      for (const t of r.wrongTopics) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    const weakTopics = [...counts.entries()]
      .map(([topic, misses]) => ({ topic, misses }))
      .sort((a, b) => b.misses - a.misses);

    const averageScore = state.results.length
      ? Math.round(
          (state.results.reduce((acc, r) => acc + r.score / r.total, 0) / state.results.length) * 100,
        )
      : null;

    return {
      ...state,
      markComplete,
      setLastModule,
      recordResult,
      updateProfile,
      resetProgress,
      moduleScore,
      subjectProgress,
      weakTopics,
      averageScore,
    };
  }, [state, markComplete, setLastModule, recordResult, updateProfile, resetProgress]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider");
  return ctx;
}
