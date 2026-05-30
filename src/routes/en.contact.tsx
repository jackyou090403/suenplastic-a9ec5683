import { createFileRoute } from "@tanstack/react-router";
import { ContactPage, makeContactHead } from "./contact";

export const Route = createFileRoute("/en/contact")({
  head: () => makeContactHead("en"),
  component: ContactPage,
});
