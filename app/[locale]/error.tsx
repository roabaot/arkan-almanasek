"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const tCommon = useTranslations("common");

  useEffect(() => {
    // Keep logging minimal but useful for debugging.
    console.error(error);
  }, [error]);

  return (
    <section className="py-20 bg-white dark:bg-surface-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-text-main dark:text-white mb-6">
          {tCommon("error")}
        </h1>
        <button
          type="button"
          onClick={reset}
          className="bg-primary hover:bg-primary-dark text-white text-lg font-bold py-4 px-10 rounded-xl shadow-lg shadow-primary/30 transition-all"
        >
          {tCommon("try_again")}
        </button>
      </div>
    </section>
  );
}
