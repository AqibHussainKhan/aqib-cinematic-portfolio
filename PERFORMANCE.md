# Smoothness update

The design, new beige-blazer portrait, projects, links and contact behavior are preserved. Rendering and event handling have been changed to reduce unnecessary work.

## What changed

| Previous work | Updated behavior |
| --- | --- |
| A 720 × 960 canvas cleared and repainted with two scaled PNG samples during each scrub update | Two image layers blend cached, predecoded WebP views; no canvas drawing |
| 2,000,549-byte PNG requested for the hero | Twelve WebP frames totaling 372,266 bytes: 81.4% fewer hero-image bytes |
| Portrait geometry measured in the scroll event handler | Geometry cached at setup and resize; scroll reads the scroll position |
| Header progress stored in an inherited CSS variable on the document root | Only the small progress element's transform changes |
| Separate header and hero scroll schedulers | One shared passive scroll listener and one pending animation frame |
| Portrait eased toward a target after native scrolling | Portrait follows the latest native scroll position without a trailing easing loop |
| Large canvas shadow, fixed-header backdrop blur, animated blur effects and SVG noise overlay | Soft static gradients, opacity and transform effects |
| Technology strips and decorative animations ran outside the viewport | Section visibility pauses their CSS animations; hidden tabs suspend scroll rendering |
| Pointer lighting repainted a radial gradient at each pointer event | A cached glow moves by transform, with updates batched to one animation frame |
| Carousel read card geometry on every scroll event | Geometry cached on resize; scroll feedback batched and state changed only when its value changes |
| An artificial 1.15-second loading overlay | Content appears immediately; the first small portrait frame is preloaded |

The About JPEG is unchanged. The source PNG atlas is retained in `src/assets/` for future editing but is not imported or included in the website build. The original folder structure and existing package dependencies are preserved.

## Verification

Production compilation and CSS parsing pass. The React DOM regression harness exercises the original interactions plus the following performance behaviors:

- A synchronous burst of 100 scroll events schedules one shared render frame.
- Scroll updates perform no additional hero geometry measurements.
- Scrolling after leaving the hero causes no portrait attribute/style mutations.
- The page schedules no JavaScript animation frames while idle after resources settle.
- A hidden tab does not schedule scroll rendering.
- Section visibility marks the technology strip active/inactive for CSS animation pausing.
- Portrait loading, back-facing view, image fallback, motion persistence, carousel buttons/keyboard, dialogs, menu closing, contact validation, draft persistence and copy actions still work.

These checks are simulated-DOM, build and asset checks. A real browser/device performance profile was unavailable; FPS, GPU frame time and visual smoothness have not been measured on the user's phone or laptop. No guaranteed frame rate is claimed. The portrait remains an image-based turntable built from twelve generated views, not a rigged 3D model.

## Run the production preview

From the inner `portfolio` directory:

```bash
npm install
npm run build
npm run preview
```

Use the URL printed by Vite. `npm run dev` remains available for editing; production preview is the relevant build for checking the delivered experience.
