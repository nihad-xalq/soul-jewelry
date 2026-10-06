import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <main id="content" className="mx-auto max-w-xl px-5 py-64 text-center">
      <p className="rise text-[0.68rem] uppercase tracking-[0.32em] text-muted">404</p>
      <h1 className="rise rise-d1 mt-4 font-serif text-5xl tracking-[-0.03em]">{t("title")}</h1>
      <Link href="/products" className="rise rise-d2 mt-8 inline-block text-[11px] uppercase tracking-[0.24em]">
        {t("back")}
      </Link>
    </main>
  );
}
