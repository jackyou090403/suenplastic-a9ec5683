import { Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import {
  Activity, ChevronRight, Cog, Download, FileText, Gauge, Layers, Mail, Volume1, Waves, Wrench, Droplets, Info,
} from "lucide-react";
import pellets from "@/assets/hero-pellets.jpg";
import { getBrand, getProduct, listProducts, lp, useLang, type Lang } from "@/i18n";
import type { getGradePage } from "@/lib/grades.functions";

export const WWW = "https://www.suenplastic.com";

type PageData = NonNullable<Awaited<ReturnType<typeof getGradePage>>>;

export function gradePaths(series: string, grade: string) {
  return {
    zh: `/products/${series}/${grade}/`,
    en: `/en/products/${series}/${grade}/`,
  };
}

const plain = (s: string) => s.replace(/®/g, "");

export function makeGradeHead(lang: Lang, series: string, grade: string, data: PageData | null | undefined) {
  const paths = gradePaths(series, grade);
  const url = `${WWW}${lang === "zh" ? paths.zh : paths.en}`;
  if (!data) {
    return { meta: [{ title: "Grade not found | Suen Plastic" }, { name: "robots", content: "noindex" }] };
  }
  const g = data.grade;
  const name = plain(g.grade_name); // "DURACON POM NW-02"
  const title = lang === "en"
    ? `${name} | ${g.subtitle_en} | Suen Plastic`
    : `${name} ${g.subtitle_zh} | ${g.brand_name} | 厦门塑恩贸易`;
  const desc = lang === "en" ? g.meta_description_en : g.meta_description_zh;
  const seriesName = plain(g.series_name);
  const crumbs = lang === "en"
    ? [["Home", `${WWW}/en/`], ["Products", `${WWW}/en/products/`], [seriesName, `${WWW}/en/products/${series}/`], [g.grade_code, url]]
    : [["首页", `${WWW}/`], ["产品", `${WWW}/products/`], [seriesName, `${WWW}/products/${series}/`], [g.grade_code, url]];
  return {
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:url", content: url },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "en", href: `${WWW}${paths.en}` },
      { rel: "alternate", hrefLang: "zh-CN", href: `${WWW}${paths.zh}` },
      { rel: "alternate", hrefLang: "x-default", href: `${WWW}${paths.en}` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name,
          description: desc,
          brand: { "@type": "Brand", name: g.brand_name },
          material: g.material,
          category: `Engineering plastic / ${g.material}`,
          model: g.grade_code,
          url,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: crumbs.map(([n, u], i) => ({ "@type": "ListItem", position: i + 1, name: n, item: u })),
        }),
      },
    ],
  };
}

const T = {
  home: { en: "Home", zh: "首页" },
  products: { en: "Products", zh: "产品" },
  brand: { en: "Brand", zh: "品牌" },
  material: { en: "Material", zh: "材料" },
  grade: { en: "Grade", zh: "牌号" },
  focus: { en: "Application Focus", zh: "应用方向" },
  overview: { en: "Product Overview", zh: "产品简介" },
  sourceFeatures: { en: "Source-based product features", zh: "原厂资料产品特点" },
  keyFeatures: { en: "Key Features", zh: "主要特点" },
  props: { en: "Physical Properties", zh: "物性数据" },
  propsSub: { en: "Typical properties based on the manufacturer's technical data.", zh: "以下为原厂技术资料中的典型物性数据。" },
  colProp: { en: "Property", zh: "项目" },
  colUnit: { en: "Unit", zh: "单位" },
  colMethod: { en: "Test Method", zh: "测试方法" },
  noteTitle: { en: "Important Note:", zh: "重要说明：" },
  note1: { en: "The values shown are representative test values and are not minimum guaranteed values.", zh: "以上数据为代表性测试值，并非最低保证值。" },
  note2: {
    en: "Material properties may vary depending on test conditions, processing conditions and application conditions. Customers should make their own final assessment based on the intended application.",
    zh: "材料性能会因测试条件、加工条件和使用条件而有所不同。客户应根据实际用途自行做出最终评估。",
  },
  apps: { en: "Applications", zh: "应用领域" },
  slidingApps: { en: "Sliding Applications", zh: "滑动应用" },
  gearApps: { en: "Gear Applications", zh: "齿轮应用" },
  perf: { en: "Technical Performance", zh: "技术性能" },
  tds: { en: "Technical Data Sheet", zh: "技术资料" },
  tdsSub: { en: "Original manufacturer technical documentation", zh: "原厂技术资料" },
  tdsBtn: { en: "Download Technical Data Sheet", zh: "下载技术资料" },
  tdsNone: { en: "The data sheet is available on request — contact us and we will send it to you.", zh: "技术资料可向我们索取，联系我们即可获取。" },
  need: { en: "Need", zh: "需要" },
  needSub: { en: "Contact Suen Plastic for availability, quotation and technical information.", zh: "联系塑恩贸易，获取货源、报价与技术资料。" },
  quote: { en: "Request a Quote", zh: "立即询价" },
  contact: { en: "Contact Us", zh: "联系我们" },
  related: { en: "Related Products", zh: "同系列其他牌号" },
  relatedSeries: { en: "Related Product Series", zh: "相关产品系列" },
  viewSeries: { en: "View all grades in this series", zh: "查看该系列全部牌号" },
};

const FEATURE_ICONS = [Waves, Activity, Volume1, Droplets, Wrench, Cog];
const PERF_ICONS = [Waves, Cog, Volume1, Droplets, Layers, Wrench];

export function GradePage({ data, series }: { data: PageData; series: string }) {
  const lang = useLang();
  const t = (k: keyof typeof T) => T[k][lang];
  const g = data.grade;
  const staticSeries = getProduct(series, lang);
  const brandSlug = staticSeries?.brand;
  const brand = brandSlug ? getBrand(brandSlug, lang) : undefined;
  const seriesPlain = plain(g.series_name);
  const relatedSeries = brandSlug
    ? listProducts(lang).filter((p) => p.brand === brandSlug && p.slug !== series).slice(0, 6)
    : [];
  const doc = data.documents.find((d) => d.url) ?? null;
  const quoteSearch = `?brand=${encodeURIComponent(brandSlug ?? "")}&material=${encodeURIComponent(g.material)}&series=${encodeURIComponent(seriesPlain.split(" ")[0])}&grade=${encodeURIComponent(g.grade_code)}`;

  return (
    <Layout>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-border bg-secondary/40">
        <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-4 py-3 text-xs text-muted-foreground md:px-6">
          <li><Link to={lp("/", lang) as any} className="hover:text-foreground">{t("home")}</Link></li>
          <ChevronRight className="h-3 w-3" />
          <li><Link to={lp("/products", lang) as any} className="hover:text-foreground">{t("products")}</Link></li>
          <ChevronRight className="h-3 w-3" />
          <li><Link to={lp(`/products/${series}`, lang) as any} className="hover:text-foreground">{seriesPlain}</Link></li>
          <ChevronRight className="h-3 w-3" />
          <li aria-current="page" className="font-medium text-foreground">{g.grade_code}</li>
        </ol>
      </nav>

      {/* Header */}
      <section className="bg-gradient-deep text-deep-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_1fr] md:px-6 md:py-16">
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-cyan">
              {brand ? (
                <Link to={lp(`/brands/${brandSlug}`, lang) as any} className="hover:underline">{g.brand_name}</Link>
              ) : g.brand_name}
              {" · "}
              <Link to={lp(`/products/${series}`, lang) as any} className="hover:underline">{g.series_name}</Link>
              {" · "}{g.grade_code}
            </div>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-5xl">{g.grade_name}</h1>
            <p className="mt-2 text-lg opacity-85">{lang === "en" ? g.subtitle_en : g.subtitle_zh}</p>
            <dl className="mt-8 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
              <Spec label={t("brand")} value={g.brand_name} />
              <Spec label={t("material")} value={lang === "en" ? g.material_full_en : g.material_full_zh} />
              <Spec label={t("grade")} value={g.grade_code} />
              <Spec label={t("focus")} value={lang === "en" ? g.focus_en : g.focus_zh} />
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`${lp("/inquiry", lang)}${quoteSearch}`} className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90">{t("quote")}</a>
              <a href="#tds" className="rounded-md border border-deep-foreground/30 px-5 py-2.5 text-sm font-medium hover:bg-deep-foreground/10">{t("tds")}</a>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-deep-foreground/15">
            <img src={pellets} alt={`${g.material} engineering plastic pellets`} className="h-full max-h-80 w-full object-cover md:max-h-none" loading="eager" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-6">
        {/* Overview */}
        <section>
          <SectionTitle>{t("overview")}</SectionTitle>
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4 text-foreground/85 leading-relaxed">
              {(lang === "en" ? g.description_en : g.description_zh).split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold">{t("sourceFeatures")}</h3>
              <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                {g.features.map((f, i) => (
                  <li key={i} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{f[lang]}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Key features */}
        <section>
          <SectionTitle>{t("keyFeatures")}</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.key_features.map((f, i) => {
              const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
              return (
                <div key={i} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
                  <Icon className="h-6 w-6 shrink-0 text-accent" strokeWidth={1.5} />
                  <span className="font-medium">{f[lang]}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Physical properties */}
        <section id="properties">
          <SectionTitle sub={t("propsSub")}>{t("props")}</SectionTitle>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="bg-deep text-deep-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">{t("colProp")}</th>
                  <th className="px-4 py-3 text-left font-semibold">{t("colUnit")}</th>
                  <th className="px-4 py-3 text-left font-semibold">{t("colMethod")}</th>
                  <th className="px-4 py-3 text-right font-semibold">{g.grade_code}</th>
                </tr>
              </thead>
              <tbody>
                {data.properties.map((p, i) => (
                  <tr key={i} className="border-t border-border even:bg-secondary/40">
                    <td className="px-4 py-2.5">{lang === "en" ? p.property_name : p.property_name_zh || p.property_name}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{p.unit}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{p.test_method}</td>
                    <td className="px-4 py-2.5 text-right font-semibold tabular-nums">{p.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex gap-3 rounded-xl border border-border bg-secondary/50 p-5 text-sm">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div className="space-y-2">
              <p className="font-semibold">{t("noteTitle")}</p>
              <p className="text-foreground/80">{t("note1")}</p>
              <p className="text-foreground/80">{t("note2")}</p>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section>
          <SectionTitle>{t("apps")}</SectionTitle>
          <div className="mb-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-deep p-6 text-deep-foreground"><Waves className="h-6 w-6 text-cyan" strokeWidth={1.5} /><div className="mt-3 font-display text-lg font-semibold">{t("slidingApps")}</div></div>
            <div className="rounded-xl bg-deep p-6 text-deep-foreground"><Cog className="h-6 w-6 text-cyan" strokeWidth={1.5} /><div className="mt-3 font-display text-lg font-semibold">{t("gearApps")}</div></div>
          </div>
          <div className="flex flex-wrap gap-2">
            {g.applications.map((a, i) => <span key={i} className="rounded-full border border-border bg-card px-4 py-1.5 text-sm">{a[lang]}</span>)}
          </div>
        </section>

        {/* Technical performance */}
        <section>
          <SectionTitle>{t("perf")}</SectionTitle>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {g.performance.map((p, i) => {
              const Icon = PERF_ICONS[i % PERF_ICONS.length];
              return (
                <div key={i} className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center gap-3"><Icon className="h-5 w-5 text-accent" strokeWidth={1.5} /><h3 className="font-semibold">{lang === "en" ? p.title_en : p.title_zh}</h3></div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/80">{p[lang]}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* TDS */}
        <section id="tds" className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-border bg-card p-7 md:flex-row md:items-center">
          <div className="flex gap-4">
            <FileText className="h-10 w-10 shrink-0 text-accent" strokeWidth={1.5} />
            <div>
              <h2 className="font-display text-xl font-semibold">{t("tds")}</h2>
              <p className="text-sm text-muted-foreground">{t("tdsSub")}</p>
              {doc ? <p className="mt-1 text-sm">{doc.document_name}</p> : <p className="mt-1 text-sm text-muted-foreground">{t("tdsNone")}</p>}
            </div>
          </div>
          {doc?.url && (
            <a href={doc.url} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-md border-2 border-accent px-5 py-2.5 text-sm font-semibold text-accent hover:bg-accent hover:text-accent-foreground">
              <Download className="h-4 w-4" />{t("tdsBtn")}
            </a>
          )}
        </section>

        {/* Inquiry */}
        <section className="rounded-2xl bg-gradient-deep p-8 text-deep-foreground md:p-12">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">{t("need")} {plain(g.grade_name)}?</h2>
          <p className="mt-2 max-w-2xl opacity-85">{t("needSub")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`${lp("/inquiry", lang)}${quoteSearch}`} className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90">{t("quote")}</a>
            <Link to={lp("/contact", lang) as any} className="inline-flex items-center gap-2 rounded-md border border-deep-foreground/30 px-6 py-3 text-sm font-medium hover:bg-deep-foreground/10"><Mail className="h-4 w-4" />{t("contact")}</Link>
          </div>
        </section>

        {/* Related grades */}
        <section>
          <SectionTitle>{t("related")}</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {data.related.map((r) => (
              <Link key={r.slug} to={(lang === "en" ? `/en/products/${r.series_slug}/${r.slug}` : `/products/${r.series_slug}/${r.slug}`) as any} className="rounded-xl border border-border bg-card p-4 hover:border-accent">
                <div className="font-semibold">{plain(r.grade_name)}</div>
              </Link>
            ))}
            <Link to={lp(`/products/${series}`, lang) as any} className="flex items-center gap-2 rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground hover:border-accent hover:text-foreground">
              <Gauge className="h-4 w-4" />{t("viewSeries")}
            </Link>
          </div>
        </section>

        {relatedSeries.length > 0 && (
          <section>
            <SectionTitle>{t("relatedSeries")}</SectionTitle>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedSeries.map((p) => (
                <Link key={p.slug} to={lp(`/products/${p.slug}`, lang) as any} className="rounded-xl border border-border bg-card p-4 hover:border-accent">
                  <div className="font-semibold">{p.series}</div>
                  <div className="text-xs text-muted-foreground">{p.material}</div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider opacity-60">{label}</dt>
      <dd className="mt-0.5 font-medium">{value}</dd>
    </div>
  );
}

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{children}</h2>
      {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function GradeNotFound() {
  const lang = useLang();
  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl font-semibold">{lang === "en" ? "Grade not found" : "未找到该牌号"}</h1>
        <Link to={lp("/products", lang) as any} className="mt-6 inline-block text-accent hover:underline">← {T.products[lang]}</Link>
      </div>
    </Layout>
  );
}
