import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { ProductBrowser } from "@/components/product-browser";

type ProductsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ProductsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });
  return { title: t("title"), description: t("description") };
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("shop");

  return (
    <main id="content">
      <Suspense fallback={<p className="px-5 py-24 text-sm text-muted md:px-10">{t("loading")}</p>}>
        <ProductBrowser />
      </Suspense>
    </main>
  );
}
