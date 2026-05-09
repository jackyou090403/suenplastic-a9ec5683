import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { products, brands, company } from "@/data/products";
import { ArrowLeft, FileText, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => {
    const p = products.find(x => x.slug === params.slug);
    return {
      meta: [
        { title: p ? `${p.series} ${p.material} — ${brands.find(b => b.slug === p.brand)?.name} | 塑恩贸易` : "产品详情" },
        { name: "description", content: p ? `${p.series} ${p.material} 牌号：${p.grades.join("、")}。${p.feature}` : "" },
      ],
    };
  },
  component: ProductDetail,
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl font-semibold">产品未找到</h1>
        <Link to="/products" className="mt-6 inline-block text-accent hover:underline">← 返回产品中心</Link>
      </div>
    </Layout>
  ),
  loader: ({ params }) => {
    const p = products.find(x => x.slug === params.slug);
    if (!p) throw notFound();
    return { product: p };
  },
});

function ProductDetail() {
  const { product: p } = Route.useLoaderData();
  const brand = brands.find(b => b.slug === p.brand)!;
  const related = products.filter(x => x.material === p.material && x.slug !== p.slug).slice(0, 3);

  // Sample spec values for display
  const specs = [
    ["品牌", `${brand.name} ${brand.nameEn}`],
    ["产品系列", p.series],
    ["材料类型", p.material],
    ["可供牌号", p.grades.join("、")],
    ["产地", brand.origin],
    ["典型应用", p.applications.join("、")],
    ["包装规格", "25kg / 袋，1000kg / 托盘（可拼柜）"],
    ["最小起订", "1 吨（特殊牌号面议）"],
    ["质保文件", "原厂 COA / TDS / SDS / RoHS / REACH"],
    ["交货周期", "现货 24h 发货 / 期货 4-6 周"],
  ];

  return (
    <Layout>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
          <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> 返回产品中心
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.25em] text-accent">{brand.name} {brand.nameEn} · {p.material}</div>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">{p.series}</h1>
            <p className="mt-4 text-lg text-foreground/80">{p.feature}</p>

            <h2 className="mt-10 font-display text-xl font-semibold">规格参数</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <tbody>
                  {specs.map(([k, v]) => (
                    <tr key={k} className="border-b border-border last:border-0">
                      <td className="w-32 bg-secondary/50 px-4 py-3 align-top font-medium text-muted-foreground">{k}</td>
                      <td className="px-4 py-3 text-foreground/85">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="mt-10 font-display text-xl font-semibold">典型应用</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.applications.map(a => (
                <span key={a} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm">{a}</span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-gradient-deep p-7 text-deep-foreground shadow-deep">
              <div className="text-xs font-medium uppercase tracking-widest opacity-70">索取报价</div>
              <h3 className="mt-2 font-display text-2xl font-semibold">立即获取 {p.series} 价格</h3>
              <p className="mt-2 text-sm opacity-80">告诉我们用量与应用，30 分钟内回复，可寄样测试。</p>
              <Link to="/inquiry" className="mt-5 block rounded-md bg-cyan py-3 text-center font-medium text-deep transition-transform hover:-translate-y-0.5">
                在线询价
              </Link>
              <div className="mt-4 space-y-2 text-sm opacity-90">
                <a href={`tel:${company.phone}`} className="flex items-center gap-2 hover:text-cyan"><Phone className="h-4 w-4" /> {company.phone}</a>
                <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-cyan"><Mail className="h-4 w-4" /> {company.email}</a>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-sm font-medium">
                <FileText className="h-4 w-4 text-accent" /> 资料下载
              </div>
              <p className="mt-2 text-xs text-muted-foreground">TDS 技术参数表 / SDS 安全数据表 / COA 质检报告，请联系我们获取最新原厂文件。</p>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-semibold">同材料相关牌号</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map(r => (
                <Link key={r.slug} to="/products/$slug" params={{ slug: r.slug }} className="rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent">
                  <div className="font-display text-lg font-semibold">{r.series}</div>
                  <div className="text-sm text-muted-foreground">{brands.find(b => b.slug === r.brand)?.name} · {r.material}</div>
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
