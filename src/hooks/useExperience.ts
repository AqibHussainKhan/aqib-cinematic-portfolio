import { useEffect, useState } from "react";
import { subscribeScroll } from "./scroll";

const motionKey = "aqib-cinematic-motion:v1";
export const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export function useMotionPreference() {
  const [enabled, setEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem(motionKey);
      if (saved !== null) return saved === "true";
    } catch {
      /* Storage can be blocked in private browsing. */
    }
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
    try {
      localStorage.setItem(motionKey, String(enabled));
    } catch {
      /* Optional preference. */
    }
  }, [enabled]);
  return [enabled, () => setEnabled((value) => !value)] as const;
}

export function usePageExperience(enabled: boolean) {
  useEffect(() => {
    let stopped = false;
    let total = 1;
    let lastProgress = -1;
    let scrolled: boolean | undefined;
    const progress = document.querySelector<HTMLElement>(".page-progress");
    const update = (y: number) => {
      const nextProgress = total > 0 ? clamp(y / total) : 0;
      if (nextProgress !== lastProgress) {
        // Update only the small progress element, not an inherited root variable.
        if (progress) progress.style.transform = `scaleX(${nextProgress})`;
        lastProgress = nextProgress;
      }
      if (scrolled !== y > 24) {
        scrolled = y > 24;
        document.body.classList.toggle("is-scrolled", scrolled);
      }
    };
    const measure = () => {
      if (stopped) return;
      total = document.documentElement.scrollHeight - window.innerHeight;
      update(window.scrollY);
    };
    const visible = () => {
      document.documentElement.dataset.pageVisible = String(!document.hidden);
    };
    measure();
    visible();
    const unsubscribe = subscribeScroll(update);
    const resize =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;
    resize?.observe(document.body);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    document.addEventListener("visibilitychange", visible);
    document.fonts?.ready.then(measure);

    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!enabled || !("IntersectionObserver" in window))
      elements.forEach((element) => element.classList.add("is-visible"));
    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("is-visible");
                  observer?.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.12, rootMargin: "0px 0px -20px 0px" },
          )
        : null;
    if (enabled) elements.forEach((element) => observer?.observe(element));
    const sections = document.querySelectorAll<HTMLElement>(
      ".section-shell, .hero-timeline",
    );
    const visibilityObserver =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                (entry.target as HTMLElement).dataset.inView = String(
                  entry.isIntersecting,
                );
              });
            },
            { rootMargin: "100px 0px", threshold: 0 },
          )
        : null;
    sections.forEach((section) => {
      section.dataset.inView = visibilityObserver ? "false" : "true";
      visibilityObserver?.observe(section);
    });
    return () => {
      stopped = true;
      unsubscribe();
      resize?.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      document.removeEventListener("visibilitychange", visible);
      observer?.disconnect();
      visibilityObserver?.disconnect();
    };
  }, [enabled]);
}

export async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* Try the older fallback. */
    }
  }
  const active = document.activeElement as HTMLElement | null;
  const input = document.createElement("textarea");
  input.value = text;
  input.style.cssText = "position:fixed;left:-9999px;top:0";
  document.body.append(input);
  input.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    /* The UI provides a selectable address too. */
  }
  input.remove();
  active?.focus();
  return copied;
}
