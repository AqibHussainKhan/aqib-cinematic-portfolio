export type IconName =
  | "play"
  | "arrow"
  | "up-right"
  | "chevron"
  | "plus"
  | "check"
  | "info"
  | "search"
  | "close"
  | "bookmark"
  | "code"
  | "mail"
  | "github"
  | "spark"
  | "pause"
  | "copy"
  | "menu";

export function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg className={`icon ${className}`} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}

export function IconLibrary() {
  return (
    <svg
      className="icon-library"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <symbol id="i-play" viewBox="0 0 24 24">
        <path d="m8 5 11 7-11 7Z" fill="currentColor" stroke="none"></path>
      </symbol>
      <symbol id="i-arrow" viewBox="0 0 24 24">
        <path d="M5 12h14M13 6l6 6-6 6"></path>
      </symbol>
      <symbol id="i-up-right" viewBox="0 0 24 24">
        <path d="M6 18 18 6M6 6h12v12"></path>
      </symbol>
      <symbol id="i-chevron" viewBox="0 0 24 24">
        <path d="m9 5 7 7-7 7"></path>
      </symbol>
      <symbol id="i-plus" viewBox="0 0 24 24">
        <path d="M12 5v14M5 12h14"></path>
      </symbol>
      <symbol id="i-check" viewBox="0 0 24 24">
        <path d="m5 12 4 4L19 6"></path>
      </symbol>
      <symbol id="i-info" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M12 11v6m0-10v.1"></path>
      </symbol>
      <symbol id="i-search" viewBox="0 0 24 24">
        <circle cx="10.5" cy="10.5" r="6.5"></circle>
        <path d="m16 16 5 5"></path>
      </symbol>
      <symbol id="i-close" viewBox="0 0 24 24">
        <path d="m6 6 12 12M6 18 18 6"></path>
      </symbol>
      <symbol id="i-bookmark" viewBox="0 0 24 24">
        <path d="M6 4h12v17l-6-4-6 4Z"></path>
      </symbol>
      <symbol id="i-code" viewBox="0 0 24 24">
        <path d="m7 7-5 5 5 5m10-10 5 5-5 5m-4-15-2 20"></path>
      </symbol>
      <symbol id="i-mail" viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2"></rect>
        <path d="m3 6 9 7 9-7"></path>
      </symbol>
      <symbol id="i-github" viewBox="0 0 24 24">
        <path
          d="M9 19c-4 1-4-2-5-2m10 5v-3.4c0-1 .1-1.5-.5-2.1 3.2-.4 6.5-1.5 6.5-7A5.4 5.4 0 0 0 18.5 6c.2-.7.6-2.2-.2-3.5 0 0-1.3-.4-4 1.5a14 14 0 0 0-7 0C4.6 2.1 3.3 2.5 3.3 2.5 2.5 3.8 2.9 5.3 3.1 6A5.4 5.4 0 0 0 1.6 9.5c0 5.5 3.3 6.6 6.5 7-.5.5-.6 1.2-.6 2.1V22"
          transform="translate(1 0) scale(.95)"
        ></path>
      </symbol>
      <symbol id="i-spark" viewBox="0 0 24 24">
        <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z"></path>
      </symbol>
      <symbol id="i-pause" viewBox="0 0 24 24">
        <path d="M8 5v14M16 5v14" strokeWidth="4"></path>
      </symbol>
      <symbol id="i-copy" viewBox="0 0 24 24">
        <rect x="8" y="8" width="12" height="12" rx="2"></rect>
        <path d="M16 8V4H4v12h4"></path>
      </symbol>
      <symbol id="i-menu" viewBox="0 0 24 24">
        <path d="M4 6h16M4 12h16M4 18h16"></path>
      </symbol>
    </svg>
  );
}
