interface ContextHeaderProps {
  headline: string;
  subtext: string;
}

const ContextHeader = ({ headline, subtext }: ContextHeaderProps) => {
  return (
    <section className="border-b px-3 py-5">
      <h1 className="font-heading text-4xl font-semibold text-foreground">{headline}</h1>
      <p className="mt-1 text-base text-muted-foreground prose-width">{subtext}</p>
    </section>
  );
};

export default ContextHeader;
