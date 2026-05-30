import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { useLang, ui, listApplications, type Lang } from "@/i18n";
import auto from "@/assets/app-auto.jpg";
import elec from "@/assets/app-electronic.jpg";
import appl from "@/assets/app-appliance.jpg";
import gear from "@/assets/app-gear.jpg";

const SITE = "https://suenplastic.com";

export function makeAppsHead(lang: Lang) {
  const url = lang === "zh" ? `${SITE}/applications` : `${SITE}/en/applications`;
  const title = lang === "zh"
    ? "应用领域 — 工程塑料行业方案 | 塑恩贸易"
    : "Applications — Engineering Plastics Industry Solutions | SUEN Plastic";
  const desc = lang === "zh"
    ? "汽车、电子电器、家电、连接器、精密齿轮、新能源等行业工程塑料应用方案与典型选材建议。"
    : "Engineering plastics solutions for automotive, electronics, appliances, connectors, precision gears and new energy industries.";
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
      { rel: "alternate", hrefLang: "zh-CN", href: `${SITE}/applications` },
      { rel: "alternate", hrefLang: "en", href: `${SITE}/en/applications` },
    ],
  };
}

const imgMap: Record<string, string> = { automotive: auto, electronic: elec, appliance: appl, connector: elec, gear, newenergy: appl };

export const Route = createFileRoute("/applications")({
  head: () => makeAppsHead("zh"),
  component: AppPage,
});

export function AppPage() {
  const lang = useLang();
  const applications = listApplications(lang);
  return (
    <Layout>
      <PageHeader kicker="Applications" title={ui.page.appsTitle[lang]} desc={ui.page.appsDesc[lang]} />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((a) => (
            <article key={a.slug} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <img src={imgMap[a.slug]} alt={a.name} loading="lazy" width={800} height={600} className="aspect-[4/3] w-full object-cover" />
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold">{a.name}</h3>
                <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{a.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
