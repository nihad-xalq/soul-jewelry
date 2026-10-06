import { Cormorant_Garamond, Outfit } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { SiteHeader } from "@/components/site-header";
import { Link } from "@/i18n/navigation";
import az from "../../messages/az.json";
import "./globals.css";

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

export default function NotFound() {
  return (
    <html lang="az" className={`${outfit.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full bg-paper font-sans text-ink">
        <NextIntlClientProvider locale="az" messages={az}>
          <SiteHeader />
          <main id="content" className="mx-auto max-w-xl px-5 py-28 text-center">
            <p className="text-[0.68rem] uppercase tracking-[0.32em] text-muted">404</p>
            <h1 className="mt-4 font-serif text-5xl tracking-[-0.03em]">{az.notFound.title}</h1>
            <Link href="/products" className="mt-8 inline-block text-[11px] uppercase tracking-[0.24em]">
              {az.notFound.back}
            </Link>
          </main>
          <footer className="border-t border-line">
            <div className="mx-auto flex max-w-[1500px] items-end justify-between px-5 py-12 md:px-10">
              <p className="font-serif text-3xl tracking-[-0.03em]">Soul</p>
              <p className="text-sm text-muted">{az.footer.tagline}</p>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
