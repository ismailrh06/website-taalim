// Décors SVG maison de Qimma — motif géométrique inspiré du zellige marocain,
// scène de sommet (écho du logo) et en-tête de page réutilisable. Tout est
// vectoriel et inline : zéro image externe, rendu net et instantané même en 3G.

const STARS = [
  { left: "8%", top: "18%", size: 2, delay: "0s" },
  { left: "16%", top: "42%", size: 1.5, delay: "0.9s" },
  { left: "27%", top: "12%", size: 2.5, delay: "1.7s" },
  { left: "62%", top: "10%", size: 2, delay: "0.4s" },
  { left: "74%", top: "30%", size: 1.5, delay: "2.2s" },
  { left: "86%", top: "16%", size: 2, delay: "1.2s" },
  { left: "93%", top: "38%", size: 1.5, delay: "0.6s" },
  { left: "45%", top: "8%", size: 1.5, delay: "2.8s" },
];

/** Motif zellige (étoile à huit branches) en filigrane. */
export function ZelligePattern({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  return (
    <svg className={className} aria-hidden="true">
      <defs>
        <pattern
          id={id}
          width="64"
          height="64"
          patternUnits="userSpaceOnUse"
          patternTransform="translate(0 0)"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M32 6 L38.5 25.5 L58 32 L38.5 38.5 L32 58 L25.5 38.5 L6 32 L25.5 25.5 Z" />
            <circle cx="32" cy="32" r="5.5" />
            <path d="M0 32 H12 M52 32 H64 M32 0 V12 M32 52 V64" opacity="0.55" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** Chaîne de sommets en bas de section — écho direct du logo Q-sommet. */
export function SummitRidge({
  className = "",
  sun = true,
}: {
  className?: string;
  sun?: boolean;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 240"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polygon
        points="0,180 160,140 320,170 480,110 640,150 800,100 960,160 1120,120 1280,150 1440,130 1440,240 0,240"
        fill="#ffffff"
        fillOpacity="0.05"
      />
      <polygon
        points="0,220 140,190 260,150 400,60 520,140 680,90 760,160 900,120 1040,170 1200,130 1320,180 1440,150 1440,240 0,240"
        fill="#03211f"
        fillOpacity="0.85"
      />
      {sun && (
        <>
          <circle cx="400" cy="58" r="11" fill="#f59e0b" fillOpacity="0.16" />
          <circle cx="400" cy="58" r="4.5" fill="#fbbf24" />
        </>
      )}
    </svg>
  );
}

/**
 * Ciel animé du hero : halo, soleil flottant et étoiles scintillantes.
 * `pattern=false` retire le filigrane zellige — sur une photo, ce motif
 * géométrique entre en collision avec le détail de l'image et donne un
 * rendu de grille cassée plutôt qu'une texture discrète.
 */
export function HeroSky({ pattern = true }: { pattern?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Halo lumineux */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at top, rgba(45,212,191,0.4), transparent 60%)",
        }}
      />
      {/* Zellige en filigrane */}
      {pattern && (
        <ZelligePattern
          id="hero-zellige"
          className="absolute inset-0 h-full w-full text-brand-300/[0.06]"
        />
      )}
      {/* Soleil */}
      <div className="absolute end-[12%] top-[14%] animate-float-slow">
        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-accent-400/20 blur-2xl" />
          <div className="absolute -inset-3 rounded-full bg-accent-400/25 blur-md" />
          <div className="relative h-6 w-6 rounded-full bg-gradient-to-br from-accent-400 to-accent-500 shadow-lg shadow-accent-500/40" />
        </div>
      </div>
      {/* Étoiles */}
      {STARS.map((star, i) => (
        <span
          key={i}
          className="absolute animate-twinkle rounded-full bg-brand-200"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size * 2}px`,
            height: `${star.size * 2}px`,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
}

/** En-tête illustré des pages catalogue (cours, examens, concours…). */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  patternId,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  patternId: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800 text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at top, rgba(45,212,191,0.35), transparent 65%)",
          }}
        />
        <ZelligePattern
          id={patternId}
          className="absolute inset-0 h-full w-full text-brand-300/[0.07]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 sm:pb-24 sm:pt-16">
        {children}
        {eyebrow && (
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-400">
            {eyebrow}
          </p>
        )}
        <h1 className="text-balance mt-2 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-100/90 sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>

      <SummitRidge className="absolute inset-x-0 bottom-0 h-16 w-full sm:h-20" sun={false} />
    </section>
  );
}
