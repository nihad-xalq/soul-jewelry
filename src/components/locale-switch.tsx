"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

const labels: Record<Locale, string> = {
  az: "AZ",
  en: "EN",
  ru: "RU",
};

const names: Record<Locale, string> = {
  az: "Azərbaycan",
  en: "English",
  ru: "Русский",
};

export function LocaleSwitch({
  className = "",
  placement = "down",
}: {
  className?: string;
  placement?: "down" | "up";
}) {
  const t = useTranslations("header");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const href = query ? `${pathname}?${query}` : pathname;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname, locale]);

  useEffect(() => {
    if (!open) return;

    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative w-fit ${className}`}>
      <button
        type="button"
        className="flex h-9 items-center gap-2 border border-line bg-paper px-3 text-[11px] tracking-[0.16em] text-ink"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={t("language")}
        onClick={() => setOpen((value) => !value)}
      >
        {labels[locale]}
        <svg
          viewBox="0 0 24 24"
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 9.5 12 15.5 18 9.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open ? (
        <ul
          id={menuId}
          className={`absolute z-50 min-w-44 border border-line bg-paper py-1 ${
            placement === "up"
              ? "bottom-full left-0 mb-2"
              : "top-full right-0 mt-2"
          }`}
        >
          {routing.locales.map((item) => {
            const current = item === locale;
            return (
              <li key={item}>
                <Link
                  href={href}
                  locale={item}
                  hrefLang={item}
                  aria-current={current ? "true" : undefined}
                  className={`flex items-baseline justify-between gap-6 px-3 py-2.5 text-[12px] tracking-[0.08em] ${
                    current ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <span>{names[item]}</span>
                  <span className="text-[10px] tracking-[0.18em]">
                    {labels[item]}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
