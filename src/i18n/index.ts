import { useRouterState } from "@tanstack/react-router";
import { brands, products, materials, applications, company, type Brand, type Product } from "@/data/products";
import { brandDetails } from "@/data/brand-details";
import { brandsEn, productsEn, materialsEn, applicationsEn, companyEn, brandDetailsEn } from "./data-en";
import { ui, type Lang } from "./dict";

export type { Lang };
export { ui };

export function useLang(): Lang {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return path.startsWith("/en") ? "en" : "zh";
}

export function pickLang<T extends { zh: string; en: string }>(o: T, lang: Lang): string {
  return o[lang];
}

export function tt(path: string, lang: Lang): string {
  const parts = path.split(".");
  let cur: any = ui;
  for (const p of parts) cur = cur?.[p];
  if (cur && typeof cur === "object" && "zh" in cur) return cur[lang];
  return "";
}

// Localize a route path: zh -> "/foo", en -> "/en/foo"
export function lp(path: string, lang: Lang): string {
  if (lang === "zh") return path;
  if (path === "/") return "/en";
  return "/en" + path;
}

// ----- domain getters -----
export function getBrand(slug: string, lang: Lang) {
  const b = brands.find((x) => x.slug === slug);
  if (!b) return undefined;
  if (lang === "zh") return { ...b };
  const en = brandsEn[b.slug];
  return {
    ...b,
    name: b.nameEn,
    origin: en?.origin ?? b.origin,
    tagline: en?.tagline ?? b.tagline,
    description: en?.description ?? b.description,
  };
}

export function listBrands(lang: Lang): Brand[] {
  return brands.map((b) => getBrand(b.slug, lang)! as Brand);
}

export function getProduct(slug: string, lang: Lang) {
  const p = products.find((x) => x.slug === slug);
  if (!p) return undefined;
  if (lang === "zh") return p;
  const en = productsEn[p.slug];
  return {
    ...p,
    feature: en?.feature ?? p.feature,
    applications: en?.applications ?? p.applications,
  };
}

export function listProducts(lang: Lang): Product[] {
  return products.map((p) => getProduct(p.slug, lang)! as Product);
}

export function listMaterials(lang: Lang) {
  return materials.map((m) => {
    if (lang === "zh") return m;
    const en = materialsEn[m.code];
    return { ...m, name: en?.name ?? m.name, desc: en?.desc ?? m.desc };
  });
}

export function listApplications(lang: Lang) {
  return applications.map((a) => {
    if (lang === "zh") return a;
    const en = applicationsEn[a.slug];
    return { ...a, name: en?.name ?? a.name, desc: en?.desc ?? a.desc };
  });
}

export function getCompany(lang: Lang) {
  if (lang === "zh") return company;
  return { ...company, name: companyEn.name, address: companyEn.address, workhours: companyEn.workhours };
}

export function getBrandDetail(slug: string, lang: Lang) {
  const d = brandDetails[slug as keyof typeof brandDetails];
  if (!d) return undefined;
  if (lang === "zh") return d;
  const en = brandDetailsEn[slug as keyof typeof brandDetailsEn];
  if (!en) return d;
  return {
    founded: d.founded,
    hq: en.hq,
    history: en.history,
    highlights: en.highlights,
    signatureSeries: en.signatureSeries,
    industries: en.industries,
    specs: en.specs,
  };
}
