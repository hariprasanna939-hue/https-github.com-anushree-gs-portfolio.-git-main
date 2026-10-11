import { ArrowUpRight, Download } from 'lucide-react';
import { useState } from 'react';
import { projectTypes, resumeUrl, socials } from '../data/site';
import { SocialIcon } from './Icons';
import MaskText from './MaskText';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';

type Status = 'idle' | 'loading' | 'success' | 'error';
type Values = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  message: string;
};
type Errors = Partial<Record<keyof Values, string>>;

const initial: Values = {
  name: '',
  email: '',
  phone: '',
  company: '',
  projectType: projectTypes[0],
  message: '',
};

const TO_EMAIL = 'gsanushree18@gmail.com';

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (v.phone.trim() && !/^[+\d][\d\s()-]{6,}$/.test(v.phone.trim())) e.phone = 'Please enter a valid phone number.';
  if (v.message.trim().length < 10) e.message = 'Please write at least 10 characters.';
  return e;
}

const field =
  'w-full border-b border-fg/25 bg-transparent py-3 text-base text-fg placeholder:text-fg/30 transition-colors focus:border-accent focus:outline-none';

export default function Contact() {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  const set =
    (key: keyof Values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('loading');
    const endpoint = import.meta.env.VITE_FORM_ENDPOINT;

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error('Request failed');
      } else {
        // No form service configured -> open the visitor's email app with everything pre-filled
        const lines = [`Name: ${values.name}`, `Email: ${values.email}`];
        if (values.phone.trim()) lines.push(`Phone: ${values.phone}`);
        if (values.company.trim()) lines.push(`Company: ${values.company}`);
        lines.push(`Project type: ${values.projectType}`, '', values.message);
        const body = lines.join('\n');
        window.location.href = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(
          `Portfolio enquiry: ${values.projectType}`,
        )}&body=${encodeURIComponent(body)}`;
      }
      setStatus('success');
      setValues(initial);
    } catch {
      setStatus('error');
    }
  };

  const err = (k: keyof Values) => (errors[k] ? `${k}-error` : undefined);

  return (
    <section id="contact" aria-labelledby="contact-title" className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel>Contact</SectionLabel>
        <MaskText
          as="h2"
          text="Have an idea? Let’s build it."
          className="max-w-5xl text-[clamp(2.8rem,9vw,8.5rem)] leading-[0.95] tracking-tight"
        />
        <span id="contact-title" className="sr-only">
          Contact
        </span>

        <div className="mt-14 grid gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="max-w-md text-base leading-[1.8] text-fg/70 md:text-lg">
                Whether it’s an internship opportunity, a project idea or a collaboration, let’s create something
                people remember.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <Download size={15} strokeWidth={1.75} aria-hidden="true" />
                  Download Resume
                </a>
                <a
                  href="https://www.linkedin.com/in/anushree-gs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="contact-socials mt-14 flex flex-col gap-3" aria-label="Social links">
                {socials.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target={s.id === 'email' ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      aria-label={s.id === 'email' ? 'Email Anushree' : `${s.label} (opens in a new tab)`}
                      title={s.label}
                      className="group flex h-12 w-12 items-center justify-center rounded-xl border border-bg/15 bg-bg/[0.04] p-3 transition-all duration-300 hover:translate-x-1 hover:border-accent hover:bg-bg hover:text-fg"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bg/10 text-accent transition-colors group-hover:bg-accent group-hover:text-bg">
                        <SocialIcon id={s.id} className="h-4 w-4" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <form onSubmit={onSubmit} noValidate className="space-y-8" aria-label="Contact form">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-xs tracking-wider2 text-muted">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={set('name')}
                    aria-invalid={!!errors.name}
                    aria-describedby={err('name')}
                    className={field}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="mt-2 text-sm text-red-300">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="text-xs tracking-wider2 text-muted">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={set('email')}
                    aria-invalid={!!errors.email}
                    aria-describedby={err('email')}
                    className={field}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-2 text-sm text-red-300">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="text-xs tracking-wider2 text-muted">
                    Phone (optional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={set('phone')}
                    aria-invalid={!!errors.phone}
                    aria-describedby={err('phone')}
                    className={field}
                    placeholder="+91 …"
                  />
                  {errors.phone && (
                    <p id="phone-error" role="alert" className="mt-2 text-sm text-red-300">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="company" className="text-xs tracking-wider2 text-muted">
                    Company (optional)
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={values.company}
                    onChange={set('company')}
                    className={field}
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="projectType" className="text-xs tracking-wider2 text-muted">
                  Project type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={values.projectType}
                  onChange={set('projectType')}
                  className={`${field} appearance-none`}
                >
                  {projectTypes.map((t) => (
                    <option key={t} value={t} className="bg-bg text-fg">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="text-xs tracking-wider2 text-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={set('message')}
                  aria-invalid={!!errors.message}
                  aria-describedby={err('message')}
                  className={`${field} resize-none`}
                  placeholder="Tell me a little about your idea or opportunity"
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="mt-2 text-sm text-red-300">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn btn-primary !px-8 !py-4 disabled:opacity-60"
                >
                  {status === 'loading' ? 'Sending…' : 'Let’s Build'}
                  <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                </button>

                <p role="status" aria-live="polite" className="text-sm">
                  {status === 'success' && (
                    <span className="text-accent">
                      Thank you! Your message is on its way. I’ll get back to you soon.
                    </span>
                  )}
                  {status === 'error' && (
                    <span className="text-red-300">
                      Something went wrong. Please try again or email {TO_EMAIL} directly.
                    </span>
                  )}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
