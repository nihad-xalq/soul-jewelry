import {
  instagramHandle,
  instagramUrl,
  nav,
  whatsappDisplay,
  whatsappLink,
} from "@/lib/site";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const linkClass =
  "text-[11px] uppercase tracking-[0.24em] text-ink/75 hover:text-ink";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const links = [
    { href: "/", id: "home" },
    ...nav,
    { href: "/care", id: "care" },
    { href: "/delivery", id: "delivery" },
  ];
  const midpoint = Math.ceil(links.length / 2);
  const columns = [links.slice(0, midpoint), links.slice(midpoint)];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-12 md:grid-cols-3 md:px-10">
        <div>
          <p className="font-serif text-3xl tracking-[-0.03em]">Soul</p>
          <p className="mt-2 text-sm text-muted">{t("tagline")}</p>
        </div>
        <nav
          className="grid grid-cols-2 gap-x-8 gap-y-3"
          aria-label={t("label")}
        >
          {columns.map((column) => (
            <div key={column[0].href} className="flex flex-col gap-3">
              {column.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {tNav(link.id)}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="flex flex-col gap-3 text-sm">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink"
          >
            Instagram {instagramHandle}
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink"
          >
            WhatsApp {whatsappDisplay}
          </a>
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
            © {new Date().getFullYear()} Soul Jewelry
          </p>
        </div>
      </div>
    </footer>
  );
}
