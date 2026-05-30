import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { useState } from "react";
import { CheckCircle2, Phone, Mail } from "lucide-react";
import { useLang, ui, listBrands, listMaterials, getCompany, type Lang } from "@/i18n";

const SITE = "https://suenplastic.com";

export function makeInquiryHead(lang: Lang) {
  const url = lang === "zh" ? `${SITE}/inquiry` : `${SITE}/en/inquiry`;
  const title = lang === "zh" ? "在线询价 — 30 分钟内回复 | 塑恩贸易" : "Online Inquiry — Reply within 30 minutes | SUEN Plastic";
  const desc = lang === "zh"
    ? "工程塑料原料在线询价，十大品牌授权代理，30 分钟内回复，可寄样测试。"
    : "Engineering plastics online inquiry — authorized for 10 brands, reply within 30 minutes, samples available.";
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
      { rel: "alternate", hrefLang: "zh-CN", href: `${SITE}/inquiry` },
      { rel: "alternate", hrefLang: "en", href: `${SITE}/en/inquiry` },
    ],
  };
}

export const Route = createFileRoute("/inquiry")({
  head: () => makeInquiryHead("zh"),
  component: InquiryPage,
});

export function InquiryPage() {
  const lang = useLang();
  const brands = listBrands(lang);
  const materials = listMaterials(lang);
  const company = getCompany(lang);
  const [done, setDone] = useState(false);
  return (
    <Layout>
      <PageHeader kicker="Inquiry" title={ui.page.inquiryTitle[lang]} desc={ui.page.inquiryDesc[lang]} />
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-border bg-card p-7 shadow-card md:p-10">
            {done ? (
              <div className="py-16 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
                <h2 className="mt-4 font-display text-2xl font-semibold">{ui.inquiry.done[lang]}</h2>
                <p className="mt-2 text-muted-foreground">{ui.inquiry.doneDesc[lang]}</p>
                <button onClick={() => setDone(false)} className="mt-6 rounded-md bg-deep px-5 py-2 text-sm font-medium text-deep-foreground">{ui.inquiry.submitAnother[lang]}</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label={ui.inquiry.company[lang]} required><input required className={inputCls} placeholder={ui.inquiry.placeholders.company[lang]} /></Field>
                  <Field label={ui.inquiry.contact[lang]} required><input required className={inputCls} placeholder={ui.inquiry.placeholders.contact[lang]} /></Field>
                  <Field label={ui.inquiry.mobile[lang]} required><input required type="tel" className={inputCls} placeholder={ui.inquiry.placeholders.mobile[lang]} /></Field>
                  <Field label={ui.inquiry.emailLabel[lang]}><input type="email" className={inputCls} placeholder={ui.inquiry.placeholders.email[lang]} /></Field>
                  <Field label={ui.inquiry.brand[lang]}>
                    <select className={inputCls}>
                      <option value="">{ui.inquiry.any[lang]}</option>
                      {brands.map((b) => <option key={b.slug}>{b.name}</option>)}
                    </select>
                  </Field>
                  <Field label={ui.inquiry.material[lang]}>
                    <select className={inputCls}>
                      <option value="">{ui.inquiry.any[lang]}</option>
                      {materials.map((m) => <option key={m.code}>{m.code} {m.name}</option>)}
                    </select>
                  </Field>
                  <Field label={ui.inquiry.grade[lang]}><input className={inputCls} placeholder={ui.inquiry.placeholders.grade[lang]} /></Field>
                  <Field label={ui.inquiry.monthly[lang]}><input className={inputCls} placeholder={ui.inquiry.placeholders.monthly[lang]} /></Field>
                </div>
                <Field label={ui.inquiry.app[lang]}>
                  <textarea rows={4} className={inputCls} placeholder={ui.inquiry.placeholders.app[lang]} />
                </Field>
                <button type="submit" className="w-full rounded-md bg-gradient-deep py-3.5 font-medium text-deep-foreground shadow-deep transition-transform hover:-translate-y-0.5">
                  {ui.inquiry.submit[lang]}
                </button>
                <p className="text-center text-xs text-muted-foreground">{ui.inquiry.consent[lang]}</p>
              </form>
            )}
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl bg-gradient-deep p-7 text-deep-foreground shadow-deep">
              <h3 className="font-display text-xl font-semibold">{ui.inquiry.directContact[lang]}</h3>
              <p className="mt-2 text-sm opacity-80">{ui.inquiry.directDesc[lang]}</p>
              <div className="mt-5 space-y-3">
                <a href={`tel:${company.phone}`} className="flex items-center gap-3 rounded-md bg-white/10 px-4 py-3 hover:bg-white/15">
                  <Phone className="h-4 w-4 text-cyan" /> <span className="font-medium">{company.phone}</span>
                </a>
                <a href={`mailto:${company.email}`} className="flex items-center gap-3 rounded-md bg-white/10 px-4 py-3 hover:bg-white/15">
                  <Mail className="h-4 w-4 text-cyan" /> <span className="text-sm">{company.email}</span>
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h4 className="font-display text-base font-semibold">{ui.inquiry.why[lang]}</h4>
              <ul className="mt-4 space-y-2 text-sm">
                {ui.inquiry.whyList[lang].map((t) => (
                  <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> {t}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}

const inputCls = "w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-xs font-medium text-foreground/80">
        {label} {required && <span className="text-destructive">*</span>}
      </div>
      {children}
    </label>
  );
}
