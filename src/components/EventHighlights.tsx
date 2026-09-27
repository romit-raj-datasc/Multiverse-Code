import React, { useState } from 'react';
import { 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Terminal, 
  Award, 
  Calendar, 
  ChevronRight,
  Gift
} from 'lucide-react';
import { TrackType } from '../types';

interface EventHighlightsProps {
  onSelectTrackForRegistration: (track: TrackType) => void;
}

export const EventHighlights: React.FC<EventHighlightsProps> = ({
  onSelectTrackForRegistration,
}) => {
  const [activeTrack, setActiveTrack] = useState<TrackType>('quantum-ai');

  const tracks: Array<{
    id: TrackType;
    hero: string;
    title: string;
    color: string;
    borderGlow: string;
    icon: React.ReactNode;
    description: string;
    challenges: string[];
    techStack: string[];
  }> = [
    {
      id: 'quantum-ai',
      hero: 'Doctor Strange Dimension',
      title: 'Quantum AI & Autonomous Agents',
      color: 'from-amber-400 to-orange-500',
      borderGlow: 'hover:border-amber-500/60',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      description: 'Harness multimodal machine intelligence and agentic workflows to solve real-world crises, automate complex cognitive tasks, and simulate multiverse realities.',
      challenges: [
        'Autonomous Multi-Agent Crisis Negotiator',
        'Real-time Multimodal Health Diagnostic Assistant',
        'Multiverse Code Synthesis & Automated Bug Hunter',
      ],
      techStack: ['Gemini 2.5 Flash / Pro', 'LangChain', 'Python / PyTorch', 'FastAPI'],
    },
    {
      id: 'stark-cloud',
      hero: 'Stark Industries Lab',
      title: 'Cloud Systems & Scalable Web3',
      color: 'from-cyan-400 to-sky-500',
      borderGlow: 'hover:border-cyan-500/60',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      description: 'Engineer high-throughput distributed systems, zero-latency cloud microservices, and decentralized verifiable protocols with the precision of Tony Stark.',
      challenges: [
        'Jarvis Real-Time Telemetry & Fleet Orchestration',
        'Decentralized Vibranium Ledger for Secure Supply Chains',
        'Sub-millisecond Serverless Stream Processing Engine',
      ],
      techStack: ['Kubernetes / Docker', 'Go / Rust', 'Next.js', 'Distributed Key-Value DBs'],
    },
    {
      id: 'wakanda-cyber',
      hero: 'Wakanda Design Group',
      title: 'Cyber Warfare & Zero-Trust Defense',
      color: 'from-purple-400 to-indigo-500',
      borderGlow: 'hover:border-purple-500/60',
      icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
      description: 'Build impenetrable defensive perimeters, post-quantum cryptographic vaults, automated intrusion detection, and exploit neutralizers for modern infrastructure.',
      challenges: [
        'Zero-Day Vulnerability Auto-Patching Shield',
        'Post-Quantum Lattice-Based Encryption Tunnel',
        'Deepfake & Malicious Vector Neutralization Engine',
      ],
      techStack: ['eBPF', 'Rust', 'WireGuard', 'Cyber Threat Intelligence APIs'],
    },
    {
      id: 'shield-algorithms',
      hero: 'S.H.I.E.L.D. Command',
      title: 'Algorithmic Warfare & Core Systems',
      color: 'from-emerald-400 to-teal-500',
      borderGlow: 'hover:border-emerald-500/60',
      icon: <Terminal className="w-5 h-5 text-emerald-400" />,
      description: 'Push algorithm complexity to the limit. High-frequency compute optimization, spatial graph routing, memory compaction, and autonomous embedded robotics.',
      challenges: [
        'Sub-linear Spatial Routing for Autonomous Drones',
        'High-Frequency Distributed Consensus Engine',
        'Zero-Memory Allocation High Performance Data Structures',
      ],
      techStack: ['C++23', 'Rust', 'SIMD Assembly', 'Graph Neural Networks'],
    },
  ];

  const currentTrackData = tracks.find((t) => t.id === activeTrack)!;

  const milestones = [
    {
      step: '00',
      phase: 'Problem Statements Release',
      time: 'T-Minus 2 Days · Decryption',
      desc: 'Problem statements uploaded 2 days prior to Round 1 Evaluation, giving strike teams a 48-hour window to explore problem domains, formulate architectures, and set up Git repos.',
    },
    {
      step: '01',
      phase: 'Day 1: Kickoff & Round 1 Evaluation',
      time: 'Day 1 · Starts at 10:00 AM IST',
      desc: 'Event officially commences at 10:00 AM. Hackers assemble on campus. Initial code sprint begins followed by Round 1 architectural feasibility and tech stack evaluation by mentors.',
    },
    {
      step: '02',
      phase: 'Day 2: Prototype Evaluation & Pitching',
      time: 'Day 2 · Professional Testing & Pitch',
      desc: 'Final pitching day. Professional evaluators from industry examine and test your working prototype, verify codebase integrity, and evaluate technical innovation.',
    },
    {
      step: '03',
      phase: 'Day 3: Grand Finale & Prize Distribution',
      time: 'Day 3 · Infinity Ceremony',
      desc: 'The grand Multiverse finale at Bennett University. Top squads showcased, presentation of the ₹1,50,000+ Infinity bounty pool, certificates, and GFG Chapter honors.',
    },
  ];

  return (
    <section id="tracks" className="relative py-24 bg-[#070b16] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-cyan-400 font-hud font-bold mb-2">
            Multiverse Specializations
          </div>
          <h2 className="font-marvel text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Choose Your Battleground
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            Four specialized technical tracks inspired by the Marvel Cinematic Universe. Compete in the domain where your skills shine brightest.
          </p>
        </div>

        {/* Tracks Interactive Bento Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-20">
          
          {/* Left Column: Track Navigation List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {tracks.map((track) => {
              const isSelected = track.id === activeTrack;
              return (
                <button
                  key={track.id}
                  onClick={() => setActiveTrack(track.id)}
                  className={`text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 flex items-start gap-4 ${
                    isSelected
                      ? 'bg-slate-900/90 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                      : 'bg-slate-950/60 border-slate-800/90 hover:bg-slate-900/50 hover:border-slate-700'
                  }`}
                >
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                    {track.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-hud uppercase tracking-wider text-slate-400">
                      {track.hero}
                    </div>
                    <div className="font-marvel font-bold text-base sm:text-lg text-white truncate">
                      {track.title}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {track.description}
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 mt-2 transition-transform shrink-0 ${
                      isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Track Deep Dive & Visual Blueprint */}
          <div className="lg:col-span-7 bg-[#0b1020] border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Background Holographic Track Graphic */}
            <div className="absolute right-0 bottom-0 w-1/2 h-1/2 opacity-20 pointer-events-none">
              <img
                src="/src/assets/images/multiverse_hack_tracks_1790539283871.jpg"
                alt="Multiverse Track Hologram"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-tl-full mix-blend-screen"
              />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                  {currentTrackData.icon}
                </span>
                <div>
                  <span className="text-xs font-hud uppercase tracking-wider text-cyan-400 font-bold">
                    {currentTrackData.hero}
                  </span>
                  <h3 className="font-marvel font-black text-2xl text-white">
                    {currentTrackData.title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {currentTrackData.description}
              </p>

              {/* Sample Mission Directives */}
              <div className="mb-6">
                <div className="text-xs font-hud uppercase tracking-wider text-slate-400 font-bold mb-3">
                  Sample Mission Directives:
                </div>
                <div className="space-y-2">
                  {currentTrackData.challenges.map((challenge, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-xs text-slate-200 bg-slate-900/80 px-3.5 py-2.5 rounded-lg border border-slate-800/80"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Armory / Tech Stack */}
              <div>
                <div className="text-xs font-hud uppercase tracking-wider text-slate-400 font-bold mb-2">
                  Recommended Tech Armory:
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-cyan-300">
                  {currentTrackData.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Track CTA */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between gap-4 relative z-10">
              <div className="text-xs text-slate-400">
                Ready to enlist under {currentTrackData.hero}?
              </div>
              <button
                onClick={() => onSelectTrackForRegistration(currentTrackData.id)}
                className="px-4 py-2.5 rounded-lg font-marvel font-bold text-xs uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)] flex items-center gap-1.5"
              >
                <span>Select Track</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div id="timeline" className="mb-24 pt-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-widest text-cyan-400 font-hud font-bold mb-2">
              Mission Timeline
            </div>
            <h2 className="font-marvel text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              36-Hour Hack Schedule
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/90 relative group hover:border-cyan-500/50 transition-colors"
              >
                <div className="font-marvel font-black text-3xl text-cyan-400/40 group-hover:text-cyan-400 transition-colors mb-3">
                  {m.step}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-hud font-semibold mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{m.time}</span>
                </div>
                <h3 className="font-bold text-base text-white mb-2">{m.phase}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Infinity Rewards / Prizes Section */}
        <div id="prizes" className="pt-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-widest text-amber-400 font-hud font-bold mb-2">
              Bounty Allocation
            </div>
            <h2 className="font-marvel text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              The Infinity Gauntlet Prizes
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Total bounty worth over ₹1,50,000 in cash prizes, cloud credits, and Marvel merchandise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* 2nd Place */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-700/80 flex flex-col justify-between order-2 md:order-1">
              <div>
                <div className="text-xs font-hud uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Silver Vibranium Shield
                </div>
                <h3 className="font-marvel text-2xl font-bold text-slate-200">1st Runner Up</h3>
                <div className="font-marvel font-black text-3xl text-cyan-400 my-4 tabular-nums">
                  ₹45,000
                </div>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Cash Bounty + GFG Official Merch Pack</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Direct Fast-Track Interview Mentorship</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Certificate of Multiverse Distinction</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 1st Place (Gauntlet Crown) */}
            <div className="p-7 rounded-2xl bg-gradient-to-b from-[#131b2e] to-[#0c1220] border-2 border-amber-500/80 shadow-[0_0_35px_rgba(245,158,11,0.25)] flex flex-col justify-between order-1 md:order-2 transform md:-translate-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-hud uppercase tracking-wider text-amber-400 font-bold">
                    Infinity Gauntlet Champion
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Grand Winner
                  </span>
                </div>
                <h3 className="font-marvel text-3xl font-black text-white">Grand Multiverse Champion</h3>
                <div className="font-marvel font-black text-5xl text-amber-400 my-4 tabular-nums">
                  ₹75,000
                </div>
                <ul className="text-xs text-slate-200 space-y-2.5">
                  <li className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Cash Prize + Physical Metal Infinity Gauntlet Trophy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Stark Industries Cloud & GPU Compute Credits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Exclusive GeeksForGeeks Bennett Chapter Honor Hall</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Internship Referral Access with Partner Tech Firms</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-700/80 flex flex-col justify-between order-3">
              <div>
                <div className="text-xs font-hud uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Bronze Arc Reactor
                </div>
                <h3 className="font-marvel text-2xl font-bold text-slate-200">2nd Runner Up</h3>
                <div className="font-marvel font-black text-3xl text-emerald-400 my-4 tabular-nums">
                  ₹25,000
                </div>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Cash Bounty + GFG Swag Bag</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Cloud Development Credits & Domain Vouchers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Certificate of Multiverse Distinction</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Special Category Awards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
              <Gift className="w-5 h-5 text-purple-400 shrink-0" />
              <div>
                <div className="font-semibold text-xs text-white">Best Freshman Avengers Team</div>
                <div className="text-[11px] text-slate-400">₹10,000 Special Grant</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
              <Gift className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <div className="font-semibold text-xs text-white">Wakanda Best Security Exploit</div>
                <div className="text-[11px] text-slate-400">₹10,000 Bounty + Pentest Vouchers</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
              <Gift className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="font-semibold text-xs text-white">All Registered Participants</div>
                <div className="text-[11px] text-slate-400">GFG Multiverse Swag + Verified Certificate</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
