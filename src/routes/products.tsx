import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { useState } from "react";
import { useLang, ui, listBrands, listMaterials, listProducts, lp, type Lang } from "@/i18n";

const SITE = "https://suenplastic.com";

export function makeProductsHead(lang: Lang) {
  const url = lang === "zh" ? `${SITE}/products` : `${SITE}/en/products`;
  const title = lang === "zh"
    ? "产品中心 — 十大品牌工程塑料牌号 | 塑恩贸易"
    : "Products — Engineering Plastics Grades from 10 Brands | SUEN Plastic";
  const desc = lang === "zh"
    ? "塑恩贸易产品中心，覆盖 POM、PA66、PBT、PC、PPS、PEEK、LCP、mPPO 等工程塑料系列，宝理、旭化成、长春、帝人、塞拉尼斯、苏威等十大品牌牌号。"
    : "SUEN Plastic product catalog: POM, PA66, PBT, PC, PPS, PEEK, LCP, mPPO and more from 10 brands including Polyplastics, Asahi Kasei, CCP, Teijin, Celanese, Solvay.";
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
      { rel: "alternate", hrefLang: "zh-CN", href: `${SITE}/products` },
      { rel: "alternate", hrefLang: "en", href: `${SITE}/en/products` },
    ],
  };
}

export const Route = createFileRoute("/products")({
  head: () => makeProductsHead("zh"),
  component: ProductsPage,
});

export function ProductsPage() {
  const lang = useLang();
  const brands = listBrands(lang);
  const materials = listMaterials(lang);
  const products = listProducts(lang);
  const [brand, setBrand] = useState<string>("all");
  const [mat, setMat] = useState<string>("all");
  const filtered = products.filter((p) => (brand === "all" || p.brand === brand) && (mat === "all" || p.material.includes(mat)));

  return (
    <Layout>
      <PageHeader kicker="Products" title={ui.page.productsTitle[lang]} desc={ui.page.productsDesc[lang]} />
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-8 space-y-4 rounded-xl border border-border bg-card p-5">
          <FilterRow label={ui.inquiry.brand[lang]}>
            <Chip active={brand === "all"} onClick={() => setBrand("all")}>{ui.inquiry.any[lang]}</Chip>
            {brands.map((b) => (
              <Chip key={b.slug} active={brand === b.slug} onClick={() => setBrand(b.slug)}>{b.name}</Chip>
            ))}
          </FilterRow>
          <FilterRow label={ui.inquiry.material[lang]}>
            <Chip active={mat === "all"} onClick={() => setMat("all")}>{ui.inquiry.any[lang]}</Chip>
            {materials.map((m) => (
              <Chip key={m.code} active={mat === m.code} onClick={() => setMat(m.code)}>{m.code}</Chip>
            ))}
          </FilterRow>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link key={p.slug} to={lp(`/products/${p.slug}`, lang) as any} className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-accent">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-display text-xl font-semibold">{p.series}</div>
                  <div className="text-sm text-muted-foreground">{p.material}</div>
                </div>
                <span className="rounded-full bg-secondary px-2 py-1 text-[10px] font-medium uppercase tracking-wider">{brands.find((b) => b.slug === p.brand)?.name}</span>
              </div>
              <p className="mt-4 text-sm text-foreground/80">{p.feature}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.grades.map((g) => <span key={g} className="rounded bg-secondary px-2 py-0.5 text-[11px] text-foreground/70">{g}</span>)}
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-border p-16 text-center text-muted-foreground">
            {lang === "zh" ? "暂无该筛选下的产品，请联系我们咨询其他牌号。" : "No products match the filter. Please contact us for other grades."}
          </div>
        )}
      </section>
    </Layout>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${active ? "bg-deep text-deep-foreground" : "bg-secondary text-foreground/70 hover:bg-secondary/70"}`}>
      {children}
    </button>
  );
}
