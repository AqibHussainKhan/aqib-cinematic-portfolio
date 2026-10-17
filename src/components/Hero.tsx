import { useEffect, useRef, useState } from "react";
import { portraitFrames } from "../data/portraitFrames";
import portrait from "../assets/aqib-portrait.jpg";
import { clamp } from "../hooks/useExperience";
import { subscribeScroll } from "../hooks/scroll";
import { Icon } from "./Icon";

const roles = [
  ["CREATIVE", "DEVELOPER"],
  ["REACT", "DEVELOPER"],
  ["SCALABLE", "INTERFACES"],
];

export default function Hero({ motion }: { motion: boolean }) {
  const section = useRef<HTMLElement>(null);
  const lower = useRef<HTMLImageElement>(null);
  const upper = useRef<HTMLImageElement>(null);
  const cursor = useRef<HTMLSpanElement>(null);
  const [role, setRole] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = section.current;
    const base = lower.current;
    const overlay = upper.current;
    if (!element || !base || !overlay) return;
    let stopped = false;
    let fallback = false;
    let start = 0;
    let distance = 1;
    let lastProgress = -1;
    let previousRole = -1;
    let decodeFrame = 0;
    const decoded = new Set<number>();
    const preloads: HTMLImageElement[] = [];

    const render = (y: number, force = false) => {
      if (stopped || document.hidden) return;
      const progress = motion ? clamp((y - start) / distance) : 0;
      if (!force && progress === lastProgress) return;
      lastProgress = progress;
      const position = progress * portraitFrames.length;
      const index = Math.floor(position) % portraitFrames.length;
      const next = (index + 1) % portraitFrames.length;
      const mix = motion ? position - Math.floor(position) : 0;
      if (!fallback && decoded.has(index)) {
        if (base.dataset.frame !== String(index)) {
          base.src = portraitFrames[index];
          base.dataset.frame = String(index);
        }
        if (mix > 0 && decoded.has(next)) {
          if (overlay.dataset.frame !== String(next)) {
            overlay.src = portraitFrames[next];
            overlay.dataset.frame = String(next);
          }
          base.style.opacity = String(1 - mix);
          overlay.style.opacity = String(mix);
        } else {
          base.style.opacity = "1";
          overlay.style.opacity = "0";
        }
      }
      if (cursor.current)
        cursor.current.style.transform = `translate3d(${progress * 100}%, 0, 0)`;
      const nextRole = Math.min(2, Math.floor(progress * 3));
      if (nextRole !== previousRole) {
        previousRole = nextRole;
        setRole(nextRole);
      }
    };
    const refresh = () => {
      if (!decodeFrame && !stopped)
        decodeFrame = requestAnimationFrame(() => {
          decodeFrame = 0;
          render(window.scrollY, true);
        });
    };
    const measure = () => {
      if (stopped) return;
      const rect = element.getBoundingClientRect();
      const stage = element.firstElementChild as HTMLElement | null;
      start = window.scrollY + rect.top;
      distance = Math.max(
        1,
        rect.height - (stage?.clientHeight || window.innerHeight),
      );
      render(window.scrollY, true);
    };

    // Decode each small image once; scrolling only swaps cached images/opacity.
    // The original 2 MB atlas and a continuously redrawn canvas are not loaded.
    (motion ? portraitFrames : [portraitFrames[0]]).forEach((src, index) => {
      const image = new Image();
      image.decoding = "async";
      image.fetchPriority = index === 0 ? "high" : "low";
      image.onload = async () => {
        try {
          await image.decode?.();
        } catch {
          /* onload still supplies a usable image. */
        }
        if (stopped) return;
        decoded.add(index);
        if (index === 0) setReady(true);
        refresh();
      };
      image.onerror = () => {
        if (stopped || index !== 0) return;
        fallback = true;
        base.src = portrait;
        base.style.opacity = "1";
        overlay.style.opacity = "0";
        setReady(true);
      };
      image.src = src;
      preloads.push(image);
    });
    measure();
    const unsubscribe = subscribeScroll(render);
    const resize =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;
    resize?.observe(element);
    window.addEventListener("resize", measure);
    return () => {
      stopped = true;
      unsubscribe();
      resize?.disconnect();
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(decodeFrame);
      preloads.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, [motion]);

  return (
    <section
      id="home"
      className="hero-timeline"
      ref={section}
      aria-label="Introduction"
    >
      <div className="hero-stage">
        <div className="hero-halo" aria-hidden="true" />
        <div className="hero-topline mono">
          <span>FRONT-END DEVELOPER</span>
          <span>BASED IN PAKISTAN / AVAILABLE WORLDWIDE</span>
        </div>
        <div className="portrait-stage" data-ready={ready}>
          <div
            className="portrait-frames"
            role="img"
            aria-label="Aqib Hussain in a beige blazer and black shirt; portrait turns as you scroll"
          >
            <img
              ref={lower}
              className="portrait-frame"
              src={portraitFrames[0]}
              data-frame="0"
              alt=""
              aria-hidden="true"
              width="312"
              height="416"
              decoding="async"
              fetchPriority="high"
              draggable={false}
            />
            <img
              ref={upper}
              className="portrait-frame portrait-overlay"
              src={portraitFrames[0]}
              data-frame="0"
              alt=""
              aria-hidden="true"
              width="312"
              height="416"
              decoding="async"
              draggable={false}
            />
          </div>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">
            HI, I'M <span>AQIB HUSSAIN</span>
          </p>
          <h1>
            <span className="sr-only">
              Aqib Hussain. Creative front-end developer.
            </span>
            <span className="role-text" key={role} aria-hidden="true">
              {roles[role][0]}
              <br />
              {roles[role][1]}
            </span>
          </h1>
          <p className="hero-role-note mono">
            CODE. CRAFT. A LITTLE CURIOSITY.
          </p>
        </div>
        <div className="hero-aside">
          <span className="eyebrow">I CREATE WHAT YOU IMAGINE</span>
          <p>
            Interfaces that feel thoughtful,
            <br className="desktop-break" /> work beautifully, and turn
            <br className="desktop-break" /> ideas into experiences.
          </p>
          <a href="#about" className="text-link">
            A little about me <Icon name="up-right" />
          </a>
        </div>
        <div className="hero-bottom">
          <a className="scroll-cue mono" href="#about">
            <span className="scroll-mouse">
              <i />
            </span>
            <span>SCROLL TO SCRUB TIMELINE</span>
            <span className="scroll-arrow">↓</span>
          </a>
          <div className="hero-actions">
            <a className="button button-light" href="#projects">
              View My Work <Icon name="up-right" />
            </a>
            <a className="button button-outline" href="#contact">
              Contact Me <Icon name="arrow" />
            </a>
          </div>
        </div>
        <div className="timeline-ticks" aria-hidden="true">
          {Array.from({ length: 41 }, (_, index) => (
            <i key={index} className={index % 5 === 0 ? "major" : ""} />
          ))}
          <span className="timeline-position" ref={cursor}>
            <i className="timeline-marker" />
          </span>
        </div>
      </div>
    </section>
  );
}
