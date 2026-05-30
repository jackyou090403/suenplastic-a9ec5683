import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { ArrowLeft, FileText, Phone, Mail } from "lucide-react";
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

export function ProductDetailPage() {
  const lang = useLang();
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug, lang)!;
  const brand = getBrand(p.brand, lang)!;
  const company = getCompany(lang);
  const related = listProducts(lang).filter((x) => x.material === p.material && x.slug !== p.slug).slice(0, 3);

  const specs: [string, string][] = [
    [ui.product.brandLabel[lang], brand.name],
    [ui.product.seriesLabel[lang], p.series],
    [ui.product.materialLabel[lang], p.material],
    [ui.product.gradesLabel[lang], p.grades.join(lang === "zh" ? "、" : ", ")],
    [ui.product.originLabel[lang], brand.origin],
    [ui.product.appsLabel[lang], p.applications.join(lang === "zh" ? "、" : ", ")],
    [ui.product.pkgLabel[lang], ui.product.pkgValue[lang]],
    [ui.product.moqLabel[lang], ui.product.moqValue[lang]],
    [ui.product.docsLabel[lang], ui.product.docsValue[lang]],
    [ui.product.leadLabel[lang], ui.product.leadValue[lang]],
  ];

  return (
    <Layout>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
          <Link to={lp("/products", lang) as any} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> {ui.common.backToProducts[lang]}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.25em] text-accent">{brand.name} · {p.material}</div>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">{p.series}</h1>
            <p className="mt-4 text-lg text-foreground/80">{p.feature}</p>

            <h2 className="mt-10 font-display text-xl font-semibold">{ui.product.specsHeading[lang]}</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <tbody>
                  {specs.map(([k, v]) => (
                    <tr key={k} className="border-b border-border last:border-0">
                      <td className="w-40 bg-secondary/50 px-4 py-3 align-top font-medium text-muted-foreground">{k}</td>
                      <td className="px-4 py-3 text-foreground/85">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="mt-10 font-display text-xl font-semibold">{ui.product.appsHeading[lang]}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.applications.map((a) => (
                <span key={a} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm">{a}</span>
              ))}
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-gradient-deep p-7 text-deep-foreground shadow-deep">
              <div className="text-xs font-medium uppercase tracking-widest opacity-70">{ui.product.requestQuote[lang]}</div>
              <h3 className="mt-2 font-display text-2xl font-semibold">{ui.product.requestQuoteTitle[lang]} · {p.series}</h3>
              <p className="mt-2 text-sm opacity-80">{ui.product.quoteDesc[lang]}</p>
              <Link to={lp("/inquiry", lang) as any} className="mt-5 block rounded-md bg-cyan py-3 text-center font-medium text-deep transition-transform hover:-translate-y-0.5">
                {ui.common.inquireOnline[lang]}
              </Link>
              <div className="mt-4 space-y-2 text-sm opacity-90">
                <a href={`tel:${company.phone}`} className="flex items-center gap-2 hover:text-cyan"><Phone className="h-4 w-4" /> {company.phone}</a>
                <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-cyan"><Mail className="h-4 w-4" /> {company.email}</a>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-sm font-medium">
                <FileText className="h-4 w-4 text-accent" /> {ui.product.docDownload[lang]}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{ui.product.docDownloadDesc[lang]}</p>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
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
      </section>
    </Layout>
  );
}
