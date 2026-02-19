import FaqAccordion from "./FaqAccordion";
import { faqs } from "./badalContent";

export default function FaqSection() {
  return (
    <section className="py-20 bg-surface-light dark:bg-surface-dark" id="faq">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          الأسئلة الشائعة
        </h2>

        <FaqAccordion faqs={faqs} />
      </div>
    </section>
  );
}
