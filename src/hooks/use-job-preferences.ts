import { useEffect, useState } from "react";
import type { JobMode } from "@/data/jobs";

export interface JobPreferences {
  roleKeywords: string[];
  preferredLocations: string[];
  preferredModes: JobMode[];
  experienceLevel: string | null;
  skills: string[];
  minMatchScore: number;
}

const STORAGE_KEY = "jobTrackerPreferences";

const defaultPreferences: JobPreferences = {
  roleKeywords: [],
  preferredLocations: [],
  preferredModes: [],
  experienceLevel: null,
  skills: [],
  minMatchScore: 40,
};

export function useJobPreferences() {
  const [preferences, setPreferences] = useState<JobPreferences>(defaultPreferences);
  const [hasSavedPreferences, setHasSavedPreferences] = useState(false);

  const isConfigured =
    preferences.roleKeywords.length > 0 ||
    preferences.preferredLocations.length > 0 ||
    preferences.preferredModes.length > 0 ||
    !!preferences.experienceLevel ||
    preferences.skills.length > 0;

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<JobPreferences>;
      setPreferences({
        ...defaultPreferences,
        ...parsed,
        // Ensure arrays are always arrays
        roleKeywords: Array.isArray(parsed.roleKeywords) ? parsed.roleKeywords : [],
        preferredLocations: Array.isArray(parsed.preferredLocations) ? parsed.preferredLocations : [],
        preferredModes: Array.isArray(parsed.preferredModes) ? (parsed.preferredModes as JobMode[]) : [],
        skills: Array.isArray(parsed.skills) ? parsed.skills : [],
        // Clamp minMatchScore
        minMatchScore:
          typeof parsed.minMatchScore === "number"
            ? Math.min(100, Math.max(0, parsed.minMatchScore))
            : defaultPreferences.minMatchScore,
      });
      setHasSavedPreferences(true);
    } catch {
      // ignore malformed localStorage
    }
  }, []);

  const savePreferences = (next: JobPreferences) => {
    setPreferences(next);
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setHasSavedPreferences(true);
    } catch {
      // ignore write failures
    }
  };

  return { preferences, savePreferences, hasSavedPreferences, isConfigured };
}

