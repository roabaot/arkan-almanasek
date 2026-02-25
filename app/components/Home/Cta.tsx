"use client";

import {
  RiBookOpenLine,
  RiCalendar2Line,
  RiCheckboxCircleLine,
  RiDownloadLine,
  RiHome5Line,
  RiHourglassLine,
  RiMapPin2Line,
  RiMap2Line,
  RiStarLine,
  RiUser3Line,
  RiUserAddLine,
} from "react-icons/ri";
import { useLocale } from "use-intl";
import { useTranslations } from "next-intl";

const AVATARS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBaKAYZJkjrGWisLEZewKzxdELAyheWwarb9M7cPaZhWAj4tvhjEpf4O0NJTzuuEzsmWizHIJsIzj9uzhpCyL-vLG1kkaLuL2rEiXpFE5oDYDra8HHzFYjj6BvkbbOMJiNTvx0eF5m5-CfACkBujc7S4fdYhK8Gr5ixend7r6j4bz3r5jFs3Ghm2SADxKxp33EZdkynLA0uIViHvGX8IhkJxOuJtfqZ88zQv-JI4hOj0XHIx6w2S1I9ZTkkLbrV5XikZUo-jSSQSZzB",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCIEdFJBwWl_EwplgTkiIYEZldrC37AckfnsUlqhd5mIY1E5Spm69I9vY-LC4ZbIIYzWYa7-gsQylzoln6FJHaH9Le8whOJY85BhPQijtpEUwiKH0LWjaOpzz_Z2LvQJLJT0So34KodVMHyA5nURBwbkQpf8K5fGhTYFOpYld46uDqSsdYL-J0o6ltU9lT2hVmocXc_ZTPoI2ebApxGV1u6YRIzK_RTZLp8Bh7jfdm0-MX7imrpwSenAGYTPpOA-fVcmQyLRLnFfCHJ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA-21kU_I3QRVIpjMYYBQB3DBBNTpPelaiIl2QnlSmWZEBHBeK7gplE-On8G_oSKPSdLBrl_zE0Mq72qXVCGarwzPCnO-B6kYXh94gRuo2__dcsvovYlqMahDwVd9T4O221qwMAfrJ3QtmfU5cpW5Nlil6MNPE_dqb0LcFG3X0NH8bTuOjR9URvXYmI48HwpLUxldLNjHVPFJLfF1tlp4sUcv_a1yCbzY7_OO2DWOUHjDuoqE942--l5BGQ4FMUdJqQOPKeXJwzcLDd",
];

export default function HomeCta() {
  const t = useTranslations("home.cta");
  const locale = useLocale();
  const isRTL = locale === "ar";
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-accent px-4 py-16 md:py-24">
      <div className="bg-islamic-pattern absolute inset-0 bg-[length:60px_60px] opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <div className="flex w-full flex-col gap-8 text-center lg:w-1/2 lg:text-right">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-red-500/10 px-4 py-2 backdrop-blur-sm animate-pulse">
                <RiHourglassLine className="text-sm text-red-500" />
                <span className="text-sm font-bold text-red-100">
                  {t("limitedBadge")}
                </span>
              </div>

              <h2 className="mb-6 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
                {t("titleLine1")}
                <br />
                <span className="text-white">{t("titleLine2")}</span>
              </h2>

              <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-100 opacity-90 md:text-xl lg:mx-0">
                {t("description")}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <button
                type="button"
                className="glow-effect group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b5952f] px-8 py-4 text-lg font-bold text-black shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
              >
                <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 ease-out group-hover:translate-y-0" />
                <div className="relative flex items-center justify-center gap-3 text-white">
                  <RiUserAddLine className="text-xl text-white" />
                  <span>{t("primaryCta")}</span>
                </div>
              </button>

              <button
                type="button"
                className="group relative w-full overflow-hidden rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 sm:w-auto"
              >
                <div className="relative flex items-center justify-center gap-3">
                  <RiDownloadLine className="text-xl transition-transform group-hover:translate-y-1" />
                  <span>{t("secondaryCta")}</span>
                </div>
              </button>
            </div>

            <div className="mt-2 flex items-center justify-center gap-6 border-t border-white/10 pt-4 lg:justify-start">
              <div className="flex -space-x-3 space-x-reverse">
                {AVATARS.map((src) => (
                  <div
                    key={src}
                    className="size-10 rounded-full border-2 border-secondary bg-gray-100"
                    style={{
                      backgroundImage: `url('${src}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                ))}
                <div className="flex size-10 items-center justify-center rounded-full border-2 border-secondary bg-gray-800 text-xs font-bold text-white">
                  {t("trustBadge")}
                </div>
              </div>

              <div className="text-sm text-gray-100">
                <span className="font-bold text-white font-semibold">
                  {t("trustValue")}
                </span>{" "}
                {t("trustLabel")}
              </div>
            </div>
          </div>

          <div className="relative flex w-full items-center justify-center lg:h-[500px] lg:w-1/2 [perspective:1000px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/10 blur-[100px]" />

            <div className="group relative z-10 w-[280px] rotate-[-6deg] overflow-hidden rounded-[3rem] border-8 border-gray-800 bg-gray-900 shadow-2xl transition-all duration-700 ease-out hover:rotate-0 md:w-[320px]">
              <div className="absolute left-1/2 top-0 z-20 h-7 w-40 -translate-x-1/2 rounded-b-2xl bg-gray-800" />

              <div className="relative flex h-[580px] flex-col overflow-hidden bg-gradient-to-b from-background to-white">
                <div className="relative z-10 rounded-b-[2.5rem] bg-primary p-6 pb-8 pt-12 text-center text-white shadow-lg">
                  <svg
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="800 200 400 1550"
                    width={150}
                    height={150}
                    preserveAspectRatio="xMidYMid meet"
                    className="mx-auto"
                  >
                    <g>
                      <path
                        className="st-white"
                        d="M481,1261.2h-107.3v24.4h73.1c7.1,0,13,2.3,17.5,6.8s6.8,10.4,6.8,17.5v44.1c0,6.8-2.3,12.6-7,17.3-4.7,4.7-10.4,7-17.3,7h-180.4c-6.8,0-12.6-2.3-17.3-7-4.7-4.7-7.1-10.4-7.1-17.3v-48.8h48.8v39.1h131.6v-24.5h-97.5v-68.4c0-6.8,2.3-12.6,7-17.3,4.7-4.7,10.4-7,17.3-7h131.9v34.2ZM475,1378.2h-3.8v-34.1h3.8v34.1Z"
                      />
                      <path
                        className="st-white"
                        d="M690.8,1353.8c0,5.8-2,11.1-6.1,16-4.8,5.6-10.9,8.5-18.3,8.5h-198.8v-34.1h28.1v-58.6h48.7v58.6h24.4v-58.6h48.8v58.6h24.4v-58.6h48.7v68.2Z"
                      />
                      <path
                        className="st-white"
                        d="M761.4,1378.2h-24.4c-6.8,0-12.6-2.3-17.3-7-4.7-4.7-7.1-10.4-7.1-17.3v-160.9h48.8v185.2ZM765.2,1378.2h-3.8v-34.1h3.8v34.1Z"
                      />
                      <path
                        className="st-white"
                        d="M834.7,1353.9c0,6.8-2.3,12.6-7,17.3-4.7,4.7-10.4,7-17.3,7h-52.8v-34.1h28.3v-58.6h48.7v68.3ZM828.2,1241.6c0,5.4-1.9,10-5.7,13.8-3.8,3.8-8.4,5.7-13.8,5.7s-9.9-1.9-13.8-5.8c-3.9-3.8-5.8-8.4-5.8-13.8s1.9-10,5.7-13.8,8.4-5.7,13.8-5.7,10,1.9,13.8,5.7c3.8,3.8,5.7,8.4,5.7,13.8ZM838.5,1378.2h-3.8v-34.1h3.8v34.1Z"
                      />
                      <path
                        className="st-white"
                        d="M981.1,1353.7c0,6.8-2.4,12.5-7.1,17.4s-10.5,7.2-17.3,7.2h-48.8v-34.1h24.4v-24.5h-24.4v34c0,7-2.3,12.9-7,17.5-4.6,4.7-10.4,7-17.3,7h-52.5v-34.1h28.1v-34.3c0-7.1,2.3-12.9,6.9-17.5,4.6-4.6,10.4-6.9,17.5-6.9h73.1c7.1,0,13,2.3,17.6,6.8,4.6,4.5,6.8,10.4,6.8,17.5v43.8ZM984.9,1378.2h-3.8v-34.1h3.8v34.1Z"
                      />
                      <path
                        className="st-white"
                        d="M1054.3,1353.8c0,6.9-2.3,12.7-7,17.4-4.6,4.7-10.4,7-17.3,7h-52.5v-34.1h28.1v-151.3h48.7v160.9Z"
                      />
                      <path
                        className="st-white"
                        d="M1124.9,1378.2h-24.4c-6.8,0-12.6-2.3-17.3-7-4.7-4.7-7.1-10.4-7.1-17.3v-160.9h48.8v185.2Z"
                      />
                      <path
                        className="st-white"
                        d="M1350.7,1412.4c0,6.9-2.3,12.7-7,17.4-4.7,4.7-10.5,7-17.4,7h-107.3c-6.9,0-12.7-2.3-17.4-7s-7-10.5-7-17.4v-126.8h48.8v117.1h58.5v-117.1h48.8v126.8ZM1291.5,1305.1c0,5.4-1.9,10-5.7,13.8-3.8,3.8-8.4,5.7-13.8,5.7s-9.9-1.9-13.8-5.8c-3.9-3.9-5.8-8.4-5.8-13.8s1.9-10,5.7-13.8c3.8-3.8,8.4-5.7,13.8-5.7s10,1.9,13.8,5.7c3.8,3.8,5.7,8.4,5.7,13.8Z"
                      />
                      <path
                        className="st-white"
                        d="M1421.4,1378.2h-24.4c-6.8,0-12.6-2.3-17.3-7-4.7-4.7-7.1-10.4-7.1-17.3v-160.9h48.8v185.2ZM1425.2,1378.2h-3.8v-34.1h3.8v34.1Z"
                      />
                      <path
                        className="st-white"
                        d="M1602,1261.2h-107.4v24.4h73.1c7.1,0,13,2.3,17.6,6.8,4.6,4.6,6.8,10.4,6.8,17.4v44.1c0,6.8-2.4,12.6-7.1,17.3-4.7,4.7-10.5,7-17.3,7h-150v-34.2h125.5v-24.4h-97.5v-68.4c0-6.8,2.4-12.6,7.1-17.3,4.7-4.7,10.5-7,17.3-7h131.9v34.2Z"
                      />
                      <path
                        className="st-white"
                        d="M1687.3,1412.4c0,6.9-2.3,12.7-7,17.4-4.7,4.7-10.5,7-17.4,7h-48.8v-34.2h24.4v-117.1h48.8v126.8Z"
                      />
                      <path
                        className="st-white"
                        d="M1758,1212.8h-49.1v-13.7h7.7v-13.5c0-6.5,3.3-9.8,9.8-9.8h25.7v13.6h-16v9.6h21.8v13.7ZM1758,1378.2h-24.5c-6.9,0-12.7-2.3-17.4-7s-7.1-10.5-7.1-17.3v-134.7h49.1v159Z"
                      />
                    </g>
                    <g>
                      <path
                        className="st-white"
                        d="M418.6,1595.3l10.1-60.9c.8-5.1,2.1-9.6,3.7-13.4,1.6-3.9,3.9-7.2,6.7-9.9,2.8-2.7,6.4-4.7,10.8-6.1,4.4-1.4,9.8-2,16.1-2s6.1.1,9.2.4c3.1.3,6.3.8,9.6,1.6l.3,1.5c-.3,1.7-.4,3.8-.6,6.3-.1,2.5-.2,5.1-.2,7.6v74.8h-12.2v-75.1c0-1.7,0-3.3,0-4.8,0-1.5.2-2.9.4-4.2l2,3.7c-1.1-.5-2.4-.8-4-1-1.6-.2-3.3-.3-5.1-.3-5.6,0-10,.8-13.3,2.3-3.3,1.5-5.7,3.8-7.4,6.8-1.6,3-2.9,6.9-3.7,11.7l-10.1,60.9h-12.4ZM431.2,1567.4v-10.7h45.9v10.7h-45.9Z"
                      />
                      <path
                        className="st-white"
                        d="M508.6,1595.3v-91.3h12.2v91.3h-12.2ZM515.7,1567.9v-11.2h21.8c4.7,0,8.7-1.1,11.9-3.4,3.2-2.3,5.5-5.3,7.1-9,1.6-3.7,2.3-7.7,2.3-11.9,0-6.1-1.6-10.6-4.9-13.4-3.3-2.9-7.5-4.3-12.9-4.3h-25.4v-10.7h25.9c6.1,0,11.4,1.1,15.9,3.3,4.5,2.2,7.9,5.4,10.4,9.6,2.5,4.2,3.7,9.4,3.7,15.5s-1,10.7-2.9,15.2c-1.9,4.4-4.5,8.2-7.7,11.2-3.3,3-6.9,5.3-11,6.8-4.1,1.6-8.4,2.3-12.9,2.3h-21.3ZM562.9,1595.3l-23.8-31,12.7-1.5,25.4,32v.5h-14.2Z"
                      />
                      <path
                        className="st-white"
                        d="M592.3,1595.3v-91.3h12.2v91.3h-12.2ZM614.2,1559.7h-15v-10.7h14.5c4.3,0,7.6-1,9.8-3,2.2-2,4-4.6,5.4-7.6l16.2-34.5h12.7v1l-17.8,37c-1.5,3.3-3.4,6.3-5.7,9-2.3,2.7-5.1,4.8-8.3,6.4-3.3,1.6-7.2,2.3-11.9,2.3ZM630.9,1551.6l27.1,42.6v1h-13.7l-23.1-37.5,9.6-6.1Z"
                      />
                      <path
                        className="st-white"
                        d="M668.7,1595.3l10.1-60.9c.8-5.1,2.1-9.6,3.7-13.4,1.6-3.9,3.9-7.2,6.7-9.9,2.8-2.7,6.4-4.7,10.8-6.1,4.4-1.4,9.8-2,16.1-2s6.1.1,9.2.4c3.1.3,6.3.8,9.6,1.6l.3,1.5c-.3,1.7-.4,3.8-.6,6.3-.1,2.5-.2,5.1-.2,7.6v74.8h-12.2v-75.1c0-1.7,0-3.3,0-4.8,0-1.5.2-2.9.4-4.2l2,3.7c-1.1-.5-2.4-.8-4-1-1.6-.2-3.3-.3-5.1-.3-5.6,0-10,.8-13.3,2.3-3.3,1.5-5.7,3.8-7.4,6.8-1.6,3-2.9,6.9-3.7,11.7l-10.1,60.9h-12.4ZM681.4,1567.4v-10.7h45.9v10.7h-45.9Z"
                      />
                      <path
                        className="st-white"
                        d="M758.8,1595.3v-91.3h10.1l52.5,55.4v17.1l-53.8-56.7,3.3-1.4v76.9h-12.2ZM815.6,1595.3v-91.3h12.2v91.3h-12.2Z"
                      />
                      <path
                        className="st-white"
                        d="M854,1560.2l18.6.3,9.6-.2,9.6.2-.7,11.7-18.4-.7-9.6.5-8.6-.5h-9.5l-.3-11.8,9.3.5Z"
                      />
                      <path
                        className="st-white"
                        d="M902.7,1595.3l10.1-60.9c.8-5.1,2.1-9.6,3.7-13.4,1.6-3.9,3.9-7.2,6.7-9.9,2.8-2.7,6.4-4.7,10.8-6.1,4.4-1.4,9.8-2,16.1-2s6.1.1,9.2.4c3.1.3,6.3.8,9.6,1.6l.3,1.5c-.3,1.7-.4,3.8-.6,6.3-.1,2.5-.2,5.1-.2,7.6v74.8h-12.2v-75.1c0-1.7,0-3.3,0-4.8,0-1.5.2-2.9.4-4.2l2,3.7c-1.1-.5-2.4-.8-4-1-1.6-.2-3.3-.3-5.1-.3-5.6,0-10,.8-13.3,2.3-3.3,1.5-5.7,3.8-7.4,6.8-1.6,3-2.9,6.9-3.7,11.7l-10.1,60.9h-12.4ZM915.4,1567.4v-10.7h45.9v10.7h-45.9Z"
                      />
                      <path
                        className="st-white"
                        d="M992.7,1595.3v-91.3h12.2v80.7h39.1v10.7h-51.2Z"
                      />
                      <path
                        className="st-white"
                        d="M1060.2,1595.3v-91.3h10.1l32.2,50.2h-5.1l32.2-50.2h10.1v91.3h-12.2v-71.4l2.7.8-25.5,39.2h-9.6l-25.5-39.2,2.7-.8v71.4h-12.2Z"
                      />
                      <path
                        className="st-white"
                        d="M1164.2,1595.3v-91.3h10.1l52.5,55.4v17.1l-53.8-56.7,3.3-1.4v76.9h-12.2ZM1221.1,1595.3v-91.3h12.2v91.3h-12.2Z"
                      />
                      <path
                        className="st-white"
                        d="M1251.5,1595.3l10.1-60.9c.8-5.1,2.1-9.6,3.7-13.4s3.9-7.2,6.7-9.9c2.8-2.7,6.4-4.7,10.8-6.1,4.4-1.4,9.8-2,16.1-2s6.1.1,9.2.4c3.1.3,6.3.8,9.6,1.6l.3,1.5c-.3,1.7-.4,3.8-.6,6.3-.1,2.5-.2,5.1-.2,7.6v74.8h-12.2v-75.1c0-1.7,0-3.3,0-4.8,0-1.5.2-2.9.4-4.2l2,3.7c-1.1-.5-2.4-.8-4-1-1.6-.2-3.3-.3-5.1-.3-5.6,0-10,.8-13.3,2.3-3.3,1.5-5.7,3.8-7.4,6.8-1.6,3-2.9,6.9-3.7,11.7l-10.1,60.9h-12.4ZM1264.2,1567.4v-10.7h45.9v10.7h-45.9Z"
                      />
                      <path
                        className="st-white"
                        d="M1337.5,1580.3h1c2,1.1,4.3,2,6.9,2.9,2.6.8,5.4,1.4,8.5,1.8,3.1.4,6.4.6,10,.6s7.7-.4,10.8-1.2c3.2-.8,5.7-2.2,7.5-4.1,1.8-1.9,2.7-4.5,2.7-7.9s-1.2-7-3.5-8.8c-2.3-1.8-5.8-3.1-10.5-3.9l-11.2-2c-4.2-.8-8.1-2.1-11.7-4.1s-6.4-4.8-8.5-8.3c-2.1-3.6-3.2-8-3.2-13.4s1.6-12.3,4.8-16.7c3.2-4.4,7.6-7.6,13.3-9.6s12.4-3.1,20-3.1,7.1.3,10.6,1c3.5.7,6.4,1.5,8.7,2.5v11.7h-1c-2-1-4.6-1.9-7.7-2.8-3.1-.8-6.8-1.3-11.1-1.3s-9,.6-12.9,1.8c-3.8,1.2-6.9,3.1-9.1,5.7-2.2,2.6-3.4,6-3.4,10.3s1.4,9.1,4.2,11.2c2.8,2.1,6.6,3.6,11.5,4.6l11.2,2c4.3.8,8.1,2.1,11.3,3.9,3.2,1.9,5.7,4.3,7.5,7.4,1.8,3.1,2.7,6.9,2.7,11.5s-.8,7.8-2.4,10.9c-1.6,3.1-3.9,5.7-6.8,7.8s-6.4,3.6-10.5,4.6-8.6,1.5-13.6,1.5-6.9-.2-10.1-.6c-3.2-.4-6.1-1-8.9-1.6-2.7-.7-5.2-1.4-7.4-2.3v-11.9Z"
                      />
                      <path
                        className="st-white"
                        d="M1415.6,1595.3v-91.3h12.2v91.3h-12.2ZM1422.8,1514.6v-10.7h50.7v10.7h-50.7ZM1422.8,1552.6v-10.7h43.6v10.7h-43.6ZM1422.8,1595.3v-10.7h52.3v10.7h-52.3Z"
                      />
                      <path
                        className="st-white"
                        d="M1493.8,1595.3v-91.3h12.2v91.3h-12.2ZM1515.6,1559.7h-15v-10.7h14.5c4.3,0,7.6-1,9.8-3,2.2-2,4-4.6,5.4-7.6l16.2-34.5h12.7v1l-17.8,37c-1.5,3.3-3.4,6.3-5.7,9-2.3,2.7-5.1,4.8-8.3,6.4-3.3,1.6-7.2,2.3-11.9,2.3ZM1532.3,1551.6l27.1,42.6v1h-13.7l-23.1-37.5,9.6-6.1Z"
                      />
                    </g>
                    <g>
                      <g>
                        <rect
                          className="st-white"
                          x="673.9"
                          y="916.7"
                          width="72.2"
                          height="72.1"
                          rx="3.6"
                          ry="3.6"
                          transform="translate(-465.8 781.1) rotate(-45)"
                        />
                        <path
                          className="st-white"
                          d="M1208.9,794.8h-227.3c-9.3,0-16.9,7.6-16.9,16.9v109.8c0,9.3,7.6,16.9,16.9,16.9h83.6c7.9,0,14.4,6.4,14.4,14.4h0c0,7.9-6.4,14.4-14.4,14.4h-112.2c-9.4,0-17.1-7.6-17.1-17.1v-140.9c0-7.9-6.4-14.4-14.4-14.4h-28.7c-7.9,0-14.4,6.4-14.4,14.4v198.4c0,9.4,7.6,17.1,17.1,17.1h227.1c7.9,0,14.4-6.4,14.4-14.4v-114.9c0-7.9-6.4-14.4-14.4-14.4h-86.2c-7.9,0-14.4-6.4-14.4-14.4h0c0-7.9,6.4-14.4,14.4-14.4h172.4c7.9,0,14.4-6.4,14.4-14.4v-28.7c0-7.9-6.4-14.4-14.4-14.4Z"
                        />
                        <rect
                          className="st-white"
                          x="1252"
                          y="794.8"
                          width="57.5"
                          height="316"
                          rx="14.4"
                          ry="14.4"
                        />
                        <rect
                          className="st-white"
                          x="792.1"
                          y="794.8"
                          width="57.5"
                          height="316"
                          rx="14.4"
                          ry="14.4"
                        />
                        <path
                          className="st-white"
                          d="M1208.9,881h-28.7c-7.9,0-14.4,6.4-14.4,14.4v143.7c0,7.9-6.4,14.3-14.3,14.3h-57.6c-7.9,0-14.4,6.4-14.4,14.4v28.7c0,7.9,6.4,14.4,14.4,14.4h100.6c15.8,0,28.6-12.8,28.6-28.6v-186.8c0-7.9-6.4-14.4-14.4-14.4Z"
                        />
                      </g>
                      <path
                        className="st-white"
                        d="M1313.6,794.5h-4.4v-61.7h-.2c.4-.3.8-.6,1-1.1,1.6-2.8,2.6-6.3,1.9-10.5-1.9-12.4-28.1-24.8-31.2-29.3-3.1,4.5-29.4,16.9-31.2,29.3-.7,4.3.3,7.8,1.9,10.5.3.4.6.8,1,1.1h-.2v61.7h-4.4c-2.3,0-4.1,1.7-4.1,3.8v19.6c0,4.1,2.4,8,6.3,10l2.3,1.2v155.6c6-.9,11.9.9,17.5,0,14.1-2.4,27.4,1.5,39.5-.7v-155l2.2-1.2c3.9-2,6.3-5.9,6.3-10v-19.6c0-2.1-1.8-3.8-4.1-3.8ZM1268.7,794.5h-10v-43.7c0-2.5,2.2-4.6,5-4.6s2.6.5,3.5,1.3c.9.8,1.5,2,1.5,3.2v43.7ZM1285.6,794.5h-10v-43.7c0-2.5,2.2-4.6,5-4.6h0c2.7,0,5,2,5,4.6v43.7ZM1302.6,794.5h-10v-43.7c0-2.5,2.2-4.6,5-4.6s2.6.5,3.5,1.3c.9.8,1.5,2,1.5,3.2v43.7Z"
                      />
                      <path
                        className="st-white"
                        d="M853.7,794.5h-4.4v-61.7h-.2c.4-.3.8-.6,1-1.1,1.6-2.8,2.6-6.3,1.9-10.5-1.9-12.4-28.1-24.8-31.2-29.3-3.1,4.5-29.4,16.9-31.2,29.3-.7,4.3.3,7.8,1.9,10.5.3.4.6.8,1,1.1h-.2v61.7h-4.4c-2.3,0-4.1,1.7-4.1,3.8v19.6c0,4.1,2.4,8,6.3,10l2.3,1.2v155.6c6-.9,11.9.9,17.5,0,14.1-2.4,27.4,1.5,39.5-.7v-155l2.2-1.2c3.9-2,6.3-5.9,6.3-10v-19.6c0-2.1-1.8-3.8-4.1-3.8ZM808.8,794.5h-10v-43.7c0-2.5,2.2-4.6,5-4.6s2.6.5,3.5,1.3c.9.8,1.5,2,1.5,3.2v43.7ZM825.8,794.5h-10v-43.7c0-2.5,2.2-4.6,5-4.6h0c2.7,0,5,2,5,4.6v43.7ZM842.7,794.5h-10v-43.7c0-2.5,2.2-4.6,5-4.6s2.6.5,3.5,1.3c.9.8,1.5,2,1.5,3.2v43.7Z"
                      />
                      <g>
                        <path
                          className="st-white"
                          d="M1182.1,775.4c-.2,0-.4,0-.6-.1h-63.4l57.9-3.6c5.5-.3,10.4-3.4,13-8.3,7.4-13.9,12-31.5,9-52.9-7.4-52.7-96-105.5-131.8-134.3,0-.4.1-.9.1-1.3,0-4.3-2-8.2-5.2-10.6-2.9-2.2-4.7-5.5-5-9.1l-1.3-14.1c1.6-.8,2.7-2.4,2.7-4.3s0-.2,0-.3c1.5-.2,2.9-.5,4.4-.9,16.2-4.5,26.6-19.7,25.4-35.9,0,0,0,0,0,0,0,0,0,0,0,0,0,.3-.1.6-.2.9-2.4,11.1-11.2,20.4-23.4,22.6-14,2.5-28.1-6-32.6-19.4-4.9-14.7,2.6-30.2,16.3-36,0,0-.2,0-.2,0-18.7,3-31.8,21.2-28.6,39.9,2.7,15.6,15,26.5,29.4,28.6,0,.1,0,.2,0,.4,0,1.9,1.1,3.5,2.7,4.3l-1.3,14.1c-.3,3.6-2.1,6.9-5,9.1-3.2,2.5-5.2,6.3-5.2,10.6s0,.9.1,1.3c-35.8,28.8-124.4,81.6-131.8,134.3-3,21.4,1.6,39.1,9,52.9,2.6,4.8,7.5,8,13,8.3l57.9,3.6h-63.4c-.2,0-.4.1-.6.1"
                        />
                        <polygon
                          className="st-white"
                          points="1046.7 501.1 1045.3 509.3 1052.7 505.5 1060.1 509.3 1058.7 501.1 1064.7 495.3 1056.4 494.1 1052.7 486.6 1049 494.1 1040.7 495.3 1046.7 501.1"
                        />
                        <path
                          className="st-white"
                          d="M1223.2,719h-17.8v-62.9c0-69.1-32.1-134.8-86-175.8-1.8-1.3-3.5-2.7-5.4-4-4.2-3-8.8-6.2-13.7-9.6-14.4-9.9-31.8-21.8-47.7-37.6-15.9,15.7-33.3,27.7-47.7,37.6-4.9,3.4-9.6,6.6-13.7,9.6-1.8,1.3-3.6,2.7-5.4,4-53.8,41-85.9,106.7-85.9,175.8v62.9h-17.8v-62.9c0-74.6,34.7-145.6,93-189.9,1.9-1.4,3.7-2.8,5.7-4.2,4.4-3.2,9.1-6.5,14.2-9.9,16.4-11.3,35.1-24,51.2-41.7l6.6-7.2,6.6,7.2c16.1,17.7,34.8,30.4,51.2,41.7,5,3.5,9.8,6.7,14.2,9.9,1.9,1.4,3.8,2.8,5.7,4.2,58.2,44.3,93,115.3,93,189.9v62.9Z"
                        />
                      </g>
                    </g>
                  </svg>
                  <p className="text-xs text-white">{t("appTagline")}</p>
                </div>

                <div className="relative flex flex-1 flex-col gap-4 p-6">
                  <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-transform duration-500 delay-75 group-hover:-translate-y-1">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <RiMapPin2Line className="text-lg" />
                    </div>
                    <div>
                      <div className="mb-1 h-2 w-24 rounded bg-gray-200" />
                      <div className="h-2 w-16 rounded bg-gray-100" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-transform duration-500 delay-100 group-hover:-translate-y-1">
                    <div className="flex size-10 items-center justify-center rounded-full bg-secondary/20 text-secondary">
                      <RiBookOpenLine className="text-lg" />
                    </div>
                    <div>
                      <div className="mb-1 h-2 w-28 rounded bg-gray-200" />
                      <div className="h-2 w-20 rounded bg-gray-100" />
                    </div>
                  </div>

                  <div className="group-hover:scale-105 relative mt-auto h-32 w-full overflow-hidden rounded-xl border border-background bg-background transition-transform duration-700">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <RiMap2Line className="text-6xl text-primary opacity-50" />
                    </div>

                    <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-white px-2 py-1 text-[10px] font-bold text-primary shadow">
                      <span className="size-2 animate-pulse rounded-full bg-accent" />
                      {t("liveLabel")}
                    </div>
                  </div>
                </div>

                <div className="flex justify-around border-t bg-white p-4 text-gray-400">
                  <RiHome5Line className="text-secondary" />
                  <RiCalendar2Line />
                  <RiUser3Line />
                </div>
              </div>
            </div>

            <div className="absolute right-10 top-20 hidden animate-bounce rounded-xl bg-white p-3 shadow-xl duration-[3000ms] md:block">
              <RiStarLine className="text-2xl text-primary" />
            </div>

            <div className="absolute bottom-32 left-0 hidden animate-bounce rounded-xl bg-white p-3 shadow-xl duration-[4000ms] md:block">
              <RiCheckboxCircleLine className="text-2xl text-secondary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
