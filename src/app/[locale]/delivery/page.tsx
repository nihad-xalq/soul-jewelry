import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { whatsappLink } from "@/lib/site";

type DeliveryPageProps = {
  params: Promise<{ locale: string }>;
};

const districts = [0, 1, 2, 3, 4, 5] as const;
const stations = [0, 1, 2, 3] as const;

export async function generateMetadata({ params }: DeliveryPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "delivery" });
  return { title: t("title"), description: t("description") };
}

export default async function DeliveryPage({ params }: DeliveryPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("delivery");

  return (
    <main id="content" className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
      <p className="text-[0.68rem] uppercase tracking-[0.32em] text-muted">{t("kicker")}</p>
      <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.92] tracking-[-0.04em] md:text-7xl">
        {t("heading")}
      </h1>
      <p className="mt-6 max-w-md text-[15px] leading-7 text-muted">{t("intro")}</p>

      <div className="mt-14 grid max-w-3xl gap-12 border-t border-line pt-10 md:grid-cols-2">
        <section>
          <h2 className="text-[10px] uppercase tracking-[0.28em] text-muted">{t("districtsLabel")}</h2>
          <ul className="mt-5">
            {districts.map((index) => (
              <li key={index} className="border-t border-line py-3 font-serif text-2xl tracking-[-0.03em]">
                {t(`districts.${index}`)}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-[10px] uppercase tracking-[0.28em] text-muted">{t("stationsLabel")}</h2>
          <ul className="mt-5">
            {stations.map((index) => (
              <li key={index} className="border-t border-line py-3 font-serif text-2xl tracking-[-0.03em]">
                {t(`stations.${index}`)}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <p className="mt-12 max-w-md border-t border-ink pt-5">
        <span className="block text-[10px] uppercase tracking-[0.28em] text-muted">{t("timeLabel")}</span>
        <span className="mt-3 block font-serif text-3xl tracking-[-0.03em]">{t("time")}</span>
      </p>
      <p className="mt-6 max-w-md text-[15px] leading-7 text-muted">{t("note")}</p>
      <a
        href={whatsappLink(t("message"))}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block bg-ink px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-paper"
      >
        {t("cta")}
      </a>
    </main>
  );
}
