import Image from "next/image";

export type CartItem = {
  id: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  quantity: number;
  priceLabel: string;
  badge?: {
    icon: string;
    label: string;
  };
};

export default function CartItemCard({
  item,
  variant,
}: {
  item: CartItem;
  variant: "first" | "stacked";
}) {
  const containerClassName =
    variant === "first"
      ? "flex flex-col sm:flex-row gap-4 mb-6"
      : "flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100 dark:border-[#332e25]";

  return (
    <div className={containerClassName}>
      <div className="relative w-full sm:w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
        <Image
          alt={item.image.alt}
          src={item.image.src}
          fill
          sizes="(max-width: 640px) 100vw, 128px"
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              {item.title}
            </h4>
            <button
              type="button"
              className="text-red-400 hover:text-red-600 transition-colors"
              aria-label="حذف العنصر"
            >
              <span className="material-symbols-outlined text-xl">delete</span>
            </button>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {item.description}
          </p>

          {item.badge ? (
            <div className="flex items-center gap-2 text-sm text-secondary bg-primary/10 w-fit px-2 py-1 rounded-md">
              <span className="material-symbols-outlined text-sm">
                {item.badge.icon}
              </span>
              <span>{item.badge.label}</span>
            </div>
          ) : null}
        </div>

        <div className="flex justify-between items-end mt-4">
          <div className="flex items-center border border-gray-200 dark:border-[#332e25] rounded-lg bg-background-light dark:bg-background-dark">
            <button
              type="button"
              className="flex p-2 text-gray-500 hover:text-primary transition-colors"
              aria-label="تقليل الكمية"
            >
              <span className="material-symbols-outlined text-sm">remove</span>
            </button>
            <span className="px-2 font-medium w-8 text-center text-gray-900 dark:text-white">
              {item.quantity}
            </span>
            <button
              type="button"
              className="flex p-2 text-gray-500 hover:text-primary transition-colors"
              aria-label="زيادة الكمية"
            >
              <span className="material-symbols-outlined text-sm">add</span>
            </button>
          </div>
          <p className="text-xl font-bold text-primary">{item.priceLabel}</p>
        </div>
      </div>
    </div>
  );
}
