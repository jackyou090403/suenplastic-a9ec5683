import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { brands, products } from "@/data/products";
import { brandDetails } from "@/data/brand-details";
import { CheckCircle2, MapPin, Calendar, Layers, Factory } from "lucide-react";

export const Route = createFileRoute("/brands/$brand")({
  head: ({ params }) => {
    const b = brands.find((x) => x.slug === params.brand);
    const url = `https://suenplastic.com/brands/${params.brand}`;
    const title = b ? `${b.name} ${b.nameEn} 工程塑料原料代理 — ${b.tagline} | 厦门塑恩贸易` : "品牌";
    const desc = b ? b.description : "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: b
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Brand",
                name: `${b.name} ${b.nameEn}`,
                alternateName: b.nameEn,
                description: b.description,
                url,
                manufacturer: { "@type": "Organization", name: b.nameEn, address: { "@type": "PostalAddress", addressCountry: b.origin } },
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "首页", item: "https://suenplastic.com/" },
                  { "@type": "ListItem", position: 2, name: "品牌代理", item: "https://suenplastic.com/brands" },
                  { "@type": "ListItem", position: 3, name: `${b.name} ${b.nameEn}`, item: url },
                ],
              }),
            },
          ]
        : [],
    };
  },
  loader: ({ params }) => {
    const brand = brands.find((b) => b.slug === params.brand);
    if (!brand) throw notFound();
    return { brand };
  },
  component: BrandDetail,
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl font-semibold">品牌未找到</h1>
        <Link to="/brands" className="mt-6 inline-block text-accent hover:underline">
          ← 返回品牌列表
        </Link>
      </div>
    </Layout>
  ),
});

function BrandDetail() {
  const { brand } = Route.useLoaderData();
  const list = products.filter((p) => p.brand === brand.slug);
  const detail = brandDetails[brand.slug as keyof typeof brandDetails];

  return (
    <Layout>
      <PageHeader
        kicker={`${brand.origin} · 授权代理`}
        title={`${brand.name} ${brand.nameEn}`}
        desc={brand.tagline}
      />

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
          <div className="space-y-14">
            {/* 品牌介绍 */}
            <div>
              <SectionTitle>品牌介绍</SectionTitle>
              {detail && (
                <div className="mb-5 flex flex-wrap gap-3 text-xs">
                  {detail.founded && (
                    <Badge icon={Calendar}>创立 {detail.founded}</Badge>
                  )}
                  {detail.hq && <Badge icon={MapPin}>总部 {detail.hq}</Badge>}
                  <Badge icon={Factory}>{brand.origin}原厂授权</Badge>
                </div>
              )}
              <p className="leading-relaxed text-foreground/80">
                {detail?.history ?? brand.description}
              </p>
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

            {/* 主打系列 */}
            {detail && (
              <div>
                <SectionTitle>主打系列</SectionTitle>
                <div className="grid gap-3">
                  {detail.signatureSeries.map((s) => (
                    <div
                      key={s.series}
                      className="flex items-start gap-4 rounded-xl border border-border bg-card p-5"
                    >
                      <Layers className="mt-1 h-5 w-5 shrink-0 text-accent" />
                      <div>
                        <div className="font-display text-base font-semibold">
                          {s.series}
                          <span className="ml-2 text-xs font-normal text-muted-foreground">
                            {s.material}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-foreground/75">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 应用行业 */}
            {detail && (
              <div>
                <SectionTitle>应用行业</SectionTitle>
                <div className="flex flex-wrap gap-2">
                  {detail.industries.map((i) => (
                    <span
                      key={i}
                      className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 代表性材料参数摘要 */}
            {detail && (
              <div>
                <SectionTitle>代表性材料参数摘要</SectionTitle>
                <div className="overflow-hidden rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-deep text-deep-foreground">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium">牌号</th>
                        <th className="px-4 py-3 text-left font-medium">材料类型</th>
                        <th className="px-4 py-3 text-left font-medium">关键性能</th>
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
                <p className="mt-3 text-xs text-muted-foreground">
                  * 以上数据为典型值，具体参数以原厂最新 TDS 为准。
                </p>
              </div>
            )}

            {/* 在售产品系列 */}
            <div>
              <SectionTitle>在售产品系列</SectionTitle>
              <div className="grid gap-5 sm:grid-cols-2">
                {list.map((p) => (
                  <Link
                    key={p.slug}
                    to="/products/$slug"
                    params={{ slug: p.slug }}
                    className="rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent"
                  >
                    <div className="font-display text-xl font-semibold">{p.series}</div>
                    <div className="text-sm text-muted-foreground">{p.material}</div>
                    <p className="mt-3 text-sm text-foreground/75">{p.feature}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.grades.slice(0, 5).map((g) => (
                        <span key={g} className="rounded bg-secondary px-2 py-0.5 text-[11px]">
                          {g}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="md:sticky md:top-24 md:self-start">
            <div className="rounded-2xl bg-gradient-deep p-7 text-deep-foreground shadow-deep">
              <h3 className="font-display text-xl font-semibold">索取 {brand.name} 报价</h3>
              <p className="mt-2 text-sm opacity-80">所有牌号均提供原厂授权书与 COA 报告。</p>
              <Link
                to="/inquiry"
                className="mt-5 block rounded-md bg-cyan py-3 text-center font-medium text-deep"
              >
                在线询价
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
