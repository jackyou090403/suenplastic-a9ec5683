import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { company } from "@/data/products";

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur lg:hidden">
      <div className="grid grid-cols-3">
        <a href={`tel:${company.phone}`} className="flex flex-col items-center justify-center gap-1 py-3 text-xs">
          <Phone className="h-4 w-4 text-accent" /> 电话
        </a>
        <a href={`mailto:${company.email}`} className="flex flex-col items-center justify-center gap-1 py-3 text-xs">
          <MessageCircle className="h-4 w-4 text-accent" /> 邮件
        </a>
        <Link to="/inquiry" className="flex flex-col items-center justify-center gap-1 bg-gradient-deep py-3 text-xs text-deep-foreground">
          <FileText className="h-4 w-4" /> 在线询价
        </Link>
      </div>
    </div>
  );
}
