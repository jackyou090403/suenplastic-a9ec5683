import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { useState } from "react";
import { brands, materials, company } from "@/data/products";
import { CheckCircle2, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/inquiry")({
  head: () => ({
    meta: [
      { title: "在线询价 — 30 分钟内回复 | 塑恩贸易" },
      { name: "description", content: "工程塑料原料在线询价，宝理 / 旭化成 / 长春化工三大品牌授权代理，30 分钟内回复，可寄样测试。" },
      { property: "og:url", content: "https://suenplastic.com/inquiry" }
    ],
    links: [{ rel: "canonical", href: "https://suenplastic.com/inquiry" }],
  }),
  component: Inquiry,
});

function Inquiry() {
  const [done, setDone] = useState(false);
  return (
    <Layout>
      <PageHeader kicker="Inquiry" title="在线询价" desc="填写下表，30 分钟内为您匹配最合适的牌号与价格。所有信息严格保密。" />
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-border bg-card p-7 shadow-card md:p-10">
            {done ? (
              <div className="py-16 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
                <h2 className="mt-4 font-display text-2xl font-semibold">询价已提交</h2>
                <p className="mt-2 text-muted-foreground">我们将在 30 分钟内（工作时间）联系您，请保持电话畅通。</p>
                <button onClick={() => setDone(false)} className="mt-6 rounded-md bg-deep px-5 py-2 text-sm font-medium text-deep-foreground">再提交一条</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="公司名称" required><input required className={inputCls} placeholder="请输入公司名称" /></Field>
                  <Field label="联系人" required><input required className={inputCls} placeholder="您的姓名" /></Field>
                  <Field label="手机 / 微信" required><input required type="tel" className={inputCls} placeholder="例如 138xxxx0000" /></Field>
                  <Field label="邮箱"><input type="email" className={inputCls} placeholder="可选" /></Field>
                  <Field label="需求品牌">
                    <select className={inputCls}>
                      <option value="">不限</option>
                      {brands.map(b => <option key={b.slug}>{b.name} {b.nameEn}</option>)}
                    </select>
                  </Field>
                  <Field label="材料类型">
                    <select className={inputCls}>
                      <option value="">不限</option>
                      {materials.map(m => <option key={m.code}>{m.code} {m.name}</option>)}
                    </select>
                  </Field>
                  <Field label="牌号"><input className={inputCls} placeholder="如 M90-44 / 90G33 / 3300" /></Field>
                  <Field label="月用量"><input className={inputCls} placeholder="如 5 吨 / 月" /></Field>
                </div>
                <Field label="应用产品 / 备注">
                  <textarea rows={4} className={inputCls} placeholder="请描述您的应用产品、性能要求、交货地等信息" />
                </Field>
                <button type="submit" className="w-full rounded-md bg-gradient-deep py-3.5 font-medium text-deep-foreground shadow-deep transition-transform hover:-translate-y-0.5">
                  提交询价
                </button>
                <p className="text-center text-xs text-muted-foreground">提交即表示同意我们通过电话 / 邮件回复您的询价</p>
              </form>
            )}
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl bg-gradient-deep p-7 text-deep-foreground shadow-deep">
              <h3 className="font-display text-xl font-semibold">直接联系销售</h3>
              <p className="mt-2 text-sm opacity-80">不想填表？直接打电话或发邮件给我们：</p>
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
              <h4 className="font-display text-base font-semibold">为什么选择我们？</h4>
              <ul className="mt-4 space-y-2 text-sm">
                {["三大品牌授权代理", "原厂 COA / TDS / SDS", "1 吨起订 · 24h 发货", "免费样品测试", "技术工程师选型支持"].map(t => (
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
