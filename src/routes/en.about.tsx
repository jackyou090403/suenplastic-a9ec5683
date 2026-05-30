import { createFileRoute } from "@tanstack/react-router";
import { AboutPage, makeAboutHead } from "./about";

export const Route = createFileRoute("/en/about")({
  head: () => makeAboutHead("en"),
  component: AboutPage,
});
