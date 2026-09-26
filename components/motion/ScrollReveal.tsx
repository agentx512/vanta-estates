"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const targets = [
  ".section-head",
  ".featured-grid > .property-card",
  ".area-map-shell",
  ".development-index-grid",
  ".development-story-copy",
  ".development-story-data",
  ".smart-grid > div",
  ".why-point",
  ".final-cta-inner",
  ".listing-grid > .property-card",
  ".area-card",
  ".development-list-row",
  ".about-steps article",
  ".detail-section",
  ".contact-form-shell",
  ".contact-info-panel",
].join(", ");

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let nodes: HTMLElement[] = [];
    let observer: IntersectionObserver | undefined;
    const setup = () => {
      nodes = Array.from(document.querySelectorAll<HTMLElement>(targets.split(", ").map((target) => `main ${target}`).join(", ")));
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("motion-in");
          observer?.unobserve(entry.target);
        }
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

      const offscreen = nodes.filter((node) => node.getBoundingClientRect().top > window.innerHeight * 0.9);
      offscreen.forEach((node, index) => {
        node.style.setProperty("--reveal-delay", `${(index % 4) * 45}ms`);
        node.classList.add("motion-reveal");
        observer?.observe(node);
      });
    };
    const hasIdleCallback = "requestIdleCallback" in window;
    const scheduled = hasIdleCallback ? window.requestIdleCallback(setup, { timeout: 1200 }) : window.setTimeout(setup, 80);

    return () => {
      if (hasIdleCallback) window.cancelIdleCallback(scheduled);
      else window.clearTimeout(scheduled);
      observer?.disconnect();
      nodes.forEach((node) => {
        node.classList.remove("motion-reveal", "motion-in");
        node.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}
