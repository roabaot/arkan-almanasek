import { getTranslations } from "next-intl/server";
import { RiArrowLeftLine, RiCustomerService2Line } from "react-icons/ri";

export default async function CtaSection() {
  const t = await getTranslations("about");

  return (
    <section className="mt-auto relative w-full py-24 md:py-32 overflow-hidden bg-[#120f0a]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#120f0a] via-[#a66c37]/20 to-[#120f0a]/80 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/40 via-background-dark to-background-dark z-0 opacity-60" />
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-secondary/10 to-transparent" />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex flex-wrap justify-center gap-8 md:gap-16 mb-12 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <div className="text-center px-4">
            <span className="block text-3xl md:text-4xl font-bold text-primary counter">
              {t("stats.experienceValue")}
            </span>
            <span className="text-xs text-gray-400 uppercase tracking-wider mt-1 block">
              {t("stats.experienceLabel")}
            </span>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="text-center px-4">
            <span className="block text-3xl md:text-4xl font-bold text-primary counter">
              {t("stats.pilgrimsValue")}
            </span>
            <span className="text-xs text-gray-400 uppercase tracking-wider mt-1 block">
              {t("stats.pilgrimsLabel")}
            </span>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="text-center px-4">
            <span className="block text-3xl md:text-4xl font-bold text-primary counter">
              {t("stats.satisfactionValue")}
            </span>
            <span className="text-xs text-gray-400 uppercase tracking-wider mt-1 block">
              {t("stats.satisfactionLabel")}
            </span>
          </div>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-xl">
          {t("cta.title")}
        </h2>
        <p className="text-white/80 text-xl md:text-2xl font-light mb-12 max-w-3xl mx-auto leading-relaxed">
          {t("cta.description")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="gold-shimmer relative overflow-hidden group bg-primary hover:bg-[#c9953b] text-[#171512] text-lg font-bold py-5 px-12 rounded-xl transition-all shadow-[0_0_40px_-10px_rgba(218,163,66,0.5)] hover:shadow-[0_0_60px_-10px_rgba(218,163,66,0.7)] transform hover:-translate-y-1">
            <span className="relative z-10 flex items-center gap-3">
              {t("cta.primaryCta")}
              <RiArrowLeftLine
                className="transition-transform group-hover:-translate-x-1"
                aria-hidden
              />
            </span>
          </button>
          <button className="relative group bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-lg font-bold py-5 px-12 rounded-xl transition-all hover:shadow-glass transform hover:-translate-y-1">
            <span className="flex items-center gap-3">
              <RiCustomerService2Line className="text-primary" aria-hidden />
              {t("cta.secondaryCta")}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
