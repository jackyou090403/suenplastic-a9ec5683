import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import warehouse from "@/assets/warehouse.jpg";
import { CheckCircle2 } from "lucide-react";
import { useLang, ui, getCompany, type Lang } from "@/i18n";

const SITE = "https://suenplastic.com";

export function makeAboutHead(lang: Lang) {
  const url = lang === "zh" ? `${SITE}/about` : `${SITE}/en/about`;
  const title = lang === "zh"
    ? "关于我们 — 厦门塑恩贸易有限公司"
    : "About — Xiamen SUEN Plastic Trading Co., Ltd.";
  const desc = lang === "zh"
    ? "厦门塑恩贸易有限公司专注工程塑料原料贸易，十大全球品牌授权代理，服务全国三千余家终端客户。"
    : "Xiamen SUEN Plastic specializes in engineering plastics trading, authorized for 10 global brands, serving 3000+ end customers across China.";
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
      { rel: "alternate", hrefLang: "zh-CN", href: `${SITE}/about` },
      { rel: "alternate", hrefLang: "en", href: `${SITE}/en/about` },
    ],
  };
}

export const Route = createFileRoute("/about")({
  head: () => makeAboutHead("zh"),
  component: AboutPage,
});

export function AboutPage() {
  const lang = useLang();
  const company = getCompany(lang);
  const stats: [string, string][] = ["10+", "10", "300+", "3000+"].map((n, i) => [n, ui.about.statLabels[lang][i]]) as any;
  return (
    <Layout>
      <PageHeader kicker="About" title={ui.page.aboutTitle[lang]} desc={company.name} />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <img src={warehouse} alt={lang === "zh" ? "塑恩贸易仓库" : "SUEN Plastic warehouse"} loading="lazy" width={1280} height={800} className="rounded-2xl shadow-deep" />
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">{ui.about.heading[lang]}</h2>
            <p className="mt-4 leading-relaxed text-foreground/80">{ui.about.p1[lang]}</p>
            <p className="mt-4 leading-relaxed text-foreground/80">{ui.about.p2[lang]}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {ui.about.bullets[lang].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 grid gap-6 rounded-2xl bg-gradient-deep p-10 text-deep-foreground md:grid-cols-4 md:p-12">
          {stats.map(([n, l]) => (
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
