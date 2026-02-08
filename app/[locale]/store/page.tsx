import { Link } from "@/i18n/navigation";
import {
  RiApps2Line,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiHeartLine,
  RiPriceTag3Line,
  RiSearchLine,
  RiShoppingBagLine,
} from "react-icons/ri";

const products = [
  {
    id: "ihram-set",
    category: "ملابس الإحرام",
    title: "طقم إحرام قطني فاخر",
    description:
      "مصنوع من أجود أنواع القطن المصري، ناعم ومريح لأداء المناسك بكل يسر.",
    price: "120 ر.س",
    imageAlt: "White fabric folded neatly",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChndKbqlxfWp0O8CCUupOKTH2RRyTQKZhS5sKBxUzurFj8yF4aJkRXcVt3vi8UhGhl3X4Q2g8LH2y1u55BUercbihxUJcjFH_EHhyvvEg9Y6THUzKUFWKzyOGINsg6VIuZsZNpKNi1q4KuVufeiJZWayk5tKT4MbHPdjb4CgepYkUAXMab1ocrd3WbkiMoGTspMzCiau7zJq8oclS5o8rOhdDCoexwLFd9mhZol-9y1BRsPZDaXZPQMQx0LJAmRl98TO0rpS_J3CDC",
  },
  {
    id: "madina-quran",
    category: "المصاحف",
    title: "مصحف المدينة المنورة (حجم وسط)",
    description: "طباعة فاخرة وورق عالي الجودة، بغلاف مقوى وتصميم كلاسيكي.",
    price: "55 ر.س",
    originalPrice: "65 ر.س",
    badge: "خصم 15%",
    imageAlt: "Quran book on wooden stand",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAIdX4W4hc8Id4UKXude0oXtKw8m0_Y0nX1UOCPtfXDLauOYjYbq0hzNaSMJZLda1DxQwrma97vqjq0Ysf_N5Cb76e00I9sKm-n9YJe88r2ftGmq1JoIHfYxjEaAe7lqA5lQe9q90gIC8bMkBNoL2JNzKdpmqiDjjKnFk38KubmQ_RoeiFC3wDTGfbaHeuzeiFUQq-NdBtaa96ipU2IEypxza5e_G17Lx2arjKXcKZjxTDnAfrTJK-Sp-Y1gI65AQ87Xi0deGlVCQEu",
  },
  {
    id: "aqeeq-beads",
    category: "المسابح",
    title: "سبحة عقيق يماني أصلي",
    description: "سبحة فاخرة من حجر العقيق الطبيعي، 33 حبة، صناعة يدوية متقنة.",
    price: "180 ر.س",
    imageAlt: "Prayer beads on a textured surface",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAFYQghqmRHW_Fp_3mGgIhdfz1W-YiqryN_UfY-EMgp543tWcBe7oHH0_Uqqf7DC44K1tdP-GaSc0T2AFk1KcuLaFMuegS4-qUyJEq-I_mW3_8-nNRdGjXVdW4v6sYx-DDSlEW9c0_59ZBEjSrzLamHmjQjBU7Vj4wRTcufEFaBmMKnQDURWH3iSSjz6Elqi3sVE3egwoUFSwDO8bd6FTfo8rD02c0QfKZEyeUadxHuqs6TqYWlF2TK_FePN45bAcsHAoC_9oOg6UG1",
  },
  {
    id: "zad-al-maad",
    category: "الكتب الإسلامية",
    title: "زاد المعاد في هدي خير العباد",
    description: "كتاب قيم للإمام ابن قيم الجوزية، طبعة محققة ومخرجة الأحاديث.",
    price: "95 ر.س",
    imageAlt: "Collection of Islamic books stacked",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAk4qCdoFxuBTUR-oIqw5RedZLj_OYYfVNukewOdY_bBQUKKpBVCxDmtUJ8FH92oZg6c3rmthqAA-sycW99AdueVXjnf-15z6Awe2WjW9dOZGStat8y5gxPA6Fw9OXBq5KM8O_C7Z3lcDygIMQ8-BOn0KvGG-LYRBMN0-lOF35b1sgUzVtrCSWtQQnZJGqInt_ggwmjZowDU5XjTlwr7QqCPYVNHQZR9ysvqfnA-pswto3whWkdqu39Akxfp-huJRKsVtnnyF7UcWZx",
  },
  {
    id: "medical-rug",
    category: "سجادات صلاة",
    title: "سجادة صلاة طبية مبطنة",
    description:
      "مصممة لتوفير أقصى درجات الراحة أثناء الصلاة، خاصة لكبار السن.",
    price: "150 ر.س",
    imageAlt: "Islamic prayer rug with intricate patterns",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkiXnvOfK6pzXU71pTsDgnFGefHx8AxZAtjXPEDlgwHuCsQ1at3w9qfeuGDveWGNW5T47MjSIiTox61qpB3RT3yEVJ8J9kHgdsyXx-ycgKPYMpJ8sQoTxlmEWNSsBT1jYBExfTEA5_cQcnEcvA62pz-gPq2bUHriA4ZeEeUifhmkGXsQWqe60YnLhJV9YRL6x1NOoPQf9SKbItTlKKk0ouPqPPP-SCBAZ8WxWHl_r0cHbu7qYKiLJ1hGECLe-_P5YhMCf2Lm3sYmoj",
  },
  {
    id: "oud-oil",
    category: "عطور",
    title: "دهن عود كمبودي فاخر",
    description: "رائحة زكية وثبات عالي، مناسب للاستخدام اليومي والمناسبات.",
    price: "350 ر.س",
    imageAlt: "Small bottle of perfume or musk",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7ssbAQluToO3DxR7TdezM9Yj6n4cRm-b7Nr56mF_ffNjhFJFFhPTqXfpd1ldl65VJnjXqOOQHeM3YfZbtDXs1KU59yq0-Jp-I9GC4VQGSDRqWkzmNN045fWyUNbfupKMGESw0CcblCrnsbow7uvQ_HcoWq5v_P17ZORmotEQHhdmJfcoZmq8iY9c5JxLDDlnkrxCsgO8PBrh8syMr7VL2yxE9sgh5C3_DdICbEVJiNZQt1yy6rATtMSaqvs-A_jNLtc6TEJYUdlKH",
  },
] as const;

const categories = [
  "الكل",
  "ملابس الإحرام",
  "المصاحف",
  "الكتب الإسلامية",
  "المسابح",
  "سجادات صلاة",
] as const;

export default function StorePage() {
  return (
    <>
      <div className="bg-white dark:bg-[#1a160e] border-b border-gray-100 dark:border-[#332e25]">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h2 className="text-3xl font-black text-[#171511] dark:text-white mb-2">
                أركان المناسك
              </h2>
              <p className="text-secondary dark:text-[#d4a86a] text-lg">
                أفضل المنتجات لرحلتك الإيمانية بأسعار تنافسية
              </p>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Breadcrumb" className="flex">
                <ol className="inline-flex items-center gap-2">
                  <li>
                    <Link className="text-gray-500 hover:text-primary" href="/">
                      الرئيسية
                    </Link>
                  </li>
                  <li className="text-gray-400">/</li>
                  <li aria-current="page" className="text-primary font-medium">
                    المتجر
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            <div className="lg:hidden mb-6">
              <div className="relative">
                <input
                  className="w-full h-12 pr-10 pl-4 rounded-xl border border-gray-50 bg-white dark:bg-[#2a241a] shadow-[0_8px_30px_rgb(0,0,0,0.06)] focus:ring-2 focus:ring-primary text-sm transition-shadow"
                  placeholder="ابحث عن منتج..."
                  type="text"
                />
                <RiSearchLine
                  className="absolute top-3 right-3 text-gray-400 text-xl"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-[#2a241a] rounded-xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-[#332e25]">
              <h3 className="text-lg font-bold text-[#171511] dark:text-white mb-4 flex items-center gap-2">
                <RiApps2Line
                  className="text-primary text-xl"
                  aria-hidden="true"
                />
                التصنيفات
              </h3>

              <div className="space-y-3">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
                      name="category"
                      type="radio"
                      defaultChecked={category === "الكل"}
                    />
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#2a241a] rounded-xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-[#332e25]">
              <h3 className="text-lg font-bold text-[#171511] dark:text-white mb-4 flex items-center gap-2">
                <RiPriceTag3Line
                  className="text-primary text-xl"
                  aria-hidden="true"
                />
                السعر
              </h3>

              <div className="space-y-4">
                <input
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  max={1000}
                  min={0}
                  type="range"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>0 ر.س</span>
                  <span>1000 ر.س</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#2a241a] rounded-xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-[#332e25]">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  متوفر فقط
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                </label>
              </div>
            </div>
          </aside>

          <section className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <div className="relative w-full sm:w-96 hidden lg:block">
                <input
                  className="w-full h-12 pr-12 pl-4 rounded-xl border border-gray-50 bg-white dark:bg-[#2a241a] shadow-[0_8px_30px_rgb(0,0,0,0.06)] focus:shadow-[0_8px_30px_rgb(0,0,0,0.12)] focus:ring-1 focus:ring-primary text-base placeholder:text-gray-400 text-[#171511] dark:text-white transition-all"
                  placeholder="ابحث عن ملابس إحرام، مصاحف..."
                  type="text"
                />
                <RiSearchLine
                  className="absolute top-3 right-3 text-gray-400 text-xl"
                  aria-hidden="true"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-gray-500 whitespace-nowrap text-sm font-medium">
                  ترتيب حسب:
                </span>
                <select className="h-12 bg-white dark:bg-[#2a241a] border border-gray-50 rounded-xl text-gray-700 dark:text-gray-200 text-sm focus:ring-2 focus:ring-primary cursor-pointer w-full sm:w-48 shadow-[0_8px_30px_rgb(0,0,0,0.06)] px-4 transition-shadow">
                  <option>الأكثر مبيعاً</option>
                  <option>السعر: من الأقل للأعلى</option>
                  <option>السعر: من الأعلى للأقل</option>
                  <option>الأحدث</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`store/${product.id}/details`}
                  className="group bg-white dark:bg-[#2a241a] rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] hover:-translate-y-2 transition-all duration-500 ease-out border border-gray-50 dark:border-[#332e25] flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={product.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={product.imageSrc}
                    />

                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-secondary shadow-sm">
                      {product.category}
                    </div>

                    {"badge" in product && product.badge ? (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-sm">
                        {product.badge}
                      </div>
                    ) : null}
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-[#171511] dark:text-white line-clamp-2">
                        {product.title}
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="إضافة إلى المفضلة"
                      >
                        <RiHeartLine
                          className="text-[20px]"
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                      {"originalPrice" in product && product.originalPrice ? (
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-400 line-through">
                            {product.originalPrice}
                          </span>
                          <span className="text-xl font-black text-primary">
                            {product.price}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xl font-black text-primary">
                          {product.price}
                        </span>
                      )}

                      <button
                        type="button"
                        className="bg-primary/10 hover:bg-primary text-primary hover:text-white px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 flex items-center gap-2 group/btn"
                      >
                        <RiShoppingBagLine
                          className="text-[18px]"
                          aria-hidden="true"
                        />
                        إضافة للسلة
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <nav aria-label="Pagination" className="flex gap-2">
                <Link
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-gray-500"
                  href="/store"
                  aria-label="الصفحة السابقة"
                >
                  <RiArrowRightSLine className="text-xl" aria-hidden="true" />
                </Link>

                <Link
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/30 transition-all hover:bg-primary/90"
                  href="/store"
                >
                  1
                </Link>
                <Link
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-gray-500 font-medium"
                  href="/store"
                >
                  2
                </Link>
                <Link
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-gray-500 font-medium"
                  href="/store"
                >
                  3
                </Link>

                <span className="w-10 h-10 flex items-center justify-center text-gray-400">
                  ...
                </span>

                <Link
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-gray-500 font-medium"
                  href="/store"
                >
                  10
                </Link>

                <Link
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-gray-500"
                  href="/store"
                  aria-label="الصفحة التالية"
                >
                  <RiArrowLeftSLine className="text-xl" aria-hidden="true" />
                </Link>
              </nav>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
