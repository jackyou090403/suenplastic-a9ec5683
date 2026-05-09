import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { brands, products } from "@/data/products";

export const Route = createFileRoute("/brands/$brand")({
  head: ({ params }) => {
    const b = brands.find(x => x.slug === params.brand);
    return {
      meta: [
        { title: b ? `${b.name} ${b.nameEn} 代理 — ${b.tagline} | 塑恩贸易` : "品牌" },
        { name: "description", content: b ? b.description : "" },
      ],
    };
  },
  loader: ({ params }) => {
    const brand = brands.find(b => b.slug === params.brand);
    if (!brand) throw notFound();
    return { brand };
  },
  component: BrandDetail,
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl font-semibold">品牌未找到</h1>
        <Link to="/brands" className="mt-6 inline-block text-accent hover:underline">← 返回品牌列表</Link>
      </div>
    </Layout>
  ),
});

function BrandDetail() {
  const { brand } = Route.useLoaderData();
  const list = products.filter(p => p.brand === brand.slug);
  return (
    <Layout>
      <PageHeader kicker={`${brand.origin} · 授权代理`} title={`${brand.name} ${brand.nameEn}`} desc={brand.tagline} />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold">品牌介绍</h2>
            <p className="mt-4 leading-relaxed text-foreground/80">{brand.description}</p>

            <h2 className="mt-12 font-display text-2xl font-semibold">产品系列</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {list.map(p => (
                <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent">
                  <div className="font-display text-xl font-semibold">{p.series}</div>
                  <div className="text-sm text-muted-foreground">{p.material}</div>
                  <p className="mt-3 text-sm text-foreground/75">{p.feature}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.grades.slice(0, 5).map(g => <span key={g} className="rounded bg-secondary px-2 py-0.5 text-[11px]">{g}</span>)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <aside className="md:sticky md:top-24 md:self-start">
            <div className="rounded-2xl bg-gradient-deep p-7 text-deep-foreground shadow-deep">
              <h3 className="font-display text-xl font-semibold">索取 {brand.name} 报价</h3>
              <p className="mt-2 text-sm opacity-80">所有牌号均提供原厂授权书与 COA 报告。</p>
              <Link to="/inquiry" className="mt-5 block rounded-md bg-cyan py-3 text-center font-medium text-deep">在线询价</Link>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
