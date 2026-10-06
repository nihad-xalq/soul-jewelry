"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { whatsappLink } from "@/lib/site";

export function ProductOrder({ name, url }: { name: string; url: string }) {
  const t = useTranslations("product");
  const [gift, setGift] = useState(false);
  const note = gift ? `\n${t("giftLine")}` : "";

  return (
    <div className="mt-8">
      <button
        type="button"
        role="switch"
        aria-checked={gift}
        onClick={() => setGift((value) => !value)}
        className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em]"
      >
        <span
          className={`flex h-[22px] w-10 items-center border border-ink px-0.5 ${
            gift ? "justify-end bg-ink" : "justify-start"
          }`}
          aria-hidden="true"
        >
          <span className={`h-3.5 w-3.5 ${gift ? "bg-paper" : "bg-ink"}`} />
        </span>
        {t("giftToggle")}
      </button>
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={whatsappLink(`${t("priceMessage", { name, url })}${note}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-ink px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-paper"
        >
          {t("askPrice")}
        </a>
        <a
          href={whatsappLink(`${t("sizeMessage", { name, url })}${note}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-ink px-6 py-3 text-[11px] uppercase tracking-[0.24em]"
        >
          {t("askSize")}
        </a>
      </div>
    </div>
  );
}
