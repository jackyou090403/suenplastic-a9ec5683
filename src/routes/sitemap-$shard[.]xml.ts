import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { collectAllUrls, buildUrlsetXml, chunk, MAX_URLS_PER_SITEMAP } from "@/lib/sitemap-data";

export const Route = createFileRoute("/sitemap-$shard.xml")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const shardParam = (params as unknown as Record<string, string>).shard ?? (params as unknown as Record<string, string>)["shard.xml"];
        const idx = Number(shardParam);
        if (!Number.isInteger(idx) || idx < 1) {
          return new Response("Not Found", { status: 404 });
        }
        const urls = await collectAllUrls();
        const shards = chunk(urls, MAX_URLS_PER_SITEMAP);
        if (idx > shards.length) {
          return new Response("Not Found", { status: 404 });
        }
        const xml = buildUrlsetXml(shards[idx - 1]);
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
