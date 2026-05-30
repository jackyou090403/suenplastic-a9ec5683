import { createFileRoute } from "@tanstack/react-router";
import { ProductsPage, makeProductsHead } from "./products";

export const Route = createFileRoute("/en/products")({
  head: () => makeProductsHead("en"),
  component: ProductsPage,
});
