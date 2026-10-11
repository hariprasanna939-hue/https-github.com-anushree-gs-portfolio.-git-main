import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/site';
import { EASE } from '../lib/motion';

type Props = {
  progress: number; // 0 -> 1 real asset progress
  ready: boolean; // hero assets finished
  onFinish: () => void;
};

const line = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

export default function Loader({ progress, ready, onFinish }: Props) {
  const [shown, setShown] = useState(0);
  const [minElapsed, setMinElapsed] = useState(false);
  const target = useRef(0);
  const finished = useRef(false);

  target.current = ready ? 100 : Math.min(95, Math.round(progress * 100));

  // Smoothly count towards the real progress
  useEffect(() => {
    const id = window.setInterval(() => {
      setShown((s) => {
        const t = target.current;
        if (s >= t) return s;
        return Math.min(t, s + Math.max(1, Math.ceil((t - s) * 0.12)));
      });
    }, 30);
    return () => window.clearInterval(id);
  }, []);

  // Keep the intro on screen long enough to read it
  useEffect(() => {
    const id = window.setTimeout(() => setMinElapsed(true), 2000);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (ready && minElapsed && shown >= 100 && !finished.current) {
      finished.current = true;
      onFinish();
    }
  }, [ready, minElapsed, shown, onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-bg px-6 text-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <motion.h1
        className="font-display text-[clamp(2.1rem,7.4vw,5.6rem)] uppercase leading-none tracking-[0.06em]"
        {...line(0.1)}
      >
        {profile.name}
      </motion.h1>

      <motion.p className="mt-6 text-xs tracking-[0.5em] text-accent md:text-sm" {...line(0.45)}>
        PORTFOLIO
      </motion.p>

      <motion.p className="mt-4 max-w-[22rem] text-[0.7rem] tracking-wider2 text-muted md:max-w-none md:text-xs" {...line(0.8)}>
        AI PRODUCT DESIGNER &amp; FULL STACK DEVELOPER
      </motion.p>

      <motion.div className="mt-14 flex flex-col items-center" {...line(1.1)}>
        <div className="h-px w-48 overflow-hidden bg-fg/15 md:w-64">
          <div
            className="h-full origin-left bg-accent transition-transform duration-200 ease-out"
            style={{ transform: `scaleX(${shown / 100})` }}
          />
        </div>
        <p className="mt-3 text-xs tabular-nums text-muted">{shown}%</p>
      </motion.div>
    </motion.div>
  );
}
