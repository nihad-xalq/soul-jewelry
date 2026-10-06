"use client";

import { Suspense, useEffect, useId, useRef, useState } from "react";
import { nav, whatsappDisplay, whatsappLink } from "@/lib/site";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitch } from "./locale-switch";
import { useTranslations } from "next-intl";
import { Wordmark } from "./wordmark";

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const t = useTranslations("header");
  const tNav = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const hasOpened = useRef(false);
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      if (hasOpened.current) buttonRef.current?.focus();
      return;
    }

    hasOpened.current = true;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        {t("skip")}
      </a>
      <div className="flex items-center justify-center gap-3 border-b border-line px-4 py-2 text-[11px] tracking-[0.16em] text-muted">
        <a
          href="https://www.instagram.com/souljewelry.az"
          className="hover:text-ink"
          target="_blank"
          rel="noopener noreferrer"
        >
          @souljewelry.az
        </a>
        <span aria-hidden="true">·</span>
        <a
          href={whatsappLink()}
          className="hover:text-ink"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp {whatsappDisplay}
        </a>
      </div>
      <div className="relative mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-10">
        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label={t("primary")}
        >
          {nav.map((link) => {
            const current = isCurrent(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={`text-[11px] uppercase tracking-[0.24em] transition-colors hover:text-ink ${
                  current ? "text-ink" : "text-ink/70"
                }`}
              >
                {tNav(link.id)}
              </Link>
            );
          })}
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="text-[11px] uppercase tracking-[0.28em] md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? t("close") : t("menu")}
        </button>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2"
          aria-label={t("home")}
        >
          <Wordmark markClassName="w-[6.2rem]" />
        </Link>

        <div className="flex items-center gap-4">
          <Suspense fallback={null}>
            <LocaleSwitch className="hidden md:flex" />
          </Suspense>
          <a
            href={whatsappLink("Salam, Soul Jewelry.")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-[0.22em] hover:text-ink"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {open ? (
        <div
          id={menuId}
          className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto bg-paper md:hidden"
        >
          <nav
            className="flex min-h-full flex-col justify-between px-6 py-10"
            aria-label={t("mobile")}
          >
            <ol className="space-y-2">
              {nav.map((link, index) => (
                <li key={link.href}>
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    className="flex items-baseline gap-4 border-b border-line py-4"
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-[11px] tracking-[0.28em] text-muted">
                      0{index + 1}
                    </span>
                    <span className="font-serif text-5xl leading-none">
                      {tNav(link.id)}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
            <div className="pt-16">
              <Suspense fallback={null}>
                <LocaleSwitch placement="up" />
              </Suspense>
              <p className="mt-6 font-serif text-2xl italic text-muted">
                {t("tagline")}
              </p>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
