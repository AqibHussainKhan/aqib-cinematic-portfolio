type ScrollListener = (scrollY: number) => void;
const listeners = new Set<ScrollListener>();
let frame = 0;

function flush() {
  frame = 0;
  if (document.hidden) return;
  const y = window.scrollY;
  listeners.forEach((listener) => listener(y));
}

function queue() {
  if (!frame && !document.hidden) frame = requestAnimationFrame(flush);
}

function visibility() {
  if (document.hidden) {
    cancelAnimationFrame(frame);
    frame = 0;
  } else queue();
}

// One event listener and one scheduled frame shared by the hero and header.
// There is no animation loop while the page is idle.
export function subscribeScroll(listener: ScrollListener) {
  if (!listeners.size) {
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("pageshow", queue);
    document.addEventListener("visibilitychange", visibility);
  }
  listeners.add(listener);
  queue();
  return () => {
    listeners.delete(listener);
    if (listeners.size) return;
    window.removeEventListener("scroll", queue);
    window.removeEventListener("pageshow", queue);
    document.removeEventListener("visibilitychange", visibility);
    cancelAnimationFrame(frame);
    frame = 0;
  };
}
