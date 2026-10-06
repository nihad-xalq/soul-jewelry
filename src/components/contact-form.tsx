"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { whatsappLink } from "@/lib/site";

const noteIds = ["gift", "size", "available"] as const;

export function ContactForm() {
  const t = useTranslations("contact");
  const catalog = useTranslations("catalog");
  const [name, setName] = useState("");
  const [piece, setPiece] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const href = useMemo(() => {
    const lines = [
      t("greeting"),
      name.trim() ? t("nameLine", { name: name.trim() }) : "",
      piece ? t("pieceLine", { piece }) : "",
      message.trim(),
    ].filter(Boolean);
    return whatsappLink(lines.join("\n"));
  }, [name, piece, message, t]);

  return (
    <form
      data-reveal=""
      className="grid gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        if (!name.trim() || !message.trim()) {
          setError(t("error"));
          return;
        }
        setError("");
        window.open(href, "_blank", "noopener,noreferrer");
      }}
    >
      <label className="grid gap-2 text-sm">
        <span className="text-[11px] uppercase tracking-[0.22em] text-muted">{t("name")}</span>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          name="name"
          autoComplete="name"
          required
          className="border border-line bg-transparent px-3 py-3 outline-none focus:border-ink"
        />
      </label>
      <label className="grid gap-2 text-sm">
        <span className="text-[11px] uppercase tracking-[0.22em] text-muted">{t("piece")}</span>
        <select
          value={piece}
          onChange={(event) => setPiece(event.target.value)}
          name="piece"
          className="cursor-pointer border border-line bg-paper px-3 py-3 outline-none focus:border-ink"
        >
          <option value="">{t("unsure")}</option>
          {products.map((product) => {
            const pieceName = catalog(`${product.slug}.name`);
            return (
              <option key={product.slug} value={pieceName}>
                {pieceName}
              </option>
            );
          })}
        </select>
      </label>
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{t("notesLabel")}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {noteIds.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setMessage(t(`notes.${id}`));
                setError("");
              }}
              className="cursor-pointer border border-line px-3 py-2 text-left text-[13px] hover:border-ink"
            >
              {t(`notes.${id}`)}
            </button>
          ))}
        </div>
      </div>
      <label className="grid gap-2 text-sm">
        <span className="text-[11px] uppercase tracking-[0.22em] text-muted">{t("message")}</span>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          name="message"
          required
          rows={5}
          className="resize-y border border-line bg-transparent px-3 py-3 outline-none focus:border-ink"
        />
      </label>
      {error ? <p className="text-sm text-ink">{error}</p> : null}
      <button
        type="submit"
        className="cursor-pointer justify-self-start bg-ink px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-paper"
      >
        {t("submit")}
      </button>
    </form>
  );
}
