import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, Globe } from "lucide-react";
import { useLang, getCompany, ui, lp } from "@/i18n";

export function Header() {
  const lang = useLang();
  const [open, setOpen] = useState(false);
  const company = getCompany(lang);

  const nav = [
    { to: lp("/", lang), label: ui.nav.home[lang], exact: true },
    { to: lp("/products", lang), label: ui.nav.products[lang], exact: false },
    { to: lp("/brands", lang), label: ui.nav.brands[lang], exact: false },
    { to: lp("/applications", lang), label: ui.nav.applications[lang], exact: false },
    { to: lp("/about", lang), label: ui.nav.about[lang], exact: false },
    { to: lp("/contact", lang), label: ui.nav.contact[lang], exact: false },
  ];

  // language switch target: swap /en prefix
  const otherLangHref = lang === "zh" ? "/en" : "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to={lp("/", lang) as any} className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-deep text-deep-foreground font-display font-bold">
            S
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-semibold tracking-tight">
              {lang === "zh" ? "塑恩贸易" : "SUEN Plastic"}
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {lang === "zh" ? "SUEN PLASTIC" : "XIAMEN · CHINA"}
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to as any}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-medium text-foreground bg-secondary" }}
              activeOptions={{ exact: n.exact }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={otherLangHref}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-foreground/75 hover:bg-secondary"
            hrefLang={lang === "zh" ? "en" : "zh-CN"}
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === "zh" ? "EN" : "中文"}
          </a>
          <a href={`tel:${company.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <Phone className="h-4 w-4" /> {company.phone}
          </a>
          <Link
            to={lp("/inquiry", lang) as any}
            className="rounded-md bg-gradient-deep px-4 py-2 text-sm font-medium text-deep-foreground shadow-card transition-transform hover:-translate-y-0.5"
          >
            {ui.nav.getQuote[lang]}
          </Link>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="flex flex-col p-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to as any}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
            <a
              href={otherLangHref}
              className="mt-2 rounded-md border border-border px-3 py-3 text-center text-sm font-medium"
            >
              {lang === "zh" ? "English" : "中文"}
            </a>
            <Link
              to={lp("/inquiry", lang) as any}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-gradient-deep px-3 py-3 text-center text-sm font-medium text-deep-foreground"
            >
              {ui.nav.getQuote[lang]}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
