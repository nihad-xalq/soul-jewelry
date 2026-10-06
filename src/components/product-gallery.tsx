"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { ProductImage } from "@/lib/products";

export function ProductGallery({ images, alts }: { images: ProductImage[]; alts: string[] }) {
  const t = useTranslations("product");
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  const alt = alts[active] ?? alts[0] ?? "";

  return (
    <div>
      <div className="settle bg-paper-2" key={current.src}>
        <Image
          src={current.src}
          alt={alt}
          width={1400}
          height={1750}
          preload={active === 0}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`aspect-[4/5] h-auto w-full ${current.fit === "contain" ? "object-contain" : "object-cover"}`}
        />
      </div>
      {images.length > 1 ? (
        <div className="mt-3 flex gap-2" role="group" aria-label={t("gallery")}>
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-pressed={index === active}
              aria-label={t("photo", { index: index + 1 })}
              onClick={() => setActive(index)}
              className={`relative h-20 w-16 overflow-hidden border bg-paper-2 ${
                index === active ? "border-ink" : "border-transparent"
              }`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="64px"
                className={image.fit === "contain" ? "object-contain" : "object-cover"}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
