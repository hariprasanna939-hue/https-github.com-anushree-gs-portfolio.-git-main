import type { Project } from '../data/site';

/** Simple line wireframes used as project visuals until real screenshots are added. */
export default function Wireframe({ kind }: { kind: Project['wire'] }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.2 } as const;

  return (
    <svg viewBox="0 0 640 400" className="h-full w-full text-fg/45" role="presentation" aria-hidden="true">
      {/* browser frame */}
      <rect x="40" y="30" width="560" height="340" rx="6" {...common} />
      <line x1="40" y1="62" x2="600" y2="62" {...common} />
      <circle cx="60" cy="46" r="4" {...common} />
      <circle cx="76" cy="46" r="4" {...common} />
      <circle cx="92" cy="46" r="4" {...common} />
      <rect x="130" y="38" width="260" height="16" rx="8" {...common} />

      {kind === 'recipe' && (
        <g>
          <rect x="64" y="84" width="270" height="190" {...common} />
          <path d="M64 274 L150 190 L210 240 L262 200 L334 274" {...common} />
          <circle cx="126" cy="128" r="14" {...common} />
          <line x1="360" y1="90" x2="560" y2="90" {...common} strokeWidth={2.2} />
          <line x1="360" y1="112" x2="500" y2="112" {...common} />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <circle cx="368" cy={146 + i * 30} r="5" {...common} />
              <line x1="386" y1={146 + i * 30} x2={520 - (i % 2) * 40} y2={146 + i * 30} {...common} />
            </g>
          ))}
          {[0, 1, 2].map((i) => (
            <rect key={i} x={64 + i * 92} y="296" width="80" height="54" {...common} />
          ))}
        </g>
      )}

      {kind === 'shop' && (
        <g>
          <line x1="64" y1="84" x2="150" y2="84" {...common} strokeWidth={2.2} />
          <rect x="520" y="76" width="56" height="16" rx="8" {...common} />
          {[0, 1, 2].map((c) =>
            [0, 1].map((r) => (
              <g key={`${c}-${r}`}>
                <rect x={64 + c * 180} y={112 + r * 130} width="160" height="84" {...common} />
                <line x1={64 + c * 180} y1={210 + r * 130} x2={190 + c * 180} y2={210 + r * 130} {...common} />
                <line x1={64 + c * 180} y1={224 + r * 130} x2={130 + c * 180} y2={224 + r * 130} {...common} />
                <rect x={150 + c * 180} y={214 + r * 130} width="34" height="14" rx="7" {...common} />
              </g>
            )),
          )}
        </g>
      )}

      {kind === 'dashboard' && (
        <g>
          <rect x="64" y="84" width="100" height="264" {...common} />
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1="78" y1={108 + i * 30} x2="150" y2={108 + i * 30} {...common} />
          ))}
          <rect x="184" y="84" width="240" height="26" rx="13" {...common} />
          <rect x="480" y="84" width="96" height="26" rx="13" {...common} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <line x1="184" y1={140 + i * 34} x2="576" y2={140 + i * 34} {...common} />
              <line x1="196" y1={158 + i * 34} x2={260 + (i % 3) * 30} y2={158 + i * 34} {...common} />
              <line x1="330" y1={158 + i * 34} x2="400" y2={158 + i * 34} {...common} />
              <rect x="520" y={148 + i * 34} width="40" height="16" rx="3" {...common} />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
