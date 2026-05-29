import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { brands, products } from "@/data/products";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/brands/")({
  head: () => ({
    meta: [
      { title: "品牌代理 — 宝理 / 旭化成 / 长春化工 | 塑恩贸易" },
      { name: "description", content: "塑恩贸易代理三大全球工程塑料品牌：日本宝理 Polyplastics、日本旭化成 Asahi Kasei、台湾长春化工 CCP。" },,
      { property: "og:url", content: "https://suenplastic.com/brands" }
    ],
    links: [{ rel: "canonical", href: "https://suenplastic.com/brands" }],
  }),
  component: BrandsPage,
});

function BrandsPage() {
  return (
    <Layout>
      <PageHeader kicker="Brands" title="品牌代理" desc="三大全球工程塑料领导品牌正品授权代理，从单体到改性料完整产品线覆盖。" />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 space-y-10">
        {brands.map((b) => {
          const list = products.filter(p => p.brand === b.slug);
          return (
            <div key={b.slug} className="grid gap-8 rounded-2xl border border-border bg-card p-8 shadow-card md:grid-cols-[1fr_2fr] md:p-10">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.25em] text-accent">{b.origin} · 授权代理</div>
                <h2 className="mt-3 font-display text-3xl font-semibold">{b.name}</h2>
                <div className="text-base text-muted-foreground">{b.nameEn}</div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/75">{b.description}</p>
                <Link to="/brands/$brand" params={{ brand: b.slug }} className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
                  查看品牌详情 <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {list.map(p => (
                  <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="rounded-lg border border-border bg-background p-4 transition-colors hover:border-accent">
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
