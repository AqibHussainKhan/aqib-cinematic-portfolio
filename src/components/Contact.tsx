import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { profile } from "../data/portfolio";
import { copyText } from "../hooks/useExperience";
import { Icon } from "./Icon";
import { Spotlight } from "./Sections";

type Draft = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};
const emptyDraft: Draft = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};
const draftKey = "aqib-contact-draft:v1";
function readDraft(): Draft {
  try {
    const value = JSON.parse(localStorage.getItem(draftKey) || "null");
    if (value && typeof value === "object")
      return Object.fromEntries(
        Object.keys(emptyDraft).map((key) => [
          key,
          typeof value[key] === "string"
            ? value[key].slice(0, key === "message" ? 5000 : 160)
            : "",
        ]),
      ) as Draft;
  } catch {
    /* Draft persistence is optional. */
  }
  return emptyDraft;
}

export default function Contact() {
  const [draft, setDraft] = useState<Draft>(readDraft);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("");
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        localStorage.setItem(draftKey, JSON.stringify(draft));
        setSaved(Object.values(draft).some(Boolean));
      } catch {
        setSaved(false);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [draft]);
  const update = (key: keyof Draft, value: string) => {
    setDraft((previous) => ({ ...previous, [key]: value }));
    setStatus("");
  };
  const emailBody = () =>
    `Name: ${draft.firstName.trim()} ${draft.lastName.trim()}\nEmail: ${draft.email.trim()}\n\n${draft.message.trim()}`;
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity() || !consent) return;
    if (
      !draft.firstName.trim() ||
      !draft.lastName.trim() ||
      !draft.message.trim()
    ) {
      setStatus("Please add your name and a message before continuing.");
      return;
    }
    const subject = encodeURIComponent(
      `Portfolio enquiry from ${draft.firstName.trim()} ${draft.lastName.trim()}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${encodeURIComponent(emailBody())}`;
    setStatus(
      "Your email app is opening with this message. You can also copy it below.",
    );
  };
  const copy = async () =>
    setStatus(
      (await copyText(emailBody()))
        ? "Message copied. Paste it into an email whenever you're ready."
        : `Please email your message to ${profile.email}.`,
    );

  return (
    <section id="contact" className="contact-section section-shell">
      <div className="contact-grid content-width">
        <Spotlight className="dispatch-card">
          <div className="dispatch-light" aria-hidden="true" />
          <div className="dispatch-top mono">
            <span>// LIVE DISPATCH HUB</span>
            <span className="status-dot" />
          </div>
          <h2>
            Let's Build Something
            <br />
            Exceptional.
          </h2>
          <p>
            Have an idea, an opportunity, or a project in mind? I'd love to hear
            about it.
          </p>
          <div
            className="payload-preview mono"
            aria-label="Live message preview"
          >
            <div>// payload_preview.json</div>
            <p>
              <span>sender:</span>{" "}
              <b>
                {draft.firstName.trim()
                  ? `${draft.firstName} ${draft.lastName}`.trim()
                  : "[Awaiting Name]"}
              </b>
            </p>
            <p>
              <span>email:</span> <b>{draft.email || "[Awaiting Email]"}</b>
            </p>
            <p>
              <span>message:</span>{" "}
              <b>
                {draft.message
                  ? `"${draft.message.slice(0, 90)}${draft.message.length > 90 ? "…" : ""}"`
                  : '"[Awaiting Message]"'}
              </b>
            </p>
            <div className="payload-status">
              <i className={draft.message ? "status-dot" : ""} />
              {draft.message
                ? "PAYLOAD IN PROGRESS"
                : "WAITING FOR YOUR NEXT BIG IDEA"}
            </div>
          </div>
          <a
            className="dispatch-email text-link"
            href={`mailto:${profile.email}`}
          >
            {profile.email}
            <Icon name="up-right" />
          </a>
        </Spotlight>
        <form className="contact-form" onSubmit={submit}>
          <div className="form-row">
            <label>
              <span className="sr-only">First name</span>
              <input
                name="firstName"
                autoComplete="given-name"
                placeholder="First Name"
                value={draft.firstName}
                onChange={(event) => update("firstName", event.target.value)}
                required
                maxLength={80}
              />
            </label>
            <label>
              <span className="sr-only">Last name</span>
              <input
                name="lastName"
                autoComplete="family-name"
                placeholder="Last Name"
                value={draft.lastName}
                onChange={(event) => update("lastName", event.target.value)}
                required
                maxLength={80}
              />
            </label>
          </div>
          <label>
            <span className="sr-only">Email address</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email Address"
              value={draft.email}
              onChange={(event) => update("email", event.target.value)}
              required
              maxLength={160}
            />
          </label>
          <label>
            <span className="sr-only">Your message</span>
            <textarea
              name="message"
              placeholder="Type your message here…"
              value={draft.message}
              onChange={(event) => update("message", event.target.value)}
              required
              minLength={10}
              maxLength={5000}
              rows={5}
            />
          </label>
          <div className="form-bottom">
            <label className="consent">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                required
              />
              <span>
                Open my email app
                <br />
                with this message.
              </span>
            </label>
            <button className="button button-light" type="submit">
              Send Message <Icon name="up-right" />
            </button>
          </div>
          <div className="form-utility">
            <span className="mono">
              {saved
                ? "DRAFT SAVED ON THIS DEVICE"
                : "LET'S START A CONVERSATION"}
            </span>
            {Object.values(draft).some(Boolean) && (
              <button
                type="button"
                onClick={() => {
                  setDraft(emptyDraft);
                  setConsent(false);
                  setStatus("Draft cleared.");
                }}
              >
                Clear draft
              </button>
            )}
            <button type="button" onClick={copy} disabled={!draft.message}>
              Copy message
            </button>
          </div>
          <p className="form-status" role="status">
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}
