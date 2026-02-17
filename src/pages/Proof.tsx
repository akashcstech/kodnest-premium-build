const Proof = () => {
  return (
    <section className="flex flex-1 flex-col justify-center">
      <div className="mx-auto max-w-2xl space-y-4 rounded-2xl border border-slate-200 bg-white/70 px-6 py-10 shadow-sm backdrop-blur-sm md:px-10 md:py-12">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          Proof of your process.
        </h1>
        <p className="text-sm text-slate-600 md:text-base">
          This section will collect artifacts that demonstrate how your job search operates—screens, prompts, and
          evidence that the system is working as intended.
        </p>
        <p className="text-xs text-slate-500 md:text-sm">
          In the next step, you&apos;ll wire this tab to real outputs, keeping everything you need for demos and
          walkthroughs in one calm place.
        </p>
      </div>
    </section>
  );
};

export default Proof;

