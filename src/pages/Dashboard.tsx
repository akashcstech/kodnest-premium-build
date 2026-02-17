import { useMemo, useState } from "react";
import { jobs, type Job, type JobMode } from "@/data/jobs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import { useJobPreferences } from "@/hooks/use-job-preferences";
import { useJobStatus, type JobStatus } from "@/hooks/use-job-status";
import { useToast } from "@/hooks/use-toast";
import { computeMatchScore, extractSalaryValue, normalizePreferences } from "@/lib/match-score";

type SortOption = "latest" | "oldest" | "match" | "salary";

type ScoredJob = Job & { matchScore: number };

const Dashboard = () => {
  const { savedIds, toggleSaved, isSaved } = useSavedJobs();
  const { preferences, hasSavedPreferences, isConfigured } = useJobPreferences();
  const { getStatus, setStatus } = useJobStatus();
  const { toast } = useToast();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState<string>("all");
  const [mode, setMode] = useState<JobMode | "all">("all");
  const [experience, setExperience] = useState<string>("all");
  const [source, setSource] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<JobStatus | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [showOnlyMatches, setShowOnlyMatches] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const locations = useMemo(
    () => Array.from(new Set(jobs.map((job) => job.location))).sort(),
    [],
  );
  const experiences = useMemo(
    () => Array.from(new Set(jobs.map((job) => job.experience))).sort(),
    [],
  );
  const sources = useMemo(
    () => Array.from(new Set(jobs.map((job) => job.source))).sort(),
    [],
  );

  const normalizedPreferences = useMemo(() => normalizePreferences(preferences), [preferences]);

  const scoredJobs: ScoredJob[] = useMemo(() => {
    return jobs.map((job) => ({
      ...job,
      matchScore: computeMatchScore(job, normalizedPreferences),
    }));
  }, [normalizedPreferences]);

  const filteredJobs: ScoredJob[] = useMemo(() => {
    const keywordLower = keyword.trim().toLowerCase();

    let result = scoredJobs.filter((job) => {
      if (
        keywordLower &&
        !(
          job.title.toLowerCase().includes(keywordLower) ||
          job.company.toLowerCase().includes(keywordLower)
        )
      ) {
        return false;
      }

      if (location !== "all" && job.location !== location) return false;
      if (mode !== "all" && job.mode !== mode) return false;
      if (experience !== "all" && job.experience !== experience) return false;
      if (source !== "all" && job.source !== source) return false;

      if (statusFilter !== "all") {
        const jobStatus = getStatus(job.id);
        if (jobStatus !== statusFilter) return false;
      }

      if (showOnlyMatches && job.matchScore < normalizedPreferences.minMatchScore) {
        return false;
      }

      return true;
    });

    result = result.slice().sort((a, b) => {
      if (sortBy === "latest") {
        return a.postedDaysAgo - b.postedDaysAgo;
      }

      if (sortBy === "match") {
        if (b.matchScore !== a.matchScore) {
          return b.matchScore - a.matchScore;
        }
        return a.postedDaysAgo - b.postedDaysAgo;
      }

      if (sortBy === "salary") {
        const aSalary = extractSalaryValue(a.salaryRange);
        const bSalary = extractSalaryValue(b.salaryRange);
        if (aSalary == null && bSalary == null) return 0;
        if (aSalary == null) return 1;
        if (bSalary == null) return -1;
        return bSalary - aSalary;
      }

      // oldest first
      return b.postedDaysAgo - a.postedDaysAgo;
    });

    return result;
  }, [keyword, location, mode, experience, source, statusFilter, sortBy, showOnlyMatches, scoredJobs, normalizedPreferences.minMatchScore, getStatus]);

  const openDetails = (job: Job) => {
    setSelectedJob(job);
    setDetailsOpen(true);
  };

  const handleApply = (job: Job) => {
    if (typeof window === "undefined") return;
    window.open(job.applyUrl, "_blank", "noreferrer");
  };

  const hasJobs = filteredJobs.length > 0;

  return (
    <section className="flex flex-1 flex-col gap-6 pb-4">
      <header className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          Today&apos;s opportunities
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 md:text-base">
          A realistic stream of Indian tech roles you can use to test the Job Notification Tracker experience.
        </p>
      </header>

      {(!hasSavedPreferences || !isConfigured) && (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white/70 px-4 py-3 text-sm text-slate-700 shadow-sm">
          Set your preferences to activate intelligent matching.
        </div>
      )}

      <div className="space-y-3 rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm md:p-5">
        <div className="grid gap-3 md:grid-cols-[minmax(0,2fr),repeat(3,minmax(0,1fr))] md:items-center">
          <Input
            placeholder="Search by title or company"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />

          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All locations</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={mode} onValueChange={(value) => setMode(value as JobMode | "all")}>
            <SelectTrigger>
              <SelectValue placeholder="Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any mode</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="Onsite">Onsite</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest first</SelectItem>
              <SelectItem value="match">Match score</SelectItem>
              <SelectItem value="salary">Salary (approx)</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <Select value={experience} onValueChange={setExperience}>
            <SelectTrigger>
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any experience</SelectItem>
              {experiences.map((exp) => (
                <SelectItem key={exp} value={exp}>
                  {exp}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={source} onValueChange={setSource}>
            <SelectTrigger>
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sources</SelectItem>
              {sources.map((src) => (
                <SelectItem key={src} value={src}>
                  {src}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as JobStatus | "all")}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Not Applied">Not Applied</SelectItem>
              <SelectItem value="Applied">Applied</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="Selected">Selected</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center justify-between gap-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <Switch checked={showOnlyMatches} onCheckedChange={setShowOnlyMatches} />
              <span className="text-xs text-slate-700">Show only jobs above my threshold</span>
            </div>
            <Button
              variant="ghost"
              className="w-auto justify-center text-xs text-slate-600 hover:bg-slate-100"
              type="button"
              onClick={() => {
                setKeyword("");
                setLocation("all");
                setMode("all");
                setExperience("all");
                setSource("all");
                setStatusFilter("all");
                setSortBy("latest");
                setShowOnlyMatches(false);
              }}
            >
              Clear filters
            </Button>
          </div>
        </div>
      </div>

      {!hasJobs ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-10 text-center shadow-sm backdrop-blur-sm md:px-10 md:py-14">
            <h2 className="font-heading text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
              No roles match your criteria.
            </h2>
            <p className="mt-3 text-sm text-slate-600 md:text-base">
              Adjust filters or lower your threshold to see more opportunities.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 pb-4 md:grid-cols-2">
          {filteredJobs.map((job) => {
            const saved = isSaved(job.id);
            const jobStatus = getStatus(job.id);
            const postedLabel =
              job.postedDaysAgo === 0 ? "Today" : `${job.postedDaysAgo} day${job.postedDaysAgo === 1 ? "" : "s"} ago`;

            const score = job.matchScore;
            let scoreColor =
              "border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-700";
            if (score >= 80) {
              scoreColor =
                "border-emerald-200 bg-emerald-50 text-[11px] font-semibold text-emerald-800";
            } else if (score >= 60) {
              scoreColor =
                "border-amber-200 bg-amber-50 text-[11px] font-semibold text-amber-800";
            } else if (score >= 40) {
              scoreColor =
                "border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-800";
            } else {
              scoreColor =
                "border-slate-100 bg-slate-50 text-[11px] font-medium text-slate-500";
            }

            let statusColor = "border-slate-200 bg-slate-50 text-[11px] font-medium text-slate-700";
            if (jobStatus === "Applied") {
              statusColor = "border-blue-200 bg-blue-50 text-[11px] font-medium text-blue-800";
            } else if (jobStatus === "Rejected") {
              statusColor = "border-red-200 bg-red-50 text-[11px] font-medium text-red-800";
            } else if (jobStatus === "Selected") {
              statusColor = "border-green-200 bg-green-50 text-[11px] font-medium text-green-800";
            }

            return (
              <Card
                key={job.id}
                className="flex flex-col justify-between border-slate-200 bg-white/80 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <CardHeader className="space-y-1.5 pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="font-heading text-lg font-semibold tracking-tight text-slate-900">
                        {job.title}
                      </CardTitle>
                      <p className="text-sm font-medium text-slate-700">{job.company}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="muted" className="text-[11px]">
                        {job.source}
                      </Badge>
                      <Badge className={scoreColor}>
                        Match score&nbsp;
                        <span>{score}</span>
                      </Badge>
                      {jobStatus !== "Not Applied" && (
                        <Badge className={statusColor}>{jobStatus}</Badge>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                    <span>
                      {job.location} · {job.mode}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span>{job.experience}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span>{job.salaryRange}</span>
                    <span className="ml-auto text-[11px] font-medium text-slate-500">{postedLabel}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 pt-0">
                  <div className="flex flex-wrap gap-1.5">
                    {job.skills.slice(0, 5).map((skill) => (
                      <Badge
                        key={skill}
                        variant="muted"
                        className="border border-slate-200 bg-slate-50 text-[11px] font-medium text-slate-700"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 border-[#8B0000]/40 text-[#8B0000] hover:bg-[#8B0000]/5"
                        onClick={() => openDetails(job)}
                      >
                        View
                      </Button>
                      <Button
                        type="button"
                        variant={saved ? "secondary" : "ghost"}
                        className="flex-1 border border-slate-200 text-xs text-slate-800 hover:bg-slate-100"
                        onClick={() => toggleSaved(job.id)}
                      >
                        {saved ? "Saved" : "Save"}
                      </Button>
                      <Button
                        type="button"
                        className="flex-1 bg-[#8B0000] text-[#F7F6F3] hover:bg-[#8B0000]/90"
                        onClick={() => handleApply(job)}
                      >
                        Apply
                      </Button>
                    </div>
                    <Select
                      value={getStatus(job.id)}
                      onValueChange={(value) => {
                        const newStatus = value as JobStatus;
                        setStatus(job.id, newStatus, job.title, job.company);
                        if (newStatus !== "Not Applied") {
                          toast({
                            title: "Status updated",
                            description: `${newStatus}`,
                          });
                        }
                      }}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Not Applied">
                          <span className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-slate-400" />
                            Not Applied
                          </span>
                        </SelectItem>
                        <SelectItem value="Applied">
                          <span className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                            Applied
                          </span>
                        </SelectItem>
                        <SelectItem value="Rejected">
                          <span className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-red-500" />
                            Rejected
                          </span>
                        </SelectItem>
                        <SelectItem value="Selected">
                          <span className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-green-500" />
                            Selected
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-lg">
          {selectedJob && (
            <>
              <DialogHeader className="space-y-2">
                <DialogTitle className="font-heading text-xl text-slate-900">{selectedJob.title}</DialogTitle>
                <DialogDescription className="text-sm text-slate-600">
                  {selectedJob.company} · {selectedJob.location} · {selectedJob.mode} · {selectedJob.experience}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm text-slate-700">
                {selectedJob.description.split("\n").map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <div className="pt-2">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Key skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedJob.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="muted"
                        className="border border-slate-200 bg-slate-50 text-[11px] font-medium text-slate-800"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="border-slate-200 text-slate-800 hover:bg-slate-100"
                  onClick={() => setDetailsOpen(false)}
                >
                  Close
                </Button>
                <Button
                  type="button"
                  className="bg-[#8B0000] text-[#F7F6F3] hover:bg-[#8B0000]/90"
                  onClick={() => selectedJob && handleApply(selectedJob)}
                >
                  Apply
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Dashboard;

