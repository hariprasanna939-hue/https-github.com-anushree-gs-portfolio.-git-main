import { passionQuote, passions, passionText } from '../data/site';
import MaskText from './MaskText';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';

export default function Passion() {
  return (
    <section id="passion" aria-labelledby="passion-title" className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel>Passion</SectionLabel>
        <MaskText
          as="h2"
          text="My top 3 passions"
          className="text-[clamp(2.6rem,8vw,7rem)] leading-[0.95] tracking-tight"
        />
        <span id="passion-title" className="sr-only">
          Passions
        </span>

        <ol className="mt-16 border-t border-fg/10 md:mt-24">
          {passions.map((p, i) => (
            <Reveal key={p} delay={i * 0.08}>
              <li className="group flex items-baseline gap-6 border-b border-fg/10 py-7 transition-colors hover:bg-fg/[0.03] md:gap-12 md:py-10">
                <span className="w-8 text-sm tabular-nums text-muted md:w-14">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-[clamp(1.7rem,4.6vw,4rem)] leading-tight transition-transform duration-500 group-hover:translate-x-3">
                  {p}
                </span>
              </li>
            </Reveal>
          ))}
        </ol>

        <div className="mt-20 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-xs tracking-wider2 text-muted">How my passions shape my design thinking</p>
          </Reveal>
          <Reveal className="lg:col-span-7">
            <p className="max-w-2xl text-base leading-[1.8] text-fg/70 md:text-lg">{passionText}</p>
          </Reveal>
        </div>

        <Reveal className="mt-24 md:mt-32">
          <blockquote className="max-w-5xl font-display text-[clamp(2rem,5.4vw,5rem)] italic leading-[1.08]">
            “{passionQuote}”
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
