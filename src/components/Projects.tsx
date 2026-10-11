import { ArrowUpRight } from 'lucide-react';
import { profile, projects } from '../data/site';
import type { Project } from '../data/site';
import { GithubIcon } from './Icons';
import MaskText from './MaskText';
import Reveal from './Reveal';
import SectionLabel from './SectionLabel';
import Tilt3D from './Tilt3D';
import Wireframe from './Wireframes';

function Visual({ project }: { project: Project }) {
  return (
    <Tilt3D className="aspect-[4/3] w-full" max={5} float={false}>
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        data-cursor="view"
        className="relative block h-full w-full"
      >
        <div className="h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]">
          {project.image ? (
            <img
              src={project.image}
              alt=""
              loading="lazy"
              decoding="async"
              width={1200}
              height={896}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="grid h-full w-full place-items-center p-6 md:p-10">
              <Wireframe kind={project.wire} />
            </div>
          )}
        </div>
        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-bg/60 px-3 py-1 text-xs tabular-nums text-fg/80 backdrop-blur">
          {project.index} / {String(projects.length).padStart(2, '0')}
        </span>
      </a>
    </Tilt3D>
  );
}

export default function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel>Projects</SectionLabel>
        <MaskText
          as="h2"
          text="Selected work"
          className="text-[clamp(2.8rem,9vw,8.5rem)] leading-[0.95] tracking-tight"
        />
        <span id="work-title" className="sr-only">
          Selected projects
        </span>

        <div className="mt-16 space-y-24 md:mt-28 md:space-y-40">
          {projects.map((p, i) => (
            <Reveal key={p.id} y={40}>
              <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Visual project={p} />
                </div>

                <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <p className="mb-3 text-xs tracking-wider2 text-accent">{p.category}</p>
                  <h3 className="text-[clamp(2.2rem,5vw,4.4rem)] leading-[1] transition-transform duration-500 group-hover:translate-x-2">
                    {p.title}
                  </h3>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-fg/70">{p.summary}</p>

                  <dl className="mt-8 divide-y divide-fg/10 border-y border-fg/10 text-sm">
                    <div className="grid grid-cols-[6.5rem_1fr] gap-3 py-3">
                      <dt className="text-muted">Type</dt>
                      <dd>{p.type}</dd>
                    </div>
                    <div className="grid grid-cols-[6.5rem_1fr] gap-3 py-3">
                      <dt className="text-muted">Role</dt>
                      <dd>
                        {p.role} · {p.team}
                      </dd>
                    </div>
                    <div className="grid grid-cols-[6.5rem_1fr] gap-3 py-3">
                      <dt className="text-muted">Duration</dt>
                      <dd>{p.duration}</dd>
                    </div>
                    <div className="grid grid-cols-[6.5rem_1fr] gap-3 py-3">
                      <dt className="text-muted">Status</dt>
                      <dd>{p.status}</dd>
                    </div>
                    {p.tech.length > 0 && (
                      <div className="grid grid-cols-[6.5rem_1fr] gap-3 py-3">
                        <dt className="text-muted">Stack</dt>
                        <dd>{p.tech.join(', ')}</dd>
                      </div>
                    )}
                  </dl>

                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="view"
                    aria-label={`View ${p.title} on GitHub (opens in a new tab)`}
                    className="btn btn-ghost mt-8 !pr-4"
                  >
                    <GithubIcon className="h-4 w-4" />
                    View Project
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-24 text-sm text-muted">
          More on{' '}
          <a
            href="https://github.com/gsanushree18"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg underline decoration-fg/30 underline-offset-4 hover:decoration-fg"
          >
            GitHub · {profile.name}
          </a>
        </p>
      </div>
    </section>
  );
}
