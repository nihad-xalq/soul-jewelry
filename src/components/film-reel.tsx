"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

function ReelArrow({ direction }: { direction: "prev" | "next" }) {
  const left = direction === "prev";
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 transition-transform duration-300 ${left ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8.25 4.5 15.75 12l-7.5 7.5"
        transform={left ? "translate(24 0) scale(-1 1)" : undefined}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const clips = [
  {
    src: "/insta-media/videos/IMG_0936.MP4",
    id: "rings",
    orientation: "portrait" as const,
  },
  {
    src: "/insta-media/videos/IMG_0938.MP4",
    id: "september",
    orientation: "landscape" as const,
  },
  {
    src: "/insta-media/videos/IMG_0937.MP4",
    id: "ear",
    orientation: "portrait" as const,
  },
  {
    src: "/insta-media/videos/IMG_0939.MP4",
    id: "drop",
    orientation: "portrait" as const,
  },
] as const;

export function FilmReel() {
  const t = useTranslations("film");
  const scroller = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(media.matches);
    apply();
    media.addEventListener("change", apply);

    const root = scroller.current;
    if (!root || media.matches) {
      return () => media.removeEventListener("change", apply);
    }

    const videos = [...root.querySelectorAll("video")];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.muted = true;
            void video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.45 },
    );

    videos.forEach((video) => observer.observe(video));
    return () => {
      observer.disconnect();
      media.removeEventListener("change", apply);
    };
  }, []);

  const scrollByDir = (direction: number) => {
    const node = scroller.current;
    if (!node) return;
    node.scrollBy({
      left: direction * Math.min(node.clientWidth * 0.75, 520),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <section id="film" aria-labelledby="film-heading" className="scroll-mt-24 py-24 md:py-32">
      <div data-reveal="" className="mx-auto flex max-w-[1500px] items-end justify-between gap-6 px-5 md:px-10">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.32em] text-muted">{t("kicker")}</p>
          <h2
            id="film-heading"
            className="mt-3 font-serif text-5xl leading-[0.9] tracking-[-0.03em] md:text-6xl"
          >
            {t("title")}
          </h2>
          <p className="mt-5 max-w-sm text-[15px] leading-7 text-muted">{t("copy")}</p>
        </div>
        <div className="hidden gap-3 sm:flex">
          <button
            type="button"
            onClick={() => scrollByDir(-1)}
            aria-label={t("prev")}
            className="group flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:border-ink"
          >
            <ReelArrow direction="prev" />
          </button>
          <button
            type="button"
            onClick={() => scrollByDir(1)}
            aria-label={t("next")}
            className="group flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:border-ink"
          >
            <ReelArrow direction="next" />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        tabIndex={0}
        aria-label={t("label")}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:px-10"
      >
        {clips.map((clip, index) => (
          <figure
            key={clip.src}
            data-reveal=""
            style={{ animationDelay: `${index * 70}ms` }}
            className={`snap-start shrink-0 ${
              clip.orientation === "portrait"
                ? "w-[72vw] sm:w-[40vw] lg:w-[22vw]"
                : "w-[88vw] sm:w-[62vw] lg:w-[38vw]"
            }`}
          >
            <div
              className={`overflow-hidden bg-paper-2 ${
                clip.orientation === "portrait" ? "aspect-[9/16]" : "aspect-video"
              }`}
            >
              <video
                className="h-full w-full object-cover"
                muted
                loop
                playsInline
                preload="metadata"
                controls={reducedMotion}
                aria-label={t(clip.id)}
              >
                <source src={clip.src} type="video/mp4" />
              </video>
            </div>
            <figcaption className="mt-3 text-[11px] uppercase tracking-[0.24em] text-muted">
              {t(clip.id)}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
