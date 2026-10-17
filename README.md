# Aqib Hussain — Cinematic Portfolio

React + TypeScript + Tailwind CSS + Vite. Built inside the structure supplied in `portfolio new design.zip`.

The ZIP keeps its original nested folder:

```text
portfolio new design/portfolio/
```

## Run it

Open the inner **portfolio** folder in VS Code. Open **Terminal → New Terminal**, then run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. The retained Vite version requires Node.js **20.19+ or 22.12+**. A current compatible Node LTS version is recommended.

To make and preview a production build:

```bash
npm run build
npm run preview
```

A ready production build is also included in `dist/`. Serve that folder using a static web host; opening `dist/index.html` directly as a `file://` URL can block module loading. Vite uses `base: './'` for assets hosted under a subfolder.

## Design and reference

The supplied `WhatsApp Video 2026-10-17 at 00.18.45.mp4` was inspected across its full 23-second duration. This implementation follows the website shown on the laptop: a charcoal monochrome palette, small fixed navigation, a central portrait with a light halo, scroll-linked role changes, a tilted profile card, two moving technology strips, a four-card root map, a horizontal project row, the live contact payload preview, and an oversized typographic footer.

The reel's captions, Instagram watermark and laptop are outside the website and are not page content. The person, name, projects, education and links are personalized for Aqib. The About card uses the newly supplied beige-blazer photo unchanged; the hero turntable is generated from that same photo.

**Reference fidelity:** the video does not include the original website source, fonts, 3D model, textures or animation rig. The hero therefore uses a generated transparent multi-angle portrait texture with two image layers and predecoded WebP frames, rather than the original rigged 3D model. It recreates the rotation interaction but is not the original model or a pixel-perfect copy. Text and details too small to read in the video have been implemented consistently with the visible design.

## What works

- Fixed navigation, current-section indication, a reading-progress line, and smooth section links.
- Mobile navigation with link, outside-click and Escape closing.
- A pinned hero whose portrait and headline respond to scrolling.
- Reversible scrolling through the portrait views, with one shared scroll callback per animation frame and no continuous JavaScript render loop.
- Hover lighting on the root and project cards, profile-card movement, and intersection-based section entrances.
- Two continuous technology ribbons that pause on hover.
- A project carousel with buttons, native touch scrolling, keyboard arrows, and end-state controls.
- Native project dialogs with Escape/backdrop closing and body-scroll restoration.
- The actual Gutham Lab live URL; GitHub and LinkedIn profile links.
- A contact form with browser validation, real-time preview, copy-message action, and a draft saved on the same device.
- The Send Message action opens the visitor's email app with the message addressed to `aqib.n2742@gmail.com`. It does not claim to send through a backend. Sending requires the visitor to send from their email app.
- A copy-email action and a clock in the Asia/Karachi time zone.
- A motion switch, persistent preference, initial system reduced-motion support, and a static non-pinned layout with motion disabled.
- Local image and font assets. No remote font or image CDN is needed.

## Files to edit

| File | Purpose |
| --- | --- |
| `src/App.tsx` | Overall page and section order |
| `src/App.css` | Complete design, responsive layouts and animations |
| `src/index.css` | Retained Tailwind CSS entry |
| `src/main.tsx` | React StrictMode entry |
| `src/data/portfolio.ts` | Your name, email, social URLs, skills, expertise and projects |
| `src/hooks/useExperience.ts` | Motion preference, progress, entrances, visibility pause and clipboard helper |
| `src/hooks/scroll.ts` | Shared passive scroll listener and frame scheduler |
| `src/data/portraitFrames.ts` | Twelve lightweight hero frame URLs |
| `src/components/Header.tsx` | Desktop and mobile navigation |
| `src/components/Hero.tsx` | Cached WebP portrait turntable, scroll timeline and changing titles |
| `src/components/Sections.tsx` | About, skill strips, root cards, education and shared lighting |
| `src/components/Projects.tsx` | Project cards, carousel and details |
| `src/components/Contact.tsx` | Contact form, draft persistence and live payload preview |
| `src/components/Footer.tsx` | Large name, links, clock, email copy and motion switch |
| `src/components/Modal.tsx` | Shared native dialog |
| `src/components/Icon.tsx` | Local SVG icon set |
| `src/assets/aqib-portrait.jpg` | Newly supplied portrait in the About card |
| `src/assets/aqib-turntable.png` | Original generated atlas retained as source; not loaded by the website |
| `src/assets/portrait-frames/` | Optimized WebP frames actually loaded by the hero |
| `PERFORMANCE.md` | Performance changes, measurements and verification limits |
| `ASSET-NOTES.md` | Portrait asset provenance and generation prompt |
| `public/fonts/` | Font license and source files |
| `public/favicon.svg` | Portfolio favicon |
| `index.html` | Browser title, description and favicon |

The original scaffold's config files, assets and directory names are retained. Components and data are added under `src/`; no routing, server, API key or database setup is required. `node_modules`, operating-system metadata and development caches are excluded from the delivery ZIP.

## Personalization

1. Change contact and social URLs in `src/data/portfolio.ts`.
2. Add or edit projects in that same file. Add `live` only when you have the actual live URL. Projects without a live URL offer details and the GitHub profile instead.
3. Replace `src/assets/aqib-portrait.jpg` to change the About portrait.
4. The retained source atlas is a 4 × 3 sprite sheet. The running website uses the twelve images in `src/assets/portrait-frames/`, listed in `src/data/portraitFrames.ts`. Replacing the atlas alone will not change the optimized frames. A real 3D model can be integrated later if supplied.
5. Education and professional-training copy is in `Sections.tsx`; no unprovided certificate PDF or fabricated certificate link is included.

## Verification

- Production build and TypeScript compilation pass.
- Stylesheet parsing passes without warnings.
- React DOM smoke checks cover mounting in StrictMode; all section links; portrait loading, scroll frame/role updates and fallback; coalesced rapid scrolling, cached layout measurements, no offscreen portrait updates, no idle rendering, hidden-tab suspension; menu closing; project dialogs and body-scroll restoration; carousel controls and keyboard; contact preview, validation, mailto preparation, clipboard, persistence and clearing; malformed saved-data recovery; reading progress; and motion preference persistence.
- These are build, asset and simulated-DOM checks. A full visual browser check was not available in the build environment. Check the result on your target phone and laptop before public release; smoothness and final visual alignment are not claimed as browser-verified.

Font terms are included in `src/assets/FONT-LICENSE.txt` and `public/fonts/FONT-LICENSE.txt` with original font sources.

## Smoothness update

The hero no longer redraws a 720 × 960 canvas on every animation frame. It blends two cached image elements, using 372,266 bytes of WebP frames instead of loading the 2,000,549-byte PNG atlas (81.4% fewer hero-image bytes). The large canvas shadow, moving blur filters, fixed-header backdrop blur and artificial loading overlay are removed. Section animations pause offscreen, hover lighting moves by transform, carousel measurements are cached, and the header/hero share one scroll scheduler. Native scrolling is retained. See `PERFORMANCE.md` for the scope of verification.
