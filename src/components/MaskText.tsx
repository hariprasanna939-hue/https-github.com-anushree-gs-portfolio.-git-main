import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { ElementType } from 'react';
import { EASE } from '../lib/motion';

type Props = {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  delay?: number;
};

/** Headline where each word slides up out of a mask. */
export default function MaskText({ text, as = 'h2', className = '', delay = 0 }: Props) {
  const Tag = as as ElementType;
  const ref = useRef<HTMLDivElement>(null);
  // Observe the outer wrapper (not the clipped words) so the reveal always triggers
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const words = text.split(' ');

  return (
    <div ref={ref}>
      <Tag className={className} aria-label={text}>
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            aria-hidden="true"
            className="mr-[0.25em] inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}
          >
            <motion.span
              className="inline-block"
              initial={{ y: '115%' }}
              animate={{ y: inView ? 0 : '115%' }}
              transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.05 }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
