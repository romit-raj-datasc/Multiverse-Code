import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  MapPin, 
  Share2, 
  Twitter, 
  Linkedin, 
  MessageCircle, 
  Send, 
  Check, 
  Copy, 
  Flame, 
  Trophy, 
  Clock, 
  Users 
} from 'lucide-react';
import { GfgBennettMarvelLogo } from './GfgBennettMarvelLogo';

interface HeroSectionProps {
  onOpenRegister: () => void;
  onExploreTracks: () => void;
  registeredCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenRegister,
  onExploreTracks,
  registeredCount,
}) => {
  // Target Event Assembly Date: November 14, 2026 09:00:00 AM IST
  const targetDate = new Date('2026-11-14T09:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [copiedLink, setCopiedLink] = useState(false);
  const [socialModalOpen, setSocialModalOpen] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const shareText = encodeURIComponent(
    '⚡ Avengers Assemble! Join me at INFINITY PROTOCOL: Hackathon 2026 by GFG Student Chapter, Bennett University! Register your squad: '
  );
  const currentUrl = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://bennett.edu.in');

  return (
    <section id="overview" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-slate-800/80 bg-[#060913]">
      {/* Background Cinematic Visual Asset */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/marvel_event_hero_cinematic_1790539271820.jpg"
          alt="Cinematic Avengers Multiverse Hackathon Arena Stark Labs"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-screen scale-105 filter brightness-75 contrast-125"
        />
        {/* Measured Scrims & Radial Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060913] via-[#060913]/60 to-[#060913]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      </div>

      {/* Atmospheric Multiverse Light Rings */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[380px] h-[380px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col items-center text-center">
        
        {/* Hero HD Logo & Chapter Badge (Quiet clean unboxed layout) */}
        <div className="mb-6 flex flex-col items-center">
          <GfgBennettMarvelLogo size="hero" showText={false} className="mb-4" />
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-hud font-bold">
            <span className="text-emerald-400">GeeksForGeeks Student Chapter</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">Bennett University, Greater Noida</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-amber-400 flex items-center gap-1 font-semibold">
              <Flame className="w-3 h-3 text-amber-400" />
              Annual Flagship
            </span>
          </div>
        </div>

        {/* Cinematic Marvel Title */}
        <h1 className="font-marvel text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase max-w-5xl leading-[1.05] drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
          Infinity Protocol: <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 text-glow-cyan">
            Multiverse Code
          </span>
        </h1>

        {/* Concrete Proposition */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl leading-relaxed text-balance">
          When the digital multiverse fractures, the greatest student developers, security operatives, and AI architects must assemble. A high-octane 36-hour hackathon where code bends reality.
        </p>

        {/* Live Countdown Timer HUD */}
        <div className="mt-10 w-full max-w-3xl">
          <div className="p-1 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-slate-700/50 to-emerald-500/30 backdrop-blur-md">
            <div className="bg-[#090e1a]/95 rounded-xl px-4 py-5 sm:py-6 border border-slate-800">
              <div className="text-xs uppercase tracking-widest text-slate-400 font-hud font-bold mb-4 flex items-center justify-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Multiverse Launch Countdown — Assembly Date: Nov 14, 2026</span>
              </div>

              {/* Countdown Digits Grid */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                <div className="flex flex-col items-center bg-slate-900/80 p-2 sm:p-3 rounded-lg border border-slate-800/80">
                  <span className="font-marvel font-black text-2xl sm:text-4xl text-cyan-400 tabular-nums">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 mt-1 font-hud">
                    Days
                  </span>
                </div>

                <div className="flex flex-col items-center bg-slate-900/80 p-2 sm:p-3 rounded-lg border border-slate-800/80">
                  <span className="font-marvel font-black text-2xl sm:text-4xl text-sky-300 tabular-nums">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 mt-1 font-hud">
                    Hours
                  </span>
                </div>

                <div className="flex flex-col items-center bg-slate-900/80 p-2 sm:p-3 rounded-lg border border-slate-800/80">
                  <span className="font-marvel font-black text-2xl sm:text-4xl text-emerald-400 tabular-nums">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 mt-1 font-hud">
                    Minutes
                  </span>
                </div>

                <div className="flex flex-col items-center bg-slate-900/80 p-2 sm:p-3 rounded-lg border border-slate-800/80">
                  <span className="font-marvel font-black text-2xl sm:text-4xl text-amber-400 tabular-nums">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 mt-1 font-hud">
                    Seconds
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary CTAs & Social Share Zone */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenRegister}
            className="px-8 py-3.5 rounded-xl font-marvel font-black text-sm uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Assemble Your Strike Team</span>
          </button>

          <button
            onClick={onExploreTracks}
            className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/60 transition-all duration-200 flex items-center gap-2"
          >
            <span>Explore Multiverse Tracks</span>
          </button>

          <button
            onClick={() => setSocialModalOpen(true)}
            className="px-4 py-3.5 rounded-xl font-semibold text-sm text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-all duration-200 flex items-center gap-2"
            title="Share Hackathon with Squad"
          >
            <Share2 className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

        {/* Quantified Rigor Proof Metrics (Adjacent to Hero) */}
        <div className="mt-14 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
            <Trophy className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-marvel font-bold text-lg text-white tabular-nums">₹1,50,000+</div>
              <div className="text-xs text-slate-400">Total Bounty Pool</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
            <Clock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-marvel font-bold text-lg text-white tabular-nums">36 Hours</div>
              <div className="text-xs text-slate-400">Intense Non-Stop Hack</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
            <Users className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-marvel font-bold text-lg text-white tabular-nums">{registeredCount}+ Hackers</div>
              <div className="text-xs text-slate-400">Already Assembled</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-marvel font-bold text-lg text-white">Bennett Campus</div>
              <div className="text-xs text-slate-400">Greater Noida + Hybrid</div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Sharing Popup Modal */}
      {socialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0b101e] border border-cyan-500/40 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-cyan-400" />
                <h3 className="font-marvel font-bold text-lg text-white">Assemble Your Squad</h3>
              </div>
              <button
                onClick={() => setSocialModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 text-sm font-mono"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-6">
              Transmit the coordinate beacon to your fellow operatives on WhatsApp, Twitter/X, LinkedIn, or copy the direct Multiverse portal link.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <a
                href={`https://api.whatsapp.com/send?text=${shareText}${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-lg bg-emerald-950/40 border border-emerald-700/50 hover:bg-emerald-900/40 text-emerald-300 text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-lg bg-sky-950/40 border border-sky-700/50 hover:bg-sky-900/40 text-sky-300 text-xs font-semibold transition-colors"
              >
                <Twitter className="w-4 h-4" />
                <span>Twitter / X</span>
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-lg bg-blue-950/40 border border-blue-700/50 hover:bg-blue-900/40 text-blue-300 text-xs font-semibold transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`https://t.me/share/url?url=${currentUrl}&text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-lg bg-cyan-950/40 border border-cyan-700/50 hover:bg-cyan-900/40 text-cyan-300 text-xs font-semibold transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Telegram</span>
              </a>
            </div>

            <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg border border-slate-800">
              <input
                type="text"
                readOnly
                value={typeof window !== 'undefined' ? window.location.href : 'https://bennett.edu.in'}
                className="bg-transparent text-xs text-slate-300 font-mono flex-1 outline-none px-2 truncate"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-md bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
