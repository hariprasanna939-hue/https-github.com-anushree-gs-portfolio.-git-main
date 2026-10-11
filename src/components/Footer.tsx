import { profile, socials } from '../data/site';
import { SocialIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="border-t border-fg/10 px-5 py-10 md:px-10">
      <div className="mx-auto grid max-w-[1400px] items-center gap-6 text-sm text-muted md:grid-cols-3">
        <p className="font-display text-2xl text-fg">{profile.name}</p>
        <p className="md:text-center">Built with curiosity + code</p>
        <div className="flex items-center gap-6 md:justify-end">
          <ul className="flex items-center gap-4">
            {socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target={s.id === 'email' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="transition-colors hover:text-fg"
                >
                  <SocialIcon id={s.id} className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
          <p>© 2026</p>
        </div>
      </div>
    </footer>
  );
}
