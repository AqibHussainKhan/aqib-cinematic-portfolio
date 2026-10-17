import { useEffect, useRef, useState } from "react";
import { navigation } from "../data/portfolio";
import { Icon } from "./Icon";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        header.current
          ?.querySelector(".menu-toggle")
          ?.getAttribute("aria-expanded") === "true"
      ) {
        setOpen(false);
        header.current
          ?.querySelector<HTMLButtonElement>(".menu-toggle")
          ?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);
    if (!("IntersectionObserver" in window))
      return () => {
        document.removeEventListener("pointerdown", close);
        document.removeEventListener("keydown", escape);
        window.removeEventListener("resize", resize);
      };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -50% 0px" },
    );
    navigation.forEach(([, id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => {
      observer.disconnect();
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", escape);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <header className="site-header" ref={header}>
      <div className="header-inner">
        <a className="wordmark" href="#home" aria-label="Aqib Hussain, home">
          Aqib<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="hire-button" href="#contact">
          Hire Me <span className="status-dot" />
        </a>
        <button
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        hidden={!open}
        aria-label="Mobile navigation"
      >
        {navigation.map(([label, id], index) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            <span>0{index + 1}</span>
            {label}
            <Icon name="up-right" />
          </a>
        ))}
      </nav>
      <div className="page-progress" aria-hidden="true" />
    </header>
  );
}
