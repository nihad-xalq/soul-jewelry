import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { whatsappLink } from "@/lib/site";

type GiftPageProps = {
  params: Promise<{ locale: string }>;
};

const indexes = [0, 1, 2] as const;

export async function generateMetadata({ params }: GiftPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gift" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: getPathname({ locale: locale as Locale, href: "/gift" }),
      images: [
        {
          url: "/insta-media/pics/IMG_0935.JPG.jpeg",
          width: 1179,
          height: 2096,
          alt: t("imageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/insta-media/pics/IMG_0935.JPG.jpeg"],
    },
  };
}

export default async function GiftPage({ params }: GiftPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("gift");

  return (
    <main id="content">
      <section className="mx-auto grid max-w-[1500px] items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24">
        <div>
          <p className="rise text-[0.68rem] uppercase tracking-[0.32em] text-muted">{t("kicker")}</p>
          <h1 className="rise rise-d1 mt-4 font-serif text-5xl leading-[0.92] tracking-[-0.04em] md:text-7xl">
            {t("heading")}
          </h1>
          <p className="rise rise-d2 mt-6 max-w-md text-[15px] leading-7 text-muted">{t("intro")}</p>
        </div>
        <Image
          src="/insta-media/pics/IMG_0935.JPG.jpeg"
          alt={t("imageAlt")}
          width={1179}
          height={2096}
          preload
          sizes="(max-width: 768px) 100vw, 40vw"
          className="settle mx-auto h-auto w-full max-w-md"
        />
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-16 md:grid-cols-3 md:px-10 md:py-24">
          {indexes.map((index) => (
            <article
              key={index}
              data-reveal=""
              className="border-t border-ink pt-5"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <p className="text-[10px] uppercase tracking-[0.28em] text-muted">0{index + 1}</p>
              <h2 className="mt-3 font-serif text-3xl tracking-[-0.03em]">{t(`steps.${index}.title`)}</h2>
              <p className="mt-4 text-[15px] leading-7 text-muted">{t(`steps.${index}.text`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div data-reveal="" className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-24">
          <p className="max-w-md text-[15px] leading-7">{t("note")}</p>
          <a
            href={whatsappLink(t("message"))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block bg-ink px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-paper"
          >
            {t("cta")}
          </a>
        </div>
      </section>
    </main>
  );
}
