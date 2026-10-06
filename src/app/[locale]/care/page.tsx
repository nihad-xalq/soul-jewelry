import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type CarePageProps = {
  params: Promise<{ locale: string }>;
};

const indexes = [0, 1, 2, 3] as const;

export async function generateMetadata({ params }: CarePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "care" });
  return { title: t("title"), description: t("description") };
}

export default async function CarePage({ params }: CarePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("care");

  return (
    <main id="content" className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
      <p className="text-[0.68rem] uppercase tracking-[0.32em] text-muted">{t("kicker")}</p>
      <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.92] tracking-[-0.04em] md:text-7xl">
        {t("heading")}
      </h1>
      <p className="mt-6 max-w-md text-[15px] leading-7 text-muted">{t("intro")}</p>
      <ol className="mt-14 max-w-3xl divide-y divide-line border-y border-line">
        {indexes.map((index) => (
          <li key={index} className="grid gap-3 py-6 sm:grid-cols-[8rem_1fr] sm:items-baseline">
            <p className="text-[10px] uppercase tracking-[0.28em] text-muted">0{index + 1}</p>
            <div>
              <h2 className="font-serif text-3xl tracking-[-0.03em]">{t(`steps.${index}.title`)}</h2>
              <p className="mt-2 text-[15px] leading-7 text-muted">{t(`steps.${index}.text`)}</p>
            </div>
          </li>
        ))}
      </ol>

      <section id="hoop" className="mt-20 max-w-3xl scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-line pt-16">
        <p className="text-[0.68rem] uppercase tracking-[0.32em] text-muted">{t("hoopKicker")}</p>
        <h2 className="mt-4 font-serif text-4xl leading-[0.92] tracking-[-0.04em] md:text-5xl">
          {t("hoopHeading")}
        </h2>
        <p className="mt-6 max-w-md text-[15px] leading-7 text-muted">{t("hoopIntro")}</p>
        <ol className="mt-14 divide-y divide-line border-y border-line">
          {indexes.map((index) => (
            <li key={index} className="grid gap-3 py-6 sm:grid-cols-[8rem_1fr] sm:items-baseline">
              <p className="text-[10px] uppercase tracking-[0.28em] text-muted">0{index + 1}</p>
              <div>
                <h3 className="font-serif text-3xl tracking-[-0.03em]">{t(`hoop.${index}.title`)}</h3>
                <p className="mt-2 text-[15px] leading-7 text-muted">{t(`hoop.${index}.text`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Link href="/products" className="mt-10 inline-block text-[11px] uppercase tracking-[0.24em]">
        {t("back")}
      </Link>
    </main>
  );
}
