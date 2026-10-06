export const instagramUrl = "https://www.instagram.com/souljewelry.az";
export const instagramHandle = "@souljewelry.az";
export const whatsappNumber = "994773171403";
export const whatsappDisplay = "+994 77 317 14 03";

const site = "https://soul-jewelry.vercel.app";

/** Absolute origin for shared links. Override with NEXT_PUBLIC_SITE_URL if the domain changes. */
export function siteOrigin() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  return site;
}

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Published reply window. Change these two times if the line keeps different hours. */
export const replyHours = {
  from: "11:00",
  to: "20:00",
} as const;

export const nav = [
  { href: "/products", id: "shop" },
  { href: "/gift", id: "gift" },
  { href: "/about", id: "about" },
  { href: "/contact", id: "contact" },
] as const;
