import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { applications } from "@/data/products";
import auto from "@/assets/app-auto.jpg";
import elec from "@/assets/app-electronic.jpg";
import appl from "@/assets/app-appliance.jpg";
import gear from "@/assets/app-gear.jpg";

export const Route = createFileRoute("/applications")({
  head: () => ({
    meta: [
      { title: "应用领域 — 工程塑料行业方案 | 塑恩贸易" },
      { name: "description", content: "汽车、电子电器、家电、连接器、精密齿轮、新能源等行业工程塑料应用方案与典型选材建议。" },
      { property: "og:url", content: "https://suenplastic.com/applications" }
    ],
    links: [{ rel: "canonical", href: "https://suenplastic.com/applications" }],
  }),
  component: AppPage,
});

const imgMap: Record<string, string> = {
  automotive: auto, electronic: elec, appliance: appl, connector: elec, gear, newenergy: appl,
};

function AppPage() {
  return (
    <Layout>
      <PageHeader kicker="Applications" title="应用领域" desc="多年来服务于以下产业，提供从材料选型、改性建议到稳定供货的一体化方案。" />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {applications.map(a => (
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
