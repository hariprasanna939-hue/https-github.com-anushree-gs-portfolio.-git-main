import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

let lenis: Lenis | null = null;
let tick: ((time: number) => void) | null = null;

/** Start smooth scrolling and connect it to GSAP ScrollTrigger. */
export function startLenis(): Lenis {
  if (lenis) return lenis;

  lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  lenis.on('scroll', () => ScrollTrigger.update());

  tick = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function stopLenis() {
  if (tick) gsap.ticker.remove(tick);
  lenis?.destroy();
  lenis = null;
  tick = null;
}

export const getLenis = () => lenis;

/** Smooth-scroll to a section by id (falls back to native scrolling). */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
