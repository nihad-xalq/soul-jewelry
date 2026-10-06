"use client";

import { useLayoutEffect } from "react";

function arm(node: Element, observer: IntersectionObserver) {
  if (node.classList.contains("is-in")) return;
  if (!node.classList.contains("reveal-wait")) {
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight - 48) return;
    node.classList.add("reveal-wait");
  }
  observer.observe(node);
}

export function ScrollReveal() {
  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.getElementById("content");
    if (!root || reduce) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove("reveal-wait");
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px 8% 0px", threshold: 0.01 },
    );

    const seen = new Set<Element>();
    const collect = (node: Element) => {
      const targets = [
        ...(node.matches("[data-reveal]") ? [node] : []),
        ...node.querySelectorAll("[data-reveal]"),
      ];
      for (const target of targets) {
        if (seen.has(target)) continue;
        seen.add(target);
        arm(target, observer);
      }
    };

    collect(root);
    const footer = document.querySelector("footer");
    if (footer) {
      footer.classList.remove("is-in", "reveal-wait");
      collect(footer);
    }

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const added of record.addedNodes) {
          if (added instanceof Element) collect(added);
        }
      }
    });
    mutations.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
