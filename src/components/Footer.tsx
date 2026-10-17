import { useEffect, useState } from "react";
import { profile } from "../data/portfolio";
import { copyText } from "../hooks/useExperience";
import { Icon } from "./Icon";

export default function Footer({
  motion,
  toggleMotion,
}: {
  motion: boolean;
  toggleMotion: () => void;
}) {
  const [time, setTime] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    update();
    const interval = window.setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (!copyStatus) return;
    const timer = window.setTimeout(() => setCopyStatus(""), 3000);
    return () => clearTimeout(timer);
  }, [copyStatus]);
  return (
    <footer className="site-footer">
      <div className="footer-watermark" aria-hidden="true">
        CONTACT
      </div>
      <div className="content-width footer-content">
        <div className="footer-top mono">
          <div>
            <span>// SYSTEM ARCHITECTURE</span>
            <p>
              Front-End Development
              <br />
              React & TypeScript Interfaces
            </p>
          </div>
          <div className="footer-availability">
            <span>// STATUS</span>
            <p>
              <i className="status-dot" /> OPEN TO OPPORTUNITIES
            </p>
            <a href="#contact">
              LET'S TALK <Icon name="up-right" />
            </a>
          </div>
          <div className="footer-time">
            <span>// LOCAL TIME</span>
            <p>
              {time} PKT
              <br />
              {profile.location}
            </p>
          </div>
        </div>
        <a
          href="#home"
          className="footer-name"
          aria-label="Aqib Hussain. Back to top."
          data-reveal
        >
          AQIB HUSSAIN<span>↗</span>
        </a>
        <div className="footer-bottom">
          <div className="footer-socials">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub <Icon name="up-right" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <Icon name="up-right" />
            </a>
          </div>
          <div className="footer-email">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <button
              aria-label="Copy email address"
              onClick={async () =>
                setCopyStatus(
                  (await copyText(profile.email))
                    ? "Email copied."
                    : `Email: ${profile.email}`,
                )
              }
            >
              <Icon name="copy" />
            </button>
          </div>
          <a className="back-top text-link" href="#home">
            Back to Top ↑
          </a>
        </div>
        <div className="footer-colophon mono">
          <p>
            © {new Date().getFullYear()} AQIB HUSSAIN. BUILT WITH INTENTION.
          </p>
          <button
            onClick={toggleMotion}
            aria-pressed={motion}
            aria-label={motion ? "Pause animations" : "Enable animations"}
          >
            <Icon name={motion ? "pause" : "play"} /> MOTION{" "}
            {motion ? "ON" : "OFF"}
          </button>
        </div>
      </div>
      <div className="copy-toast" role="status" hidden={!copyStatus}>
        {copyStatus}
        <Icon name="check" />
      </div>
    </footer>
  );
}
