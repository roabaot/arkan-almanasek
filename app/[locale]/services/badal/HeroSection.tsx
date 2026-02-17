import Image from "next/image";
import { MdPlayCircleOutline, MdVerifiedUser } from "react-icons/md";

export default function HeroSection() {
  return (
    <header className="relative overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 pattern-bg z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-light dark:to-background-dark z-0" />

      <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-right space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
            <MdVerifiedUser className="text-base" aria-hidden />
            <span>خدمة موثقة شرعياً وقانونياً</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
            الحج والعمرة <br />
            <span className="text-primary">بدلًا عن الغير</span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
            نؤدي عن أحبابكم العاجزين أو المتوفين فريضة الحج والعمرة بأمانة
            وإخلاص، عبر طلاب علم مؤهلين وموثوقين، مع توثيق كامل لكافة المناسك.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <a
              href="#pricing"
              className="bg-primary text-white px-8 py-3.5 rounded-lg font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 transform hover:-translate-y-1 text-center"
            >
              ابدأ الطلب الآن
            </a>

            <a
              href="#process"
              className="bg-white dark:bg-surface-dark text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-8 py-3.5 rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
            >
              <MdPlayCircleOutline className="text-2xl" aria-hidden />
              شاهد فيديو تعريفي
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl opacity-30" />

          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-surface-dark">
            <div className="relative w-full h-[500px]">
              <Image
                alt="Holy Kaaba in Mecca with pilgrims circumambulating"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY5q5WrkWCj6qhYFLf6DkUF1eUA3hI5tyW0Dk4xZgHJVVmVVBVh9c5VyUOjy2uothwiL4nTRNuvlRDfNDYuUfwFKPZGvCPHVFHIAe0YpX2uHG3yEraaGmoit1T2GkAFE5M8IHsOZ_p3CigIIhbUQ_5U9TcILhHNUCixMvwwXYxBlLdR3DHj4i0a1i4NVFIAj6XzD2OWYF3wD1iSHFZUO85FHjfS1n7mfs-qeeeiSGZAYXftYaSHE5kzkMmTaK8rL6l5qkodwtZnbv3"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
              <p className="font-bold text-lg">
                أمانة في الأداء .. وتوثيق بالصوت والصورة
              </p>
            </div>
          </div>

          <div className="absolute -bottom-6 rtl:left-6 ltr:right-6 bg-white dark:bg-surface-dark p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 hidden md:flex items-center gap-4 max-w-xs">
            <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-full">
              <span className="sr-only">تم التحقق</span>
              <MdVerifiedUser className="text-2xl" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                أكثر من ٥٠٠٠ مناسك
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                تم أداؤها بنجاح هذا العام
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
