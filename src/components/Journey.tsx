import { journey } from '../data/site';
import MaskText from './MaskText';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';

export default function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel>Development journey</SectionLabel>
        <MaskText
          as="h2"
          text="From code to product thinking"
          className="max-w-4xl text-[clamp(2.4rem,7vw,6.2rem)] leading-[0.98] tracking-tight"
        />
        <span id="journey-title" className="sr-only">
          Development journey
        </span>

        <ol className="relative mt-16 md:mt-24">
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[0.55rem] top-2 w-px bg-fg/15 md:left-[11.55rem]"
          />
          {journey.map((step, i) => {
            const last = i === journey.length - 1;
            return (
              <li key={step.title} className="relative pb-14 pl-9 last:pb-0 md:grid md:grid-cols-[11rem_1fr] md:gap-0 md:pl-0">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-2 h-[1.1rem] w-[1.1rem] rounded-full border md:left-[11rem] ${
                    last ? 'border-accent bg-accent' : 'border-fg/40 bg-bg'
                  }`}
                />
                <Reveal>
                  <h3 className="font-sans text-sm text-muted md:pr-6 md:text-right">{step.title}</h3>
                </Reveal>
                <Reveal delay={0.08} className="md:pl-12">
                  <p
                    className={`max-w-3xl leading-snug ${
                      last
                        ? 'font-display text-[clamp(1.8rem,4vw,3.4rem)]'
                        : 'text-lg text-fg/75 md:text-xl md:leading-relaxed'
                    }`}
                  >
                    {step.text}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
