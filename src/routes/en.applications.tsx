import { createFileRoute } from "@tanstack/react-router";
import { AppPage, makeAppsHead } from "./applications";

export const Route = createFileRoute("/en/applications")({
  head: () => makeAppsHead("en"),
  component: AppPage,
});
