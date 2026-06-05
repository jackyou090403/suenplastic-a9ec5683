import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import {
  collectAllUrls,
  buildUrlsetXml,
  buildSitemapIndexXml,
  chunk,
  MAX_URLS_PER_SITEMAP,
} from "@/lib/sitemap-data";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = await collectAllUrls();
        const today = new Date().toISOString().slice(0, 10);

        let xml: string;
        if (urls.length <= MAX_URLS_PER_SITEMAP) {
          xml = buildUrlsetXml(urls);
        } else {
          const shards = chunk(urls, MAX_URLS_PER_SITEMAP);
          xml = buildSitemapIndexXml(shards.length, today);
        }

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
