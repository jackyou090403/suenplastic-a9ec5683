import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { CheckCircle2, MapPin, Calendar, Layers, Factory } from "lucide-react";
import { useLang, ui, getBrand, getBrandDetail, listProducts, lp, type Lang } from "@/i18n";

const SITE = "https://suenplastic.com";

export function makeBrandHead(lang: Lang, slug: string) {
  const b = getBrand(slug, lang);
  const url = lang === "zh" ? `${SITE}/brands/${slug}` : `${SITE}/en/brands/${slug}`;
  const altZh = `${SITE}/brands/${slug}`;
  const altEn = `${SITE}/en/brands/${slug}`;
  const title = b
    ? lang === "zh"
      ? `${b.name} 工程塑料原料代理 — ${b.tagline} | 厦门塑恩贸易`
      : `${b.name} Engineering Plastics — ${b.tagline} | SUEN Plastic`
    : "Brand";
  const desc = b?.description ?? "";
  return {
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:url", content: url },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "zh-CN", href: altZh },
      { rel: "alternate", hrefLang: "en", href: altEn },
    ],
    scripts: b
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Brand",
              name: b.name,
              alternateName: b.nameEn,
              description: b.description,
              url,
            }),
          },
        ]
      : [],
  };
}

export const Route = createFileRoute("/brands/$brand")({
  head: ({ params }) => makeBrandHead("zh", params.brand),
  loader: ({ params }) => {
    const b = getBrand(params.brand, "zh");
    if (!b) throw notFound();
    return { slug: params.brand };
  },
  component: BrandDetailPage,
  notFoundComponent: () => <NotFound />,
});

function NotFound() {
  const lang = useLang();
  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl font-semibold">{ui.common.brandNotFound[lang]}</h1>
        <Link to={lp("/brands", lang) as any} className="mt-6 inline-block text-accent hover:underline">← {ui.common.backToBrands[lang]}</Link>
      </div>
    </Layout>
  );
}

export function BrandDetailPage() {
  const lang = useLang();
  const { slug } = Route.useLoaderData();
  const brand = getBrand(slug, lang)!;
  const detail = getBrandDetail(slug, lang);
  const list = listProducts(lang).filter((p) => p.brand === brand.slug);

  return (
    <Layout>
      <PageHeader kicker={`${brand.origin} · ${ui.common.authorized[lang]}`} title={brand.name} desc={brand.tagline} />

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
          <div className="space-y-14">
            <div>
              <SectionTitle>{ui.brand.intro[lang]}</SectionTitle>
              {detail && (
                <div className="mb-5 flex flex-wrap gap-3 text-xs">
                  {detail.founded && <Badge icon={Calendar}>{ui.brand.founded[lang]} {detail.founded}</Badge>}
                  {detail.hq && <Badge icon={MapPin}>{ui.brand.hq[lang]} {detail.hq}</Badge>}
                  <Badge icon={Factory}>{brand.origin} {ui.brand.originAuth[lang]}</Badge>
                </div>
              )}
              <p className="leading-relaxed text-foreground/80">{detail?.history ?? brand.description}</p>
              {detail && (
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {detail.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-foreground/80">{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {detail && (
              <div>
                <SectionTitle>{ui.brand.signature[lang]}</SectionTitle>
                <div className="grid gap-3">
                  {detail.signatureSeries.map((s) => (
                    <div key={s.series} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                      <Layers className="mt-1 h-5 w-5 shrink-0 text-accent" />
                      <div>
                        <div className="font-display text-base font-semibold">
                          {s.series}
                          <span className="ml-2 text-xs font-normal text-muted-foreground">{s.material}</span>
                        </div>
                        <p className="mt-1 text-sm text-foreground/75">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {detail && (
              <div>
                <SectionTitle>{ui.brand.industries[lang]}</SectionTitle>
                <div className="flex flex-wrap gap-2">
                  {detail.industries.map((i) => (
                    <span key={i} className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm">{i}</span>
                  ))}
                </div>
              </div>
            )}

            {detail && (
              <div>
                <SectionTitle>{ui.brand.specs[lang]}</SectionTitle>
                <div className="overflow-hidden rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-deep text-deep-foreground">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium">{ui.brand.specGrade[lang]}</th>
                        <th className="px-4 py-3 text-left font-medium">{ui.brand.specMat[lang]}</th>
                        <th className="px-4 py-3 text-left font-medium">{ui.brand.specKey[lang]}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detail.specs.map((s) => (
                        <tr key={s.grade} className="border-b border-border last:border-0 even:bg-secondary/30">
                          <td className="px-4 py-3 font-medium">{s.grade}</td>
                          <td className="px-4 py-3 text-foreground/75">{s.material}</td>
                          <td className="px-4 py-3 text-xs text-foreground/75">{s.props}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">{ui.brand.specsNote[lang]}</p>
              </div>
            )}

            <div>
              <SectionTitle>{ui.brand.selling[lang]}</SectionTitle>
              <div className="grid gap-5 sm:grid-cols-2">
                {list.map((p) => (
                  <Link key={p.slug} to={lp(`/products/${p.slug}`, lang) as any} className="rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent">
                    <div className="font-display text-xl font-semibold">{p.series}</div>
                    <div className="text-sm text-muted-foreground">{p.material}</div>
                    <p className="mt-3 text-sm text-foreground/75">{p.feature}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.grades.slice(0, 5).map((g) => (
                        <span key={g} className="rounded bg-secondary px-2 py-0.5 text-[11px]">{g}</span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="md:sticky md:top-24 md:self-start">
            <div className="rounded-2xl bg-gradient-deep p-7 text-deep-foreground shadow-deep">
              <h3 className="font-display text-xl font-semibold">{ui.brand.requestQuoteFor[lang]} · {brand.name}</h3>
              <p className="mt-2 text-sm opacity-80">{ui.brand.coaNote[lang]}</p>
              <Link to={lp("/inquiry", lang) as any} className="mt-5 block rounded-md bg-cyan py-3 text-center font-medium text-deep">
                {ui.common.inquireOnline[lang]}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 flex items-center gap-3 font-display text-2xl font-semibold">
      <span className="h-6 w-1 rounded-full bg-gradient-teal" />
      {children}
    </h2>
  );
}

function Badge({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 font-medium text-foreground/70">
      <Icon className="h-3.5 w-3.5 text-accent" />
      {children}
    </span>
  );
}
