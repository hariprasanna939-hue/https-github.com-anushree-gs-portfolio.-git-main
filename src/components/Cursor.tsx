import { useEffect, useRef, useState } from 'react';

type Mode = 'default' | 'link' | 'view' | 'explore' | 'hidden';

/** Custom cursor: small dot, expands on links, shows VIEW / EXPLORE. Desktop only. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>('default');
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setEnabled(fine);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-cursor');

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el || !el.closest) return;
      const custom = el.closest<HTMLElement>('[data-cursor]')?.dataset.cursor;
      if (custom === 'view' || custom === 'explore') return setMode(custom);
      if (el.closest('input, textarea, select')) return setMode('hidden');
      if (custom === 'link' || el.closest('a, button')) return setMode('link');
      setMode('default');
    };

    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  const label = mode === 'view' ? 'VIEW' : mode === 'explore' ? 'EXPLORE' : '';
  const size = label ? 84 : mode === 'link' ? 44 : 8;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[400]"
      style={{ opacity: mode === 'hidden' ? 0 : 1 }}
    >
      <div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[10px] font-medium tracking-wider2 transition-all duration-300 ease-out"
        style={{
          width: size,
          height: size,
          background: label ? 'rgb(var(--fg))' : mode === 'link' ? 'rgb(var(--fg) / 0.08)' : 'rgb(var(--fg))',
          border: mode === 'link' ? '1px solid rgb(var(--fg) / 0.6)' : '1px solid transparent',
          color: 'rgb(var(--bg))',
          mixBlendMode: label ? 'normal' : 'difference',
        }}
      >
        {label}
      </div>
    </div>
  );
}
