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
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-accent px-4 py-16 md:py-24">
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
                <span className="text-white">واحدة من الاستعداد</span>
              </h2>

              <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-100 opacity-90 md:text-xl lg:mx-0">
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
                <div className="relative flex items-center justify-center gap-3 text-white">
                  <RiUserAddLine className="text-xl text-white" />
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
                    className="size-10 rounded-full border-2 border-secondary bg-gray-100"
                    style={{
                      backgroundImage: `url('${src}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                ))}
                <div className="flex size-10 items-center justify-center rounded-full border-2 border-secondary bg-gray-800 text-xs font-bold text-white">
                  +2k
                </div>
              </div>

              <div className="text-sm text-gray-100">
                <span className="font-bold text-white font-semibold">
                  ٢٠٠٠+
                </span>{" "}
                حاج وثقوا بنا
              </div>
            </div>
          </div>

          <div className="relative flex w-full items-center justify-center lg:h-[500px] lg:w-1/2 [perspective:1000px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/10 blur-[100px]" />

            <div className="group relative z-10 w-[280px] rotate-[-6deg] overflow-hidden rounded-[3rem] border-8 border-gray-800 bg-gray-900 shadow-2xl transition-all duration-700 ease-out hover:rotate-0 md:w-[320px]">
              <div className="absolute left-1/2 top-0 z-20 h-7 w-40 -translate-x-1/2 rounded-b-2xl bg-gray-800" />

              <div className="relative flex h-[580px] flex-col overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
                <div className="relative z-10 rounded-b-[2.5rem] bg-primary p-6 pb-8 pt-12 text-center text-white shadow-lg">
                  {/* <FaMosque className="mb-2 inline-block text-4xl text-[#d4af37]" />
                  <h3 className="text-lg font-bold text-white">رفيق الحج</h3> */}

                  <svg
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="200 75 100 350"
                    width={150}
                    height={150}
                    className="mx-auto"
                  >
                    <text
                      className="st-white"
                      transform="translate(390.4 347.4)"
                    >
                      <tspan x="0" y="0">
                        أركان المناسك
                      </tspan>
                    </text>
                    <g>
                      <path
                        className="st-white"
                        d="M103.7,403.2l2.6-15.6c.2-1.3.5-2.5,1-3.5.4-1,1-1.8,1.7-2.5s1.6-1.2,2.8-1.6,2.5-.5,4.1-.5,1.6,0,2.4.1c.8,0,1.6.2,2.5.4v.4c0,.4,0,1,0,1.6,0,.7,0,1.3,0,2v19.2h-3.1v-19.3c0-.4,0-.8,0-1.2,0-.4,0-.7.1-1.1l.5.9c-.3-.1-.6-.2-1-.3-.4,0-.8,0-1.3,0-1.4,0-2.6.2-3.4.6-.8.4-1.5,1-1.9,1.8-.4.8-.7,1.8-1,3l-2.6,15.6h-3.2ZM106.9,396v-2.7h11.8v2.7h-11.8Z"
                      />
                      <path
                        className="st-white"
                        d="M126.8,403.2v-23.5h3.1v23.5h-3.1ZM128.6,396.1v-2.9h5.6c1.2,0,2.2-.3,3-.9.8-.6,1.4-1.4,1.8-2.3.4-1,.6-2,.6-3.1,0-1.6-.4-2.7-1.3-3.5-.8-.7-1.9-1.1-3.3-1.1h-6.5v-2.7h6.6c1.6,0,2.9.3,4.1.8,1.2.6,2,1.4,2.7,2.5.6,1.1.9,2.4.9,4s-.2,2.8-.7,3.9c-.5,1.1-1.2,2.1-2,2.9-.8.8-1.8,1.4-2.8,1.8-1.1.4-2.2.6-3.3.6h-5.5ZM140.7,403.2l-6.1-8,3.3-.4,6.5,8.2h0c0,.1-3.6.1-3.6.1Z"
                      />
                      <path
                        className="st-white"
                        d="M148.3,403.2v-23.5h3.1v23.5h-3.1ZM153.9,394h-3.8v-2.7h3.7c1.1,0,1.9-.3,2.5-.8s1-1.2,1.4-2l4.2-8.9h3.3v.3l-4.6,9.5c-.4.8-.9,1.6-1.5,2.3s-1.3,1.2-2.1,1.6c-.8.4-1.9.6-3,.6ZM158.2,391.9l7,10.9v.3h-3.5l-5.9-9.6,2.5-1.6Z"
                      />
                      <path
                        className="st-white"
                        d="M167.9,403.2l2.6-15.6c.2-1.3.5-2.5,1-3.5.4-1,1-1.8,1.7-2.5s1.6-1.2,2.8-1.6,2.5-.5,4.1-.5,1.6,0,2.4.1c.8,0,1.6.2,2.5.4v.4c0,.4,0,1,0,1.6,0,.7,0,1.3,0,2v19.2h-3.1v-19.3c0-.4,0-.8,0-1.2,0-.4,0-.7.1-1.1l.5.9c-.3-.1-.6-.2-1-.3-.4,0-.8,0-1.3,0-1.4,0-2.6.2-3.4.6-.8.4-1.5,1-1.9,1.8-.4.8-.7,1.8-1,3l-2.6,15.6h-3.2ZM171.2,396v-2.7h11.8v2.7h-11.8Z"
                      />
                      <path
                        className="st-white"
                        d="M191,403.2v-23.5h2.6l13.5,14.2v4.4l-13.8-14.6.8-.4v19.7h-3.1ZM205.6,403.2v-23.5h3.1v23.5h-3.1Z"
                      />
                      <path
                        className="st-white"
                        d="M215.5,394.2h4.8c0,0,2.5,0,2.5,0h2.5s-.2,3-.2,3l-4.7-.2h-2.5c0,.1-2.2,0-2.2,0h-2.4v-3c0,0,2.3.1,2.3.1Z"
                      />
                      <path
                        className="st-white"
                        d="M228,403.2l2.6-15.6c.2-1.3.5-2.5,1-3.5.4-1,1-1.8,1.7-2.5s1.6-1.2,2.8-1.6,2.5-.5,4.1-.5,1.6,0,2.4.1c.8,0,1.6.2,2.5.4v.4c0,.4,0,1,0,1.6,0,.7,0,1.3,0,2v19.2h-3.1v-19.3c0-.4,0-.8,0-1.2,0-.4,0-.7.1-1.1l.5.9c-.3-.1-.6-.2-1-.3-.4,0-.8,0-1.3,0-1.4,0-2.6.2-3.4.6-.8.4-1.5,1-1.9,1.8-.4.8-.7,1.8-1,3l-2.6,15.6h-3.2ZM231.3,396v-2.7h11.8v2.7h-11.8Z"
                      />
                      <path
                        className="st-white"
                        d="M251.2,403.2v-23.5h3.1v20.7h10v2.7h-13.2Z"
                      />
                      <path
                        className="st-white"
                        d="M268.5,403.2v-23.5h2.6l8.3,12.9h-1.3l8.3-12.9h2.6v23.5h-3.1v-18.3l.7.2-6.5,10.1h-2.5l-6.5-10.1.7-.2v18.3h-3.1Z"
                      />
                      <path
                        className="st-white"
                        d="M295.2,403.2v-23.5h2.6l13.5,14.2v4.4l-13.8-14.6.8-.4v19.7h-3.1ZM309.8,403.2v-23.5h3.1v23.5h-3.1Z"
                      />
                      <path
                        className="st-white"
                        d="M317.6,403.2l2.6-15.6c.2-1.3.5-2.5,1-3.5.4-1,1-1.8,1.7-2.5s1.6-1.2,2.8-1.6c1.1-.3,2.5-.5,4.1-.5s1.6,0,2.4.1c.8,0,1.6.2,2.5.4v.4c0,.4,0,1,0,1.6,0,.7,0,1.3,0,2v19.2h-3.1v-19.3c0-.4,0-.8,0-1.2,0-.4,0-.7.1-1.1l.5.9c-.3-.1-.6-.2-1-.3-.4,0-.8,0-1.3,0-1.4,0-2.6.2-3.4.6-.8.4-1.5,1-1.9,1.8-.4.8-.7,1.8-1,3l-2.6,15.6h-3.2ZM320.9,396v-2.7h11.8v2.7h-11.8Z"
                      />
                      <path
                        className="st-white"
                        d="M339.7,399.3h.3c.5.3,1.1.5,1.8.7.7.2,1.4.4,2.2.5.8.1,1.6.2,2.6.2s2-.1,2.8-.3c.8-.2,1.5-.6,1.9-1,.5-.5.7-1.2.7-2s-.3-1.8-.9-2.2-1.5-.8-2.7-1l-2.9-.5c-1.1-.2-2.1-.5-3-1.1-.9-.5-1.6-1.2-2.2-2.1-.5-.9-.8-2.1-.8-3.5s.4-3.2,1.2-4.3c.8-1.1,2-1.9,3.4-2.5,1.5-.5,3.2-.8,5.1-.8s1.8,0,2.7.3c.9.2,1.6.4,2.2.7v3h-.3c-.5-.3-1.2-.5-2-.7-.8-.2-1.7-.3-2.9-.3s-2.3.2-3.3.5c-1,.3-1.8.8-2.3,1.5-.6.7-.9,1.6-.9,2.6s.4,2.3,1.1,2.9,1.7.9,3,1.2l2.9.5c1.1.2,2.1.5,2.9,1,.8.5,1.5,1.1,1.9,1.9s.7,1.8.7,2.9-.2,2-.6,2.8c-.4.8-1,1.5-1.7,2-.8.5-1.6.9-2.7,1.2s-2.2.4-3.5.4-1.8,0-2.6-.2c-.8-.1-1.6-.2-2.3-.4s-1.3-.4-1.9-.6v-3.1Z"
                      />
                      <path
                        className="st-white"
                        d="M359.8,403.2v-23.5h3.1v23.5h-3.1ZM361.6,382.4v-2.7h13v2.7h-13ZM361.6,392.2v-2.7h11.2v2.7h-11.2ZM361.6,403.2v-2.7h13.4v2.7h-13.4Z"
                      />
                      <path
                        className="st-white"
                        d="M379.9,403.2v-23.5h3.1v23.5h-3.1ZM385.5,394h-3.8v-2.7h3.7c1.1,0,1.9-.3,2.5-.8.6-.5,1-1.2,1.4-2l4.2-8.9h3.3v.3l-4.6,9.5c-.4.8-.9,1.6-1.5,2.3-.6.7-1.3,1.2-2.1,1.6-.8.4-1.9.6-3,.6ZM389.8,391.9l7,10.9v.3h-3.5l-5.9-9.6,2.5-1.6Z"
                      />
                    </g>
                    <rect
                      className="st-white"
                      x="238.4"
                      y="123.1"
                      width="22.8"
                      height="22.8"
                      rx="1.2"
                      ry="1.2"
                      transform="translate(-21.9 216) rotate(-45)"
                    />
                    <g>
                      <path
                        className="st-white"
                        d="M286.1,162h-71.7c-2.9,0-5.3,2.4-5.3,5.3v34.7c0,2.9,2.4,5.3,5.3,5.3h26.4c2.5,0,4.5,2,4.5,4.5h0c0,2.5-2,4.5-4.5,4.5h-35.4c-3,0-5.4-2.4-5.4-5.4v-44.5c0-2.5-2-4.5-4.5-4.5h-9.1c-2.5,0-4.5,2-4.5,4.5v62.6c0,3,2.4,5.4,5.4,5.4h71.7c2.5,0,4.5-2,4.5-4.5v-36.3c0-2.5-2-4.5-4.5-4.5h-27.2c-2.5,0-4.5-2-4.5-4.5h0c0-2.5,2-4.5,4.5-4.5h54.4c2.5,0,4.5-2,4.5-4.5v-9.1c0-2.5-2-4.5-4.5-4.5Z"
                      />
                      <rect
                        className="st-white"
                        x="299.7"
                        y="162"
                        width="18.1"
                        height="99.7"
                        rx="4.5"
                        ry="4.5"
                      />
                      <path
                        className="st-white"
                        d="M286.1,189.2h-9.1c-2.5,0-4.5,2-4.5,4.5v45.4c0,2.5-2,4.5-4.5,4.5h-18.2c-2.5,0-4.5,2-4.5,4.5v9.1c0,2.5,2,4.5,4.5,4.5h31.8c5,0,9-4,9-9v-59c0-2.5-2-4.5-4.5-4.5Z"
                      />
                    </g>
                    <g>
                      <path
                        className="st-white"
                        d="M315,145c-3.4-15.2-17-25.1-30.2-34.7-15.6-11.3-30.3-22-31.2-40.7,0-.3,0-.6,0-.8,0-.3,0-.6,0-1,0-2.1-1.7-3.8-3.8-3.8h0c-2.1,0-3.8,1.7-3.8,3.8h0c0,.6,0,1.2,0,1.8-.9,18.7-15.6,29.4-31.2,40.7-13.2,9.6-26.8,19.5-30.2,34.7-10,1.6-17.7,10.3-17.7,20.7v107.5c0,2.6,2.3,4.7,4.9,4.4l2.7-.3s0,0,0,0v-111.5c0-7.4,6-13.4,13.4-13.4s3.6-1.4,3.8-3.3c1.7-13.7,14.3-22.9,27.7-32.6,11.6-8.4,24.3-17.6,30.5-31,6.2,13.4,18.9,22.6,30.5,31,13.3,9.7,25.9,18.9,27.7,32.6.2,1.9,1.9,3.3,3.8,3.3,7.4,0,13.4,6,13.4,13.4v111.5s6.3.7,6.3.7c.7,0,1.3-.5,1.3-1.2v-111.1c0-10.5-7.7-19.2-17.7-20.7Z"
                      />
                      <rect
                        className="st-white"
                        x="166.9"
                        y="271.5"
                        width="165.9"
                        height="6.7"
                        rx=".9"
                        ry=".9"
                      />
                    </g>
                  </svg>
                  <p className="text-xs text-white">دليلك الذكي للمناسك</p>
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
                      مباشر
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
