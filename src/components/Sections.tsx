import { useEffect, useRef } from "react";
import type { PointerEvent, ReactNode } from "react";
import portrait from "../assets/aqib-portrait.jpg";
import { expertise, profile, skillRows } from "../data/portfolio";
import { Icon } from "./Icon";

export function Spotlight({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLSpanElement>(null);
  const rect = useRef<DOMRect | null>(null);
  const frame = useRef(0);
  const originScroll = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType === "touch" ||
      document.documentElement.dataset.motion === "off"
    )
      return;
    if (!rect.current) {
      rect.current = event.currentTarget.getBoundingClientRect();
      originScroll.current = window.scrollY;
    }
    pointer.current = {
      x: event.clientX - rect.current.left,
      y:
        event.clientY -
        rect.current.top +
        window.scrollY -
        originScroll.current,
    };
    if (!frame.current)
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        if (glow.current)
          glow.current.style.transform = `translate3d(${pointer.current.x - 160}px, ${pointer.current.y - 160}px, 0)`;
      });
  };
  return (
    <div
      ref={ref}
      className={`spotlight ${className}`}
      onPointerMove={move}
      onPointerEnter={(event) => {
        rect.current = event.currentTarget.getBoundingClientRect();
        originScroll.current = window.scrollY;
      }}
      onPointerLeave={() => {
        rect.current = null;
        cancelAnimationFrame(frame.current);
        frame.current = 0;
      }}
    >
      {children}
      <span className="spotlight-glow" ref={glow} aria-hidden="true" />
    </div>
  );
}

export function SectionHeading({
  code,
  title,
  subtitle,
}: {
  code: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="section-heading" data-reveal>
      <p className="section-kicker mono">// {code}</p>
      <h2>{title}</h2>
      {subtitle && <p className="section-description">{subtitle}</p>}
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="about-section section-shell">
      <div className="about-grid content-width">
        <div className="profile-scene" data-reveal>
          <div className="profile-aura" aria-hidden="true" />
          <div className="profile-orbit orbit-one" aria-hidden="true" />
          <div className="profile-orbit orbit-two" aria-hidden="true" />
          <div className="profile-card">
            <img
              src={portrait}
              alt="Aqib Hussain in a beige blazer and black shirt"
              width="1254"
              height="1254"
              loading="lazy"
              decoding="async"
            />
            <div className="profile-status">
              <span>
                <i className="status-dot" /> OPEN TO OPPORTUNITIES
              </span>
              <span>2026</span>
            </div>
          </div>
          <span className="profile-coordinate mono">
            BUILDING FROM PAKISTAN
          </span>
        </div>
        <div className="about-content" data-reveal>
          <p className="section-kicker mono">● // SYSTEM PROFILE</p>
          <h2>
            Hello, I'm
            <br />
            <span>Aqib Hussain.</span>
          </h2>
          <p>
            A front-end developer who cares about the way things work and the
            way they feel. I turn ideas into responsive websites, clear
            dashboards, and intuitive digital experiences.
          </p>
          <p>
            My work brings together React, TypeScript, and a thoughtful eye for
            detail. Always learning. Always building.
          </p>
          <div className="profile-facts">
            <div>
              <strong>Front-End</strong>
              <span>SPECIALIZATION</span>
            </div>
            <div>
              <strong>React & TypeScript</strong>
              <span>CORE TECHNOLOGIES</span>
            </div>
            <div>
              <strong>Responsive</strong>
              <span>BY DESIGN</span>
            </div>
          </div>
          <a
            className="text-link about-link"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            See what I'm building <Icon name="up-right" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="skills-section section-shell">
      <SectionHeading
        code="TECHNICAL STACK"
        title="Technologies I Work With"
        subtitle="The tools I use to turn ideas into thoughtful, functional experiences."
      />
      <div className="skill-marquees" aria-label="My technology stack">
        {skillRows.map((row, index) => (
          <div
            className={`skill-marquee ${index ? "reverse" : ""}`}
            key={index}
          >
            <div className="skill-track">
              {[0, 1, 2].map((copy) => (
                <div
                  className="skill-group"
                  key={copy}
                  aria-hidden={copy > 0 ? true : undefined}
                >
                  {row.map((name, i) => (
                    <span className="skill-chip" key={name}>
                      <span className="skill-chip-mark">
                        {
                          [
                            "〈/〉",
                            "#",
                            "{ }",
                            "TS",
                            "✳",
                            "≈",
                            "⊞",
                            "↗",
                            "◇",
                          ][i]
                        }
                      </span>
                      {name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="stack-caption mono">
        <span /> BUILT WITH INTENTION. REFINED WITH PRACTICE. <span />
      </div>
    </section>
  );
}

export function Expertise() {
  return (
    <section id="expertise" className="expertise-section section-shell">
      <div className="content-width">
        <SectionHeading
          code="ENGINEERING ROOTS"
          title="Core Execution Root Map"
          subtitle="A connected approach. From the first component to the final interaction."
        />
        <div className="root-grid">
          <div className="root-branches" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>
          {expertise.map((item, index) => (
            <article className="root-card" key={item.title} data-reveal>
              <Spotlight>
                <div className="root-card-top mono">
                  <span>// ROOT 0{index + 1}</span>
                  <span className="root-node" />
                </div>
                <div className="root-symbol" aria-hidden="true">
                  {item.code}
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="root-stack">
                  <strong>{item.stack}</strong>
                  <span>{item.tools}</span>
                </div>
                <div className="root-card-bottom mono">
                  <span>CONNECTED</span>
                  <i />
                </div>
              </Spotlight>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="certifications" className="education-section section-shell">
      <div className="content-width">
        <SectionHeading
          code="LEARNING & CREDENTIALS"
          title="Built on Strong Foundations"
        />
        <div className="education-grid">
          <Spotlight className="education-card">
            <div className="education-mark" aria-hidden="true">
              01
            </div>
            <div>
              <span className="mono">EDUCATION</span>
              <h3>Artificial Intelligence</h3>
              <p>Bachelor of Science · The Islamia University of Bahawalpur</p>
            </div>
            <span className="education-tag">BSAI</span>
          </Spotlight>
          <Spotlight className="education-card">
            <div className="education-mark" aria-hidden="true">
              02
            </div>
            <div>
              <span className="mono">PROFESSIONAL TRAINING</span>
              <h3>Front-End Development</h3>
              <p>
                Qutham Technologies · HTML, CSS, JavaScript, React & TypeScript
              </p>
            </div>
            <span className="education-tag">FRONTEND</span>
          </Spotlight>
        </div>
      </div>
    </section>
  );
}
