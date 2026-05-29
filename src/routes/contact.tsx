import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { company } from "@/data/products";
import { Phone, Mail, MapPin, Printer, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "联系我们 — 厦门塑恩贸易有限公司" },
      { name: "description", content: `电话 ${company.phone}，邮箱 ${company.email}，地址 ${company.address}` },
      { property: "og:url", content: "https://suenplastic.com/contact" }
    ],
    links: [{ rel: "canonical", href: "https://suenplastic.com/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "厦门塑恩贸易有限公司",
          alternateName: ["塑恩贸易", "SUEN Plastic"],
          url: "https://suenplastic.com",
          telephone: "+86-592-5526472",
          faxNumber: "+86-592-6032367",
          email: "youty123@suenplastic.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "湖里区枋湖北二路1519号",
            addressLocality: "厦门市",
            addressRegion: "福建省",
            postalCode: "361000",
            addressCountry: "CN",
          },
          openingHours: "Mo-Sa 08:30-18:00",
          areaServed: { "@type": "Country", name: "中国" },
        }),
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const items = [
    { icon: Phone, label: "销售热线", value: company.phone, href: `tel:${company.phone}` },
    { icon: Printer, label: "传真", value: company.fax },
    { icon: Mail, label: "邮箱", value: company.email, href: `mailto:${company.email}` },
    { icon: MapPin, label: "公司地址", value: company.address },
    { icon: Clock, label: "工作时间", value: company.workhours },
  ];
  return (
    <Layout>
      <PageHeader kicker="Contact" title="联系我们" desc="询价、技术支持、合作洽谈，欢迎随时联系。" />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map(it => (
            <div key={it.label} className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <it.icon className="h-7 w-7 text-accent" strokeWidth={1.5} />
              <div className="mt-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">{it.label}</div>
              {it.href ? (
                <a href={it.href} className="mt-1 block font-display text-lg font-semibold hover:text-accent">{it.value}</a>
              ) : (
                <div className="mt-1 font-display text-lg font-semibold">{it.value}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-gradient-deep p-10 text-deep-foreground md:p-14">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">{company.name}</h2>
          <p className="mt-2 opacity-80">{company.nameEn}</p>
          <p className="mt-6 max-w-2xl opacity-80">
            我们的销售与技术团队随时为您提供工程塑料原料选型、报价、样品申请、技术资料等服务。期待您的来电。
          </p>
        </div>
      </section>
    </Layout>
  );
}
