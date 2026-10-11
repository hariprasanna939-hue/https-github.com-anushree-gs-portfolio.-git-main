import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navLinks, profile, socials } from '../data/site';
import { getLenis, scrollToId } from '../lib/lenis';
import { EASE } from '../lib/motion';
import { SocialIcon } from './Icons';

// which nav item should be highlighted for each page section
const sectionToNav: Record<string, string> = {
  about: 'about',
  passion: 'about',
  drawing: 'about',
  sports: 'about',
  skills: 'skills',
  work: 'work',
  'case-studies': 'work',
  journey: 'journey',
  tools: 'journey',
  achievements: 'achievements',
  contact: 'contact',
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('');

  // Highlight the nav link of the section you are reading
  useEffect(() => {
    const els = Object.keys(sectionToNav)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setCurrent(sectionToNav[en.target.id] ?? '');
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => window.scrollY < 200 && setCurrent('');
    window.addEventListener('scroll', onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onTop);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll while the fullscreen menu is open
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    if (open) getLenis()?.stop();
    else getLenis()?.start();
    return () => {
      document.documentElement.classList.remove('menu-open');
      getLenis()?.start();
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // wait a tick so scrolling is unlocked before we scroll
    window.setTimeout(() => scrollToId(id), 60);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] border-b transition-all duration-500 ${
          scrolled && !open
            ? 'border-fg/10 bg-bg/70 backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10"
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-[1.35rem] tracking-tight md:text-2xl"
            aria-label={`${profile.name} — back to top`}
          >
            {profile.logo}
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={go(l.id)}
                  aria-current={current === l.id ? 'true' : undefined}
                  className={`relative py-2 text-sm transition-colors hover:text-fg ${
                    current === l.id ? 'text-fg' : 'text-fg/60'
                  }`}
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-500 ${
                      current === l.id ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={go('contact')}
              className="btn btn-ghost hidden !py-2 sm:inline-flex"
            >
              Hire Me
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-fg/20 lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[55] flex flex-col justify-between bg-bg px-5 pb-8 pt-24 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.08 + i * 0.06 }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={go(l.id)}
                    className="block border-b border-fg/10 py-3 font-display text-[2.6rem] leading-none"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div>
              <a
                href="#contact"
                onClick={go('contact')}
                className="btn btn-primary mb-8 w-full !py-3.5"
              >
                Hire Me
              </a>
              <ul className="flex items-center gap-5">
                {socials.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target={s.id === 'email' ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="text-fg/70 hover:text-fg"
                    >
                      <SocialIcon id={s.id} className="h-5 w-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
