import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { ArrowLeft, FileText, Phone, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useLang, ui, getBrand, getProduct, listProducts, getCompany, lp, type Lang } from "@/i18n";

const SITE = "https://suenplastic.com";

export function makeProductHead(lang: Lang, slug: string) {
  const p = getProduct(slug, lang);
  const b = p ? getBrand(p.brand, lang) : undefined;
  const url = lang === "zh" ? `${SITE}/products/${slug}` : `${SITE}/en/products/${slug}`;
  const altZh = `${SITE}/products/${slug}`;
  const altEn = `${SITE}/en/products/${slug}`;
  const title = p
    ? lang === "zh"
      ? `${p.series} ${p.material} 原料 — ${b?.name} 授权代理 | 厦门塑恩贸易`
      : `${p.series} ${p.material} — ${b?.name} Authorized Distributor | SUEN Plastic`
    : "Product";
  const desc = p
    ? lang === "zh"
      ? `${b?.name} ${p.series} ${p.material} 工程塑料原料，可供牌号：${p.grades.join("、")}。${p.feature} 应用于${p.applications.join("、")}。原厂授权代理，现货供应，电话 0592-5526472。`
      : `${b?.name} ${p.series} ${p.material} engineering plastic. Grades: ${p.grades.join(", ")}. ${p.feature}. Applications: ${p.applications.join(", ")}. Authorized distributor, in stock. Tel +86-592-5526472.`
    : "";
  return {
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:url", content: url },
      { property: "og:type", content: "product" },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "zh-CN", href: altZh },
      { rel: "alternate", hrefLang: "en", href: altEn },
    ],
    scripts: p && b
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: `${b.name} ${p.series} ${p.material}`,
              description: p.feature,
              category: `Engineering plastic / ${p.material}`,
              brand: { "@type": "Brand", name: b.name },
              manufacturer: { "@type": "Organization", name: b.nameEn },
              model: p.grades,
              url,
              offers: {
                "@type": "Offer",
                priceCurrency: "CNY",
                availability: "https://schema.org/InStock",
                seller: { "@type": "Organization", name: "Xiamen SUEN Plastic Trading Co., Ltd.", telephone: "+86-592-5526472" },
              },
            }),
          },
        ]
      : [],
  };
}

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => makeProductHead("zh", params.slug),
  component: ProductDetailPage,
  loader: ({ params }) => {
    const p = getProduct(params.slug, "zh");
    if (!p) throw notFound();
    return { slug: params.slug };
  },
  notFoundComponent: () => <NotFound />,
});

function NotFound() {
  const lang = useLang();
  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl font-semibold">{ui.common.productNotFound[lang]}</h1>
        <Link to={lp("/products", lang) as any} className="mt-6 inline-block text-accent hover:underline">← {ui.common.backToProducts[lang]}</Link>
      </div>
    </Layout>
  );
}

// ============ TOC section definitions ============
type SectionDef = { id: string; zh: string; en: string };
const SECTIONS: SectionDef[] = [
  { id: "intro",     zh: "1. 产品简介",        en: "1. Overview" },
  { id: "basic",     zh: "2. 基础物性表",      en: "2. Physical Properties" },
  { id: "mechanic",  zh: "3. 力学性能表",      en: "3. Mechanical Properties" },
  { id: "thermal",   zh: "4. 热性能表",        en: "4. Thermal Properties" },
  { id: "flame",     zh: "5. 阻燃及耐化学性",  en: "5. Flammability & Chemical Resistance" },
  { id: "process",   zh: "6. 成型加工工艺",    en: "6. Processing Guide" },
  { id: "cases",     zh: "7. 应用案例",        en: "7. Application Cases" },
];

function useScrollSpy(ids: string[], offset = 120) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + offset;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offset]);
  return active;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo({ top, behavior: "smooth" });
}

// ============ Section content tables ============
type Row = [string, string];
const t = (zh: string, en: string, lang: Lang) => (lang === "zh" ? zh : en);
const NA = (lang: Lang) => t("以原厂 TDS 为准 / 联系销售", "Refer to original TDS / Contact sales", lang);

function basicRows(lang: Lang): Row[] {
  return [
    [t("项目 / Item", "Item", lang), t("典型值 / Typical", "Typical Value", lang)],
    [t("密度", "Density", lang), t("1.30 – 1.45 g/cm³", "1.30 – 1.45 g/cm³", lang)],
    [t("吸水率 (23℃, 24h)", "Water Absorption (23℃, 24h)", lang), "0.20 – 0.80 %"],
    [t("熔体流动速率 MFR", "MFR", lang), t("依牌号而异 / 见 TDS", "Varies by grade / see TDS", lang)],
    [t("成型收缩率", "Mold Shrinkage", lang), "0.3 – 2.0 %"],
    [t("颜色", "Color", lang), t("本色 / 黑色 / 可定制", "Natural / Black / Custom", lang)],
  ];
}
function mechRows(lang: Lang): Row[] {
  return [
    [t("项目 / Item", "Item", lang), t("典型值 / Typical", "Typical Value", lang), t("测试标准", "Standard", lang)],
    [t("拉伸强度", "Tensile Strength", lang), "60 – 180 MPa", "ISO 527"],
    [t("断裂伸长率", "Elongation at Break", lang), "2 – 50 %", "ISO 527"],
    [t("弯曲强度", "Flexural Strength", lang), "90 – 260 MPa", "ISO 178"],
    [t("弯曲模量", "Flexural Modulus", lang), "2,500 – 11,000 MPa", "ISO 178"],
    [t("Izod 缺口冲击 (23℃)", "Izod Notched Impact (23℃)", lang), "4 – 18 kJ/m²", "ISO 180"],
    [t("洛氏硬度", "Rockwell Hardness", lang), "M70 – M95", "ISO 2039"],
  ];
}
function thermalRows(lang: Lang): Row[] {
  return [
    [t("项目 / Item", "Item", lang), t("典型值 / Typical", "Typical Value", lang)],
    [t("熔点 / 软化温度", "Melting / Softening Point", lang), "165 – 340 ℃"],
    [t("热变形温度 HDT (1.8 MPa)", "HDT (1.8 MPa)", lang), "75 – 270 ℃"],
    [t("维卡软化温度", "Vicat Softening Temp.", lang), "100 – 280 ℃"],
    [t("长期使用温度", "Continuous Use Temp.", lang), "80 – 220 ℃"],
    [t("线膨胀系数 CLTE", "CLTE", lang), "2 – 10 × 10⁻⁵ /K"],
  ];
}
function flameRows(lang: Lang): Row[] {
  return [
    [t("项目 / Item", "Item", lang), t("等级 / 结果", "Rating / Result", lang)],
    [t("UL94 阻燃等级", "UL94 Flame Rating", lang), t("HB / V-2 / V-0（依牌号）", "HB / V-2 / V-0 (grade dependent)", lang)],
    [t("氧指数 LOI", "Oxygen Index (LOI)", lang), "22 – 45 %"],
    [t("耐酸 / 碱", "Acid / Alkali Resistance", lang), t("良好（稀酸碱）", "Good (dilute)", lang)],
    [t("耐有机溶剂", "Organic Solvents", lang), t("耐汽油、酮、酯、醇", "Resistant to fuel, ketones, esters, alcohols", lang)],
    [t("耐水解性", "Hydrolysis Resistance", lang), t("良好，可长期接触热水", "Good, suitable for hot-water contact", lang)],
  ];
}
function processRows(lang: Lang): Row[] {
  return [
    [t("项目 / Item", "Item", lang), t("推荐范围 / Recommended", "Recommended Range", lang)],
    [t("干燥温度 / 时间", "Drying Temp. / Time", lang), "80 – 120 ℃ × 4 – 6 h"],
    [t("料筒温度", "Barrel Temperature", lang), "200 – 340 ℃"],
    [t("模具温度", "Mold Temperature", lang), "40 – 140 ℃"],
    [t("注射压力", "Injection Pressure", lang), "60 – 120 MPa"],
    [t("螺杆转速", "Screw Speed", lang), "60 – 120 rpm"],
    [t("背压", "Back Pressure", lang), "5 – 15 MPa"],
  ];
}

// ============ Main page ============
export function ProductDetailPage() {
  const lang = useLang();
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug, lang)!;
  const brand = getBrand(p.brand, lang)!;
  const company = getCompany(lang);
  const related = listProducts(lang).filter((x) => x.material === p.material && x.slug !== p.slug).slice(0, 3);
  const active = useScrollSpy(SECTIONS.map((s) => s.id));

  const sectionTitle = (id: string) => SECTIONS.find((s) => s.id === id)![lang === "zh" ? "zh" : "en"];

  return (
    <Layout>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
          <Link to={lp("/products", lang) as any} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> {ui.common.backToProducts[lang]}
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-border bg-gradient-deep text-deep-foreground">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
          <div className="text-xs font-medium uppercase tracking-[0.25em] text-cyan">{brand.name} · {p.material}</div>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-5xl">{p.series}</h1>
          <p className="mt-3 max-w-3xl text-base opacity-85 md:text-lg">{p.feature}</p>
        </div>
      </section>

      {/* Two-column: sticky TOC + content */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          {/* LEFT: Sticky TOC */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav aria-label={t("章节目录", "Sections", lang)} className="rounded-xl border border-border bg-card p-3">
              <div className="px-2 pb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {t("章节目录", "Contents", lang)}
              </div>
              <ul className="space-y-0.5">
                {SECTIONS.map((s) => {
                  const isActive = active === s.id;
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => scrollToId(s.id)}
                        className={
                          "block w-full rounded-md px-3 py-2 text-left text-sm transition-colors " +
                          (isActive
                            ? "bg-accent/10 font-medium text-accent"
                            : "text-foreground/75 hover:bg-secondary/60 hover:text-foreground")
                        }
                      >
                        {lang === "zh" ? s.zh : s.en}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* RIGHT: Content */}
          <div className="min-w-0 space-y-14">
            {/* 1. 产品简介 */}
            <article id="intro" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-semibold">{sectionTitle("intro")}</h2>
              <p className="mt-3 text-foreground/80">{p.feature}</p>
              <div className="mt-5 overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                  <tbody>
                    {([
                      [t("品牌", "Brand", lang), brand.name],
                      [t("系列", "Series", lang), p.series],
                      [t("材料", "Material", lang), p.material],
                      [t("可供牌号", "Available Grades", lang), p.grades.join(lang === "zh" ? "、" : ", ")],
                      [t("产地", "Origin", lang), brand.origin],
                      [t("典型应用", "Typical Applications", lang), p.applications.join(lang === "zh" ? "、" : ", ")],
                      [t("包装", "Packaging", lang), t("25kg/袋，1000kg/托", "25kg/bag, 1000kg/pallet", lang)],
                      [t("起订量 MOQ", "MOQ", lang), t("25kg 起订", "From 25kg", lang)],
                      [t("交期", "Lead Time", lang), t("现货 3–7 天，期货 4–6 周", "Stock 3–7 days, order 4–6 weeks", lang)],
                      [t("提供资料", "Documents", lang), t("TDS / MSDS / COA / RoHS / REACH", "TDS / MSDS / COA / RoHS / REACH", lang)],
                    ] as Row[]).map(([k, v]) => (
                      <tr key={k} className="border-b border-border last:border-0">
                        <td className="w-44 bg-secondary/50 px-4 py-3 align-top font-medium text-muted-foreground">{k}</td>
                        <td className="px-4 py-3 text-foreground/85">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            {/* 2-6. data tables */}
            <DataSection id="basic"    title={sectionTitle("basic")}    rows={basicRows(lang)}   note={NA(lang)} />
            <DataSection id="mechanic" title={sectionTitle("mechanic")} rows={mechRows(lang)}    note={NA(lang)} />
            <DataSection id="thermal"  title={sectionTitle("thermal")}  rows={thermalRows(lang)} note={NA(lang)} />
            <DataSection id="flame"    title={sectionTitle("flame")}    rows={flameRows(lang)}   note={NA(lang)} />
            <DataSection id="process"  title={sectionTitle("process")}  rows={processRows(lang)} note={t("以上为通用参考，具体牌号请以原厂 TDS 为准。", "Reference values only; refer to original TDS for each grade.", lang)} />

            {/* 7. 应用案例 */}
            <article id="cases" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-semibold">{sectionTitle("cases")}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {p.applications.map((a, i) => (
                  <div key={a} className="rounded-xl border border-border bg-card p-5">
                    <div className="text-xs font-medium uppercase tracking-widest text-accent">
                      {t(`案例 ${i + 1}`, `Case ${i + 1}`, lang)}
                    </div>
                    <div className="mt-2 font-display text-lg font-semibold">{a}</div>
                    <p className="mt-2 text-sm text-foreground/75">
                      {t(
                        `${brand.name} ${p.series}（${p.material}）在${a}领域可提供优异的综合性能，已有量产案例。`,
                        `${brand.name} ${p.series} (${p.material}) delivers proven performance for ${a} applications.`,
                        lang,
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* CTA */}
            <div className="rounded-2xl bg-gradient-deep p-7 text-deep-foreground shadow-deep">
              <div className="text-xs font-medium uppercase tracking-widest opacity-70">{ui.product.requestQuote[lang]}</div>
              <h3 className="mt-2 font-display text-2xl font-semibold">{ui.product.requestQuoteTitle[lang]} · {p.series}</h3>
              <p className="mt-2 text-sm opacity-80">{ui.product.quoteDesc[lang]}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to={lp("/inquiry", lang) as any} className="rounded-md bg-cyan px-5 py-3 font-medium text-deep transition-transform hover:-translate-y-0.5">
                  {ui.common.inquireOnline[lang]}
                </Link>
                <a href={`tel:${company.phone}`} className="inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm hover:bg-white/10"><Phone className="h-4 w-4" /> {company.phone}</a>
                <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2 rounded-md border border-white/30 px-5 py-3 text-sm hover:bg-white/10"><Mail className="h-4 w-4" /> {company.email}</a>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs opacity-70">
                <FileText className="h-4 w-4" /> {ui.product.docDownload[lang]} — {ui.product.docDownloadDesc[lang]}
              </div>
            </div>

            {related.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-semibold">{ui.product.related[lang]}</h2>
                <div className="mt-6 grid gap-5 md:grid-cols-3">
                  {related.map((r) => (
                    <Link key={r.slug} to={lp(`/products/${r.slug}`, lang) as any} className="rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent">
                      <div className="font-display text-lg font-semibold">{r.series}</div>
                      <div className="text-sm text-muted-foreground">{getBrand(r.brand, lang)?.name} · {r.material}</div>
                      <p className="mt-3 text-sm text-foreground/75 line-clamp-2">{r.feature}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function DataSection({ id, title, rows, note }: { id: string; title: string; rows: Row[]; note?: string }) {
  const [head, ...body] = rows;
  return (
    <article id={id} className="scroll-mt-24">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      <div className="mt-4 overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/60">
              {head.map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((r, i) => (
              <tr key={i} className="border-t border-border">
                {r.map((c, j) => (
                  <td key={j} className="px-4 py-3 text-foreground/85">{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="mt-3 text-xs text-muted-foreground">※ {note}</p>}
    </article>
  );
}
