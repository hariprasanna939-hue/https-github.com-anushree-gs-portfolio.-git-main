import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useRef } from 'react';
import type { PointerEvent, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees */
  max?: number;
  /** Gentle idle floating / swaying so the 3D depth is visible even without a mouse */
  float?: boolean;
  /** Soft mint glow behind the card */
  glow?: boolean;
};

/**
 * A real CSS-3D card: follows the mouse (tilt + light glare),
 * sways gently on its own, and casts a soft floating shadow.
 */
export default function Tilt3D({ children, className = '', max = 10, float = true, glow = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rx = useSpring(0, { stiffness: 140, damping: 16, mass: 0.5 });
  const ry = useSpring(0, { stiffness: 140, damping: 16, mass: 0.5 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(30);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgb(255 255 255 / 0.22), transparent 55%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
    gx.set((px + 0.5) * 100);
    gy.set((py + 0.5) * 100);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(30);
  };

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ perspective: 1300 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div
        className="h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={float && !reduce ? { rotateY: [-5, 5, -5], y: [0, -8, 0] } : undefined}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div className="relative h-full w-full" style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}>
          {glow && (
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2.2rem] bg-accent/25 blur-3xl"
              style={{ transform: 'translateZ(-70px)' }}
            />
          )}
          <div
            className="absolute inset-0 overflow-hidden rounded-[1.25rem] bg-surface shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/15"
            style={{ transform: 'translateZ(0)' }}
          >
            {children}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{ background: glare }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
