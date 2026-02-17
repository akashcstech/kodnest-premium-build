import { useEffect, useMemo, useState } from "react";
import { jobs, type Job } from "@/data/jobs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useJobPreferences } from "@/hooks/use-job-preferences";
import { useJobStatus } from "@/hooks/use-job-status";
import { computeMatchScore, normalizePreferences } from "@/lib/match-score";
import { Copy, Mail } from "lucide-react";

type ScoredJob = Job & { matchScore: number };

const getTodayDateKey = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `jobTrackerDigest_${year}-${month}-${day}`;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const generateDigest = (scoredJobs: ScoredJob[]): ScoredJob[] => {
  const sorted = scoredJobs
    .slice()
    .sort((a, b) => {
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore;
      }
      return a.postedDaysAgo - b.postedDaysAgo;
    });
  return sorted.slice(0, 10);
};

const formatDigestText = (digestJobs: ScoredJob[], dateStr: string): string => {
  let text = `Top 10 Jobs For You — 9AM Digest\n${dateStr}\n\n`;
  digestJobs.forEach((job, index) => {
    text += `${index + 1}. ${job.title} at ${job.company}\n`;
    text += `   Location: ${job.location} | Experience: ${job.experience} | Match Score: ${job.matchScore}\n`;
    text += `   Apply: ${job.applyUrl}\n\n`;
  });
  text += "This digest was generated based on your preferences.\n";
  text += "Demo Mode: Daily 9AM trigger simulated manually.";
  return text;
};

const Digest = () => {
  const { preferences, isConfigured } = useJobPreferences();
  const { statusUpdates } = useJobStatus();
  const [digestJobs, setDigestJobs] = useState<ScoredJob[]>([]);
  const [digestDate, setDigestDate] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const normalizedPreferences = useMemo(() => normalizePreferences(preferences), [preferences]);

  const scoredJobs: ScoredJob[] = useMemo(() => {
    return jobs.map((job) => ({
      ...job,
      matchScore: computeMatchScore(job, normalizedPreferences),
    }));
  }, [normalizedPreferences]);

  useEffect(() => {
    const todayKey = getTodayDateKey();
    if (typeof window === "undefined") return;

    try {
      const stored = window.localStorage.getItem(todayKey);
      if (stored) {
        const parsed = JSON.parse(stored) as { jobs: ScoredJob[]; date: string };
        if (Array.isArray(parsed.jobs) && parsed.jobs.length > 0) {
          setDigestJobs(parsed.jobs);
          setDigestDate(parsed.date || formatDate(new Date()));
        }
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const handleGenerate = () => {
    if (!isConfigured) return;

    setIsGenerating(true);
    const todayKey = getTodayDateKey();
    const dateStr = formatDate(new Date());

    try {
      if (typeof window !== "undefined") {
        const existing = window.localStorage.getItem(todayKey);
        if (existing) {
          try {
            const parsed = JSON.parse(existing) as { jobs: ScoredJob[]; date: string };
            if (Array.isArray(parsed.jobs) && parsed.jobs.length > 0) {
              setDigestJobs(parsed.jobs);
              setDigestDate(parsed.date || dateStr);
              setIsGenerating(false);
              return;
            }
          } catch {
            // If parse fails, continue to generate new digest
          }
        }
      }

      const newDigest = generateDigest(scoredJobs);
      if (newDigest.length > 0) {
        setDigestJobs(newDigest);
        setDigestDate(dateStr);

        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            todayKey,
            JSON.stringify({
              jobs: newDigest,
              date: dateStr,
            }),
          );
        }
      }
    } catch (error) {
      console.error("Error generating digest:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (digestJobs.length === 0) return;

    const text = formatDigestText(digestJobs, digestDate || formatDate(new Date()));
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEmailDraft = () => {
    if (digestJobs.length === 0) return;

    const text = formatDigestText(digestJobs, digestDate || formatDate(new Date()));
    const subject = encodeURIComponent("My 9AM Job Digest");
    // Some email clients have URL length limits, so we truncate if needed
    const body = encodeURIComponent(text);
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    
    // Check URL length (some browsers/clients limit to ~2000 chars)
    if (mailtoUrl.length > 2000) {
      // Fallback: just subject, user can paste body manually
      window.location.href = `mailto:?subject=${subject}`;
    } else {
      window.location.href = mailtoUrl;
    }
  };

  const handleApply = (job: Job) => {
    if (typeof window === "undefined") return;
    window.open(job.applyUrl, "_blank", "noreferrer");
  };

  if (!isConfigured) {
    return (
      <section className="flex flex-1 flex-col justify-center">
        <div className="mx-auto max-w-lg space-y-3 rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-8 text-center shadow-sm backdrop-blur-sm md:px-10 md:py-10">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-slate-900">
            Set preferences to generate a personalized digest.
          </h1>
          <p className="text-sm text-slate-600 md:text-base">
            Configure your job preferences on the Settings page to enable intelligent digest generation.
          </p>
        </div>
      </section>
    );
  }

  const hasDigest = digestJobs.length > 0;
  // Check if there are any jobs with meaningful match scores (not just 0)
  const hasMatches = scoredJobs.some((job) => job.matchScore > 0) || scoredJobs.length > 0;

  return (
    <section className="flex flex-1 flex-col gap-6 pb-4">
      <header className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          Daily Digest
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 md:text-base">
          Your personalized 9AM job briefing, generated from top matches based on your preferences.
        </p>
      </header>

      {!hasDigest && (
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur-sm">
          <Button
            type="button"
            className="bg-[#8B0000] text-[#F7F6F3] hover:bg-[#8B0000]/90"
            onClick={handleGenerate}
            disabled={isGenerating || !hasMatches}
          >
            {isGenerating ? "Generating..." : "Generate Today's 9AM Digest (Simulated)"}
          </Button>
          {!hasMatches && (
            <p className="text-sm text-slate-600">
              No matching roles today. Check again tomorrow.
            </p>
          )}
        </div>
      )}

      {hasDigest && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-heading text-lg font-semibold text-slate-900">
                Top 10 Jobs For You — 9AM Digest
              </h2>
              <p className="text-sm text-slate-600">{digestDate}</p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-slate-200 text-slate-700 hover:bg-slate-100"
                onClick={handleCopy}
              >
                <Copy className="mr-2 h-4 w-4" />
                {copied ? "Copied!" : "Copy Digest"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-slate-200 text-slate-700 hover:bg-slate-100"
                onClick={handleEmailDraft}
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Draft
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="divide-y divide-slate-100">
              {digestJobs.map((job, index) => (
                <div key={job.id} className="p-5 transition-colors hover:bg-slate-50/50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="font-heading text-base font-semibold text-slate-900">
                          {index + 1}. {job.title}
                        </span>
                        <Badge
                          className={
                            job.matchScore >= 80
                              ? "border-emerald-200 bg-emerald-50 text-[11px] font-semibold text-emerald-800"
                              : job.matchScore >= 60
                                ? "border-amber-200 bg-amber-50 text-[11px] font-semibold text-amber-800"
                                : job.matchScore >= 40
                                  ? "border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-800"
                                  : "border-slate-100 bg-slate-50 text-[11px] font-medium text-slate-500"
                          }
                        >
                          Match: {job.matchScore}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-slate-700">{job.company}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                        <span>{job.location}</span>
                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                        <span>{job.experience}</span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      className="bg-[#8B0000] text-[#F7F6F3] hover:bg-[#8B0000]/90"
                      onClick={() => handleApply(job)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-4">
              <p className="text-xs text-slate-600">
                This digest was generated based on your preferences.
              </p>
              <p className="mt-1 text-xs text-slate-500 italic">
                Demo Mode: Daily 9AM trigger simulated manually.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              type="button"
              variant="ghost"
              className="text-sm text-slate-600 hover:bg-slate-100"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? "Regenerating..." : "Regenerate Digest"}
            </Button>
          </div>
        </div>
      )}

      {statusUpdates.length > 0 && (
        <div className="space-y-4">
          <div>
            <h2 className="font-heading text-lg font-semibold tracking-tight text-slate-900">
              Recent Status Updates
            </h2>
            <p className="text-sm text-slate-600">Track your application progress</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="divide-y divide-slate-100">
              {statusUpdates.slice(0, 10).map((update) => {
                const date = new Date(update.dateChanged);
                const formattedDate = date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
                });

                let statusColor = "border-slate-200 bg-slate-50 text-slate-800";
                if (update.status === "Applied") {
                  statusColor = "border-blue-200 bg-blue-50 text-blue-800";
                } else if (update.status === "Rejected") {
                  statusColor = "border-red-200 bg-red-50 text-red-800";
                } else if (update.status === "Selected") {
                  statusColor = "border-green-200 bg-green-50 text-green-800";
                }

                return (
                  <div key={`${update.jobId}-${update.dateChanged}`} className="p-4 transition-colors hover:bg-slate-50/50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-heading text-sm font-semibold text-slate-900">{update.title}</p>
                        <p className="text-xs text-slate-600">{update.company}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge className={`text-[11px] font-medium ${statusColor}`}>{update.status}</Badge>
                        <span className="text-xs text-slate-500">{formattedDate}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Digest;

