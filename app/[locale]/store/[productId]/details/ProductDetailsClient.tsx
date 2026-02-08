"use client";

import Link from "next/link";
import ProductDetailsTabs from "./ProductDetailsTabs";
import ProductMainSection from "./ProductMainSection";

import type { GalleryImage, PageParams } from "./types";

const GALLERY: readonly GalleryImage[] = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk-mi84DUNVCNTUQFmZDzFQBsI-7emHWhsJiPFGVuq8veScoZbop0SBrvG5P9p6HkHYBt1VmZTVX5dETMRGCbQ2MD9PsnpYEel14_l8P_XY8SH9Ho7xfW-ybFRDZpQ0iI1LqzHVS0KdE4tWnXG11-qRLJv1_ABVutkxFZ6WeWenCWrOKANVQmI35OWuDEz9sMnPwmT01fhgzH8eDHvqtPMskW1DmbFncoUVeeeiqke1JZcLTnNaZCsltie3xZwIP8Wh69-1ZTtaIsz",
    alt: "Luxury Ihram clothing folded neatly",
    dataAlt: "Luxury Hajj kit main view showing folded Ihram and accessories",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDf8Q3TOKhjhEcuSjY6TN5-FW-uY7LIIrAKH-dHEURiT1GEpUc6lsAWcdFlNXhJZ9yeO4umX5sCuChIjIcO85KeEbieiFtAx-QDnA_Mw9y0ld3q-lCSeLWEZdrxfOnypNY2ld_y6nz1ILX_txKHLgzUGe3bOSmTiVcrWc2T30JaTKmBeHDGrZJtv1Ut_w_ps8vJ8W_KmSffKjWahPi_Q5n_bL7NpE7ao2wR3hlIE0zoOwbs0n-SnClHndyGvtCvj-OpAsZi6RiJtWPy",
    alt: "Main product thumbnail",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuABXaUTouXM2eYC_fx5spgwJ28g_Ed-aM0cSrp3DFHF_J2onquwjCjyEV4MhsidHO7GeegiN1Rbl3WJwfGEMy7wX7pSjJMvtRbGOPzMVNBWH6EsPjkd64wE15Lhhyrk0wJK_HXxZEIoV4URtdc4n80qRvpB6purTotCsg575Sss_2fnGHEG-tMXzIWXk62HdXhWwJ-ac2nDI_NTut7Uhnq5mBBv_nNLujAtMYEHHSedK4JCQ5n6KNSXwqHEsrQp6cnRliA33OmRF-qt",
    alt: "Prayer beads accessory",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUy2xIn92h-TLRSkysK5iuhnDx5CAq4vfEobZ6TqvWmdnUOfO5couCg8oSW51zRoaz5gFwvpqSawfpGphLFJx2PFXWhW47Jxzd8irzfrxAj8TlkidDgcNu23FPlcW7PAutQ_8Zn1beGuwvUt-PFZlECQDT8WPglT0fkzsDrohgJ_ALQIDOhVCPlmJCblLpD1IL34fnDiRM7GdasX-jC0tt-1Ze1eaJYTCEOdHl8BgZ_cMqYYkm3PKf_Azh6BD_QxRqR3XRh23Y-KeS",
    alt: "Packaging box",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnMlkkaQrFwsyO5ixrl-0OJiaNxRQsfNO7S_CtL9l_WD8Tcnzr73CBWL7jeuaBvmOBRg-FxSpotxv3HDLa8Oj0wcNrJDbRLyjxWoLrk-SKRXqgQeDa21B6pEulRgVBrvp_22LN3SRlIDZcPjXizkg_t2Peb_RTo15F03IihKntFVM4i7woPcYw9B_blV9jLGW4Ghs2MT2GZRcGC1EnlP4CZ3a1xXMA8QnBichZbm0Bv1ZCAKk0i705TgDgoriH0qyK1OPNc1bFFjZN",
    alt: "Travel bag included",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDf8Q3TOKhjhEcuSjY6TN5-FW-uY7LIIrAKH-dHEURiT1GEpUc6lsAWcdFlNXhJZ9yeO4umX5sCuChIjIcO85KeEbieiFtAx-QDnA_Mw9y0ld3q-lCSeLWEZdrxfOnypNY2ld_y6nz1ILX_txKHLgzUGe3bOSmTiVcrWc2T30JaTKmBeHDGrZJtv1Ut_w_ps8vJ8W_KmSffKjWahPi_Q5n_bL7NpE7ao2wR3hlIE0zoOwbs0n-SnClHndyGvtCvj-OpAsZi6RiJtWPy",
    alt: "Main product thumbnail",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuABXaUTouXM2eYC_fx5spgwJ28g_Ed-aM0cSrp3DFHF_J2onquwjCjyEV4MhsidHO7GeegiN1Rbl3WJwfGEMy7wX7pSjJMvtRbGOPzMVNBWH6EsPjkd64wE15Lhhyrk0wJK_HXxZEIoV4URtdc4n80qRvpB6purTotCsg575Sss_2fnGHEG-tMXzIWXk62HdXhWwJ-ac2nDI_NTut7Uhnq5mBBv_nNLujAtMYEHHSedK4JCQ5n6KNSXwqHEsrQp6cnRliA33OmRF-qt",
    alt: "Prayer beads accessory",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUy2xIn92h-TLRSkysK5iuhnDx5CAq4vfEobZ6TqvWmdnUOfO5couCg8oSW51zRoaz5gFwvpqSawfpGphLFJx2PFXWhW47Jxzd8irzfrxAj8TlkidDgcNu23FPlcW7PAutQ_8Zn1beGuwvUt-PFZlECQDT8WPglT0fkzsDrohgJ_ALQIDOhVCPlmJCblLpD1IL34fnDiRM7GdasX-jC0tt-1Ze1eaJYTCEOdHl8BgZ_cMqYYkm3PKf_Azh6BD_QxRqR3XRh23Y-KeS",
    alt: "Packaging box",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnMlkkaQrFwsyO5ixrl-0OJiaNxRQsfNO7S_CtL9l_WD8Tcnzr73CBWL7jeuaBvmOBRg-FxSpotxv3HDLa8Oj0wcNrJDbRLyjxWoLrk-SKRXqgQeDa21B6pEulRgVBrvp_22LN3SRlIDZcPjXizkg_t2Peb_RTo15F03IihKntFVM4i7woPcYw9B_blV9jLGW4Ghs2MT2GZRcGC1EnlP4CZ3a1xXMA8QnBichZbm0Bv1ZCAKk0i705TgDgoriH0qyK1OPNc1bFFjZN",
    alt: "Travel bag included",
  },
] as const;

export default function ProductDetailsClient({
  params,
}: {
  params: PageParams;
}) {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
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

      {/* Product Main Section */}
      <ProductMainSection params={params} gallery={GALLERY} />

      {/* Details Section Tabs */}
      <ProductDetailsTabs />
    </main>
  );
}
