import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useProofArtifacts, isValidUrl } from "@/hooks/use-proof-artifacts";
import { useTestChecklist } from "@/hooks/use-test-checklist";
import { useJobPreferences } from "@/hooks/use-job-preferences";

type ProjectStatus = "Not Started" | "In Progress" | "Shipped";

const STEP_LABELS: { label: string }[] = [
  { label: "Route skeleton & navigation" },
  { label: "Preferences & settings" },
  { label: "Dashboard with job cards & filters" },
  { label: "Match score engine" },
  { label: "Saved jobs persistence" },
  { label: "Daily digest" },
  { label: "Status tracking" },
  { label: "Test checklist (all 10 passed)" },
];

const JtProof = () => {
  const { isConfigured } = useJobPreferences();
  const { checked, allPassed } = useTestChecklist();
  const { artifacts, setArtifact, allLinksValid } = useProofArtifacts();

  const [copied, setCopied] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const stepCompleted = useMemo(() => {
    return [
      true,
      isConfigured,
      true,
      isConfigured,
      !!checked["save-job-persists"],
      !!(checked["digest-top-10"] && checked["digest-persists-day"]),
      !!(checked["status-persists"] && checked["status-filter-works"]),
      allPassed,
    ];
  }, [isConfigured, checked, allPassed]);

  const stepsCompleteCount = stepCompleted.filter(Boolean).length;
  const allStepsComplete = stepsCompleteCount === 8;

  const projectStatus: ProjectStatus = useMemo(() => {
    if (allLinksValid && allPassed) return "Shipped";
    if (stepsCompleteCount > 0 || artifacts.lovableLink || artifacts.githubLink || artifacts.deployedUrl) {
      return "In Progress";
    }
    return "Not Started";
  }, [allLinksValid, allPassed, stepsCompleteCount, artifacts.lovableLink, artifacts.githubLink, artifacts.deployedUrl]);

  const handleCopySubmission = async () => {
    const lovable = artifacts.lovableLink.trim() || "(not provided)";
    const github = artifacts.githubLink.trim() || "(not provided)";
    const deployed = artifacts.deployedUrl.trim() || "(not provided)";

    const text = `---
Job Notification Tracker — Final Submission

Lovable Project:
${lovable}

GitHub Repository:
${github}

Live Deployment:
${deployed}

Core Features:

* Intelligent match scoring
* Daily digest simulation
* Status tracking
* Test checklist enforced
---
`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const showInvalid = (value: string, key: string) => {
    if (!touched[key]) return false;
    return value.trim() !== "" && !isValidUrl(value);
  };

  return (
    <section className="flex flex-1 flex-col gap-6 pb-6">
      <header className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          Project 1 — Job Notification Tracker
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 md:text-base">
          Final proof and submission artifacts. Complete all steps and provide links to mark the project as shipped.
        </p>
      </header>

      {/* Project status badge */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-700">Project status:</span>
        <Badge
          variant="outline"
          className={
            projectStatus === "Shipped"
              ? "border-emerald-300 bg-emerald-50 text-emerald-800"
              : projectStatus === "In Progress"
                ? "border-amber-300 bg-amber-50 text-amber-800"
                : "border-slate-200 bg-slate-50 text-slate-700"
          }
        >
          {projectStatus}
        </Badge>
      </div>

      {projectStatus === "Shipped" && (
        <p className="text-sm text-emerald-700">
          Project 1 Shipped Successfully.
        </p>
      )}

      {/* A) Step Completion Summary */}
      <Card className="border-slate-200 bg-white/80 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="font-heading text-lg font-semibold text-slate-900">
            A) Step Completion Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="space-y-2">
            {STEP_LABELS.map((step, i) => (
              <li key={i} className="flex items-center justify-between gap-3 rounded-md px-2 py-1.5 text-sm">
                <span className="text-slate-800">{step.label}</span>
                <Badge
                  variant="outline"
                  className={
                    stepCompleted[i]
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800 text-[11px]"
                      : "border-slate-200 bg-slate-50 text-slate-500 text-[11px]"
                  }
                >
                  {stepCompleted[i] ? "Completed" : "Pending"}
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* B) Artifact Collection Inputs */}
      <Card className="border-slate-200 bg-white/80 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="font-heading text-lg font-semibold text-slate-900">
            B) Artifact Collection Inputs
          </CardTitle>
          <p className="text-xs text-slate-500">
            Provide valid URLs. Values are saved in localStorage and prefilled on reload.
          </p>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="lovable-link">Lovable Project Link</Label>
            <Input
              id="lovable-link"
              type="url"
              placeholder="https://..."
              value={artifacts.lovableLink}
              onChange={(e) => setArtifact("lovableLink", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, lovableLink: true }))}
              className={showInvalid(artifacts.lovableLink, "lovableLink") ? "border-red-400" : ""}
            />
            {showInvalid(artifacts.lovableLink, "lovableLink") && (
              <p className="text-xs text-red-600">Please enter a valid URL (e.g. https://...).</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="github-link">GitHub Repository Link</Label>
            <Input
              id="github-link"
              type="url"
              placeholder="https://github.com/..."
              value={artifacts.githubLink}
              onChange={(e) => setArtifact("githubLink", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, githubLink: true }))}
              className={showInvalid(artifacts.githubLink, "githubLink") ? "border-red-400" : ""}
            />
            {showInvalid(artifacts.githubLink, "githubLink") && (
              <p className="text-xs text-red-600">Please enter a valid URL (e.g. https://...).</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="deployed-url">Deployed URL (Vercel or equivalent)</Label>
            <Input
              id="deployed-url"
              type="url"
              placeholder="https://..."
              value={artifacts.deployedUrl}
              onChange={(e) => setArtifact("deployedUrl", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, deployedUrl: true }))}
              className={showInvalid(artifacts.deployedUrl, "deployedUrl") ? "border-red-400" : ""}
            />
            {showInvalid(artifacts.deployedUrl, "deployedUrl") && (
              <p className="text-xs text-red-600">Please enter a valid URL (e.g. https://...).</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Copy Final Submission */}
      <Card className="border-slate-200 bg-white/80 shadow-sm">
        <CardContent className="pt-4">
          <Button
            type="button"
            className="bg-[#8B0000] text-[#F7F6F3] hover:bg-[#8B0000]/90"
            onClick={handleCopySubmission}
          >
            {copied ? "Copied to clipboard" : "Copy Final Submission"}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default JtProof;
