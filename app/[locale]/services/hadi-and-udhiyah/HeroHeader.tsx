type Props = {
  titlePrefix: string;
  titleHighlight: string;
  description: string;
};

export default function HeroHeader({
  titlePrefix,
  titleHighlight,
  description,
}: Props) {
  return (
    <header className="py-12 px-4 max-w-7xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-extralight mb-4 tracking-tight">
        {titlePrefix}{" "}
        <span className="font-bold text-[var(--color-primary)]">
          {titleHighlight}
        </span>
      </h1>
      <p className="text-black/60 font-light max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    </header>
  );
}
