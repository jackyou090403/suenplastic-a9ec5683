import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { brands as staticBrands, products as staticProducts } from "@/data/products";

export const SITE_URL = "https://suenplastic.com";
export const MAX_URLS_PER_SITEMAP = 5000;

export type UrlEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  alternates?: { hreflang: string; href: string }[];
};

const STATIC_PATHS: { path: string; priority: string; changefreq: UrlEntry["changefreq"] }[] = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/products", priority: "0.9", changefreq: "weekly" },
  { path: "/brands", priority: "0.9", changefreq: "weekly" },
  { path: "/applications", priority: "0.8", changefreq: "monthly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.7", changefreq: "monthly" },
];

function pair(zhPath: string, opts: { priority?: string; changefreq?: UrlEntry["changefreq"]; lastmod?: string }): UrlEntry[] {
  const enPath = zhPath === "/" ? "/en" : `/en${zhPath}`;
  const alternates = [
    { hreflang: "zh-CN", href: `${SITE_URL}${zhPath}` },
    { hreflang: "en", href: `${SITE_URL}${enPath}` },
    { hreflang: "x-default", href: `${SITE_URL}${zhPath}` },
  ];
  return [
    { loc: `${SITE_URL}${zhPath}`, alternates, ...opts },
    { loc: `${SITE_URL}${enPath}`, alternates, ...opts },
  ];
}

export async function collectAllUrls(): Promise<UrlEntry[]> {
  const today = new Date().toISOString().slice(0, 10);
  const urls: UrlEntry[] = [];

  for (const s of STATIC_PATHS) {
    urls.push(...pair(s.path, { priority: s.priority, changefreq: s.changefreq, lastmod: today }));
  }

  // Brands
  const seenBrandSlugs = new Set<string>();
  for (const b of staticBrands) seenBrandSlugs.add(b.slug);
  for (const slug of seenBrandSlugs) {
    urls.push(...pair(`/brands/${slug}`, { priority: "0.8", changefreq: "monthly", lastmod: today }));
  }

  // Products: prefer DB, fall back to static
  const productSlugs = new Set<string>();
  let productLastmod: Record<string, string> = {};
  try {
    const { data, error } = await supabaseAdmin
      .from("products")
      .select("slug, updated_at")
      .order("slug", { ascending: true });
    if (!error && data) {
      for (const row of data) {
        if (row?.slug) {
          productSlugs.add(row.slug);
          if (row.updated_at) productLastmod[row.slug] = String(row.updated_at).slice(0, 10);
        }
      }
    }
  } catch {
    // ignore, fall back to static
  }
  if (productSlugs.size === 0) {
    for (const p of staticProducts) productSlugs.add(p.slug);
  }
  for (const slug of productSlugs) {
    urls.push(
      ...pair(`/products/${slug}`, {
        priority: "0.7",
        changefreq: "monthly",
        lastmod: productLastmod[slug] || today,
      }),
    );
  }

  // de-dupe by loc
  const seen = new Set<string>();
  return urls.filter((u) => {
    if (seen.has(u.loc)) return false;
    seen.add(u.loc);
    return true;
  });
}

export function buildUrlsetXml(entries: UrlEntry[]): string {
  const items = entries.map((e) => {
    const alt = (e.alternates ?? [])
      .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`)
      .join("\n");
    return [
      `  <url>`,
      `    <loc>${e.loc}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      alt || null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n");
  });
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
    ...items,
    `</urlset>`,
    ``,
  ].join("\n");
}

export function buildSitemapIndexXml(shardCount: number, lastmod: string): string {
  const items = Array.from({ length: shardCount }, (_, i) =>
    [
      `  <sitemap>`,
      `    <loc>${SITE_URL}/sitemap-${i + 1}.xml</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `  </sitemap>`,
    ].join("\n"),
  );
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...items,
    `</sitemapindex>`,
    ``,
  ].join("\n");
}

export function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}
