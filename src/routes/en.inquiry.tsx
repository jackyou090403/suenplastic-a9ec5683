import { createFileRoute } from "@tanstack/react-router";
import { InquiryPage, makeInquiryHead } from "./inquiry";

export const Route = createFileRoute("/en/inquiry")({
  head: () => makeInquiryHead("en"),
  component: InquiryPage,
});
