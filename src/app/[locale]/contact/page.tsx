import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact-form";
import { instagramHandle, instagramUrl, replyHours, whatsappDisplay, whatsappLink } from "@/lib/site";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <main id="content" className="mx-auto grid max-w-[1500px] gap-14 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24">
      <div>
        <p className="rise text-[0.68rem] uppercase tracking-[0.32em] text-muted">{t("kicker")}</p>
        <h1 className="rise rise-d1 mt-4 font-serif text-5xl leading-[0.92] tracking-[-0.04em] md:text-7xl">
          {t("heading")}
        </h1>
        <p className="rise rise-d2 mt-6 max-w-md text-[15px] leading-7 text-muted">{t("intro")}</p>
        <a
          href={whatsappLink("Salam, Soul Jewelry.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block font-serif text-3xl tracking-[-0.03em] underline decoration-1 underline-offset-4 md:text-4xl"
        >
          {whatsappDisplay}
        </a>
        <div className="mt-8 border-t border-line pt-6">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{t("hoursLabel")}</p>
          <p className="mt-2 text-sm">{t("hours", { from: replyHours.from, to: replyHours.to })}</p>
        </div>
        <div className="mt-6 border-t border-line pt-6 text-sm">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{t("instagram")}</p>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block hover:underline"
          >
            {instagramHandle}
          </a>
        </div>
      </div>
      <ContactForm />
    </main>
  );
}
