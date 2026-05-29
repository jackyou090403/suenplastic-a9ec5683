import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import warehouse from "@/assets/warehouse.jpg";
import { CheckCircle2 } from "lucide-react";
import { company } from "@/data/products";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "关于我们 — 厦门塑恩贸易有限公司" },
      { name: "description", content: "厦门塑恩贸易有限公司专注工程塑料原料贸易，宝理、旭化成、长春化工三大品牌授权代理，服务全国两千余家终端客户。" },
      { property: "og:url", content: "https://suenplastic.com/about" }
    ],
    links: [{ rel: "canonical", href: "https://suenplastic.com/about" }],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      <PageHeader kicker="About" title="关于塑恩贸易" desc={`${company.name} · ${company.nameEn}`} />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <img src={warehouse} alt="塑恩贸易仓库" loading="lazy" width={1280} height={800} className="rounded-2xl shadow-deep" />
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">十余年专注 工程塑料原料</h2>
            <p className="mt-4 leading-relaxed text-foreground/80">
              厦门塑恩贸易有限公司成立至今，一直专注于工程塑料原料的贸易与服务，是日本宝理 Polyplastics、日本旭化成 Asahi Kasei、台湾长春化工 CCP 的授权代理商。公司位于厦门湖里区，覆盖华南、华东及全国市场，常年备货数百种主流工程塑料牌号。
            </p>
            <p className="mt-4 leading-relaxed text-foreground/80">
              我们的客户涵盖汽车零部件、电子电器、家电、精密连接器、医疗器械、新能源等多个行业，凭借稳定的原厂渠道、充足的现货库存以及资深的工程师团队，为客户提供从选材建议到批量供货的一体化解决方案。
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "三大品牌正规授权",
                "原厂 COA / TDS 文件",
                "厦门中心仓 + 全国发货",
                "1 吨起订，可寄样测试",
                "技术工程师 1 对 1 选型",
                "稳定供货 10 年以上",
              ].map(t => (
                <li key={t} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 grid gap-6 rounded-2xl bg-gradient-deep p-10 text-deep-foreground md:grid-cols-4 md:p-12">
          {[
            ["10+", "年代理经验"],
            ["3", "全球品牌"],
            ["200+", "在售牌号"],
            ["2000+", "终端客户"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-4xl font-semibold text-cyan">{n}</div>
              <div className="mt-1 text-sm opacity-80">{l}</div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
