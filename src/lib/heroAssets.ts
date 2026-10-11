import { HERO, frameUrl } from '../config/hero';
import { isMobileViewport, prefersReducedMotion } from './motion';

export type HeroAssets = {
  mode: 'static' | 'sequence';
  portrait: HTMLImageElement | null;
  frames: HTMLImageElement[];
};

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function readFrameCount(): Promise<number | null> {
  try {
    const res = await fetch(`${HERO.frames.dir}/manifest.json`, { cache: 'no-cache' });
    if (!res.ok) return null;
    const data = await res.json();
    const n = Math.floor(Number(data?.count));
    return Number.isFinite(n) && n > 1 ? n : null;
  } catch {
    // manifest missing (or not JSON) -> use the static portrait
    return null;
  }
}

/**
 * Preloads the critical hero assets and reports progress (0 -> 1).
 * Always resolves; if frames are missing or slow it falls back to the static portrait.
 */
export async function preloadHero(onProgress: (p: number) => void): Promise<HeroAssets> {
  onProgress(0.05);
  const [portrait] = await Promise.all([loadImage(HERO.portrait), loadImage(HERO.background)]);
  onProgress(0.25);

  const fallback: HeroAssets = { mode: 'static', portrait, frames: [] };
  if (prefersReducedMotion()) {
    onProgress(1);
    return fallback;
  }

  const count = await readFrameCount();
  if (!count) {
    onProgress(1);
    return fallback;
  }

  const step = isMobileViewport() ? HERO.mobileFrameStep : 1;
  const indices: number[] = [];
  for (let i = 1; i <= count; i += step) indices.push(i);
  if (indices[indices.length - 1] !== count) indices.push(count); // last frame == first frame

  const frames: (HTMLImageElement | null)[] = new Array(indices.length).fill(null);
  let loaded = 0;

  const work = Promise.all(
    indices.map(async (n, i) => {
      frames[i] = await loadImage(frameUrl(n));
      loaded += 1;
      onProgress(0.25 + 0.75 * (loaded / indices.length));
    }),
  );
  const timeout = new Promise<'timeout'>((resolve) =>
    window.setTimeout(() => resolve('timeout'), HERO.loadTimeoutMs),
  );

  const result = await Promise.race([work.then(() => 'ok' as const), timeout]);
  const good = frames.filter((f): f is HTMLImageElement => f !== null);

  if (result === 'timeout' || good.length !== indices.length) return fallback;

  onProgress(1);
  return { mode: 'sequence', portrait, frames: good };
}
