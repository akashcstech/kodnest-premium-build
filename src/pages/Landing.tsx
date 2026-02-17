import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <section className="flex flex-1 flex-col justify-center gap-6 py-8 md:gap-8 md:py-12">
      <div className="space-y-4 md:space-y-6">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          Stop Missing The Right Jobs.
        </h1>
        <p className="max-w-xl text-base text-slate-600 md:text-lg">
          Precision-matched job discovery delivered daily at 9AM.
        </p>
      </div>

      <div>
        <Button asChild size="lg" className="bg-[#8B0000] text-[#F7F6F3] hover:bg-[#8B0000]/90">
          <Link to="/settings">Start Tracking</Link>
        </Button>
      </div>
    </section>
  );
};

export default Landing;

