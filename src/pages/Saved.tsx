import { jobs } from "@/data/jobs";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import { useJobStatus, type JobStatus } from "@/hooks/use-job-status";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Saved = () => {
  const { savedIds, toggleSaved } = useSavedJobs();
  const { getStatus, setStatus } = useJobStatus();
  const { toast } = useToast();
  const savedJobs = jobs.filter((job) => savedIds.includes(job.id));

  const hasSaved = savedJobs.length > 0;

  if (!hasSaved) {
    return (
      <section className="flex flex-1 flex-col justify-center">
        <div className="mx-auto max-w-lg space-y-3 rounded-2xl border border-slate-200 bg-white/70 px-6 py-8 text-center shadow-sm backdrop-blur-sm md:px-10 md:py-10">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-slate-900">
            Saved jobs will appear here.
          </h1>
          <p className="text-sm text-slate-600 md:text-base">
            Use the Save button on the dashboard to build a focused shortlist of roles worth a deeper look.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-1 flex-col gap-5 pb-4">
      <header className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          Saved roles
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 md:text-base">
          A calm view of the opportunities you&apos;ve chosen to keep on your radar.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {savedJobs.map((job) => {
          const jobStatus = getStatus(job.id);
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
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-xs text-slate-700 hover:bg-slate-100"
                    onClick={() => toggleSaved(job.id)}
                  >
                    Remove
                  </Button>
                  <Button
                    type="button"
                    className="bg-[#8B0000] text-[#F7F6F3] hover:bg-[#8B0000]/90"
                    onClick={() => {
                      if (typeof window === "undefined") return;
                      window.open(job.applyUrl, "_blank", "noreferrer");
                    }}
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
    </section>
  );
};

export default Saved;

