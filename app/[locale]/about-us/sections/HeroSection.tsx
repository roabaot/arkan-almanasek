import { getTranslations } from "next-intl/server";

export default async function HeroSection() {
  const t = await getTranslations("about");

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center overflow-hidden py-20">
      <div className="absolute top-[-10%] left-[-10%] geometric-bg opacity-20" />
      <div className="absolute bottom-[-10%] right-[-10%] geometric-bg opacity-10 animation-delay-2000" />
      <div className="absolute inset-0 bg-hero-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 space-y-8">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-text-main dark:text-white leading-normal tracking-tight fade-in-up delay-100">
          {t("hero.titleTop")}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary relative leading-[1.6]">
            {t("hero.titleHighlight")}
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-text-muted dark:text-gray-300 font-light max-w-2xl mx-auto leading-relaxed fade-in-up delay-200">
          {t("hero.description")}
        </p>
      </div>
    </section>
  );
}
