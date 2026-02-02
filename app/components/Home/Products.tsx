import { RiArrowLeftLine, RiShoppingCartLine } from "react-icons/ri";

type Product = {
  title: string;
  subtitle: string;
  price: string;
  imageUrl: string;
  badge?: {
    label: string;
    className: string;
  };
};

const PRODUCTS: Product[] = [
  {
    title: "طقم إحرام فاخر",
    subtitle: "قطن مصري ١٠٠٪ غير مخيط",
    price: "١٥٠ ر.س",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCGcTeeE9WSxjwjTIqaaETe5dr6_1642agmD464BwoeKv-3ebEqr2oLhz7c-AUEnSuKjIIoSS2-Fp2mOsxpB_SZCG7hLZue2ja8IKdv_R3mqcaNsfpyGeBwqLc-m7ozP-HFvSTz-JTwTX2Gl-dIQSEVOYUY6b_Wto8Ssfr6U3CHFH6xsQEqLf31ot5fp58BsEwTwSfUDs5ApFHyXFe0rLeY9tTWQiQgayA0ObE6qNVkyh1hflcpvYN8SLJ1fWoSon1vkxS18kxUyQuR",
    badge: {
      label: "الأكثر مبيعاً",
      className: "bg-[#d4af37]/90",
    },
  },
  {
    title: "سجادة صلاة محمولة",
    subtitle: "خفيفة الوزن ومضادة للماء",
    price: "٤٥ ر.س",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDiMnzSUm1BjDbsKWeefq2QzDmiB6VERdbxum3tbYSBDE2at9lKxvtuIiw1dCofiujxPKK_gZanbk87HIh_4HO8x1_bh5n9sfvnLznW3QoqxrEFyyjN6vkdHtLca2NLmvURp5rtma-irryYqKLzeZphjHc-6bonKnfUdSxhLDVRSnMA5OmKhlwlDHdM81HNKIvi7kbsf93GM_lMM0abSLFSSCNwGIIc2yY6ls-0SDdUJbjSUCIej7hU-XYyylSTG4fM2nK4-l8cg5kN",
  },
  {
    title: "حقيبة عناية شخصية",
    subtitle: "منتجات خالية من العطور للمحرم",
    price: "٨٠ ر.س",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBK6cJlryYLAOU5V_1sh3hait4Wsard5Pb3qHS22S9FcNp1JRy9vCT2X9K14_ZH5drk7ONtchSux1kB0-mQGonrw3nX4ZF3OvEefVD8_2D-LUGZ92z7pjmgOemL_eV11cN43wX7y1ZwY-SA3-OmufZyHfm2-Kjdn6pj4YpxH1hkfm7pvSKNuyCI9pyau8rLxNqiILIlicarhchRm8bcE4_Z0Oc_mzLj4ukNQjipWyzZRBo38I2hKMzR7thOzEPs1oXa2IhiIO8nsxiN",
  },
  {
    title: "سبحة إلكترونية",
    subtitle: "عداد ذكي مع شاشة LED",
    price: "٢٥ ر.س",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDG-j2UIaM5D9LPNtnhWoM3D8Rb4fnGu_SEi-yfUiA0D8Ab-oRKMHVZIr6RlSLG7Gcpjz0bUVDMFErd8IyT0Cd1L88YCEHROOdIK-OP7mX82U8gp2GJv2wnqnBRSBmOkyDZori23hYKqAtdgnOfsif_JSDil3l1tJ8lRzEzDT-jtvziVMcLxIMg2C3fGj3utaPzBJTrX5xnmOAT5H38jijfrkp4zzcpCgm00xFwuYrz4CIPZVuVCw9woWd6rxVzhMw_qcF6jeBYTWJb",
    badge: {
      label: "عرض خاص",
      className: "bg-red-500",
    },
  },
];

export default function HomeProducts() {
  return (
    <section
      id="products"
      className="bg-[#f6f8f6] px-4 py-16 dark:bg-[#162616] sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-[#111811] dark:text-white md:text-3xl">
            <span className="block h-8 w-2 rounded-full bg-[#14b814]" />
            منتجات مختارة
          </h2>

          <a
            className="group flex items-center gap-1 font-bold text-[#14b814] hover:text-[#109e10]"
            href="#"
          >
            عرض الكل
            <RiArrowLeftLine className="text-xl transition-transform group-hover:-translate-x-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <div
              key={product.title}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg dark:bg-[#1e2e1e]"
            >
              <div className="relative h-64 bg-gray-100 dark:bg-gray-800">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  data-alt={product.title}
                  style={{ backgroundImage: `url('${product.imageUrl}')` }}
                />

                {product.badge ? (
                  <div
                    className={`absolute right-3 top-3 rounded px-2 py-1 text-xs font-bold text-white ${product.badge.className}`}
                  >
                    {product.badge.label}
                  </div>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
                  {product.title}
                </h3>
                <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
                  {product.subtitle}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-bold text-[#14b814]">
                    {product.price}
                  </span>

                  <button
                    type="button"
                    className="flex size-10 items-center justify-center rounded-lg bg-gray-100 text-gray-900 transition-colors hover:bg-[#14b814] hover:text-white dark:bg-[#2a4a2a] dark:text-white dark:hover:bg-[#14b814]"
                    aria-label={`إضافة ${product.title} إلى السلة`}
                  >
                    <RiShoppingCartLine className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
