"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { FaCircleCheck } from "react-icons/fa6";
// import { HiOutlineClipboardList } from "react-icons/hi";

const SuccessPage = () => {
  const router = useRouter();
  const { locale } = useParams<{ locale: string }>();
  const t = useTranslations("success_page");

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   if (locale) {
    //     router.push(`/${locale}`);
    //   } else {
    //     router.push("/");
    //   }
    // }, 5000);
    // return () => clearTimeout(timer);
  }, [locale, router]);

  const handleBackToHome = () => {
    if (locale) {
      router.push(`/${locale}`);
    } else {
      router.push("/");
    }
  };

  //   const handleViewSubmission = () => {
  //     router.back();
  //   };

  //   const handleCopyReference = () => {
  //     const referenceId = "#TRX-8829-AB";
  //     if (navigator?.clipboard?.writeText) {
  //       navigator.clipboard.writeText(referenceId).catch(() => {
  //         // ignore copy errors
  //       });
  //     }
  //   };

  return (
    <div className="bg-[#f8fafc] antialiased text-slate-800 font-display transition-colors duration-500">
      <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[rgba(79,112,230,0.20)] rounded-full blur-[80px] pointer-events-none animate-float" />
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[80px] pointer-events-none animate-float z-30"
          style={{ animationDelay: "2s" }}
        />

        <div className="h-16 w-full shrink-0" />

        <div className="flex-1 flex flex-col items-center justify-center px-8 w-full max-w-lg mx-auto z-10">
          <div className="w-full flex flex-col items-center animate-scale-in">
            <div className="relative flex items-center justify-center mb-10 group">
              <div className="absolute w-32 h-32 border border-[rgba(79,112,230,0.20)] rounded-full animate-[ping_3s_ease-in-out_infinite] opacity-50" />
              <div
                className="absolute w-40 h-40 border border-[rgba(79,112,230,0.10)] rounded-full animate-[ping_3s_ease-in-out_infinite] opacity-30"
                style={{ animationDelay: "0.5s" }}
              />
              <div className="absolute inset-0 bg-[rgba(79,112,230,0.20)] rounded-full blur-xl transform group-hover:scale-110 transition-transform duration-500" />
              <div className="relative z-10 flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-[#4f70e6] to-[#6d86eb] text-white shadow-lg">
                  {/* <span className="material-symbols-outlined text-[28px] font-bold">
                    check
                  </span> */}
                  <FaCircleCheck size={24} />
                </div>
              </div>
            </div>

            <div
              className="flex flex-col items-center gap-3 text-center animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              <h1 className="text-slate-900 text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-700 to-slate-500 [unicode-bidi:plaintext]">
                {t("title")}
              </h1>
              <p className="text-slate-500 text-base leading-relaxed max-w-[300px] font-medium">
                {t("message")}
              </p>
            </div>

            {/* <div
              className="mt-8 w-full bg-white/50 backdrop-blur-sm border border-white/60 rounded-2xl p-4 flex items-center gap-4 animate-fade-up shadow-sm"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(79,112,230,0.10)] text-[#4f70e6]">
                <HiOutlineClipboardList size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {t("reference_label")}
                </span>
                <span className="text-sm font-medium text-slate-700 font-mono">
                  {t("reference_value")}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyReference}
                className="ms-auto text-xs font-medium text-[#4f70e6] hover:text-[#3e5bc4] transition-colors"
              >
                {t("copy_button")}
              </button>
            </div> */}
          </div>
        </div>

        <div
          className="relative w-full z-20 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="absolute bottom-full left-0 w-full h-12 bg-gradient-to-t from-[#f8fafc] to-transparent pointer-events-none" />
          <div className="bg-[#f8fafc] px-6 pb-8 pt-2 flex flex-col gap-3 max-w-lg mx-auto">
            <button
              type="button"
              onClick={handleBackToHome}
              className="group relative flex w-full items-center justify-center overflow-hidden rounded-2xl h-14 bg-[#4f70e6] text-white hover:bg-[#3e5bc4] active:scale-[0.98] transition-all duration-300 shadow-xl"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              <span className="text-[15px] font-semibold tracking-wide">
                {t("back_home")}
              </span>
            </button>
            {/* <button
              type="button"
              onClick={handleViewSubmission}
              className="flex w-full items-center justify-center rounded-2xl h-12 bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors duration-200"
            >
              <span className="text-[14px] font-medium">
                {t("view_submission")}
              </span>
            </button> */}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeUp {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-scale-in {
          animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default SuccessPage;
