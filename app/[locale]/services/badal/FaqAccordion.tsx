"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useMemo, useState } from "react";
import { MdExpandMore } from "react-icons/md";

type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  faqs: readonly FaqItem[];
};

export default function FaqAccordion({ faqs }: Props) {
  const baseId = useId();
  const [openIndices, setOpenIndices] = useState<Set<number>>(() => new Set());

  const openSet = useMemo(() => openIndices, [openIndices]);

  function toggleIndex(index: number) {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openSet.has(index);
        const contentId = `${baseId}-faq-${index}`;

        return (
          <div
            key={faq.question}
            className="group bg-background-light dark:bg-background-dark rounded-xl p-4 border border-gray-100 dark:border-gray-700"
          >
            <button
              type="button"
              className="w-full flex items-center justify-between cursor-pointer text-right"
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => toggleIndex(index)}
            >
              <h4 className="font-bold text-gray-900 dark:text-white">
                {faq.question}
              </h4>

              <motion.span
                className="text-gray-500"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <MdExpandMore aria-hidden />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={contentId}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
