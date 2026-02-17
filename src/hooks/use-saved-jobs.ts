import { useEffect, useState } from "react";

const STORAGE_KEY = "job-notification-tracker:saved-jobs";

export function useSavedJobs() {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSavedIds(parsed);
        }
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  const persist = (next: string[]) => {
    setSavedIds(next);
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore persistence failures
    }
  };

  const toggleSaved = (id: string) => {
    setSavedIds((current) => {
      const exists = current.includes(id);
      const next = exists ? current.filter((value) => value !== id) : [...current, id];
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

  const isSaved = (id: string) => savedIds.includes(id);

  return { savedIds, toggleSaved, isSaved };
}

