import { ArrowDown, Download } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';
import { HERO } from '../config/hero';
import { profile, resumeUrl, socials } from '../data/site';
import type { HeroAssets } from '../lib/heroAssets';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { isMobileViewport, prefersReducedMotion } from '../lib/motion';
import { scrollToId } from '../lib/lenis';
import { LinkedinIcon } from './Icons';
import Tilt3D from './Tilt3D';

type Props = { assets: HeroAssets };

const linkedin = socials.find((s) => s.id === 'linkedin')!;

export default function Hero({ assets }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  const sequence =
    assets.mode === 'sequence' && assets.frames.length > 1 && !prefersReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups: Array<() => void> = [];
    const textEls = Array.from(root.querySelectorAll<HTMLElement>('[data-hero-text]'));
    const setTextOpacity = (o: number) => textEls.forEach((el) => (el.style.opacity = String(o)));
    const setCue = (o: number) => {
      if (cueRef.current) cueRef.current.style.opacity = String(o);
    };

    const ctx = gsap.context(() => {
      if (sequence) {
        /* ---------- 360° scroll-controlled frame sequence ---------- */
        const canvas = canvasRef.current;
        const c2d = canvas?.getContext('2d');
        if (!canvas || !c2d) return;

        const frames = assets.frames;
        const last = frames.length - 1;
        let current = -1;

        const draw = (index: number) => {
          const img = frames[index];
          if (!img) return;
          const cw = canvas.width;
          const ch = canvas.height;
          const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight); // cover
          const w = img.naturalWidth * scale;
          const h = img.naturalHeight * scale;
          c2d.clearRect(0, 0, cw, ch);
          c2d.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
          current = index;
        };

        const resize = () => {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          canvas.width = Math.round(canvas.clientWidth * dpr);
          canvas.height = Math.round(canvas.clientHeight * dpr);
          draw(current < 0 ? 0 : current);
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);
        cleanups.push(() => ro.disconnect());

        const screens = isMobileViewport() ? HERO.scrollScreens.mobile : HERO.scrollScreens.desktop;
        let raf = 0;
        let pending = 0;

        ScrollTrigger.create({
          trigger: root,
          start: 'top top',
          end: () => `+=${window.innerHeight * screens}`,
          pin: true,
          scrub: true, // scroll position == rotation progress (linear, no easing)
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            pending = Math.round(p * last);
            if (!raf) {
              raf = requestAnimationFrame(() => {
                raf = 0;
                if (pending !== current) draw(pending);
              });
            }
            setCue(p > 0.012 ? 0 : 1);
            // hero text eases away in the last 8% -> smooth hand-off to the next section
            const fade = p > 0.92 ? 1 - (p - 0.92) / 0.08 : 1;
            setTextOpacity(Math.max(0, fade));
          },
        });
        cleanups.push(() => cancelAnimationFrame(raf));
      } else {
        /* ---------- Static portrait fallback (no frames yet) ---------- */
        if (!prefersReducedMotion() && wrapRef.current) {
          gsap.to(wrapRef.current, {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
          });
        }
        ScrollTrigger.create({
          trigger: root,
          start: 'top top',
          end: '+=160',
          onUpdate: (self) => setCue(1 - self.progress),
        });
      }
    }, root);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
      textEls.forEach((el) => (el.style.opacity = ''));
    };
  }, [assets, sequence]);

  const jump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <section
      id="top"
      ref={rootRef}
      aria-label="Introduction"
      className="relative h-[100svh] w-full overflow-hidden"
    >
      <div aria-hidden="true" className="hero-atmosphere absolute inset-0" />
      <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-40" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col items-stretch justify-between px-5 pb-14 pt-[4.6rem] md:px-10 md:pt-24 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-14 lg:pb-14 lg:pt-24">
        {/* LEFT: headline */}
        <div data-hero-text className="lg:pr-2">
          <p className="hero-eyebrow mb-4 hidden max-w-xs leading-relaxed tracking-wider2 md:block">{profile.heroEyebrow}</p>
          <h1 className="hero-title text-[clamp(1.75rem,7.2vw,3rem)] leading-[1.04] tracking-tight [text-shadow:0_2px_28px_rgb(var(--bg)/0.9)] lg:text-[clamp(1.8rem,2.7vw,3.3rem)]">
            {profile.heroHeadline}
          </h1>
        </div>

        {/* CENTER: 360° canvas (when frames exist) or a 3D floating portrait */}
        <div className="flex justify-center">
          <div ref={wrapRef} className="hero-portrait relative" data-cursor="explore">
            {sequence ? (
              <div className="h-full w-full overflow-hidden rounded-[1.25rem] bg-surface ring-1 ring-white/15">
                <canvas
                  ref={canvasRef}
                  className="h-full w-full"
                  role="img"
                  aria-label="Portrait of Anushree G S that rotates 360 degrees as you scroll"
                />
              </div>
            ) : (
              <Tilt3D className="h-full w-full" max={11}>
                <img
                  src={HERO.portrait}
                  alt="Portrait of Anushree G S"
                  width={900}
                  height={898}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: '50% 30%' }}
                />
              </Tilt3D>
            )}
          </div>
        </div>

        {/* RIGHT: sub text + CTAs */}
        <div data-hero-text className="lg:pl-2">
          <p className="hero-extra mb-5 max-w-md text-[0.95rem] leading-relaxed text-fg/80 [text-shadow:0_2px_20px_rgb(var(--bg)/0.9)] md:text-base">
            {profile.heroSub}
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <Download size={15} strokeWidth={1.75} aria-hidden="true" />
              Download Resume
            </a>
            <a
              href="#work"
              onClick={jump('work')}
              className="btn btn-ghost"
            >
              View my Work
            </a>
            <a
              href="#contact"
              onClick={jump('contact')}
              className="btn btn-ghost hidden sm:inline-flex"
            >
              Hire Me
            </a>
          </div>
          <a
            href={linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 hidden items-center gap-2 text-sm text-fg/70 transition-colors hover:text-accent lg:inline-flex"
          >
            <LinkedinIcon className="h-4 w-4" />
            Connect on LinkedIn
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={cueRef}
        className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex flex-col items-center gap-1.5 text-[10px] tracking-wider2 text-muted transition-opacity duration-500"
        aria-hidden="true"
      >
        SCROLL TO EXPLORE
        <ArrowDown size={14} strokeWidth={1.5} />
      </div>
    </section>
  );
}
