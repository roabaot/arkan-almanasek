export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-surface-light dark:bg-surface-dark relative">
      <div className="absolute inset-0 bg-islamic-pattern pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          شريكك الموثوق في رحلة العمر
        </h2>
        <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-loose">
            تتطلب رحلة الحج والعمرة دقة في الإجراءات والتزاماً بالأنظمة
            المتغيرة. نحن نتولى عنك الجانب الإداري المعقد، بدءاً من تقديم الطلب
            وحتى استلام التصريح النهائي، مع ضمان الامتثال الكامل لاشتراطات وزارة
            الحج والعمرة. هدفنا هو أن تكون رحلتك ميسرة وخالية من أي عقبات
            إدارية.
          </p>
        </div>
      </div>
    </section>
  );
}
