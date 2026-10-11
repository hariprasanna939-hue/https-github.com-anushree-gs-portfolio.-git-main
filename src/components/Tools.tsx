import { tools } from '../data/site';
import MaskText from './MaskText';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';

export default function Tools() {
  return (
    <section id="tools" aria-labelledby="tools-title" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel>Tools &amp; technologies</SectionLabel>
        <MaskText
          as="h2"
          text="My toolkit"
          className="text-[clamp(2.4rem,7vw,6rem)] leading-[0.95] tracking-tight"
        />
        <span id="tools-title" className="sr-only">
          Tools and technologies
        </span>

        <Reveal className="mt-14 md:mt-20">
          <ul className="grid grid-cols-2 border-l border-t border-fg/10 md:grid-cols-4">
            {tools.map((t, i) => (
              <li
                key={t.name}
                className="group relative overflow-hidden border-b border-r border-fg/10 bg-surface/35 p-5 transition-all duration-500 hover:-translate-y-1 hover:bg-accent hover:text-bg md:p-7"
              >
                <span className="absolute right-4 top-4 text-[0.65rem] tabular-nums text-accent/80 transition-colors group-hover:text-bg/70">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-5 font-display text-[1.75rem] leading-none md:text-[2.1rem]">{t.name}</p>
                <p className="mt-5 text-[0.68rem] uppercase tracking-wider text-muted transition-colors group-hover:text-bg/65">{t.use}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
