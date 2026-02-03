import ProductDetailsClient from "./ProductDetailsClient";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; productId: string }>;
}) {
  const resolvedParams = await params;
  return <ProductDetailsClient params={resolvedParams} />;
}
