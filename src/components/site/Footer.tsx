import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Printer } from "lucide-react";
import { useLang, getCompany, listBrands, ui, lp } from "@/i18n";

export function Footer() {
  const lang = useLang();
  const company = getCompany(lang);
  const brands = listBrands(lang);

  return (
    <footer className="bg-deep text-deep-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-cyan/20 font-display font-bold">S</div>
              <div>
                <div className="font-display text-base font-semibold">
                  {lang === "zh" ? "塑恩贸易" : "SUEN Plastic"}
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] opacity-60">
                  {lang === "zh" ? "SUEN PLASTIC" : "XIAMEN · CHINA"}
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed opacity-70">{ui.footer.intro[lang]}</p>
          </div>

          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider opacity-90">{ui.footer.brands[lang]}</h4>
            <ul className="space-y-2 text-sm opacity-70">
              {brands.map((b) => (
                <li key={b.slug}>
                  <Link to={lp(`/brands/${b.slug}`, lang) as any} className="hover:text-cyan">
                    {b.name} {lang === "zh" ? b.nameEn : ""}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider opacity-90">{ui.footer.links[lang]}</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to={lp("/products", lang) as any} className="hover:text-cyan">{ui.nav.products[lang]}</Link></li>
              <li><Link to={lp("/applications", lang) as any} className="hover:text-cyan">{ui.nav.applications[lang]}</Link></li>
              <li><Link to={lp("/about", lang) as any} className="hover:text-cyan">{ui.nav.about[lang]}</Link></li>
              <li><Link to={lp("/inquiry", lang) as any} className="hover:text-cyan">{ui.nav.inquiry[lang]}</Link></li>
              <li><Link to={lp("/contact", lang) as any} className="hover:text-cyan">{ui.nav.contact[lang]}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider opacity-90">{ui.footer.contact[lang]}</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-cyan" /> {company.phone}</li>
              <li className="flex items-start gap-2"><Printer className="mt-0.5 h-4 w-4 text-cyan" /> {company.fax}</li>
              <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-cyan" /> {company.email}</li>
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-cyan" /> {company.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs opacity-60 md:flex md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {company.name}</p>
          <p className="mt-2 md:mt-0">{ui.footer.tag[lang]}</p>
        </div>
      </div>
    </footer>
  );
}
