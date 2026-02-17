import { Badge } from "@/components/ui/badge";

interface TopBarProps {
  projectName: string;
  currentStep: number;
  totalSteps: number;
  status: "not-started" | "in-progress" | "shipped";
}

const statusLabels: Record<TopBarProps["status"], string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  "shipped": "Shipped",
};

const statusVariants: Record<TopBarProps["status"], "muted" | "warning" | "success"> = {
  "not-started": "muted",
  "in-progress": "warning",
  "shipped": "success",
};

const TopBar = ({ projectName, currentStep, totalSteps, status }: TopBarProps) => {
  return (
    <header className="flex items-center justify-between border-b px-3 py-2">
      <span className="font-heading text-lg font-semibold text-foreground">{projectName}</span>
      <span className="text-sm text-muted-foreground">
        Step {currentStep} / {totalSteps}
      </span>
      <Badge variant={statusVariants[status]}>{statusLabels[status]}</Badge>
    </header>
  );
};

export default TopBar;
