interface PagePlaceholderProps {
  title: string;
}

const PagePlaceholder = ({ title }: PagePlaceholderProps) => {
  return (
    <section className="flex flex-1 flex-col justify-center gap-3 md:gap-4">
      <h1 className="font-heading text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
        {title}
      </h1>
      <p className="max-w-xl text-base text-slate-500 md:text-lg">
        This section will be built in the next step.
      </p>
    </section>
  );
};

export default PagePlaceholder;

