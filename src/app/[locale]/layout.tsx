import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageEnter } from "@/components/page-enter";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { routing } from "@/i18n/routing";
import { siteOrigin, whatsappLink } from "@/lib/site";
import "../globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
  weight: ["300", "400", "500"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(siteOrigin()),
    title: {
      default: t("title"),
      template: t("template"),
    },
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale === "ru" ? "ru_RU" : locale === "en" ? "en_US" : "az_AZ",
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper font-sans text-ink">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SiteHeader />
          <PageEnter>{children}</PageEnter>
          <SiteFooter />
          <a
            href={whatsappLink("Salam, Soul Jewelry.")}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 z-40 bg-ink px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-paper md:hidden"
          >
            WhatsApp
          </a>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
