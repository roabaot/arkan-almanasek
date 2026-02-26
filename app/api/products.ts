import { apiFetch, PaginationT } from "./base";

/* ========= Types ========= */

export type TagT = {
  id: number;
  code: string;
  name: string;
  color?: string;
  created_at?: string;
  updated_at?: string;
};

export type CategoryT = {
  id: number;
  code: string;
  name: string;
  created_at?: string;
  updated_at?: string;
};

export type ProductT = {
  id: number;
  name: string;
  price: number;
  discount_price?: number;
  image: string;
  code: string;
  description: string;
  details: string;
  quantity: number;
  available: boolean;
  category: string | CategoryT | null;
  tag: string | null;
  images: string[];
  specifications: {
    logo: string;
    name: string;
    description: string;
  }[];
  created_at?: string;
  updated_at?: string;
};

export type ProductsResT = {
  products: ProductT[];
  pagination: PaginationT;
};

/* ========= API ========= */
export function getProducts(
  params?: {
    category_id?: string;
    tag_id?: string;
    search?: string;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
    available?: boolean;
    is_home?: boolean;
    page?: number;
    perPage?: number;
  },
  _locale?: string,
): Promise<ProductsResT> {
  void _locale;
  const query = new URLSearchParams();

  if (params?.category_id)
    query.set("filter_by[category_id]", params.category_id);
  if (params?.tag_id) query.set("filter_by[tag_id]", params.tag_id);
  if (params?.search) query.set("filter_by[search]", params.search);
  // if (params?.sort) query.set("filter_by[sort]", params.sort);
  if (params?.minPrice !== undefined)
    query.set("filter_by[min_price]", String(params.minPrice));
  if (params?.maxPrice !== undefined)
    query.set("filter_by[max_price]", String(params.maxPrice));
  if (params?.available !== undefined)
    query.set("filter_by[available]", String(params.available));

  if (params?.page !== undefined) query.set("page", String(params.page));
  if (params?.perPage !== undefined)
    query.set("per_page", String(params.perPage));

  // console.log("query: ", query.toString());

  // query.set(
  //   "locale",
  //   typeof window !== "undefined"
  //     ? window.location.pathname.split("/")?.[1] || "en"
  //     : "en",
  // );
  return apiFetch<ProductsResT>(`/products?${query.toString()}`);
}

export function getProductById(id: number | string, _locale?: string) {
  void _locale;
  return apiFetch<ProductT>(`/products/${id}`);
}

export function getCategories(_locale?: string) {
  void _locale;
  return apiFetch<CategoryT[]>("/categories");
}

export function getTags(_locale?: string) {
  void _locale;
  return apiFetch<{ tags: TagT[] }>("/tags");
}
