import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { ProductOrder } from "@/components/product-order";
import { getPathname, Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import {
  getProduct,
  pairedProducts,
  products,
  relatedProducts,
  type Product,
} from "@/lib/products";
import { siteOrigin } from "@/lib/site";

type ProductPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    products.map((product) => ({ locale, slug: product.slug })),
  );
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  const t = await getTranslations({ locale, namespace: "product" });
  const catalog = await getTranslations({ locale, namespace: "catalog" });
  if (!product) return { title: t("missing") };
  const name = catalog(`${product.slug}.name`);
  const description = catalog(`${product.slug}.summary`);
  const alt = (catalog.raw(`${product.slug}.alts`) as string[])[0];
  const path = getPathname({ locale: locale as Locale, href: `/products/${product.slug}` });
  return {
    title: name,
    description,
    openGraph: {
      title: name,
      description,
      url: path,
      images: [
        {
          url: product.image,
          width: product.width,
          height: product.height,
          alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description,
      images: [product.image],
    },
  };
}

function altsFor(catalog: Awaited<ReturnType<typeof getTranslations>>, product: Product) {
  return catalog.raw(`${product.slug}.alts`) as string[];
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getProduct(slug);
  if (!product) notFound();

  const t = await getTranslations("product");
  const shop = await getTranslations("shop");
  const catalog = await getTranslations("catalog");
  const name = catalog(`${product.slug}.name`);
  const path = getPathname({ locale: locale as Locale, href: `/products/${product.slug}` });
  const pageUrl = new URL(path, siteOrigin()).href;
  const paired = pairedProducts(product);
  const related = relatedProducts(product);

  return (
    <main id="content" className="mx-auto max-w-[1500px] px-5 py-10 md:px-10 md:py-16">
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
        <Link href="/products" className="hover:text-ink">
          {t("shop")}
        </Link>
        <span aria-hidden="true"> / </span>
        {name}
      </p>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} alts={altsFor(catalog, product)} />
        <div className="lg:py-6">
          <p className="text-[10px] uppercase tracking-[0.28em] text-muted">
            {shop(`collections.${product.collection}`)}
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            {shop(`availability.${product.availability}`)}
          </p>
          <h1 className="mt-3 font-serif text-5xl leading-[0.92] tracking-[-0.03em] md:text-6xl">
            {name}
          </h1>
          <p className="mt-3 text-muted">{catalog(`${product.slug}.kind`)}</p>
          <p className="mt-8 max-w-md text-[15px] leading-7">{catalog(`${product.slug}.description`)}</p>
          <dl className="mt-8 max-w-md border-t border-line text-sm">
            {(
              [
                [t("metal"), shop(`metals.${product.metal}`)],
                [t("size"), catalog(`${product.slug}.size`)],
                [t("collection"), shop(`collections.${product.collection}`)],
                [t("price"), t("priceValue")],
              ] as const
            ).map(([label, value]) => (
              <div key={label} className="flex justify-between gap-6 border-b border-line py-3">
                <dt className="text-muted">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <ProductOrder name={name} url={pageUrl} />
          <Link
            href={product.slug === "resin-hoop" ? "/care#hoop" : "/care"}
            className="mt-6 inline-block text-[11px] uppercase tracking-[0.22em] text-muted"
          >
            {product.slug === "resin-hoop" ? t("careHoop") : t("care")}
          </Link>
        </div>
      </div>

      {paired.length > 0 ? (
        <section className="mt-20 border-t border-line pt-12">
          <h2 className="font-serif text-4xl tracking-[-0.03em]">{t("wearWith")}</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {paired.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="mt-20 border-t border-line pt-12">
          <h2 className="font-serif text-4xl tracking-[-0.03em]">{t("alongside")}</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
