"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const t = useTranslations("catalog");
  const shop = useTranslations("shop");

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="overflow-hidden bg-paper-2">
        <Image
          src={product.image}
          alt={t(`${product.slug}.alts.0`)}
          width={product.width}
          height={product.height}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className={`aspect-[4/5] w-full transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
            product.fit === "contain" ? "object-contain" : "object-cover"
          }`}
        />
      </div>
      <div className="mt-4 flex items-end justify-between gap-4 border-t border-ink pt-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-muted">
            {shop(`collections.${product.collection}`)}
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            {shop(`availability.${product.availability}`)}
          </p>
          <h3 className="mt-1 font-serif text-[1.65rem] leading-none tracking-[-0.03em]">
            {t(`${product.slug}.name`)}
          </h3>
        </div>
        <p className="pb-0.5 text-right text-sm leading-snug text-muted">
          {t(`${product.slug}.kind`)}
          <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-ink/60">
            {shop(`metals.${product.metal}`)} · {t(`${product.slug}.size`)}
          </span>
        </p>
      </div>
    </Link>
  );
}
