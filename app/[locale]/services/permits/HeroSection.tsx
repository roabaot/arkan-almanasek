import Image from "next/image";

export default function HeroSection() {
  return (
    <header className="relative bg-surface-dark overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          alt="Abstract Islamic geometric pattern background"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRggru45c-stCdrpb7ti5__tYTOACdmaBDZvubaUPFke_IKYun9XeU2hGdekRz21xNgrqu5v7EvjJPkVXIZG3XHQMnYVF81BKWUThBQPjACT9uOiqGSHjU3Tj_ybnKfd9SxYm9F3fAAUAwOn1h_b_G_2zk_PJODsdg8r1ca3K66jePRxSYaoZqqda2cy0kwOWI-t5pMxzYRwPFqSKkUAyJ1En-67wZFyZyX9pVcWO-YfxDrPTW8pKpobGIXyMZxK8f6tgvWZs-3GR4"
          fill
          sizes="100vw"
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-medium mb-6 backdrop-blur-sm">
          بوابة الحج والعمرة
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          خدمات التصاريح
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          نحن هنا لتسهيل رحلتك الروحانية. نقدم خدمات إصدار تصاريح الحج والعمرة
          بموثوقية عالية وإجراءات مبسطة تضمن لك راحة البال والتركيز على العبادة.
        </p>
      </div>
    </header>
  );
}
