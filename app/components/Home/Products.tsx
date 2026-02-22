"use client";
import { getProducts, ProductsResT } from "@/app/api";
import { Link } from "@/i18n/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { RiArrowLeftLine, RiShoppingCartLine } from "react-icons/ri";

export default function HomeProducts({
  initialProducts,
}: {
  initialProducts?: ProductsResT;
}) {
  const t = useTranslations("home.products");
  const { data } = useQuery({
    queryKey: ["products-section"],
    queryFn: () =>
      getProducts({
        tag_id: "1",
        page: 1,
        perPage: 3,
      }),
    initialData: initialProducts,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });

  const products = data?.products || [];

  // const products: Product[] = [
  //   {
  //     id: "ihram-set",
  //     title: t("items.ihram-set.title"),
  //     subtitle: t("items.ihram-set.subtitle"),
  //     price: t("items.ihram-set.price"),
  //     imageAlt: t("items.ihram-set.imageAlt"),
  //     imageUrl:
  //       "https://lh3.googleusercontent.com/aida-public/AB6AXuCGcTeeE9WSxjwjTIqaaETe5dr6_1642agmD464BwoeKv-3ebEqr2oLhz7c-AUEnSuKjIIoSS2-Fp2mOsxpB_SZCG7hLZue2ja8IKdv_R3mqcaNsfpyGeBwqLc-m7ozP-HFvSTz-JTwTX2Gl-dIQSEVOYUY6b_Wto8Ssfr6U3CHFH6xsQEqLf31ot5fp58BsEwTwSfUDs5ApFHyXFe0rLeY9tTWQiQgayA0ObE6qNVkyh1hflcpvYN8SLJ1fWoSon1vkxS18kxUyQuR",
  //     badge: {
  //       label: t("items.ihram-set.badgeLabel"),
  //       className: "bg-[#d4af37]/90",
  //     },
  //   },
  //   {
  //     id: "portable-prayer-rug",
  //     title: t("items.portable-prayer-rug.title"),
  //     subtitle: t("items.portable-prayer-rug.subtitle"),
  //     price: t("items.portable-prayer-rug.price"),
  //     imageAlt: t("items.portable-prayer-rug.imageAlt"),
  //     imageUrl:
  //       "https://lh3.googleusercontent.com/aida-public/AB6AXuDiMnzSUm1BjDbsKWeefq2QzDmiB6VERdbxum3tbYSBDE2at9lKxvtuIiw1dCofiujxPKK_gZanbk87HIh_4HO8x1_bh5n9sfvnLznW3QoqxrEFyyjN6vkdHtLca2NLmvURp5rtma-irryYqKLzeZphjHc-6bonKnfUdSxhLDVRSnMA5OmKhlwlDHdM81HNKIvi7kbsf93GM_lMM0abSLFSSCNwGIIc2yY6ls-0SDdUJbjSUCIej7hU-XYyylSTG4fM2nK4-l8cg5kN",
  //   },
  //   {
  //     id: "personal-care-kit",
  //     title: t("items.personal-care-kit.title"),
  //     subtitle: t("items.personal-care-kit.subtitle"),
  //     price: t("items.personal-care-kit.price"),
  //     imageAlt: t("items.personal-care-kit.imageAlt"),
  //     imageUrl:
  //       "https://lh3.googleusercontent.com/aida-public/AB6AXuBK6cJlryYLAOU5V_1sh3hait4Wsard5Pb3qHS22S9FcNp1JRy9vCT2X9K14_ZH5drk7ONtchSux1kB0-mQGonrw3nX4ZF3OvEefVD8_2D-LUGZ92z7pjmgOemL_eV11cN43wX7y1ZwY-SA3-OmufZyHfm2-Kjdn6pj4YpxH1hkfm7pvSKNuyCI9pyau8rLxNqiILIlicarhchRm8bcE4_Z0Oc_mzLj4ukNQjipWyzZRBo38I2hKMzR7thOzEPs1oXa2IhiIO8nsxiN",
  //   },
  //   {
  //     id: "electronic-misbah",
  //     title: t("items.electronic-misbah.title"),
  //     subtitle: t("items.electronic-misbah.subtitle"),
  //     price: t("items.electronic-misbah.price"),
  //     imageAlt: t("items.electronic-misbah.imageAlt"),
  //     imageUrl:
  //       "https://lh3.googleusercontent.com/aida-public/AB6AXuDG-j2UIaM5D9LPNtnhWoM3D8Rb4fnGu_SEi-yfUiA0D8Ab-oRKMHVZIr6RlSLG7Gcpjz0bUVDMFErd8IyT0Cd1L88YCEHROOdIK-OP7mX82U8gp2GJv2wnqnBRSBmOkyDZori23hYKqAtdgnOfsif_JSDil3l1tJ8lRzEzDT-jtvziVMcLxIMg2C3fGj3utaPzBJTrX5xnmOAT5H38jijfrkp4zzcpCgm00xFwuYrz4CIPZVuVCw9woWd6rxVzhMw_qcF6jeBYTWJb",
  //     badge: {
  //       label: t("items.electronic-misbah.badgeLabel"),
  //       className: "bg-red-500",
  //     },
  //   },
  // ];

  return (
    <section
      id="products"
      className="bg-[#f6f8f6] px-4 py-16 dark:bg-[#162616] sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-[#111811] dark:text-white md:text-3xl">
            <span className="block h-8 w-2 rounded-full bg-primary" />
            {t("sectionTitle")}
          </h2>

          <Link
            className="group flex items-center gap-1 font-bold text-primary hover:text-primary/90 transition-colors"
            href="/store"
          >
            {t("viewAll")}
            <RiArrowLeftLine className="text-xl transition-transform rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1 ltr:rotate-180" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                key={`${product.name}-${product.id}`}
                href={`/store/${product.id}/details`}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm cursor-pointer transition duration-300 hover:shadow-lg hover:bg-gray-50 dark:bg-[#1e2e1e]"
              >
                <div className="relative h-64 bg-gray-100 dark:bg-gray-800">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    data-alt={product.name}
                    style={{ backgroundImage: `url('${product.image}')` }}
                  />

                  {/* {product.badge ? (
                    <div
                      className={`absolute right-3 top-3 rounded px-2 py-1 text-xs font-bold text-white ${product.badge.className}`}
                    >
                      {product.badge.label}
                    </div>
                  ) : null} */}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
                    {product.name}
                  </h3>
                  <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
                    {product.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      {product.price}
                    </span>

                    <button
                      type="button"
                      className="flex size-10 items-center justify-center rounded-lg bg-gray-100 text-gray-900 transition-colors hover:bg-primary hover:text-white dark:bg-[#2a4a2a] dark:text-white dark:hover:bg-primary"
                      aria-label={t("addToCartAria", { title: product.name })}
                    >
                      <RiShoppingCartLine className="text-xl" />
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div
              role="status"
              className="sm:col-span-2 lg:col-span-4 rounded-2xl bg-white p-6 text-center text-sm font-medium text-gray-700 shadow-sm dark:bg-[#1e2e1e] dark:text-gray-200"
            >
              {t("emptyMessage")}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
