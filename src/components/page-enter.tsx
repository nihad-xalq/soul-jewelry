"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { ScrollReveal } from "./scroll-reveal";

export function PageEnter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <div key={`${locale}:${pathname}`} className="page-enter">
      <ScrollReveal />
      {children}
    </div>
  );
}
