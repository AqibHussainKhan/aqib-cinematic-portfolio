import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { profile, projects } from "../data/portfolio";
import type { Project } from "../data/portfolio";
import { Icon } from "./Icon";
import Modal, { CloseButton } from "./Modal";
import { SectionHeading, Spotlight } from "./Sections";

export default function Projects() {
  const track = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);
  const [position, setPosition] = useState(0);
  const [canNext, setCanNext] = useState(true);
  const metrics = useRef({ step: 373, maximum: 0 });
  const last = useRef({ position: 0, canNext: true });
  const frame = useRef(0);
  const update = useCallback(() => {
    frame.current = 0;
    const element = track.current;
    if (!element) return;
    const position = Math.min(
      projects.length - 1,
      Math.max(0, Math.round(element.scrollLeft / metrics.current.step)),
    );
    const canNext = element.scrollLeft < metrics.current.maximum - 8;
    if (last.current.position !== position) setPosition(position);
    if (last.current.canNext !== canNext) setCanNext(canNext);
    last.current = { position, canNext };
  }, []);
  const schedule = () => {
    if (!frame.current) frame.current = requestAnimationFrame(update);
  };
  useEffect(() => {
    const measure = () => {
      const element = track.current;
      if (!element) return;
      metrics.current = {
        step:
          (element.firstElementChild?.getBoundingClientRect().width ?? 355) +
          18,
        maximum: Math.max(0, element.scrollWidth - element.clientWidth),
      };
      update();
    };
    measure();
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(frame.current);
    };
  }, [update]);
  useEffect(() => {
    if (!selected) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [selected]);
  const advance = (direction: number) => {
    const element = track.current;
    if (!element) return;
    element.scrollBy({
      left: metrics.current.step * direction,
      behavior:
        document.documentElement.dataset.motion === "off"
          ? "instant"
          : "smooth",
    });
  };
  const keydown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      advance(event.key === "ArrowRight" ? 1 : -1);
    }
  };
  return (
    <section id="projects" className="projects-section section-shell">
      <SectionHeading
        code="PORTFOLIO INDEX"
        title="Featured Engineering Projects"
        subtitle="A selection of things I've built, explored and carefully put together."
      />
      <div
        className="project-track"
        ref={track}
        onScroll={schedule}
        tabIndex={0}
        onKeyDown={keydown}
        aria-label="Project carousel. Use the left and right arrow keys to browse."
      >
        {projects.map((project, index) => (
          <article className="project-card" key={project.id}>
            <Spotlight>
              <div className="project-meta mono">
                <span>// PROJECT 0{index + 1}</span>
                <span className="project-category">{project.category}</span>
              </div>
              <div className="project-card-line" aria-hidden="true">
                <span />
                <i />
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="project-links">
                <button
                  className="text-link"
                  onClick={() => setSelected(project)}
                  aria-label={`View details for ${project.title}`}
                >
                  Explore Project <Icon name="up-right" />
                </button>
                {project.live && (
                  <a
                    href={project.live}
                    className="live-link"
                    target={project.live.startsWith("#") ? undefined : "_blank"}
                    rel="noreferrer"
                  >
                    Live <span className="status-dot" />
                  </a>
                )}
              </div>
            </Spotlight>
          </article>
        ))}
      </div>
      <div className="carousel-controls content-width">
        <div className="carousel-count mono">
          <span>0{position + 1}</span> / 0{projects.length}
        </div>
        <span className="carousel-hint mono">A FEW SELECTED WORKS</span>
        <div>
          <button
            className="round-button previous"
            aria-label="Previous projects"
            disabled={position === 0}
            onClick={() => advance(-1)}
          >
            <Icon name="arrow" />
          </button>
          <button
            className="round-button"
            aria-label="Next projects"
            disabled={!canNext}
            onClick={() => advance(1)}
          >
            <Icon name="arrow" />
          </button>
        </div>
      </div>
      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        labelledBy="project-dialog-title"
        className="project-dialog"
      >
        {selected && (
          <div className="dialog-content">
            <CloseButton
              onClose={() => setSelected(null)}
              label="Close project details"
              floating
            />
            <p className="section-kicker mono">
              // SELECTED WORK · {selected.category}
            </p>
            <div className="dialog-art" aria-hidden="true">
              <span>
                {String(projects.indexOf(selected) + 1).padStart(2, "0")}
              </span>
              <Icon name="code" />
            </div>
            <h2 id="project-dialog-title">{selected.title}</h2>
            <p>{selected.description}</p>
            <ul className="feature-list">
              {selected.features.map((feature) => (
                <li key={feature}>
                  <Icon name="check" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="project-tags">
              {selected.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="dialog-actions">
              {selected.live && (
                <a
                  className="button button-light"
                  href={selected.live}
                  onClick={() => {
                    if (selected.live?.startsWith("#")) setSelected(null);
                  }}
                  target={selected.live.startsWith("#") ? undefined : "_blank"}
                  rel="noreferrer"
                >
                  Open Project <Icon name="up-right" />
                </a>
              )}
              <a
                className="button button-outline"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub <Icon name="github" />
              </a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
