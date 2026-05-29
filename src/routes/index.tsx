import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { brands, materials, applications, products, company } from "@/data/products";
import { ArrowRight, Award, Boxes, Headphones, Truck, CheckCircle2, Phone, Mail } from "lucide-react";
import hero from "@/assets/hero-pellets.jpg";
import auto from "@/assets/app-auto.jpg";
import elec from "@/assets/app-electronic.jpg";
import appl from "@/assets/app-appliance.jpg";
import gear from "@/assets/app-gear.jpg";

const HOME_URL = "https://suenplastic.com/";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://suenplastic.com/#organization",
  name: "厦门塑恩贸易有限公司",
  alternateName: ["塑恩贸易", "SUEN Plastic"],
  url: "https://suenplastic.com",
  image: "https://suenplastic.com/favicon.ico",
  telephone: "+86-592-5526472",
  faxNumber: "+86-592-6032367",
  email: "youty123@suenplastic.com",
  priceRange: "¥¥",
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
  description:
    "厦门塑恩贸易有限公司专业从事工程塑料原料贸易，代理日本宝理 Polyplastics、旭化成 Asahi Kasei、台湾长春化工、帝人、塞拉尼斯 Celanese、苏威 Solvay、日本 UMG、拉提 LATI、亚聚、台聚十大国际品牌。",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "厦门塑恩贸易有限公司 — 十大国际品牌工程塑料原料授权代理" },
      {
        name: "description",
        content:
          "厦门塑恩贸易有限公司（SUEN Plastic）是宝理 Polyplastics、旭化成、长春化工、帝人、塞拉尼斯、苏威、日本 UMG、拉提、亚聚、台聚十大品牌工程塑料原料的授权代理商，主营 POM / PA66 / PBT / PC / PPS / PEEK / PPA / ABS / ASA / EVA / LCP 现货供应，全国 24 小时发货，咨询电话 0592-5526472。",
      },
      { property: "og:title", content: "厦门塑恩贸易有限公司 — 工程塑料原料一站式供应" },
      { property: "og:description", content: "十大国际品牌授权代理 · 现货库存 · 技术选型支持 · 全国 24h 发货" },
      { property: "og:url", content: HOME_URL },
    ],
    links: [{ rel: "canonical", href: HOME_URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(localBusinessJsonLd) },
    ],
  }),
  component: Index,
});

const advantages = [
  { icon: Award, title: "原厂授权", desc: "十大国际品牌正规代理，提供授权书与原厂 COA 报告" },
  { icon: Boxes, title: "现货库存", desc: "厦门 / 上海 / 东莞备货，常用牌号 1 吨起售" },
  { icon: Headphones, title: "技术选型", desc: "资深工程师协助选材，提供改性与加工建议" },
  { icon: Truck, title: "快速响应", desc: "询价 30 分钟内回复，长三角 24 小时送达" },
];

const apps = [
  { img: auto, ...applications[0] },
  { img: elec, ...applications[1] },
  { img: appl, ...applications[2] },
  { img: gear, ...applications[4] },
];

// Pick representative products from different brands for "hot products"
const hotProductSlugs = [
  "duracon-pom",
  "tenac-pom",
  "lupox-pbt",
  "leona-pa66",
  "panlite-pc",
  "hostaform-pom",
  "ryton-pps",
  "amodel-ppa",
  "ketaspire-peek",
  "umg-abs",
  "latamid-pa",
  "ajp-eva",
];

function Index() {
  const hot = hotProductSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean);
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-deep text-deep-foreground">
        <img src={hero} alt="工程塑料粒子" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/80 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-36">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-medium tracking-wide text-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" /> 十大国际品牌正品授权代理
            </div>
            <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-balance md:text-6xl">
              工程塑料原料<br />
              <span className="text-cyan">一站式供应商</span>
            </h1>
            <p className="mt-6 max-w-xl text-base opacity-80 md:text-lg">
              宝理 · 旭化成 · 长春化工 · 帝人 · 塞拉尼斯 · 苏威 · 日本UMG · 拉提 · 亚聚 · 台聚 — 十大品牌授权代理，现货库存充足，原厂 COA，全国 24 小时发货，资深工程师提供选型支持。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/inquiry" className="inline-flex items-center gap-2 rounded-md bg-cyan px-6 py-3 font-medium text-deep shadow-deep transition-transform hover:-translate-y-0.5">
                立即询价 <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/products" className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 font-medium hover:bg-white/10">
                浏览产品中心
              </Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-6">
              <Stat n="15+" label="年代理经验" />
              <Stat n="300+" label="在售牌号" />
              <Stat n="3000+" label="终端客户" />
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {advantages.map((a) => (
            <div key={a.title} className="bg-background p-8">
              <a.icon className="h-8 w-8 text-accent" strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-lg font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BRANDS */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <SectionTitle kicker="Brands" title="十大品牌授权代理" desc="覆盖日本、美国、比利时、意大利与台湾十大全球工程塑料领导品牌，从通用塑料到特种工程塑料完整产品线。" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {brands.map((b) => (
            <Link key={b.slug} to="/brands/$brand" params={{ brand: b.slug }} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-deep">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-teal opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium uppercase tracking-widest text-accent">{b.origin} · 授权代理</div>
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold">{b.name}</h3>
              <div className="mt-1 text-sm text-muted-foreground">{b.nameEn}</div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/75 line-clamp-3">{b.description}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                查看系列 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOT PRODUCTS */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-end justify-between gap-4">
            <SectionTitle kicker="Products" title="热门产品系列" />
            <Link to="/products" className="hidden shrink-0 text-sm font-medium text-accent hover:underline md:inline-flex">查看全部 →</Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {hot.map((p) => (
              <Link key={p!.slug} to="/products/$slug" params={{ slug: p!.slug }} className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-accent">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-display text-xl font-semibold">{p!.series}</div>
                    <div className="text-sm text-muted-foreground">{p!.material}</div>
                  </div>
                  <span className="rounded-full bg-secondary px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{brands.find(b => b.slug === p!.brand)?.name}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/80">{p!.feature}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p!.grades.slice(0, 4).map((g) => (
                    <span key={g} className="rounded bg-secondary px-2 py-0.5 text-[11px] text-foreground/70">{g}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <SectionTitle kicker="Materials" title="按材料快速选型" desc="覆盖通用塑料到高端特种工程塑料，15 大类材料即查即问。" />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {materials.map((m) => (
            <div key={m.code} className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent">
              <div className="font-display text-2xl font-semibold text-deep">{m.code}</div>
              <div className="mt-1 text-sm font-medium">{m.name}</div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="bg-deep py-20 text-deep-foreground md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-xs font-medium uppercase tracking-[0.25em] text-cyan">Applications</div>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">服务于这些产业</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {apps.map((a) => (
              <div key={a.slug} className="group relative overflow-hidden rounded-xl">
                <img src={a.img} alt={a.name} loading="lazy" width={800} height={600} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="font-display text-lg font-semibold">{a.name}</div>
                  <p className="mt-1 text-xs opacity-80">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-deep p-10 text-deep-foreground shadow-deep md:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">需要工程塑料原料？</h2>
            <p className="mt-3 text-base opacity-80">填写需求，30 分钟内为您匹配最合适的牌号与价格。资深工程师 1 对 1 选型支持，免费提供小样测试。</p>
            <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
              {["原厂 COA 报告", "1 吨起订", "可寄样测试", "全国 24h 发货"].map((t) => (
                <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan" /> {t}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/inquiry" className="rounded-md bg-cyan px-6 py-3 font-medium text-deep transition-transform hover:-translate-y-0.5">在线询价</Link>
              <a href={`tel:${company.phone}`} className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 font-medium hover:bg-white/10">
                <Phone className="h-4 w-4" /> {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 font-medium hover:bg-white/10">
                <Mail className="h-4 w-4" /> 邮件咨询
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEO 内容区：品牌词与长尾关键词，便于 Google / 百度收录"厦门塑恩贸易有限公司" */}
      <section className="border-t border-border bg-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            关于厦门塑恩贸易有限公司
          </h2>
          <div className="mt-6 grid gap-8 text-sm leading-relaxed text-foreground/80 md:grid-cols-2">
            <div className="space-y-4">
              <p>
                <strong>厦门塑恩贸易有限公司</strong>（英文名：SUEN Plastic Trading Co., Ltd.，简称
                <strong>塑恩贸易</strong>）成立至今十余年，注册地位于福建省厦门市湖里区枋湖北二路 1519
                号，是一家专业从事<strong>工程塑料原料</strong>贸易与技术服务的进出口公司。咨询电话：
                <a className="text-accent hover:underline" href="tel:0592-5526472">0592-5526472</a>。
              </p>
              <p>
                公司是日本<strong>宝理 Polyplastics</strong>、<strong>旭化成 Asahi Kasei</strong>、台湾
                <strong>长春化工 CCP</strong>、日本<strong>帝人 Teijin</strong>、美国
                <strong>塞拉尼斯 Celanese</strong>、比利时<strong>苏威 Solvay</strong>、日本
                <strong>UMG ABS</strong>、意大利<strong>拉提 LATI</strong>、台湾<strong>亚聚 AJP</strong>、
                台湾<strong>台聚 USI</strong> 等十大全球工程塑料品牌的中国授权代理商。
              </p>
              <p>
                主营 POM 聚甲醛、PA66 / PA6 尼龙、PBT、PC 聚碳酸酯、PPS、PEEK、PPA、ABS、ASA、AES、EVA、LCP、mPPO
                等数百个工程塑料牌号，覆盖<strong>汽车零部件、电子电器、家电、精密连接器、5G 通讯、新能源、医疗器械</strong>
                等行业。
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-lg font-semibold text-foreground">为什么选择塑恩贸易</h3>
              <ul className="grid gap-2">
                <li>· 原厂授权 — 提供 COA / TDS / SDS / RoHS / REACH 全套质保文件</li>
                <li>· 厦门中心仓 — 常用牌号现货供应，1 吨起订，全国 24 小时发货</li>
                <li>· 技术选型 — 资深工程师 1 对 1 协助选材、改性与加工建议</li>
                <li>· 稳定供货 — 连续十年与原厂直接合作，价格透明、交期可控</li>
                <li>· 行业经验 — 服务 3000+ 终端客户，覆盖长三角、珠三角及华南市场</li>
              </ul>
              <h3 className="font-display text-lg font-semibold text-foreground">热门搜索</h3>
              <p className="text-xs text-muted-foreground">
                厦门工程塑料代理 · 宝理 POM 代理商 · 旭化成尼龙 PA66 · 长春 PBT · 帝人 PC 透明料 · 塞拉尼斯
                Hostaform · 苏威 PEEK / PPA · UMG ABS / ASA · 拉提导热塑料 · 亚聚 EVA · 台聚 LDPE · 旭化成 Asaclean
                清洗料
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-semibold text-cyan md:text-3xl">{n}</div>
      <div className="mt-1 text-xs opacity-70">{label}</div>
    </div>
  );
}

function SectionTitle({ kicker, title, desc }: { kicker: string; title: string; desc?: string }) {
  return (
    <div className="max-w-2xl">
      <div className="text-xs font-medium uppercase tracking-[0.25em] text-accent">{kicker}</div>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      {desc && <p className="mt-3 text-muted-foreground">{desc}</p>}
    </div>
  );
}
