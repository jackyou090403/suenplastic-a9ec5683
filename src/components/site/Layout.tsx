import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileBar } from "./MobileBar";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      <Footer />
      <MobileBar />
    </div>
  );
}

export function PageHeader({ kicker, title, desc }: { kicker?: string; title: string; desc?: string }) {
  return (
    <section className="bg-gradient-deep text-deep-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        {kicker && (
          <div className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-cyan">{kicker}</div>
        )}
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">{title}</h1>
        {desc && <p className="mt-4 max-w-2xl text-base opacity-80 md:text-lg">{desc}</p>}
      </div>
    </section>
  );
}
