import { ArrowUpRight } from 'lucide-react';
import { badges, certifications } from '../data/site';
import MaskText from './MaskText';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';

function brandFor(label: string) {
  if (/google|gdg|sdlc|antigravity/i.test(label)) return { name: 'Google', logo: 'Google', className: 'brand-logo--google' };
  if (/nvidia/i.test(label)) return { name: 'NVIDIA', logo: 'NVIDIA', className: 'brand-logo--nvidia' };
  if (/credly/i.test(label)) return { name: 'Credly', logo: 'Credly', className: 'brand-logo--credly' };
  if (/ibm/i.test(label)) return { name: 'IBM', logo: 'IBM', className: 'brand-logo--ibm' };
  return { name: 'Digital badge', logo: 'Badge', className: 'brand-logo--default' };
}

function BrandLogo({ label }: { label: string }) {
  const brand = brandFor(label);
  return (
    <span className={`brand-logo ${brand.className}`} aria-hidden="true">
      {brand.logo}
    </span>
  );
}

function BadgeCard({ label, href, index }: { label: string; href: string; index: number }) {
  const brand = brandFor(label);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full min-h-[7rem] items-start justify-between gap-4 rounded-xl border border-fg/10 bg-surface/45 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-surface"
    >
      <span className="flex items-start gap-3">
        <span className="flex h-10 w-16 shrink-0 items-center justify-center rounded-lg bg-fg/[0.06]">
          <BrandLogo label={label} />
        </span>
        <span>
          <span className="block text-[0.65rem] uppercase tracking-wider text-muted">
            {brand.name} · Badge {String(index + 1).padStart(2, '0')}
          </span>
          <span className="mt-2 block text-sm leading-snug md:text-base">{label}</span>
        </span>
      </span>
      <ArrowUpRight
        size={18}
        strokeWidth={1.25}
        className="shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:text-fg"
        aria-hidden="true"
      />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" aria-labelledby="ach-title" className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel>Achievements</SectionLabel>
        <MaskText
          as="h2"
          text="Learning, on record"
          className="text-[clamp(2.6rem,8vw,7rem)] leading-[0.95] tracking-tight"
        />
        <span id="ach-title" className="sr-only">
          Achievements
        </span>

        {/* Certifications: vertical flow of cards */}
        <div className="mt-20 grid gap-10 lg:mt-32 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h3 className="text-[clamp(2rem,4vw,3.4rem)] leading-none">Certifications</h3>
              <p className="mt-4 font-display text-[clamp(4rem,9vw,8rem)] leading-none text-fg/20">
                {String(certifications.length).padStart(2, '0')}
              </p>
            </div>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {certifications.map((c, i) => (
              <Reveal key={c.title}>
                <li className="h-full">
                  <div className="group flex h-full min-h-[10rem] flex-col justify-between rounded-xl border border-fg/10 bg-surface/60 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:bg-surface md:p-6">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/50 text-xs tabular-nums text-accent">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="mt-8 font-display text-xl leading-snug md:text-[1.45rem]">{c.title}</p>
                      {c.issuer && <p className="mt-2 text-xs uppercase tracking-wider text-muted">{c.issuer}</p>}
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Badges */}
        <div className="mt-28 grid gap-10 lg:mt-40 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h3 className="text-[clamp(2rem,4vw,3.4rem)] leading-none">Digital badges</h3>
              <p className="mt-4 font-display text-[clamp(4rem,9vw,8rem)] leading-none text-fg/20">
                {String(badges.length).padStart(2, '0')}
              </p>
            </div>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {badges.map((b, i) => (
              <li key={b.href} className="h-full">
                <BadgeCard label={b.label} href={b.href} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
