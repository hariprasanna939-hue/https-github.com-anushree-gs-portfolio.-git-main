import { badges, certifications, profile, projects } from '../data/site';
import MaskText from './MaskText';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import Tilt3D from './Tilt3D';

const stats = [
  { value: projects.length, label: 'Projects built' },
  { value: certifications.length, label: 'Certifications' },
  { value: badges.length, label: 'Digital badges' },
];

const facts = [
  ['Name', profile.name],
  ['Background', profile.role],
  ['Location', profile.location],
  ['Design niche', profile.niche],
  ['Brand', profile.brand.join(' · ')],
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel>About</SectionLabel>
        <MaskText
          as="h2"
          text="More than a developer."
          className="text-[clamp(2.8rem,9vw,8.5rem)] leading-[0.95] tracking-tight"
        />
        <span id="about-title" className="sr-only">
          About Anushree G S
        </span>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div
              data-cursor="explore"
              className="about-portrait mx-auto aspect-[4/5] w-full max-w-sm lg:max-w-none"
            >
              <Tilt3D className="h-full w-full" max={9}>
                <img
                  src="/images/portrait.webp"
                  alt="Anushree G S in a black blazer and white shirt"
                  width={900}
                  height={898}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: '50% 30%' }}
                />
              </Tilt3D>
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <Reveal>
              <p className="font-display text-[clamp(1.6rem,3vw,2.6rem)] leading-tight">{profile.aboutLead}</p>
            </Reveal>
            <div className="mt-8 max-w-2xl space-y-5 text-base leading-[1.8] text-fg/70 md:text-[1.05rem]">
              {profile.story.map((p) => (
                <Reveal key={p.slice(0, 20)}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12">
              <dl className="divide-y divide-fg/10 border-y border-fg/10">
                {facts.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 py-4 text-sm md:grid-cols-[10rem_1fr]">
                    <dt className="text-muted">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-24 md:mt-32">
          <p className="mb-6 text-xs tracking-wider2 text-muted">My mission</p>
          <p className="max-w-5xl font-display text-[clamp(1.7rem,4vw,3.4rem)] leading-[1.15]">{profile.mission}</p>
        </Reveal>

        <dl className="mt-20 grid grid-cols-3 gap-4 border-t border-fg/10 pt-10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="flex flex-col-reverse">
              <dt className="mt-3 text-xs text-muted md:text-sm">{s.label}</dt>
              <dd className="font-display text-[clamp(2.6rem,7vw,6rem)] leading-none">{s.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
