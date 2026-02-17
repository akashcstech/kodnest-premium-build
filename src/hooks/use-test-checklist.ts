import { useEffect, useState } from "react";

const STORAGE_KEY = "jobTrackerTestChecklist";

export interface TestChecklistState {
  [id: string]: boolean;
}

export const TEST_IDS = [
  "preferences-persist",
  "match-score-correct",
  "show-only-matches-toggle",
  "save-job-persists",
  "apply-opens-new-tab",
  "status-persists",
  "status-filter-works",
  "digest-top-10",
  "digest-persists-day",
  "no-console-errors",
] as const;

export type TestId = (typeof TEST_IDS)[number];

export function useTestChecklist() {
  const [checked, setChecked] = useState<TestChecklistState>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as TestChecklistState;
      if (parsed && typeof parsed === "object") {
        setChecked(parsed);
      }
    } catch {
      // ignore malformed storage
    }
  }, []);

  const persist = (next: TestChecklistState) => {
    setChecked(next);
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  };

  const toggle = (id: TestId) => {
    setChecked((current) => {
      const next = { ...current, [id]: !current[id] };
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
      }
      return next;
    });
  };

  const reset = () => {
    const empty: TestChecklistState = {};
    persist(empty);
  };

  const total = TEST_IDS.length;
  const passed = TEST_IDS.reduce((count, id) => (checked[id] ? count + 1 : count), 0);
  const allPassed = passed === total;

  return { checked, toggle, reset, total, passed, allPassed };
}

