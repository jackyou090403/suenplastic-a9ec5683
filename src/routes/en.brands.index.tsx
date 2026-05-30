import { createFileRoute } from "@tanstack/react-router";
import { BrandsIndexPage, makeBrandsIndexHead } from "./brands.index";

export const Route = createFileRoute("/en/brands/")({
  head: () => makeBrandsIndexHead("en"),
  component: BrandsIndexPage,
});
