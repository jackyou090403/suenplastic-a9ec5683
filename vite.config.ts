import { defineConfig } from "@lovable.dev/vite-tanstack-config";

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
    pages: [
      { path: "/" },
      { path: "/products" },
      { path: "/brands" },
      { path: "/applications" },
      { path: "/about" },
      { path: "/contact" },
      { path: "/inquiry" },
      { path: "/en" },
      { path: "/en/products" },
      { path: "/en/brands" },
      { path: "/en/applications" },
      { path: "/en/about" },
      { path: "/en/contact" },
      { path: "/en/inquiry" },
    ],
  },
});
