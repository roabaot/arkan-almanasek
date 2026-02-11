import StoreClient from "./StoreClient";
import { getCategories, getProducts, getTags } from "@/app/api";

export default async function StorePage() {
  const [products, categories, tagsRes] = await Promise.all([
    getProducts(),
    getCategories(),
    getTags(),
  ]);

  const tags = tagsRes.tags;

  return (
    <StoreClient
      initialProducts={products}
      categories={categories}
      tags={tags}
    />
  );
}
