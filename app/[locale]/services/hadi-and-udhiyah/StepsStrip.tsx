import type { IconType } from "react-icons";

type Step = {
  Icon: IconType;
  title: string;
  desc: string;
};

type Props = {
  steps: Step[];
};

export default function StepsStrip({ steps }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {steps.map((step) => (
          <div
            key={step.title}
            className="group text-center flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-2xl border border-[var(--color-accent)] flex items-center justify-center transition-colors group-hover:bg-gray-50 duration-300 ease-in-out">
              <step.Icon className="text-2xl text-[var(--color-primary)]" />
            </div>
            <h4 className="text-sm font-bold mt-3 mb-1">{step.title}</h4>
            <p className="text-xs text-black/60 font-light">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
