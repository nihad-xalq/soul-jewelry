"use client";

import {
  categories,
  collections,
  filterProducts,
  metals,
  sorts,
} from "@/lib/products";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useRouter } from "@/i18n/navigation";
import { ProductCard } from "./product-card";

function Choice({
  pressed,
  onClick,
  children,
  className = "",
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`cursor-pointer border px-3 py-2 text-left text-[11px] uppercase tracking-[0.18em] transition-colors ${
        pressed
          ? "border-ink bg-ink text-paper"
          : "border-line hover:border-ink"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function ProductBrowser() {
  const t = useTranslations("shop");
  const catalog = useTranslations("catalog");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const query = {
    category: searchParams.get("category") ?? "",
    metal: searchParams.get("metal") ?? "",
    collection: searchParams.get("collection") ?? "",
    sort: searchParams.get("sort") ?? "",
    q: searchParams.get("q") ?? "",
  };
  const result = filterProducts(query, {
    locale,
    text: (product) =>
      [
        product.name,
        catalog(`${product.slug}.name`),
        catalog(`${product.slug}.kind`),
        catalog(`${product.slug}.summary`),
      ].join(" "),
    name: (product) => catalog(`${product.slug}.name`),
  });
  const activeCount = [result.category, result.metal, result.collection].filter(
    Boolean,
  ).length;

  const chips = [
    result.category
      ? {
          key: "category",
          label: t(`categories.${result.category as "earrings" | "rings"}`),
        }
      : null,
    result.metal
      ? {
          key: "metal",
          label: t(`metals.${result.metal as "silver" | "gold-toned"}`),
        }
      : null,
    result.collection
      ? {
          key: "collection",
          label: t(
            `collections.${result.collection as "dalga" | "cubic" | "aura" | "studio"}`,
          ),
        }
      : null,
    result.q ? { key: "q", label: result.q } : null,
  ].filter((chip): chip is { key: string; label: string } => Boolean(chip));

  function update(next: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (!value) params.delete(key);
      else params.set(key, value);
    }
    const search = params.toString();
    router.replace(search ? `/products?${search}` : "/products", {
      scroll: false,
    });
  }

  function toggle(key: "category" | "metal" | "collection", value: string) {
    update({ [key]: result[key] === value ? "" : value });
  }

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-12 md:px-10 md:py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="rise text-[0.68rem] uppercase tracking-[0.32em] text-muted">
            {t("kicker")}
          </p>
          <h1 className="rise rise-d1 mt-3 font-serif text-5xl leading-[0.92] tracking-[-0.03em] md:text-7xl">
            {t("heading")}
          </h1>
          <p className="rise rise-d2 mt-4 max-w-md text-[15px] leading-7 text-muted">
            {t("intro")}
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <label className="grid w-56 gap-2 text-[11px] uppercase tracking-[0.2em] text-muted">
            {t("search")}
            <input
              value={result.q}
              onChange={(event) => update({ q: event.target.value })}
              type="search"
              name="q"
              placeholder={t("searchPlaceholder")}
              className="h-11 border border-line bg-paper px-3 text-[13px] normal-case tracking-normal text-ink outline-none placeholder:text-muted focus:border-ink"
            />
          </label>
          <button
            type="button"
            className="h-11 cursor-pointer border border-line px-4 text-[11px] uppercase tracking-[0.2em] md:hidden"
            aria-expanded={filtersOpen}
            onClick={() => setFiltersOpen((value) => !value)}
          >
            {t("filters")}
            {activeCount ? ` · ${activeCount}` : ""}
          </button>
          <label className="grid min-w-40 gap-2 text-[11px] uppercase tracking-[0.2em] text-muted">
            {t("sort")}
            <span className="relative block">
              <select
                value={result.sort}
                onChange={(event) =>
                  update({
                    sort:
                      event.target.value === "featured"
                        ? ""
                        : event.target.value,
                  })
                }
                className="h-11 w-full cursor-pointer appearance-none border border-line bg-paper pl-3 pr-10 text-[11px] uppercase tracking-[0.16em] text-ink outline-none focus:border-ink"
              >
                {sorts.map((sort) => (
                  <option key={sort.id} value={sort.id}>
                    {t(`sorts.${sort.id}`)}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 9.5 12 15.5 18 9.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </label>
        </div>
      </div>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
        <Choice
          pressed={!result.category}
          onClick={() => update({ category: "" })}
        >
          {t("all")}
        </Choice>
        {categories.map((category) => (
          <Choice
            key={category.id}
            pressed={result.category === category.id}
            onClick={() => toggle("category", category.id)}
          >
            {t(`categories.${category.id}`)}
          </Choice>
        ))}
      </div>

      {chips.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <li key={chip.key}>
              <button
                type="button"
                onClick={() => update({ [chip.key]: "" })}
                className="cursor-pointer inline-flex items-center gap-2 border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.16em]"
              >
                {chip.label}
                <span aria-hidden="true">×</span>
                <span className="sr-only">
                  {t("remove", { label: chip.label })}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-8 grid items-start gap-10 md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
        <aside className={`${filtersOpen ? "block" : "hidden"} md:block`}>
          <div className="border border-line p-5">
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.24em]">
                {t("filter")}
              </p>
              {activeCount || result.q ? (
                <button
                  type="button"
                  onClick={() =>
                    update({ category: "", metal: "", collection: "", q: "" })
                  }
                  className="cursor-pointer text-[11px] uppercase tracking-[0.16em] text-muted hover:text-ink"
                >
                  {t("clear")}
                </button>
              ) : null}
            </div>

            <fieldset className="mt-6">
              <legend className="text-[10px] uppercase tracking-[0.28em] text-muted">
                {t("metal")}
              </legend>
              <div className="mt-3 flex flex-col gap-2">
                {metals.map((metal) => (
                  <Choice
                    key={metal.id}
                    pressed={result.metal === metal.id}
                    onClick={() => toggle("metal", metal.id)}
                    className="w-full"
                  >
                    {t(`metals.${metal.id}`)}
                  </Choice>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className="text-[10px] uppercase tracking-[0.28em] text-muted">
                {t("collection")}
              </legend>
              <div className="mt-3 flex flex-col gap-2">
                {collections.map((collection) => (
                  <Choice
                    key={collection.id}
                    pressed={result.collection === collection.id}
                    onClick={() => toggle("collection", collection.id)}
                    className="w-full"
                  >
                    {t(`collections.${collection.id}`)}
                  </Choice>
                ))}
              </div>
            </fieldset>
          </div>
        </aside>

        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
            {t("count", { count: result.products.length })}
          </p>
          {result.products.length === 0 ? (
            <div className="mt-10 border border-line px-6 py-16 text-center">
              <p className="font-serif text-3xl">{t("empty")}</p>
              <button
                type="button"
                onClick={() =>
                  update({
                    category: "",
                    metal: "",
                    collection: "",
                    sort: "",
                    q: "",
                  })
                }
                className="mt-6 cursor-pointer text-[11px] uppercase tracking-[0.22em] underline"
              >
                {t("clearFilters")}
              </button>
            </div>
          ) : (
            <div className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
              {result.products.map((product, index) => (
                <ProductCard key={product.slug} product={product} delay={index * 45} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
