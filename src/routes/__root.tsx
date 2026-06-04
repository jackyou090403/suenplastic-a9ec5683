import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">页面未找到</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          您访问的页面不存在或已被移动。
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          页面加载失败
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          服务器出现问题，请刷新页面或返回首页。
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            重试
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            返回首页
          </a>
        </div>
      </div>
    </div>
  );
}

const SITE_URL = "https://suenplastic.com";
const SITE_NAME = "厦门塑恩贸易有限公司";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "厦门塑恩贸易有限公司",
  alternateName: ["塑恩贸易", "SUEN Plastic Trading Co., Ltd.", "SUEN Plastic"],
  url: SITE_URL,
  logo: SITE_URL + "/favicon.ico",
  email: "youty123@suenplastic.com",
  telephone: "+86-592-5526472",
  faxNumber: "+86-592-6032367",
  address: {
    "@type": "PostalAddress",
    streetAddress: "湖里区枋湖北二路1519号",
    addressLocality: "厦门市",
    addressRegion: "福建省",
    addressCountry: "CN",
  },
  areaServed: "CN",
  slogan: "工程塑料原料一站式供应商",
  description:
    "厦门塑恩贸易有限公司是日本宝理 Polyplastics、旭化成 Asahi Kasei、台湾长春化工、帝人、塞拉尼斯、苏威、日本 UMG、拉提、亚聚、台聚等十大国际工程塑料品牌的授权代理商。",
  sameAs: [SITE_URL],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "厦门塑恩贸易有限公司",
  alternateName: "塑恩贸易",
  url: SITE_URL,
  inLanguage: "zh-CN",
  potentialAction: {
    "@type": "SearchAction",
    target: SITE_URL + "/products?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "厦门塑恩贸易有限公司|塑胶原料|宝理/旭化成/帝人PC/POM/EVOH原料" },
      {
        name: "description",
        content:
          "厦门塑恩贸易有限公司位于厦门，专业经销苏威、塞拉尼斯、宝理、旭化成、帝人等原厂塑胶原料，PC、POM、PA66、PPA等阻燃改性塑料现货，原厂物性表免费下载。",
      },
      {
        name: "keywords",
        content:
          "厦门塑恩贸易有限公司,塑胶原料,PC,POM,EVOH,宝理,旭化成,帝人,塞拉尼斯",
      },
      { name: "author", content: SITE_NAME },
      { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1" },
      { name: "googlebot", content: "index,follow" },
      { name: "baiduspider", content: "index,follow" },
      { httpEquiv: "Content-Language", content: "zh-CN" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "zh_CN" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "厦门塑恩贸易有限公司 — 工程塑料原料一站式供应" },
      { property: "og:description", content: "十大国际品牌授权代理 · 现货库存 · 技术选型支持 · 全国 24h 发货" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "厦门塑恩贸易有限公司 — 工程塑料原料一站式供应" },
      { name: "twitter:description", content: "十大国际品牌授权代理 · 现货库存 · 技术选型支持 · 全国 24h 发货" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(organizationJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(websiteJsonLd) },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lang = pathname.startsWith("/en") ? "en" : "zh-CN";
  return (
    <html lang={lang}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
