import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FilmReel } from "@/components/film-reel";
import { ProductCard } from "@/components/product-card";
import { Link } from "@/i18n/navigation";
import { products } from "@/lib/products";
import { instagramHandle, instagramUrl, whatsappDisplay, whatsappLink } from "@/lib/site";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: { absolute: t("title") }, description: t("description") };
}

const tiles = [
  {
    href: "/products?category=earrings",
    label: "earrings",
    note: "earringsNote",
    alt: "earringsAlt",
    image: "/insta-media/pics/IMG_0926.JPG.jpeg",
  },
  {
    href: "/products?category=rings",
    label: "rings",
    note: "ringsNote",
    alt: "ringsAlt",
    image: "/insta-media/pics/IMG_0927.JPG.jpeg",
  },
  {
    href: "/products?collection=aura",
    label: "Aura",
    note: "auraNote",
    alt: "auraAlt",
    image: "/insta-media/pics/IMG_0933.JPG.jpeg",
  },
] as const;

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const shop = await getTranslations("shop");
  const [leadA, leadB] = t("headlineLead").split("\n");

  const ticker = [
    t("tickerStand"),
    "Dalğa",
    "Cubic",
    "Aura",
    shop("metals.silver"),
    instagramHandle,
    "WhatsApp",
  ];

  return (
    <main id="content">
      <section className="flex flex-col md:grid md:h-[calc(100svh-var(--header-h))] md:grid-cols-12">
        <div className="order-2 flex flex-col justify-end px-5 py-12 sm:px-10 md:order-1 md:col-span-5 md:justify-center md:px-10 md:py-10 lg:px-12 xl:px-16">
          <p className="rise text-[0.68rem] uppercase tracking-[0.34em] text-muted">{t("kicker")}</p>
          <h1 className="rise rise-d1 mt-5 font-serif text-[16vw] leading-[0.86] tracking-[-0.04em] sm:text-6xl md:text-[3.2rem] lg:text-[4.8rem] xl:text-[5.8rem]">
            {leadA}
            <br />
            {leadB}
            <br />
            <em className="italic">{t("headlineEm")}</em>
          </h1>
          <p className="rise rise-d2 mt-6 max-w-sm text-[15px] leading-7 text-muted">
            {t("intro", { count: products.length })}
          </p>
          <div className="rise rise-d3 mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              href="/products"
              className="bg-ink px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-paper"
            >
              {t("shopCta")}
            </Link>
            <a
              href={whatsappLink("Salam, Soul Jewelry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-[0.28em]"
            >
              {whatsappDisplay}
            </a>
          </div>
        </div>
        <div className="settle relative order-1 h-[68svh] md:order-2 md:col-span-7 md:h-full">
          <Image
            src="/insta-media/pics/IMG_0929.JPG.jpeg"
            alt={t("heroAlt")}
            fill
            preload
            sizes="(max-width: 768px) 100vw, 58vw"
            className="object-cover object-[center_20%]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/50 to-transparent px-5 py-5 text-[10px] uppercase tracking-[0.28em] text-white md:px-8">
            <span>{t("look")}</span>
            <span>{t("silver")}</span>
          </div>
        </div>
      </section>

      <div data-reveal="" className="marquee overflow-hidden border-y border-line py-4" aria-hidden="true">
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {ticker.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex items-center gap-8 px-4 text-[11px] uppercase tracking-[0.32em] text-muted"
                >
                  {item}
                  <span className="text-ink/50">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-20">
        <div data-reveal="" className="flex items-end justify-between gap-6">
          <h2 className="font-serif text-4xl leading-none tracking-[-0.03em] md:text-5xl">
            {t("startTitle")}
          </h2>
          <Link href="/products" className="text-[11px] uppercase tracking-[0.24em]">
            {t("allPieces")}
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {tiles.map((category, index) => (
            <Link
              key={category.href}
              href={category.href}
              data-reveal=""
              style={{ animationDelay: `${index * 80}ms` }}
              className="group relative block min-h-72 overflow-hidden"
            >
              <Image
                src={category.image}
                alt={t(category.alt)}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/75">{t(category.note)}</p>
                <p className="mt-1 font-serif text-4xl tracking-[-0.03em]">
                  {category.label === "Aura" ? "Aura" : shop(`categories.${category.label}`)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-20">
          <div data-reveal="" className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.32em] text-muted">{t("now")}</p>
              <h2 className="mt-3 font-serif text-5xl leading-[0.92] tracking-[-0.03em] md:text-6xl">
                {t("editTitle")}
              </h2>
            </div>
            <p className="max-w-sm text-[15px] leading-7 text-muted">{t("editCopy")}</p>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard key={product.slug} product={product} delay={index * 50} />
            ))}
          </div>
        </div>
      </section>

      <section data-reveal="" className="grid bg-[#161513] text-[#f4f1ec] md:grid-cols-2">
        <div className="flex flex-col justify-between px-5 py-16 sm:px-10 md:px-14 md:py-20">
          <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[#f4f1ec]/55">{t("aboutKicker")}</p>
          <div className="py-12">
            <h2 className="max-w-md font-serif text-5xl leading-[0.92] tracking-[-0.03em] md:text-6xl">
              {t("aboutTitle")}
            </h2>
            <p className="mt-6 max-w-sm text-[15px] leading-7 text-[#f4f1ec]/70">{t("aboutCopy")}</p>
            <Link href="/about" className="mt-8 inline-flex text-[11px] uppercase tracking-[0.28em]">
              {t("aboutCta")}
            </Link>
          </div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#f4f1ec]/55">{t("kicker")}</p>
        </div>
        <div className="relative min-h-[70vw] md:min-h-full">
          <Image
            src="/insta-media/pics/IMG_0934.JPG.jpeg"
            alt={t("bandAlt")}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      <FilmReel />

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:px-10 md:py-20">
          <div data-reveal="">
            <p className="text-[0.68rem] uppercase tracking-[0.32em] text-muted">{t("find")}</p>
            <h2 className="mt-3 font-serif text-5xl leading-[0.92] tracking-[-0.03em] md:text-6xl">
              {t("findTitle")}
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-7 text-muted">
              {t("findCopy", { handle: instagramHandle })}
            </p>
            <div className="mt-8 flex flex-col gap-3 text-sm">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="underline">
                {instagramHandle}
              </a>
              <a
                href={whatsappLink("Salam, Soul Jewelry.")}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                WhatsApp {whatsappDisplay}
              </a>
              <Link href="/contact" className="text-[11px] uppercase tracking-[0.24em]">
                {t("contactCta")}
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                ["/insta-media/pics/IMG_0935.JPG.jpeg", "mosaicPack"],
                ["/insta-media/pics/IMG_0932.JPG.jpeg", "mosaicHoop"],
                ["/insta-media/pics/IMG_0930.JPG.jpeg", "mosaicRings"],
                ["/insta-media/pics/IMG_0928.JPG.jpeg", "mosaicCubic"],
              ] as const
            ).map(([src, alt], index) => (
              <a
                key={src}
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal=""
                style={{ animationDelay: `${index * 70}ms` }}
                className="relative block aspect-[4/5] overflow-hidden bg-paper-2"
              >
                <Image src={src} alt={t(alt)} fill sizes="25vw" className="object-cover" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
