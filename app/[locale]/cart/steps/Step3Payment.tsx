export default function Step3Payment({
  onBack,
  onConfirm,
}: {
  onBack: () => void;
  onConfirm: () => void;
}) {
  return (
    <section className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft p-6 border border-gray-100 dark:border-[#332e25]">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-[#332e25]">
        <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
          3
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          طريقة الدفع
        </h3>
      </div>

      <div className="space-y-4">
        <label className="relative flex items-center p-4 rounded-xl border-2 border-primary bg-primary/5 cursor-pointer transition-all">
          <input
            defaultChecked
            className="size-5 text-primary focus:ring-primary border-gray-300"
            name="payment"
            type="radio"
          />
          <div className="mr-4 flex-1">
            <span className="block font-bold text-gray-900 dark:text-white">
              بطاقة ائتمان / مدى
            </span>
            <span className="block text-sm text-gray-500 dark:text-gray-400">
              ادفع بأمان عبر بطاقتك البنكية
            </span>
          </div>
          <div className="flex gap-2 text-gray-400">
            <span className="material-symbols-outlined">credit_card</span>
          </div>
        </label>

        <label className="relative flex items-center p-4 rounded-xl border border-gray-200 dark:border-[#332e25] hover:bg-gray-50 dark:hover:bg-[#221d14] cursor-pointer transition-all">
          <input
            className="size-5 text-primary focus:ring-primary border-gray-300"
            name="payment"
            type="radio"
          />
          <div className="mr-4 flex-1">
            <span className="block font-bold text-gray-900 dark:text-white">
              Apple Pay
            </span>
            <span className="block text-sm text-gray-500 dark:text-gray-400">
              الدفع السريع عبر آبل باي
            </span>
          </div>
          <div className="flex gap-2 text-gray-400">
            <span className="material-symbols-outlined">phone_iphone</span>
          </div>
        </label>

        <label className="relative flex items-center p-4 rounded-xl border border-gray-200 dark:border-[#332e25] hover:bg-gray-50 dark:hover:bg-[#221d14] cursor-pointer transition-all">
          <input
            className="size-5 text-primary focus:ring-primary border-gray-300"
            name="payment"
            type="radio"
          />
          <div className="mr-4 flex-1">
            <span className="block font-bold text-gray-900 dark:text-white">
              تحويل بنكي
            </span>
            <span className="block text-sm text-gray-500 dark:text-gray-400">
              إرفاق إيصال التحويل
            </span>
          </div>
          <div className="flex gap-2 text-gray-400">
            <span className="material-symbols-outlined">account_balance</span>
          </div>
        </label>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3 rounded-xl border border-gray-200 dark:border-[#332e25] bg-surface-light dark:bg-background-dark text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-50 dark:hover:bg-[#221d14] transition-colors"
        >
          رجوع
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="px-5 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold shadow-lg shadow-primary/30 transition-all"
        >
          تأكيد الدفع
        </button>
      </div>
    </section>
  );
}
