type PermitCard = {
  title: string;
  description: string;
  icon: string;
  detailsHref: string;
};

export default function PermitTypesSection({
  cards,
}: {
  cards: readonly PermitCard[];
}) {
  return (
    <section className="py-16 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            أنواع التصاريح المتاحة
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            اختر نوع الخدمة التي تناسب احتياجاتك
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group bg-white dark:bg-surface-dark rounded-xl p-8 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span
                  className="material-symbols-outlined text-3xl"
                  aria-hidden
                >
                  {card.icon}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {card.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                {card.description}
              </p>
              <a
                className="inline-flex items-center text-primary font-medium hover:underline"
                href={card.detailsHref}
              >
                المزيد من التفاصيل
                <span
                  className="material-symbols-outlined text-sm mr-1 rtl:rotate-180"
                  aria-hidden
                >
                  arrow_forward
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
