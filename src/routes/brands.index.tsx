import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { useLang, ui, listBrands, listProducts, lp, type Lang } from "@/i18n";
import { ArrowRight } from "lucide-react";

const SITE = "https://suenplastic.com";

export function makeBrandsIndexHead(lang: Lang) {
  const url = lang === "zh" ? `${SITE}/brands` : `${SITE}/en/brands`;
  const title = lang === "zh"
    ? "品牌代理 — 十大全球工程塑料品牌 | 塑恩贸易"
    : "Brands — 10 Global Engineering Plastics Brands | SUEN Plastic";
  const desc = lang === "zh"
    ? "塑恩贸易代理十大全球工程塑料品牌：宝理 Polyplastics、旭化成 Asahi Kasei、长春 CCP、帝人 Teijin、塞拉尼斯 Celanese、苏威 Solvay、UMG ABS、LATI、亚聚 APC、台聚 USI。"
    : "SUEN Plastic distributes 10 global engineering plastics brands: Polyplastics, Asahi Kasei, CCP, Teijin, Celanese, Solvay, UMG ABS, LATI, APC and USI.";
  return {
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:url", content: url },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "zh-CN", href: `${SITE}/brands` },
      { rel: "alternate", hrefLang: "en", href: `${SITE}/en/brands` },
    ],
  };
}

export const Route = createFileRoute("/brands/")({
  head: () => makeBrandsIndexHead("zh"),
  component: BrandsIndexPage,
});

export function BrandsIndexPage() {
  const lang = useLang();
  const brands = listBrands(lang);
  const products = listProducts(lang);
  // unused notFound silenced
  void notFound;
  return (
    <Layout>
      <PageHeader kicker="Brands" title={ui.page.brandsTitle[lang]} desc={ui.page.brandsDesc[lang]} />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 space-y-10">
        {brands.map((b) => {
          const list = products.filter((p) => p.brand === b.slug);
          return (
            <div key={b.slug} className="grid gap-8 rounded-2xl border border-border bg-card p-8 shadow-card md:grid-cols-[1fr_2fr] md:p-10">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.25em] text-accent">{b.origin} · {ui.common.authorized[lang]}</div>
                <h2 className="mt-3 font-display text-3xl font-semibold">{b.name}</h2>
                {lang === "zh" && <div className="text-base text-muted-foreground">{b.nameEn}</div>}
                <p className="mt-4 text-sm leading-relaxed text-foreground/75">{b.description}</p>
                <Link to={lp(`/brands/${b.slug}`, lang) as any} className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
                  {ui.common.viewDetail[lang]} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {list.map((p) => (
                  <Link key={p.slug} to={lp(`/products/${p.slug}`, lang) as any} className="rounded-lg border border-border bg-background p-4 transition-colors hover:border-accent">
                    <div className="font-display font-semibold">{p.series}</div>
                    <div className="text-xs text-muted-foreground">{p.material}</div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </Layout>
  );
}
