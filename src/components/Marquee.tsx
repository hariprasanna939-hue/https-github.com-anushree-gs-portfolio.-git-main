import { marqueeWords } from '../data/site';

export default function Marquee() {
  const row = marqueeWords.map((w) => (
    <span key={w} className="flex items-center">
      <span className="px-8 font-display text-[clamp(2rem,5vw,4.5rem)] uppercase leading-none text-fg/20 md:px-12">
        {w}
      </span>
      <span className="h-1.5 w-1.5 rounded-full bg-accent/60" aria-hidden="true" />
    </span>
  ));

  return (
    <div
      className="overflow-hidden border-y border-fg/10 py-8 md:py-10"
      aria-label={marqueeWords.join(', ')}
      role="img"
    >
      <div className="marquee-track" aria-hidden="true">
        <div className="flex shrink-0">{row}</div>
        <div className="flex shrink-0">{row}</div>
      </div>
    </div>
  );
}
