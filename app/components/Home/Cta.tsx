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
import { FaMosque } from "react-icons/fa6";

const AVATARS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBaKAYZJkjrGWisLEZewKzxdELAyheWwarb9M7cPaZhWAj4tvhjEpf4O0NJTzuuEzsmWizHIJsIzj9uzhpCyL-vLG1kkaLuL2rEiXpFE5oDYDra8HHzFYjj6BvkbbOMJiNTvx0eF5m5-CfACkBujc7S4fdYhK8Gr5ixend7r6j4bz3r5jFs3Ghm2SADxKxp33EZdkynLA0uIViHvGX8IhkJxOuJtfqZ88zQv-JI4hOj0XHIx6w2S1I9ZTkkLbrV5XikZUo-jSSQSZzB",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCIEdFJBwWl_EwplgTkiIYEZldrC37AckfnsUlqhd5mIY1E5Spm69I9vY-LC4ZbIIYzWYa7-gsQylzoln6FJHaH9Le8whOJY85BhPQijtpEUwiKH0LWjaOpzz_Z2LvQJLJT0So34KodVMHyA5nURBwbkQpf8K5fGhTYFOpYld46uDqSsdYL-J0o6ltU9lT2hVmocXc_ZTPoI2ebApxGV1u6YRIzK_RTZLp8Bh7jfdm0-MX7imrpwSenAGYTPpOA-fVcmQyLRLnFfCHJ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA-21kU_I3QRVIpjMYYBQB3DBBNTpPelaiIl2QnlSmWZEBHBeK7gplE-On8G_oSKPSdLBrl_zE0Mq72qXVCGarwzPCnO-B6kYXh94gRuo2__dcsvovYlqMahDwVd9T4O221qwMAfrJ3QtmfU5cpW5Nlil6MNPE_dqb0LcFG3X0NH8bTuOjR9URvXYmI48HwpLUxldLNjHVPFJLfF1tlp4sUcv_a1yCbzY7_OO2DWOUHjDuoqE942--l5BGQ4FMUdJqQOPKeXJwzcLDd",
];

export default function HomeCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#022c22] to-[#0b3a24] px-4 py-16 md:py-24">
      <div className="bg-islamic-pattern absolute inset-0 bg-[length:60px_60px] opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <div className="flex w-full flex-col gap-8 text-center lg:w-1/2 lg:text-right">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 backdrop-blur-sm animate-pulse">
                <RiHourglassLine className="text-sm text-red-400" />
                <span className="text-sm font-bold text-red-200">
                  الأماكن محدودة لموسم هذا العام
                </span>
              </div>

              <h2 className="mb-6 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
                رحلتك تبدأ بخطوة
                <br />
                <span className="bg-gradient-to-r from-[#d4af37] to-[#fff3b0] bg-clip-text text-transparent">
                  واحدة من الاستعداد
                </span>
              </h2>

              <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-200 opacity-90 md:text-xl lg:mx-0">
                دعنا نرافقك في كل خطوة، من التحضير والتجهيز، وحتى أداء المناسك
                بكل يسر وطمأنينة. انضم الآن لآلاف الحجاج الذين وثقوا بنا.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <button
                type="button"
                className="glow-effect group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b5952f] px-8 py-4 text-lg font-bold text-black shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
              >
                <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 ease-out group-hover:translate-y-0" />
                <div className="relative flex items-center justify-center gap-3">
                  <RiUserAddLine className="text-xl" />
                  <span>احجز الآن</span>
                </div>
              </button>

              <button
                type="button"
                className="group relative w-full overflow-hidden rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 sm:w-auto"
              >
                <div className="relative flex items-center justify-center gap-3">
                  <RiDownloadLine className="text-xl transition-transform group-hover:translate-y-1" />
                  <span>تحميل الدليل</span>
                </div>
              </button>
            </div>

            <div className="mt-2 flex items-center justify-center gap-6 border-t border-white/10 pt-4 lg:justify-start">
              <div className="flex -space-x-3 space-x-reverse">
                {AVATARS.map((src) => (
                  <div
                    key={src}
                    className="size-10 rounded-full border-2 border-emerald-900 bg-gray-200"
                    style={{
                      backgroundImage: `url('${src}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                ))}
                <div className="flex size-10 items-center justify-center rounded-full border-2 border-emerald-900 bg-gray-800 text-xs font-bold text-white">
                  +2k
                </div>
              </div>

              <div className="text-sm text-gray-400">
                <span className="font-bold text-[#d4af37]">٢٠٠٠+</span> حاج
                وثقوا بنا
              </div>
            </div>
          </div>

          <div className="relative flex w-full items-center justify-center lg:h-[500px] lg:w-1/2 [perspective:1000px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/10 blur-[100px]" />

            <div className="group relative z-10 w-[280px] rotate-[-6deg] overflow-hidden rounded-[3rem] border-8 border-gray-800 bg-gray-900 shadow-2xl transition-all duration-700 ease-out hover:rotate-0 md:w-[320px]">
              <div className="absolute left-1/2 top-0 z-20 h-7 w-40 -translate-x-1/2 rounded-b-2xl bg-gray-800" />

              <div className="relative flex h-[580px] flex-col overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
                <div className="relative z-10 rounded-b-[2.5rem] bg-emerald-800 p-6 pb-8 pt-12 text-center text-white shadow-lg">
                  <FaMosque className="mb-2 inline-block text-4xl text-[#d4af37]" />
                  <h3 className="text-lg font-bold text-white">رفيق الحج</h3>
                  <p className="text-xs text-emerald-100 opacity-80">
                    دليلك الذكي للمناسك
                  </p>
                </div>

                <div className="relative flex flex-1 flex-col gap-4 p-6">
                  <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-transform duration-500 delay-75 group-hover:-translate-y-1">
                    <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <RiMapPin2Line className="text-lg" />
                    </div>
                    <div>
                      <div className="mb-1 h-2 w-24 rounded bg-gray-200" />
                      <div className="h-2 w-16 rounded bg-gray-100" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-transform duration-500 delay-100 group-hover:-translate-y-1">
                    <div className="flex size-10 items-center justify-center rounded-full bg-[#d4af37]/20 text-[#b5952f]">
                      <RiBookOpenLine className="text-lg" />
                    </div>
                    <div>
                      <div className="mb-1 h-2 w-28 rounded bg-gray-200" />
                      <div className="h-2 w-20 rounded bg-gray-100" />
                    </div>
                  </div>

                  <div className="group-hover:scale-105 relative mt-auto h-32 w-full overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50 transition-transform duration-700">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <RiMap2Line className="text-6xl text-emerald-200 opacity-50" />
                    </div>

                    <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-white px-2 py-1 text-[10px] font-bold text-emerald-800 shadow">
                      <span className="size-2 animate-pulse rounded-full bg-green-500" />
                      مباشر
                    </div>
                  </div>
                </div>

                <div className="flex justify-around border-t bg-white p-4 text-gray-400">
                  <RiHome5Line className="text-emerald-600" />
                  <RiCalendar2Line />
                  <RiUser3Line />
                </div>
              </div>
            </div>

            <div className="absolute right-10 top-20 hidden animate-bounce rounded-xl bg-white p-3 shadow-xl duration-[3000ms] md:block">
              <RiStarLine className="text-2xl text-[#d4af37]" />
            </div>

            <div className="absolute bottom-32 left-0 hidden animate-bounce rounded-xl bg-white p-3 shadow-xl duration-[4000ms] md:block">
              <RiCheckboxCircleLine className="text-2xl text-emerald-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
