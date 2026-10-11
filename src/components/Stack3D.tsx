import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useRef, useState } from 'react';
import type { MediaItem } from '../data/site';
import { getLenis } from '../lib/lenis';

type Props = {
  id: string;
  label: string;
  title: string;
  description: string;
  items: MediaItem[];
  landscape?: boolean;
};

/** How many screens of scrolling each card gets */
const SCREENS_PER_CARD = 0.5;

function CardFace({ item, index, total }: { item: MediaItem; index: number; total: number }) {
  return (
    <>
      {/* blurred copy fills the empty space around any photo shape */}
      <img
        src={item.src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
      />
      <img
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        loading="lazy"
        decoding="async"
        className="relative h-full w-full object-contain p-3 md:p-4"
      />
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10 text-xs text-white/80">
        <span className="tabular-nums text-accent">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </figcaption>
    </>
  );
}

function Card({
  item,
  index,
  total,
  pos,
  onSelect,
}: {
  item: MediaItem;
  index: number;
  total: number;
  pos: MotionValue<number>;
  onSelect: (i: number) => void;
}) {
  const offset = useTransform(pos, (p) => index - p);
  const y = useTransform(offset, (o) => `${o * 50}%`);
  const z = useTransform(offset, (o) => -Math.min(Math.abs(o), 3) * 200);
  const rotateX = useTransform(offset, (o) => Math.max(-45, Math.min(45, -o * 24)));
  const scale = useTransform(offset, (o) => 1 - Math.min(Math.abs(o), 3) * 0.09);
  // stay fully opaque near the front (no see-through ghosting), fade only the far cards
  const opacity = useTransform(offset, (o) => Math.max(0, Math.min(1, 1 - (Math.abs(o) - 1.6) * 0.65)));
  const shade = useTransform(offset, (o) => Math.min(Math.abs(o), 1.6) * 0.42);
  const zIndex = useTransform(offset, (o) => 100 - Math.round(Math.abs(o) * 10));
  const pointerEvents = useTransform(offset, (o) => (Math.abs(o) < 2.2 ? 'auto' : 'none'));

  return (
    <motion.figure
      data-cursor="explore"
      onClick={() => onSelect(index)}
      className="absolute left-1/2 top-1/2 m-0 overflow-hidden rounded-[1.25rem] bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/15"
      style={{
        width: 'var(--card-w)',
        height: 'var(--card-h)',
        marginLeft: 'calc(var(--card-w) / -2)',
        marginTop: 'calc(var(--card-h) / -2)',
        y,
        z,
        rotateX,
        scale,
        opacity,
        zIndex,
        pointerEvents,
      }}
    >
      <CardFace item={item} index={index} total={total} />
      {/* darkens cards further back, which gives depth without transparency */}
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-bg" style={{ opacity: shade }} />
    </motion.figure>
  );
}

/** Vertical 3D card flow. Scrolling the page flows the cards up through a 3D stack. */
export default function Stack3D({ id, label, title, description, items, landscape = false }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const last = items.length - 1;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const pos = useTransform(scrollYProgress, [0, 1], [0, last]);
  useMotionValueEvent(pos, 'change', (v) => setActive(Math.round(v)));

  const goTo = (i: number) => {
    const el = sectionRef.current;
    const sticky = stickyRef.current;
    if (!el || !sticky) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - sticky.offsetHeight;
    const y = top + (Math.max(0, Math.min(last, i)) / last) * range;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const heading = (
    <div>
      <p className="mb-5 flex items-center gap-4 text-xs tracking-wider2 text-muted">
        <span className="h-px w-10 bg-accent/70" aria-hidden="true" />
        {label}
      </p>
      <h2 className="text-[clamp(2.6rem,8vw,7rem)] leading-[0.95] tracking-tight">{title}</h2>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg/65 md:text-base">{description}</p>
    </div>
  );

  /* Reduced motion: a plain, calm vertical list of cards (no 3D, no sticky) */
  if (reduce) {
    return (
      <section id={id} aria-label={title} className="px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          {heading}
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <li key={item.src}>
                <figure className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-surface ring-1 ring-white/15">
                  <CardFace item={item} index={i} total={items.length} />
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      ref={sectionRef}
      aria-label={title}
      className="relative"
      style={{ height: `${last * SCREENS_PER_CARD * 100 + 100}svh` }}
    >
      <div ref={stickyRef} className="sticky top-0 flex h-[100svh] items-center overflow-hidden px-5 md:px-10">
        <div className="mx-auto grid h-full w-full max-w-[1400px] grid-rows-[auto_1fr] items-center gap-2 pb-6 pt-20 lg:grid-cols-[1fr_1.35fr] lg:grid-rows-1 lg:gap-16 lg:py-24">
          <div className="relative z-10">
            {heading}

            <div className="mt-5 hidden items-center gap-5 lg:flex">
              <p className="text-xs tabular-nums text-muted" aria-live="polite">
                {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </p>
              <div className="flex items-center gap-1.5" role="group" aria-label={`${title} cards`}>
                {items.map((item, i) => (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show ${title} card ${i + 1}`}
                    aria-current={i === active}
                    className="grid h-6 w-6 place-items-center"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-300 ${
                        i === active ? 'w-6 bg-accent' : 'w-1.5 bg-fg/30'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`stack-stage relative h-full min-h-0 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] ${
              landscape ? 'stack-stage--landscape' : ''
            }`}
          >
            {items.map((item, i) => (
              <Card key={item.src} item={item} index={i} total={items.length} pos={pos} onSelect={goTo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
