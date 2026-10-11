/**
 * HERO SETTINGS
 * -------------------------------------------------------------
 * The hero is built as a scroll-controlled 360° turntable.
 * It plays an image sequence on a <canvas>, so scroll position
 * directly controls the rotation (not a video, not a CSS spin).
 *
 * Put the frames in  public/hero-frames/  as
 *   frame_0001.webp, frame_0002.webp, ...
 * then run  npm run frames:manifest  once.
 * (See README.md -> "Add the 360° hero frames")
 *
 * If no frames are found, the site automatically shows the
 * static portrait instead, so nothing ever breaks.
 */
export const HERO = {
  portrait: '/images/portrait.webp',
  background: '/images/hero-bg.webp',
  frames: { dir: '/hero-frames', prefix: 'frame_', ext: 'webp', digits: 4 },
  /** Loaded on phones = every Nth frame (saves memory & data) */
  mobileFrameStep: 2,
  /** How many screens of scrolling the 360° takes */
  scrollScreens: { desktop: 4, mobile: 3 },
  /** Give up on frames after this long and show the static portrait */
  loadTimeoutMs: 15000,
};

export const frameUrl = (n: number) =>
  `${HERO.frames.dir}/${HERO.frames.prefix}${String(n).padStart(HERO.frames.digits, '0')}.${HERO.frames.ext}`;
