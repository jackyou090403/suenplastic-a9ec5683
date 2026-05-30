import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProductDetailPage, makeProductHead } from "./products.$slug";
import { getProduct } from "@/i18n";

export const Route = createFileRoute("/en/products/$slug")({
  head: ({ params }) => makeProductHead("en", params.slug),
  loader: ({ params }) => {
    const p = getProduct(params.slug, "en");
    if (!p) throw notFound();
    return { slug: params.slug };
  },
  component: ProductDetailPage,
});
