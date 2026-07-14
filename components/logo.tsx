// Logo Qimma : un « Q » dont l'anneau contient un sommet de montagne (l'Atlas)
// sous un soleil levant — la promesse de la marque : atteindre son sommet.
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="qimma-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#134e4a" />
          <stop offset="1" stopColor="#0d9488" />
        </linearGradient>
        <clipPath id="qimma-ring">
          <circle cx="32" cy="30" r="17" />
        </clipPath>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#qimma-bg)" />
      <circle
        cx="32"
        cy="30"
        r="19"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4.5"
      />
      <line
        x1="45.5"
        y1="43.5"
        x2="53"
        y2="51"
        stroke="#ffffff"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <g clipPath="url(#qimma-ring)">
        <circle cx="40" cy="20.5" r="3.5" fill="#fbbf24" />
        <path d="M13 47 L26 26 L32 35 L38 28 L51 47 Z" fill="#ffffff" />
      </g>
    </svg>
  );
}
