import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showText?: boolean;
  className?: string;
}

export const GfgBennettMarvelLogo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { box: 36, textClass: 'text-sm' },
    md: { box: 48, textClass: 'text-base' },
    lg: { box: 72, textClass: 'text-xl' },
    hero: { box: 110, textClass: 'text-3xl' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* HD Vector Avengers x GFG Bennett Emblem */}
      <div 
        className="relative flex items-center justify-center shrink-0 group cursor-pointer"
        style={{ width: currentSize.box, height: currentSize.box }}
      >
        {/* Arc Reactor Ambient Pulsing Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500/25 via-emerald-500/20 to-amber-500/15 blur-md group-hover:blur-lg transition-all duration-300 opacity-80" />

        {/* Outer Titanium Beveled Shield Frame */}
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-[0_4px_16px_rgba(6,182,212,0.3)] transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Metallic Titanium Gradient */}
            <linearGradient id="titaniumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Glowing GFG Green Gradient */}
            <linearGradient id="gfgGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            {/* Stark Arc Reactor Cyan Gradient */}
            <linearGradient id="arcCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a5f3fc" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            {/* Gold Gauntlet Accent */}
            <linearGradient id="goldGauntletGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            {/* Radial Core Glow */}
            <radialGradient id="coreArcGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="85%" stopColor="#0284c7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Outer Shield / Reactor Housing (Hexagonal Bevel) */}
          <polygon
            points="60,4 108,24 116,84 60,116 4,84 12,24"
            fill="url(#titaniumGrad)"
            stroke="#1e293b"
            strokeWidth="3"
          />

          {/* Inner Carbon Fiber Hexagon Border */}
          <polygon
            points="60,10 102,28 109,80 60,110 11,80 18,28"
            fill="#090d16"
            stroke="#0ea5e9"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />

          {/* Circular HUD Reactor Ring */}
          <circle
            cx="60"
            cy="60"
            r="40"
            stroke="url(#arcCyanGrad)"
            strokeWidth="1.2"
            strokeDasharray="4 3"
            strokeOpacity="0.7"
          />

          {/* GeeksForGeeks Code Bracket Left { */}
          <path
            d="M34,44 Q26,44 26,52 L26,56 Q26,60 21,60 Q26,60 26,64 L26,68 Q26,76 34,76"
            fill="none"
            stroke="url(#gfgGreenGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="filter drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]"
          />

          {/* GeeksForGeeks Code Bracket Right } */}
          <path
            d="M86,44 Q94,44 94,52 L94,56 Q94,60 99,60 Q94,60 94,64 L94,68 Q94,76 86,76"
            fill="none"
            stroke="url(#gfgGreenGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="filter drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]"
          />

          {/* Iconic Marvel Avengers Stylized "A" Monogram */}
          {/* Main Diagonal Left Stem */}
          <path
            d="M58,22 L37,86 L47,86 L53,68 L67,68 L58,22 Z"
            fill="#f1f5f9"
          />

          {/* Main Diagonal Right Stem */}
          <path
            d="M62,22 L83,86 L73,86 L67,68 L60,36 Z"
            fill="#cbd5e1"
          />

          {/* Avengers Signature Arrow Strike-Through Bar */}
          <path
            d="M26,64 L86,64 L92,57 L75,57 L72,50 L64,50 L61,57 L26,57 Z"
            fill="url(#arcCyanGrad)"
            className="filter drop-shadow-[0_0_8px_rgba(56,189,248,0.9)]"
          />

          {/* Central Glowing Arc Reactor Core */}
          <circle
            cx="60"
            cy="58"
            r="8"
            fill="url(#coreArcGlow)"
          />
          <circle
            cx="60"
            cy="58"
            r="3"
            fill="#ffffff"
          />

          {/* Bennett University Tech Chevron Base Accents */}
          <path
            d="M48,96 L60,104 L72,96"
            fill="none"
            stroke="url(#goldGauntletGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Typography Lockup */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-marvel font-bold tracking-wider uppercase text-slate-100 leading-none">
            <span className={`${currentSize.textClass} text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-300 font-extrabold`}>
              GFG
            </span>
            <span className="text-amber-400 font-light text-xs">✕</span>
            <span className={`${currentSize.textClass} tracking-widest text-slate-100 font-extrabold`}>
              BENNETT
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] tracking-widest uppercase text-cyan-400/80 font-hud mt-1 font-semibold">
            <span>Student Chapter</span>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400">Multiverse Hub</span>
          </div>
        </div>
      )}
    </div>
  );
};
