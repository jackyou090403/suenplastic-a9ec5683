import { Link } from "@tanstack/react-router";
import { company, brands } from "@/data/products";
import { Phone, Mail, MapPin, Printer } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-deep text-deep-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-cyan/20 font-display font-bold">S</div>
              <div>
                <div className="font-display text-base font-semibold">塑恩贸易</div>
                <div className="text-[10px] uppercase tracking-[0.18em] opacity-60">SUEN PLASTIC</div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed opacity-70">
              专注工程塑料原料贸易，宝理 · 旭化成 · 长春化工三大品牌授权代理，服务于汽车、电子、家电、新能源等行业。
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider opacity-90">品牌代理</h4>
            <ul className="space-y-2 text-sm opacity-70">
              {brands.map((b) => (
                <li key={b.slug}>
                  <Link to="/brands/$brand" params={{ brand: b.slug }} className="hover:text-cyan">
                    {b.name} {b.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider opacity-90">快速链接</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link to="/products" className="hover:text-cyan">产品中心</Link></li>
              <li><Link to="/applications" className="hover:text-cyan">应用领域</Link></li>
              <li><Link to="/about" className="hover:text-cyan">关于我们</Link></li>
              <li><Link to="/inquiry" className="hover:text-cyan">在线询价</Link></li>
              <li><Link to="/contact" className="hover:text-cyan">联系我们</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider opacity-90">联系方式</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-cyan" /> {company.phone}</li>
              <li className="flex items-start gap-2"><Printer className="mt-0.5 h-4 w-4 text-cyan" /> {company.fax}</li>
              <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-cyan" /> {company.email}</li>
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-cyan" /> {company.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs opacity-60 md:flex md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {company.name} · {company.nameEn}</p>
          <p className="mt-2 md:mt-0">工程塑料原料 · 宝理 / 旭化成 / 长春化工授权代理</p>
        </div>
      </div>
    </footer>
  );
}
