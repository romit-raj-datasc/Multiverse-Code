import React from 'react';
import { GfgBennettMarvelLogo } from './GfgBennettMarvelLogo';
import { ShieldAlert, Github, Linkedin, Twitter, MessageSquare, Instagram, Heart } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  registeredCount: number;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, registeredCount }) => {
  return (
    <footer className="bg-[#05070f] border-t border-slate-900 text-slate-400 py-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <GfgBennettMarvelLogo size="md" />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The flagship Marvel-themed Multiverse Hackathon orchestrated by the GeeksForGeeks Student Chapter at Bennett University. Bringing together premier student innovators, algorithms wizards, and security operatives.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              Plot Nos 8, 11, TechZone 2, Greater Noida, Uttar Pradesh 201310
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="text-xs font-hud uppercase tracking-widest text-slate-300 font-bold mb-3">
              Navigation Portal
            </div>
            <div>
              <a href="#overview" className="hover:text-cyan-400 transition-colors">
                Event Overview
              </a>
            </div>
            <div>
              <a href="#tracks" className="hover:text-cyan-400 transition-colors">
                Multiverse Specializations
              </a>
            </div>
            <div>
              <a href="#timeline" className="hover:text-cyan-400 transition-colors">
                36-Hour Schedule
              </a>
            </div>
            <div>
              <a href="#prizes" className="hover:text-cyan-400 transition-colors">
                Infinity Gauntlet Bounties
              </a>
            </div>
            <div>
              <a href="#roles" className="hover:text-cyan-400 transition-colors">
                Superhero Archetypes
              </a>
            </div>
          </div>

          {/* Connect & Community */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-hud uppercase tracking-widest text-slate-300 font-bold">
              Multiverse Frequencies
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <a
                href="https://github.com/GFG-Student-Chapter-Bennett-University"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/school/bennett-university"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-white transition-colors"
                title="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-white transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            {/* Organizer Console Trigger */}
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition-colors text-xs font-semibold"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                <span>Command Dashboard</span>
                <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950 px-1 rounded tabular-nums">
                  {registeredCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Hairline & Legal */}
        <div className="pt-8 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 GeeksForGeeks Student Chapter, Bennett University. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Engineered with Stark precision for the Multiverse of Developers</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
