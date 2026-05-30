import { createFileRoute, notFound } from "@tanstack/react-router";
import { BrandDetailPage, makeBrandHead } from "./brands.$brand";
import { getBrand } from "@/i18n";

export const Route = createFileRoute("/en/brands/$brand")({
  head: ({ params }) => makeBrandHead("en", params.brand),
  loader: ({ params }) => {
    const b = getBrand(params.brand, "en");
    if (!b) throw notFound();
    return { slug: params.brand };
  },
  component: BrandDetailPage,
});
