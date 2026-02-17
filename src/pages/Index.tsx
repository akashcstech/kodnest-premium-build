import TopBar from "@/components/layout/TopBar";
import ContextHeader from "@/components/layout/ContextHeader";
import PrimaryWorkspace from "@/components/layout/PrimaryWorkspace";
import SecondaryPanel from "@/components/layout/SecondaryPanel";
import ProofFooter from "@/components/layout/ProofFooter";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar
        projectName="KodNest Premium Build System"
        currentStep={1}
        totalSteps={6}
        status="in-progress"
      />

      <ContextHeader
        headline="Design System Foundation"
        subtext="Review the core tokens, components, and layout structure that govern every screen in this product."
      />

      <main className="flex flex-1 gap-3 px-3 py-3">
        <div className="flex-[7] min-w-0">
          <PrimaryWorkspace />
        </div>
        <div className="flex-[3] min-w-0">
          <SecondaryPanel
            stepTitle="Getting Started"
            stepDescription="This panel shows context for the current step. Copy the prompt below to reproduce this screen."
            promptText={`Create a premium design system with:\n- Background: #F7F6F3\n- Primary accent: #8B0000\n- Serif headings, sans-serif body\n- Consistent 8px spacing scale`}
          />
        </div>
      </main>

      <ProofFooter />
    </div>
  );
};

export default Index;
