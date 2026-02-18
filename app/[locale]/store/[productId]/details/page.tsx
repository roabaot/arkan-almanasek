import { getProductById } from "@/app/api";
import ProductDetailsClient from "./ProductDetailsClient";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; productId: string }>;
}) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.productId);

  console.log("product: ", product);

  return <ProductDetailsClient params={resolvedParams} product={product} />;
}
