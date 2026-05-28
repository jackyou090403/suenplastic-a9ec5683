import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Vercel deployment: disable the Cloudflare Worker plugin and build the app
// as a fully prerendered SPA. TanStack Start prerenders every route reachable
// via <Link> at build time, producing static HTML + a client bundle that
// Vercel serves as a plain static site (no serverless functions required).
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    spa: {
      enabled: true,
      prerender: {
        enabled: true,
        crawlLinks: true,
        retryCount: 2,
      },
    },
    // Make sure the homepage and every top-level route are seeded for the
    // prerender crawler in case some are not linked from "/".
    pages: [
      { path: "/" },
      { path: "/products" },
      { path: "/brands" },
      { path: "/applications" },
      { path: "/about" },
      { path: "/contact" },
      { path: "/inquiry" },
    ],
  },
});
