// Bibliothèque d'icônes Qimma — traits fins, cohérents (24×24, stroke 1.6),
// dessinées pour la marque plutôt que des emojis. Toutes décoratives
// (aria-hidden) : le sens est toujours porté par le texte adjacent.

export type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
} as const;

// ——— Fonctionnalités ———

export function IconLibrary({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <line x1="3" y1="20" x2="21" y2="20" />
      <rect x="4" y="6" width="4" height="14" />
      <rect x="10" y="3" width="4" height="17" />
      <rect x="16" y="8" width="4" height="12" />
    </svg>
  );
}

export function IconTimer({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 1.5" />
      <path d="M9 2.5h6" />
    </svg>
  );
}

export function IconHint({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="10" r="5" />
      <path d="M9.5 17.5h5" />
      <path d="M10 20h4" />
      <path d="M12 2.8v1.3" />
      <path d="M5.4 5.4l.95.95" />
      <path d="M18.6 5.4l-.95.95" />
    </svg>
  );
}

export function IconTutorAI({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path d="M9.1 9.5a2.9 2.9 0 0 1 5.6 1c0 1.9-2.9 2.9-2.9 2.9" />
      <circle cx="11.8" cy="16.3" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconProgress({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2 18l6.5-6.5 4 4L21 7" />
      <path d="M15 7h6v6" />
    </svg>
  );
}

export function IconBolt({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

// ——— Matières ———

export function IconMath({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 3v18h17" />
      <path d="M5 17C7 9 9 5 12 5s5 4 7 12" />
    </svg>
  );
}

export function IconAtom({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9" ry="3.4" />
      <ellipse cx="12" cy="12" rx="9" ry="3.4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.4" transform="rotate(120 12 12)" />
    </svg>
  );
}

export function IconLeaf({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M20 4C10 4 4 10 4 18v2h2c8 0 14-6 14-16z" />
      <path d="M8 20c2-4 5-7 10-10" />
    </svg>
  );
}

export function IconBookOpen({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 6c-2-1.5-5-2-8-1v13c3-1 6-.5 8 1 2-1.5 5-2 8-1V5c-3-1-6-.5-8 1z" />
      <path d="M12 6v13" />
    </svg>
  );
}

export function IconPen({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}

export function IconGlobe({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <path d="M12 3a14.5 14.5 0 0 1 3.8 9 14.5 14.5 0 0 1-3.8 9 14.5 14.5 0 0 1-3.8-9A14.5 14.5 0 0 1 12 3z" />
    </svg>
  );
}

export function IconColumns({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 9l9-5 9 5" />
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="5" y1="21" x2="5" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
      <line x1="15" y1="21" x2="15" y2="9" />
      <line x1="19" y1="21" x2="19" y2="9" />
      <line x1="3" y1="21" x2="21" y2="21" />
    </svg>
  );
}

export function IconCompass({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-2 6-6 2 2-6 6-2z" />
    </svg>
  );
}

export function IconMoon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function IconBarCoin({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="12" width="3.2" height="8" />
      <rect x="9" y="8" width="3.2" height="12" />
      <rect x="15" y="4" width="3.2" height="16" />
      <circle cx="19.3" cy="4.3" r="2" />
    </svg>
  );
}

export function IconGear({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <polygon points="20 12 16 18.93 8 18.93 4 12 8 5.07 16 5.07" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function IconCode({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

// ——— Concours ———

export function IconGraduationCap({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2 9l10-5 10 5-10 5-10-5z" />
      <path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
      <path d="M22 9v6" />
    </svg>
  );
}

export function IconStar({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function IconAward({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="8" r="6" />
      <path d="M9 13.5L7 22l5-3 5 3-2-8.5" />
    </svg>
  );
}

// ——— Statistiques ———

export function IconFileCheck({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-7-7z" />
      <path d="M13 2v7h7" />
      <path d="M9.5 14.5l2 2 4-4" />
    </svg>
  );
}

export function IconPencil({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}

export function IconUsers({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

// ——— UI ———

export function IconCheck({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </svg>
  );
}

export function IconChevronDown({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function IconDownload({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export const SUBJECT_ICONS: Record<string, (props: IconProps) => React.JSX.Element> = {
  math: IconMath,
  pc: IconAtom,
  svt: IconLeaf,
  fr: IconBookOpen,
  ar: IconPen,
  en: IconGlobe,
  philo: IconColumns,
  hg: IconCompass,
  islamic: IconMoon,
  eco: IconBarCoin,
  si: IconGear,
  info: IconCode,
};

export const CONCOURS_CATEGORY_ICONS: Record<
  string,
  (props: IconProps) => React.JSX.Element
> = {
  postbac: IconGraduationCap,
  prepa: IconStar,
  "grandes-ecoles": IconAward,
};
