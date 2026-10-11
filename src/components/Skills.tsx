import { skillGroups } from '../data/site';
import MaskText from './MaskText';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel>Skills</SectionLabel>
        <MaskText
          as="h2"
          text="What I work with"
          className="text-[clamp(2.6rem,8vw,7rem)] leading-[0.95] tracking-tight"
        />
        <span id="skills-title" className="sr-only">
          Skills
        </span>

        <div className="mt-16 md:mt-24">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.05}>
              <div className="grid gap-4 border-t border-fg/10 py-8 md:grid-cols-[13rem_1fr] md:gap-10 md:py-12">
                <h3 className="font-sans text-xs tracking-wider2 text-muted">{group.title}</h3>
                <ul className="skill-list flex flex-wrap items-baseline gap-x-6 gap-y-2 md:gap-x-9">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="skill cursor-default font-display text-[clamp(1.8rem,4.4vw,3.6rem)] leading-[1.15]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
