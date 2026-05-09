import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { company } from "@/data/products";

const nav = [
  { to: "/", label: "首页" },
  { to: "/products", label: "产品中心" },
  { to: "/brands", label: "品牌代理" },
  { to: "/applications", label: "应用领域" },
  { to: "/about", label: "关于我们" },
  { to: "/contact", label: "联系我们" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-deep text-deep-foreground font-display font-bold">
            S
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-semibold tracking-tight">塑恩贸易</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">SUEN PLASTIC</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-medium text-foreground bg-secondary" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${company.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <Phone className="h-4 w-4" /> {company.phone}
          </a>
          <Link
            to="/inquiry"
            className="rounded-md bg-gradient-deep px-4 py-2 text-sm font-medium text-deep-foreground shadow-card transition-transform hover:-translate-y-0.5"
          >
            获取报价
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
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/inquiry"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-gradient-deep px-3 py-3 text-center text-sm font-medium text-deep-foreground"
            >
              获取报价
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
