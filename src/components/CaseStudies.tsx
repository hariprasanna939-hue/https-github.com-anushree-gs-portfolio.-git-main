import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { projects } from '../data/site';
import { EASE } from '../lib/motion';
import MaskText from './MaskText';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';

export default function CaseStudies() {
  const [active, setActive] = useState(0);
  const p = projects[active];
  const c = p.case;

  const rows: [string, string][] = [
    ['Situation', c.situation],
    ['Task', c.task],
    ['Action', c.action],
    ['Result', c.result],
  ];

  return (
    <section id="case-studies" aria-labelledby="cs-title" className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel>Case studies</SectionLabel>
        <MaskText
          as="h2"
          text="How I think through a project"
          className="max-w-4xl text-[clamp(2.4rem,7vw,6.2rem)] leading-[0.98] tracking-tight"
        />
        <span id="cs-title" className="sr-only">
          Case studies
        </span>

        <Reveal className="mt-14 md:mt-20">
          <div role="tablist" aria-label="Choose a project" className="flex flex-wrap gap-2 md:gap-3">
            {projects.map((proj, i) => (
              <button
                key={proj.id}
                type="button"
                role="tab"
                id={`cs-tab-${i}`}
                aria-selected={i === active}
                aria-controls="cs-panel"
                onClick={() => setActive(i)}
                className={`rounded-full border px-5 py-2.5 text-sm transition-colors ${
                  i === active
                    ? 'border-fg bg-fg text-bg'
                    : 'border-fg/25 text-fg/70 hover:border-fg/60 hover:text-fg'
                }`}
              >
                {proj.title}
              </button>
            ))}
          </div>
        </Reveal>

        <div id="cs-panel" role="tabpanel" aria-labelledby={`cs-tab-${active}`} className="mt-10 min-h-[32rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="grid gap-12 lg:grid-cols-12 lg:gap-16"
            >
              <div className="lg:col-span-7">
                <dl className="divide-y divide-fg/10 border-y border-fg/10">
                  {rows.map(([k, v], i) => (
                    <div key={k} className="grid gap-2 py-6 md:grid-cols-[8rem_1fr] md:gap-8 md:py-8">
                      <dt className="flex items-baseline gap-3 text-sm text-muted">
                        <span className="text-xs tabular-nums text-accent">{String(i + 1).padStart(2, '0')}</span>
                        {k}
                      </dt>
                      <dd className="text-base leading-[1.75] text-fg/80">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="lg:col-span-5">
                <dl className="space-y-8">
                  <div>
                    <dt className="mb-2 text-xs tracking-wider2 text-muted">Who was affected</dt>
                    <dd className="text-base leading-relaxed">{c.affected}</dd>
                  </div>
                  <div>
                    <dt className="mb-2 text-xs tracking-wider2 text-muted">User flow</dt>
                    <dd className="font-display text-2xl leading-snug md:text-3xl">{c.userFlow}</dd>
                  </div>
                  <div>
                    <dt className="mb-2 text-xs tracking-wider2 text-muted">Emotion the UI should create</dt>
                    <dd className="text-base leading-relaxed">{c.emotion}</dd>
                  </div>
                  {c.validation && (
                    <div>
                      <dt className="mb-2 text-xs tracking-wider2 text-muted">Still to validate</dt>
                      <dd className="text-base leading-relaxed text-fg/70">{c.validation}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
