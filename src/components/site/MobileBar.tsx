import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { useLang, getCompany, ui, lp } from "@/i18n";

export function MobileBar() {
  const lang = useLang();
  const company = getCompany(lang);
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur lg:hidden">
      <div className="grid grid-cols-3">
        <a href={`tel:${company.phone}`} className="flex flex-col items-center justify-center gap-1 py-3 text-xs">
          <Phone className="h-4 w-4 text-accent" /> {ui.common.phone[lang]}
        </a>
        <a href={`mailto:${company.email}`} className="flex flex-col items-center justify-center gap-1 py-3 text-xs">
          <MessageCircle className="h-4 w-4 text-accent" /> {ui.common.email[lang]}
        </a>
        <Link to={lp("/inquiry", lang) as any} className="flex flex-col items-center justify-center gap-1 bg-gradient-deep py-3 text-xs text-deep-foreground">
          <FileText className="h-4 w-4" /> {ui.nav.inquiry[lang]}
        </Link>
      </div>
    </div>
  );
}
