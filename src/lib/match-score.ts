import type { Job } from "@/data/jobs";
import type { JobPreferences } from "@/hooks/use-job-preferences";

interface NormalizedPreferences {
  roleKeywords: string[];
  preferredLocations: Set<string>;
  preferredModes: Set<string>;
  experienceLevel: string | null;
  skills: string[];
  minMatchScore: number;
}

export function normalizePreferences(preferences: JobPreferences): NormalizedPreferences {
  const roleKeywords = preferences.roleKeywords.map((value) => value.toLowerCase()).filter(Boolean);
  const locations = new Set(preferences.preferredLocations);
  const modes = new Set(preferences.preferredModes);
  const skills = preferences.skills.map((value) => value.toLowerCase()).filter(Boolean);

  return {
    roleKeywords,
    preferredLocations: locations,
    preferredModes: modes,
    experienceLevel: preferences.experienceLevel,
    skills,
    minMatchScore: preferences.minMatchScore,
  };
}

export function computeMatchScore(job: Job, prefs: NormalizedPreferences): number {
  let score = 0;
  const titleLower = job.title.toLowerCase();
  const descriptionLower = job.description.toLowerCase();
  const skillsLower = job.skills.map((skill) => skill.toLowerCase());

  if (prefs.roleKeywords.length > 0) {
    const matchInTitle = prefs.roleKeywords.some((keyword) => titleLower.includes(keyword));
    if (matchInTitle) {
      score += 25;
    }

    const matchInDescription = prefs.roleKeywords.some((keyword) => descriptionLower.includes(keyword));
    if (matchInDescription) {
      score += 15;
    }
  }

  if (prefs.preferredLocations.size > 0 && prefs.preferredLocations.has(job.location)) {
    score += 15;
  }

  if (prefs.preferredModes.size > 0 && prefs.preferredModes.has(job.mode)) {
    score += 10;
  }

  if (prefs.experienceLevel && job.experience === prefs.experienceLevel) {
    score += 10;
  }

  if (prefs.skills.length > 0) {
    const hasOverlap = skillsLower.some((skill) => prefs.skills.includes(skill));
    if (hasOverlap) {
      score += 15;
    }
  }

  if (job.postedDaysAgo <= 2) {
    score += 5;
  }

  if (job.source.toLowerCase() === "linkedin") {
    score += 5;
  }

  return Math.min(100, score);
}

export function extractSalaryValue(range: string): number | null {
  const raw = range.trim();
  if (!raw) return null;

  const isLpa = /lpa/i.test(raw);
  const isMonthly = /\/\s*month|monthly/i.test(raw);

  const normalizeToken = (token: string): number | null => {
    const cleaned = token
      .replace(/₹|rs\.?/gi, "")
      .replace(/per\s*annum|pa\b|annum/gi, "")
      .replace(/\/\s*month|monthly/gi, "")
      .replace(/internship/gi, "")
      .replace(/,/g, "")
      .trim()
      .toLowerCase();

    const match = cleaned.match(/(\d+(\.\d+)?)(\s*(k|l|lac|lakh|cr|crore))?/i);
    if (!match) return null;

    const value = Number(match[1]);
    if (Number.isNaN(value)) return null;

    const suffix = (match[4] ?? "").toLowerCase();
    if (suffix === "k") return value * 1000;
    if (suffix === "l" || suffix === "lac" || suffix === "lakh") return value * 100000;
    if (suffix === "cr" || suffix === "crore") return value * 10000000;
    return value;
  };

  // Split range like "₹40k–₹60k/month" or "3–5 LPA"
  const parts = raw
    .split(/–|-|to/i)
    .map((part) => part.trim())
    .filter(Boolean);

  const values = parts.map(normalizeToken).filter((v): v is number => typeof v === "number");
  if (values.length === 0) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  let avg = (min + max) / 2;

  // Convert LPA to INR/year
  if (isLpa) {
    avg = avg * 100000;
  }

  // Convert monthly to annual INR/year for comparable sorting
  if (isMonthly) {
    avg = avg * 12;
  }

  return avg;
}

