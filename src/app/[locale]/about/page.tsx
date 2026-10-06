import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { instagramHandle, instagramUrl, replyHours, whatsappDisplay, whatsappLink } from "@/lib/site";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("description") };
}

const indexes = [0, 1, 2] as const;

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const hours = { from: replyHours.from, to: replyHours.to };

  return (
    <main id="content">
      <section className="mx-auto grid max-w-[1500px] items-end gap-10 px-5 py-16 md:grid-cols-12 md:px-10 md:py-24">
        <div className="md:col-span-7">
          <p className="text-[0.68rem] uppercase tracking-[0.32em] text-muted">{t("kicker")}</p>
          <h1 className="mt-4 font-serif text-5xl leading-[0.9] tracking-[-0.04em] md:text-7xl">
            {t("headline")}
          </h1>
        </div>
        <p className="max-w-md text-[15px] leading-7 text-muted md:col-span-5">{t("intro")}</p>
      </section>

      <div className="relative h-[70vw] max-h-[760px] min-h-80">
        <Image
          src="/insta-media/pics/IMG_0929.JPG.jpeg"
          alt={t("heroAlt")}
          fill
          sizes="100vw"
          className="object-cover object-[center_40%]"
          preload
        />
      </div>

      <section className="mx-auto grid max-w-[1500px] gap-12 px-5 py-16 md:grid-cols-3 md:px-10 md:py-24">
        {indexes.map((index) => (
          <article key={index} className="border-t border-ink pt-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-muted">0{index + 1}</p>
            <h2 className="mt-3 font-serif text-3xl tracking-[-0.03em]">{t(`notes.${index}.title`)}</h2>
            <p className="mt-4 text-[15px] leading-7 text-muted">{t(`notes.${index}.text`)}</p>
          </article>
        ))}
      </section>

      <section className="grid border-t border-line md:grid-cols-2">
        <div className="relative min-h-80">
          <Image
            src="/insta-media/pics/IMG_0934.JPG.jpeg"
            alt={t("handAlt")}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-5 py-16 sm:px-10 md:px-16">
          <p className="text-[0.68rem] uppercase tracking-[0.32em] text-muted">{t("lineKicker")}</p>
          <h2 className="mt-4 font-serif text-4xl leading-[0.95] tracking-[-0.03em] md:text-5xl">
            {t("lineTitle")}
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-7 text-muted">{t("lineCopy")}</p>
          <Link href="/products" className="mt-8 text-[11px] uppercase tracking-[0.24em]">
            {t("shopCta")}
          </Link>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
          <p className="text-[0.68rem] uppercase tracking-[0.32em] text-muted">{t("orderKicker")}</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[0.95] tracking-[-0.03em] md:text-6xl">
            {t("orderTitle")}
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {indexes.map((index) => (
              <li key={index} className="border-t border-ink pt-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-muted">0{index + 1}</p>
                <h3 className="mt-3 font-serif text-3xl tracking-[-0.03em]">{t(`steps.${index}.title`)}</h3>
                <p className="mt-4 text-[15px] leading-7 text-muted">{t(`steps.${index}.text`, hours)}</p>
                {index === 2 ? (
                  <Link href="/delivery" className="mt-4 inline-block text-[11px] uppercase tracking-[0.22em]">
                    {t("deliveryLink")}
                  </Link>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line bg-paper-2/60">
        <div className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
          <p className="text-[0.68rem] uppercase tracking-[0.32em] text-muted">{t("faqKicker")}</p>
          <h2 className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl">{t("faqTitle")}</h2>
          <dl className="mt-10 max-w-3xl divide-y divide-line border-y border-line">
            {indexes.map((index) => (
              <div key={index} className="py-6">
                <dt className="font-serif text-2xl tracking-[-0.03em]">{t(`faq.${index}.q`)}</dt>
                <dd className="mt-3 max-w-2xl text-[15px] leading-7 text-muted">
                  {t(`faq.${index}.a`, hours)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.32em] text-muted">{t("arrivalKicker")}</p>
          <h2 className="mt-4 font-serif text-4xl leading-[0.95] tracking-[-0.03em] md:text-5xl">
            {t("arrivalTitle")}
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-7 text-muted">
            {t("arrivalCopy", { phone: whatsappDisplay, handle: instagramHandle })}
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-[11px] uppercase tracking-[0.22em]">
            <a href={whatsappLink("Salam, Soul Jewelry.")} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>
        <Image
          src="/insta-media/pics/IMG_0935.JPG.jpeg"
          alt={t("packAlt")}
          width={1179}
          height={2096}
          sizes="(max-width: 768px) 100vw, 40vw"
          className="mx-auto h-auto w-full max-w-md"
        />
      </section>
    </main>
  );
}
