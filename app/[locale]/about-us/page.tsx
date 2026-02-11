import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  RiArrowLeftLine,
  RiArrowRightUpLine,
  RiCustomerService2Line,
  RiFileTextLine,
  RiGroupLine,
  RiShieldCheckLine,
  RiSunLine,
} from "react-icons/ri";
import { FaHandHoldingHeart, FaMosque } from "react-icons/fa6";

export default async function AboutUsPage() {
  const t = await getTranslations("about");

  return (
    <main className="flex-grow w-full overflow-x-hidden bg-[#f6f8f6] text-[#111811] antialiased">
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

      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-background-light/50 dark:to-background-dark/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-text-main dark:text-white mb-4">
              {t("values.title")}
            </h2>
            <p className="text-lg text-text-muted dark:text-gray-400 max-w-2xl mx-auto font-light">
              {t("values.subtitle")}
            </p>
          </div>

          <div className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-6">
            <div className="col-span-1 md:col-span-2 row-span-3 grid auto-rows-[minmax(203px,auto)] gap-6">
              <div className="row-span-1.5 glass-panel px-10 py-7 rounded-3xl bento-item flex flex-col justify-between group border-r-4 border-r-primary/50">
                <div>
                  <div className="w-16 h-16 icon-3d-wrapper text-primary mb-4 group-hover:scale-110 transition-transform duration-500">
                    <RiSunLine className="text-4xl" aria-hidden />
                  </div>
                  <h3 className="text-3xl font-bold text-text-main dark:text-white mb-2">
                    {t("vision.title")}
                  </h3>
                  <p className="text-text-muted dark:text-gray-300 leading-loose text-lg font-light">
                    {t("vision.body")}
                  </p>
                </div>
              </div>
              <div className="row-span-1.5 glass-panel px-10 py-7 rounded-3xl bento-item flex flex-col justify-between group border-r-4 border-r-primary/50">
                <div>
                  <div className="w-16 h-16 icon-3d-wrapper text-primary mb-4 group-hover:scale-110 transition-transform duration-500">
                    <FaHandHoldingHeart className="text-4xl" aria-hidden />
                  </div>
                  <h3 className="text-3xl font-bold text-text-main dark:text-white mb-2">
                    {t("mission.title")}
                  </h3>
                  <p className="text-text-muted dark:text-gray-300 leading-loose text-lg font-light">
                    {t("mission.body")}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-1 bg-white dark:bg-[#252524] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-[#333] bento-item group hover:border-primary/40">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <RiGroupLine className="text-2xl" aria-hidden />
                </div>
                <RiArrowRightUpLine
                  className="text-xl text-gray-300 group-hover:text-primary transition-colors"
                  aria-hidden
                />
              </div>
              <h4 className="text-xl font-bold text-text-main dark:text-white mb-2">
                {t("cards.badal.title")}
              </h4>
              <p className="text-sm text-text-muted dark:text-gray-400 leading-relaxed">
                {t("cards.badal.body")}
              </p>
            </div>

            <div className="col-span-1 bg-gradient-to-br from-secondary to-primary-dark p-6 rounded-3xl shadow-lg bento-item text-white relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-white mb-4">
                  <RiShieldCheckLine className="text-2xl" aria-hidden />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">
                    {t("cards.trust.title")}
                  </h4>
                  <p className="text-sm text-white/80 font-light">
                    {t("cards.trust.body")}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-1 bg-white dark:bg-[#252524] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-[#333] bento-item group hover:border-primary/40">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <FaMosque className="text-2xl" aria-hidden />
                </div>
                <RiArrowRightUpLine
                  className="text-xl text-gray-300 group-hover:text-primary transition-colors"
                  aria-hidden
                />
              </div>
              <h4 className="text-xl font-bold text-text-main dark:text-white mb-2">
                {t("cards.guidance.title")}
              </h4>
              <p className="text-sm text-text-muted dark:text-gray-400 leading-relaxed">
                {t("cards.guidance.body")}
              </p>
            </div>

            <div className="col-span-1 bg-white dark:bg-[#252524] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-[#333] bento-item group hover:border-primary/40">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <RiFileTextLine className="text-2xl" aria-hidden />
                </div>
                <RiArrowRightUpLine
                  className="text-xl text-gray-300 group-hover:text-primary transition-colors"
                  aria-hidden
                />
              </div>
              <h4 className="text-xl font-bold text-text-main dark:text-white mb-2">
                {t("cards.permits.title")}
              </h4>
              <p className="text-sm text-text-muted dark:text-gray-400 leading-relaxed">
                {t("cards.permits.body")}
              </p>
            </div>

            <div className="col-span-1 md:col-span-2 bg-white dark:bg-[#252524] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-[#333] bento-item relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-text-main dark:text-white mb-3">
                    {t("why.title")}
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">
                        ✓
                      </span>
                      <span className="text-text-muted dark:text-gray-300 text-sm">
                        {t("why.bullets.sharia")}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">
                        ✓
                      </span>
                      <span className="text-text-muted dark:text-gray-300 text-sm">
                        {t("why.bullets.support")}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">
                        ✓
                      </span>
                      <span className="text-text-muted dark:text-gray-300 text-sm">
                        {t("why.bullets.ease")}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="relative w-full md:w-40 h-32 rounded-2xl overflow-hidden shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <Image
                    alt={t("why.imageAlt")}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOyLblmJl2e2cpZ__7nhjzmR8cx2Iky9NR7tlQqv-hHYJJIq0OpGzOk3bSyMZtqbpBvMCxYKDmAnpCNRjw_Z1TxBt9I30yGQIvuX9TWB7Xl5PeZSVK2tB80IGmZLfBPEgEinxwW5YjsOnvOZVClTTn0PUSEKLsnD869NBVnKlzk0k9qxCylueHL63uCEnDx7H_-krVWDoaVqSmrjxUPxCzlYqgZKfr0T08zXc4FHizezEVwf9RueHe92HjupUMO-EiqRNpq9h2CmRq"
                    fill
                    sizes="(min-width: 768px) 160px, 100vw"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
    </main>
  );
}
