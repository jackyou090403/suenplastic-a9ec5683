import { createFileRoute } from "@tanstack/react-router";
import { HomePage, makeHomeHead } from "./index";

export const Route = createFileRoute("/en/")({
  head: () => makeHomeHead("en"),
  component: HomePage,
});
