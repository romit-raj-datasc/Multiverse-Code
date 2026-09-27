import React, { useState } from 'react';
import { GfgBennettMarvelLogo } from './GfgBennettMarvelLogo';
import { ShieldAlert, Zap, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenAdmin: () => void;
  onOpenDownload: () => void;
  registeredCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRegister,
  onOpenAdmin,
  onOpenDownload,
  registeredCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#060913]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark / Logo */}
        <a href="#" className="flex items-center gap-2 group transition-opacity hover:opacity-95">
          <GfgBennettMarvelLogo size="md" />
        </a>

        {/* Zone 2: Clean 4-6 Nav Links (single-line, subtle hover underlines) */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide text-slate-300">
          <a
            href="#overview"
            className="hover:text-cyan-400 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[2px] after:bg-cyan-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Overview
          </a>
          <a
            href="#tracks"
            className="hover:text-cyan-400 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[2px] after:bg-cyan-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Multiverse Tracks
          </a>
          <a
            href="#timeline"
            className="hover:text-cyan-400 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[2px] after:bg-cyan-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Timeline
          </a>
          <a
            href="#prizes"
            className="hover:text-cyan-400 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[2px] after:bg-cyan-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Infinity Rewards
          </a>
          <a
            href="#roles"
            className="hover:text-cyan-400 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[2px] after:bg-cyan-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            Hero Archetypes
          </a>
          <a
            href="#faqs"
            className="hover:text-cyan-400 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[2px] after:bg-cyan-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
          >
            FAQs
          </a>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-2.5">
          {/* Download Project / GitHub package */}
          <button
            onClick={onOpenDownload}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:text-white bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-700/60 rounded-lg transition-colors whitespace-nowrap"
            title="Download Full Project ZIP & GitHub Repository Script"
          >
            <span>Project ZIP</span>
          </button>

          {/* Admin & Organizer Portal trigger */}
          <button
            onClick={onOpenAdmin}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
            title="Open Organizer Command Center"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
            <span>Admin Console</span>
            <span className="font-mono text-[10px] text-cyan-300 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800/60 tabular-nums">
              {registeredCount}
            </span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenRegister}
            className="relative group overflow-hidden px-5 py-2.5 rounded-lg font-marvel font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-200 whitespace-nowrap active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-1.5 font-extrabold">
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              Assemble Now
            </span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#070b16] px-4 py-5 space-y-3">
          <nav className="flex flex-col gap-2.5 text-sm font-medium text-slate-200">
            <a
              href="#overview"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-800/50 hover:text-cyan-400 transition-colors"
            >
              Overview
            </a>
            <a
              href="#tracks"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-800/50 hover:text-cyan-400 transition-colors"
            >
              Multiverse Tracks
            </a>
            <a
              href="#timeline"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-800/50 hover:text-cyan-400 transition-colors"
            >
              Timeline
            </a>
            <a
              href="#prizes"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-800/50 hover:text-cyan-400 transition-colors"
            >
              Infinity Rewards
            </a>
            <a
              href="#roles"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-800/50 hover:text-cyan-400 transition-colors"
            >
              Hero Archetypes
            </a>
            <a
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-800/50 hover:text-cyan-400 transition-colors"
            >
              FAQs
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDownload();
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-700/60 rounded-lg"
            >
              <span>Download Project ZIP & GitHub Package</span>
              <span>↓</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800/70 border border-slate-700 rounded-lg"
            >
              <span className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
                Admin Intelligence Console
              </span>
              <span className="font-mono text-cyan-300 text-xs tabular-nums">
                {registeredCount} Registered
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
