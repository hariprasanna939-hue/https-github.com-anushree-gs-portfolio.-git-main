type Props = { children: string };

/** Small label above a section heading */
export default function SectionLabel({ children }: Props) {
  return (
    <p className="section-label mb-6 flex items-center gap-4 text-xs tracking-wider2">
      <span className="h-px w-10 bg-accent/70" aria-hidden="true" />
      {children}
    </p>
  );
}
