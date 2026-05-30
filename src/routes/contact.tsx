import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { Phone, Mail, MapPin, Printer, Clock } from "lucide-react";
import { useLang, ui, getCompany, type Lang } from "@/i18n";

const SITE = "https://suenplastic.com";

export function makeContactHead(lang: Lang) {
  const url = lang === "zh" ? `${SITE}/contact` : `${SITE}/en/contact`;
  const title = lang === "zh" ? "联系我们 — 厦门塑恩贸易有限公司" : "Contact — Xiamen SUEN Plastic";
  const desc = lang === "zh"
    ? "电话 0592-5526472，邮箱 youty123@suenplastic.com，地址 厦门市湖里区枋湖北二路1519号"
    : "Tel +86-592-5526472, Email youty123@suenplastic.com, Address: No.1519 Fanghu North 2nd Rd, Huli, Xiamen";
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
      { rel: "alternate", hrefLang: "zh-CN", href: `${SITE}/contact` },
      { rel: "alternate", hrefLang: "en", href: `${SITE}/en/contact` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: lang === "zh" ? "厦门塑恩贸易有限公司" : "Xiamen SUEN Plastic Trading Co., Ltd.",
          alternateName: ["塑恩贸易", "SUEN Plastic"],
          url: SITE,
          telephone: "+86-592-5526472",
          email: "youty123@suenplastic.com",
          openingHours: "Mo-Sa 08:30-18:00",
        }),
      },
    ],
  };
}

export const Route = createFileRoute("/contact")({
  head: () => makeContactHead("zh"),
  component: ContactPage,
});

export function ContactPage() {
  const lang = useLang();
  const company = getCompany(lang);
  const items = [
    { icon: Phone, label: ui.common.salesHotline[lang], value: company.phone, href: `tel:${company.phone}` },
    { icon: Printer, label: ui.common.fax[lang], value: company.fax },
    { icon: Mail, label: ui.common.email[lang], value: company.email, href: `mailto:${company.email}` },
    { icon: MapPin, label: ui.common.address[lang], value: company.address },
    { icon: Clock, label: ui.common.workhours[lang], value: company.workhours },
  ];
  return (
    <Layout>
      <PageHeader kicker="Contact" title={ui.page.contactTitle[lang]} desc={ui.page.contactDesc[lang]} />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
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
          <p className="mt-6 max-w-2xl opacity-80">{ui.contact.blurb[lang]}</p>
        </div>
      </section>
    </Layout>
  );
}
