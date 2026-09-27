import React, { useState } from 'react';
import { MarvelArchetype } from '../types';
import { 
  Sparkles, 
  Shield, 
  Cpu, 
  Lock, 
  Zap, 
  Activity, 
  Check, 
  ArrowRight,
  UserCheck
} from 'lucide-react';

interface HeroRoleSelectorProps {
  onSelectRole: (role: MarvelArchetype) => void;
}

export const HeroRoleSelector: React.FC<HeroRoleSelectorProps> = ({
  onSelectRole,
}) => {
  const [selectedRole, setSelectedRole] = useState<MarvelArchetype>('iron-man');

  const roles: Array<{
    id: MarvelArchetype;
    name: string;
    alias: string;
    specialty: string;
    description: string;
    signatureWeapon: string;
    icon: React.ReactNode;
    color: string;
    borderColor: string;
  }> = [
    {
      id: 'iron-man',
      name: 'Iron Man',
      alias: 'Full-Stack System Architect',
      specialty: 'Next.js, Distributed Backends, Holographic UI',
      description: 'You forge intricate systems from pure silicon and imagination. When bugs arise, you build an automated suit to squash them.',
      signatureWeapon: 'Mark 85 Nano-Tech Codebase & Jarvis Copilot',
      icon: <Cpu className="w-5 h-5 text-red-400" />,
      color: 'from-red-500/20 to-amber-500/10',
      borderColor: 'border-red-500/60',
    },
    {
      id: 'captain-america',
      name: 'Captain America',
      alias: 'Squad Leader & System Strategist',
      specialty: 'System Design, Team Coordination, Git Discipline',
      description: 'You keep the team united through 36 continuous hours of hacking. You can do this all day, maintaining clean commits and steady morale.',
      signatureWeapon: 'Vibranium Shield Defense & Agile Battle Commands',
      icon: <Shield className="w-5 h-5 text-sky-400" />,
      color: 'from-blue-500/20 to-sky-500/10',
      borderColor: 'border-sky-500/60',
    },
    {
      id: 'doctor-strange',
      name: 'Doctor Strange',
      alias: 'AI & Quantum Sorcerer',
      specialty: 'LLMs, Neural Embeddings, Multimodal Agents',
      description: 'You look into 14,000,605 possible algorithmic futures and choose the single one where the demo succeeds flawlessly.',
      signatureWeapon: 'Eye of Agamotto Vector Database & Gemini API',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      color: 'from-amber-500/20 to-orange-500/10',
      borderColor: 'border-amber-500/60',
    },
    {
      id: 'black-widow',
      name: 'Black Widow',
      alias: 'Cybersecurity & Stealth Operative',
      specialty: 'Zero-Day Exploits, Reverse Engineering, Cryptography',
      description: 'Silent and lethal. You sniff out API leakages, bypass strict firewalls, and fortify backdoors before anyone even realizes.',
      signatureWeapon: 'Red Room Pentesting Suite & Zero-Trust Shields',
      icon: <Lock className="w-5 h-5 text-rose-400" />,
      color: 'from-rose-500/20 to-red-500/10',
      borderColor: 'border-rose-500/60',
    },
    {
      id: 'thor',
      name: 'Thor',
      alias: 'Cloud & DevOps God of Thunder',
      specialty: 'Kubernetes, Serverless Scaling, CI/CD Lightning',
      description: 'When traffic spikes like Ragnarok, you call upon the lightning of containerized clusters and strike down latency in milliseconds.',
      signatureWeapon: 'Mjölnir CI/CD Pipeline & Stormbreaker Load Balancer',
      icon: <Zap className="w-5 h-5 text-cyan-400" />,
      color: 'from-cyan-500/20 to-blue-500/10',
      borderColor: 'border-cyan-500/60',
    },
    {
      id: 'hulk',
      name: 'The Incredible Hulk',
      alias: 'High-Performance & Algorithmic Force',
      specialty: 'C++, SIMD, GPU Acceleration, Brute-Force Math',
      description: 'HULK SMASH COMPLEXITY! You obliterate algorithmic bottlenecks with raw low-level memory efficiency and sheer computing power.',
      signatureWeapon: 'Gamma Ray SIMD Optimization & Parallel Threads',
      icon: <Activity className="w-5 h-5 text-emerald-400" />,
      color: 'from-emerald-500/20 to-teal-500/10',
      borderColor: 'border-emerald-500/60',
    },
  ];

  const currentRole = roles.find((r) => r.id === selectedRole)!;

  return (
    <section id="roles" className="py-24 bg-[#060913] border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-cyan-400 font-hud font-bold mb-2">
            Superhuman Division
          </div>
          <h2 className="font-marvel text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Identify Your Hero Archetype
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            Every hacker in the Multiverse possesses unique superpowers. Select your persona to customize your digital badge and assemble the balanced strike team.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {roles.map((role) => {
            const isSelected = role.id === selectedRole;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-3.5 rounded-xl border transition-all text-left flex flex-col justify-between ${
                  isSelected
                    ? `bg-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]`
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      {role.icon}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center text-slate-950">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div className="font-marvel font-bold text-sm text-white">{role.name}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{role.alias}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Hero Dossier Card Preview */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#0b1020] to-[#080d1a] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Top Holographic Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                {currentRole.icon}
              </span>
              <div>
                <div className="text-xs uppercase font-hud tracking-wider text-cyan-400 font-bold">
                  S.H.I.E.L.D. Multiverse Dossier
                </div>
                <h3 className="font-marvel font-black text-2xl sm:text-3xl text-white">
                  {currentRole.name} — {currentRole.alias}
                </h3>
              </div>
            </div>

            <button
              onClick={() => onSelectRole(currentRole.id)}
              className="px-5 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-marvel font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all"
            >
              <UserCheck className="w-4 h-4" />
              <span>Lock Persona & Register</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <div className="text-xs font-hud uppercase tracking-wider text-slate-400 font-bold mb-2">
                Mission Description
              </div>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                {currentRole.description}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-xs font-hud uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Primary Tech Specialization
                </div>
                <div className="text-xs font-mono text-cyan-300 bg-slate-900/90 px-3 py-2 rounded-lg border border-slate-800">
                  {currentRole.specialty}
                </div>
              </div>

              <div>
                <div className="text-xs font-hud uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Signature Armory Artifact
                </div>
                <div className="text-xs font-mono text-amber-300 bg-slate-900/90 px-3 py-2 rounded-lg border border-slate-800">
                  {currentRole.signatureWeapon}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
