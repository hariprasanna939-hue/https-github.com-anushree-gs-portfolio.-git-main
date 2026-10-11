import { ChevronDown, ChevronUp } from 'lucide-react';
import { useRef, useState } from 'react';
import type { MediaItem } from '../data/site';
import { prefersReducedMotion } from '../lib/motion';

type Props = { title: string; items: MediaItem[] };

/** Vertical carousel: swipe / scroll / arrow keys / buttons / dots. */
export default function VerticalCarousel({ title, items }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const idx = Math.max(0, Math.min(items.length - 1, i));
    el.scrollTo({ top: idx * el.clientHeight, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  const onScroll = () => {
    const el = ref.current;
    if (!el || !el.clientHeight) return;
    setActive(Math.round(el.scrollTop / el.clientHeight));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      goTo(active - 1);
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-end justify-between">
        <h3 className="font-display text-3xl md:text-4xl">{title}</h3>
        <p className="text-xs tabular-nums text-muted" aria-live="polite">
          {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </p>
      </div>

      <div className="relative">
        <div
          ref={ref}
          data-lenis-prevent
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label={`${title} — use up and down arrows to browse`}
          onScroll={onScroll}
          onKeyDown={onKeyDown}
          className="h-[min(70svh,540px)] snap-y snap-mandatory overflow-y-auto overscroll-contain bg-surface [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => (
            <div
              key={item.src}
              data-cursor="explore"
              className="flex h-full w-full snap-start snap-always items-center justify-center p-4 md:p-6"
              aria-hidden={i !== active}
            >
              <img
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* controls */}
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label={`${title}: previous`}
            className="grid h-9 w-9 place-items-center rounded-full border border-fg/25 bg-bg/70 backdrop-blur transition-opacity hover:bg-fg hover:text-bg disabled:opacity-30"
          >
            <ChevronUp size={16} strokeWidth={1.5} />
          </button>
          <div className="flex flex-col gap-1.5" aria-hidden="true">
            {items.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-all ${i === active ? 'scale-125 bg-accent' : 'bg-fg/30'}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === items.length - 1}
            aria-label={`${title}: next`}
            className="grid h-9 w-9 place-items-center rounded-full border border-fg/25 bg-bg/70 backdrop-blur transition-opacity hover:bg-fg hover:text-bg disabled:opacity-30"
          >
            <ChevronDown size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
