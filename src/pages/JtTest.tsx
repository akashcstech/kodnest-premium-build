import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTestChecklist, TEST_IDS, type TestId } from "@/hooks/use-test-checklist";

const TEST_ITEMS: { id: TestId; label: string; howTo: string }[] = [
  {
    id: "preferences-persist",
    label: "Preferences persist after refresh",
    howTo: "Set your preferences on the Settings page, refresh, and confirm all fields are pre-filled.",
  },
  {
    id: "match-score-correct",
    label: "Match score calculates correctly",
    howTo:
      "Pick a job and manually verify the match score using the documented rules for keywords, location, mode, skills, and recency.",
  },
  {
    id: "show-only-matches-toggle",
    label: "\"Show only matches\" toggle works",
    howTo:
      "Toggle it on and off on the Dashboard and confirm jobs below the threshold hide and reappear correctly with filters applied.",
  },
  {
    id: "save-job-persists",
    label: "Save job persists after refresh",
    howTo: "Save a job on the Dashboard, refresh, and confirm it still appears under Saved roles.",
  },
  {
    id: "apply-opens-new-tab",
    label: "Apply opens in new tab",
    howTo: "Click Apply on a job and confirm the application URL opens in a new browser tab or window.",
  },
  {
    id: "status-persists",
    label: "Status update persists after refresh",
    howTo: "Change a job status to Applied/Rejected/Selected, refresh, and confirm the status remains.",
  },
  {
    id: "status-filter-works",
    label: "Status filter works correctly",
    howTo:
      "Use the status filter on the Dashboard to show only jobs in a specific state and confirm other statuses are hidden.",
  },
  {
    id: "digest-top-10",
    label: "Digest generates top 10 by score",
    howTo:
      "Generate the 9AM Digest and confirm it contains at most 10 jobs sorted by match score, then by posted date (newer first).",
  },
  {
    id: "digest-persists-day",
    label: "Digest persists for the day",
    howTo:
      "Generate the digest, refresh, and confirm the same 10 jobs load from storage without regeneration for the same day.",
  },
  {
    id: "no-console-errors",
    label: "No console errors on main pages",
    howTo:
      "Open DevTools, navigate through Dashboard, Saved, Digest, and Settings, and confirm there are no red error logs.",
  },
];

const JtTest = () => {
  const { checked, toggle, reset, total, passed, allPassed } = useTestChecklist();

  return (
    <section className="flex flex-1 flex-col gap-6 pb-6">
      <header className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          Test Checklist
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 md:text-base">
          A built-in checklist to verify the Job Notification Tracker before you ship it.
        </p>
      </header>

      <Card className="border-slate-200 bg-white/80 shadow-sm">
        <CardHeader className="flex flex-col gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="font-heading text-lg font-semibold text-slate-900">
              Tests Passed: {passed} / {total}
            </CardTitle>
            {!allPassed && (
              <p className="text-xs text-amber-700">
                Resolve all issues before shipping.
              </p>
            )}
            {allPassed && (
              <p className="text-xs text-emerald-700">
                All tests are checked. You&apos;re ready to ship.
              </p>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            className="text-xs text-slate-700 hover:bg-slate-100"
            onClick={reset}
          >
            Reset Test Status
          </Button>
        </CardHeader>
        <CardContent className="space-y-3 pt-4">
          {TEST_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-md border border-transparent px-1 py-2 hover:border-slate-200 hover:bg-slate-50/70"
            >
              <Checkbox
                checked={!!checked[item.id]}
                onCheckedChange={() => toggle(item.id)}
                className="mt-0.5"
              />
              <div className="flex flex-1 items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {index + 1}. {item.label}
                  </p>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="text-xs text-slate-500 underline-offset-2 hover:underline"
                    >
                      How to test
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-xs leading-relaxed">
                    {item.howTo}
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
};

export default JtTest;

