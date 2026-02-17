import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTestChecklist } from "@/hooks/use-test-checklist";

const JtShip = () => {
  const { passed, total, allPassed } = useTestChecklist();

  return (
    <section className="flex flex-1 flex-col gap-6 pb-6">
      <header className="space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          Ship Checklist
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 md:text-base">
          A final gate to ensure your Job Notification Tracker is ready for review or production.
        </p>
      </header>

      <Card className="border-slate-200 bg-white/80 shadow-sm">
        <CardHeader className="space-y-1 border-b border-slate-100 pb-4">
          <CardTitle className="font-heading text-lg font-semibold text-slate-900">
            Tests Passed: {passed} / {total}
          </CardTitle>
          {!allPassed && (
            <p className="text-sm text-amber-700">
              Complete all tests before shipping.
            </p>
          )}
          {allPassed && (
            <p className="text-sm text-emerald-700">
              All tests are checked. You can confidently ship this experience.
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          {!allPassed ? (
            <div className="space-y-3">
              <p className="text-sm text-slate-700">
                This route is locked until every item in the Test Checklist is marked as passed.
              </p>
              <p className="rounded-md border border-dashed border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                Ship Lock is active. Visit the Test Checklist and resolve all outstanding items before proceeding.
              </p>
              <Button
                type="button"
                variant="outline"
                className="text-xs text-slate-800 hover:bg-slate-100"
                onClick={() => {
                  if (typeof window === "undefined") return;
                  window.location.href = "/jt/07-test";
                }}
              >
                Go to Test Checklist
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-slate-700">
                All tests have passed. This build of the Job Notification Tracker is ready to be demonstrated or shipped.
              </p>
              <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
                Use this screen during handoff or demos to show that the experience has been fully verified.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default JtShip;

