import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Zap, 
  Check, 
  Mail, 
  User, 
  Building, 
  BookOpen, 
  Shield, 
  Users, 
  Github, 
  Linkedin, 
  Sparkles, 
  Download, 
  Eye, 
  QrCode,
  Ticket
} from 'lucide-react';
import { Attendee, MarvelArchetype, SentEmail, TrackType } from '../types';
import { dbService, TRACK_NAMES } from '../services/storage';
import { AccessPassQRCode } from './AccessPassQRCode';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: MarvelArchetype;
  defaultTrack?: TrackType;
  onSuccess: (attendee: Attendee, email: SentEmail) => void;
  onViewEmail: (email: SentEmail) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'iron-man',
  defaultTrack = 'quantum-ai',
  onSuccess,
  onViewEmail,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    rollNumber: '',
    college: 'Bennett University, Greater Noida',
    branch: 'Computer Science & Engineering',
    year: '2nd Year',
    marvelArchetype: defaultRole,
    teamType: 'team' as 'solo' | 'team',
    teamName: '',
    track: defaultTrack,
    githubUrl: '',
    linkedinUrl: '',
    newsletterOptIn: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdPass, setCreatedPass] = useState<{ attendee: Attendee; email: SentEmail } | null>(null);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Agent name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Secure email frequency is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid student email address';
    }
    if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Student roll number or college ID required';
    if (!formData.college.trim()) newErrors.college = 'College/University name required';
    if (formData.teamType === 'team' && !formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required for squad registration';
    }

    // GitHub & LinkedIn are strictly mandatory
    if (!formData.githubUrl.trim()) {
      newErrors.githubUrl = 'GitHub profile link is mandatory for verification';
    } else if (!/^https?:\/\/(www\.)?github\.com\/.+/i.test(formData.githubUrl.trim())) {
      newErrors.githubUrl = 'Enter a valid GitHub URL (e.g. https://github.com/username)';
    }

    if (!formData.linkedinUrl.trim()) {
      newErrors.linkedinUrl = 'LinkedIn profile link is mandatory for verification';
    } else if (!/^https?:\/\/(www\.)?linkedin\.com\/.+/i.test(formData.linkedinUrl.trim())) {
      newErrors.linkedinUrl = 'Enter a valid LinkedIn URL (e.g. https://linkedin.com/in/username)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const result = dbService.addAttendee({
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        rollNumber: formData.rollNumber.trim().toUpperCase(),
        college: formData.college.trim(),
        branch: formData.branch,
        year: formData.year,
        marvelArchetype: formData.marvelArchetype,
        teamType: formData.teamType,
        teamName: formData.teamType === 'team' ? formData.teamName.trim() : undefined,
        track: formData.track,
        githubUrl: formData.githubUrl.trim(),
        linkedinUrl: formData.linkedinUrl.trim(),
        newsletterOptIn: formData.newsletterOptIn,
      });

      setCreatedPass(result);
      onSuccess(result.attendee, result.email);

      // Trigger Marvel fireworks confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22d3ee', '#10b981', '#f59e0b', '#ef4444'],
      });
    } catch (err) {
      console.error('Registration failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrintTicket = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#090e1a] border border-cyan-500/40 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-[0_0_50px_rgba(6,182,212,0.25)] relative text-left">
        
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 bg-[#090e1a]/95 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-700/60 text-cyan-400">
              <Zap className="w-4 h-4 fill-cyan-400" />
            </span>
            <div>
              <div className="text-[10px] font-hud uppercase tracking-widest text-cyan-400 font-bold">
                GeeksForGeeks Bennett Chapter
              </div>
              <h3 className="font-marvel font-bold text-lg text-white">
                {createdPass ? 'Access Pass Confirmed' : 'Multiverse Operative Registration'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Form OR Success Ticket */}
        <div className="p-6">
          {createdPass ? (
            /* Digital Marvel Ticket & Automated Email Notification with Real Working QR */
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-marvel font-black text-2xl text-white">
                  Welcome to the Multiverse, {createdPass.attendee.fullName}!
                </h4>
                <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                  Your operative registration is locked and saved in real time. An automated dispatch was sent to <span className="text-cyan-300 font-mono font-semibold">{createdPass.attendee.email}</span>.
                </p>
              </div>

              {/* Digital Pass Hologram Card with Working QR */}
              <div className="bg-gradient-to-r from-[#0c1424] to-[#0b101c] border-2 border-cyan-400/60 rounded-xl p-5 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div>
                    <div className="font-marvel font-bold text-xs text-cyan-400">
                      GFG BENNETT INFINITY PASS
                    </div>
                    <div className="font-mono text-sm font-bold text-white">
                      {createdPass.attendee.ticketId}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-hud uppercase">Pass Status</div>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/80">
                      VERIFIED ACCESS
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center mb-4">
                  {/* Left: Attendee Details */}
                  <div className="md:col-span-7 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400">Hacker Name</div>
                      <div className="font-semibold text-white truncate">{createdPass.attendee.fullName}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Roll / ID</div>
                      <div className="font-mono text-cyan-300 truncate">{createdPass.attendee.rollNumber}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Branch & Year</div>
                      <div className="font-semibold text-white truncate">{createdPass.attendee.branch} · {createdPass.attendee.year}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Institution</div>
                      <div className="font-semibold text-white truncate">{createdPass.attendee.college}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Track</div>
                      <div className="font-semibold text-amber-300 truncate">
                        {TRACK_NAMES[createdPass.attendee.track].split(':')[0]}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Squad Mode</div>
                      <div className="font-semibold text-white truncate">
                        {createdPass.attendee.teamType === 'team'
                          ? `Team: ${createdPass.attendee.teamName}`
                          : 'Solo Operative'}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-[10px] text-slate-400">Verified Profiles</div>
                      <div className="font-mono text-[11px] text-slate-300 flex items-center gap-3 mt-0.5">
                        <a href={createdPass.attendee.githubUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1">
                          <Github className="w-3 h-3" /> GitHub
                        </a>
                        <span className="text-slate-600">·</span>
                        <a href={createdPass.attendee.linkedinUrl} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline flex items-center gap-1">
                          <Linkedin className="w-3 h-3" /> LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right: Working Real-Time QR Code */}
                  <div className="md:col-span-5 flex justify-center">
                    <AccessPassQRCode
                      attendee={createdPass.attendee}
                      size={135}
                      showDownloadButton={true}
                    />
                  </div>
                </div>

                {/* Barcode Accent */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-4">
                  <div className="text-[9px] font-mono text-slate-400">
                    REAL-TIME MULTIVERSE SCANNER READY · BENNETT CAMPUS ENTRY PASS
                  </div>
                  <div className="h-4 w-28 bg-slate-800 rounded opacity-60 flex items-center justify-around px-1 font-mono text-[8px] text-slate-400">
                    |||||||||||||||||
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => onViewEmail(createdPass.email)}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview Automated Confirmation Email</span>
                </button>

                <button
                  onClick={handlePrintTicket}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-marvel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Print Full Pass</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={onClose}
                  className="text-xs text-slate-400 hover:text-white underline underline-offset-4"
                >
                  Back to Multiverse Portal
                </button>
              </div>
            </div>
          ) : (
            /* Operative Registration Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Operative Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Tony Stark / Priya Roy"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>
                  {errors.fullName && <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Student Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="student@bennett.edu.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Roll Number & College */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Roll Number / Student ID *
                  </label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. E24CSEU0921"
                      value={formData.rollNumber}
                      onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 uppercase font-mono"
                    />
                  </div>
                  {errors.rollNumber && <p className="text-[11px] text-rose-400 mt-1">{errors.rollNumber}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    University / College *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Bennett University, Greater Noida"
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>
                  {errors.college && <p className="text-[11px] text-rose-400 mt-1">{errors.college}</p>}
                </div>
              </div>

              {/* Branch (including B.Com) & Year (1st, 2nd, 3rd, 4th Year without titles) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Branch / Specialization *
                  </label>
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Computer Science & Engineering">CSE (Core)</option>
                    <option value="CSE (Artificial Intelligence)">CSE (Artificial Intelligence)</option>
                    <option value="CSE (Cyber Security)">CSE (Cyber Security)</option>
                    <option value="CSE (Data Science)">CSE (Data Science)</option>
                    <option value="B.Com">B.Com</option>
                    <option value="Electronics & Communication">ECE</option>
                    <option value="Biotechnology / Other">Biotechnology / Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Year of Study *
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>

              {/* Squad Setup: Solo or Team */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Assembly Formation
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, teamType: 'team' })}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                      formData.teamType === 'team'
                        ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Strike Team (2-4 Members)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, teamType: 'solo' })}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                      formData.teamType === 'solo'
                        ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Solo Operative</span>
                  </button>
                </div>
              </div>

              {/* Team Name if Team */}
              {formData.teamType === 'team' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Squad / Team Codename *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jarvis Protocol / Wakanda Vanguard"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  {errors.teamName && <p className="text-[11px] text-rose-400 mt-1">{errors.teamName}</p>}
                </div>
              )}

              {/* Track Selection & Hero Archetype */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Battleground Track
                  </label>
                  <select
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value as TrackType })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="quantum-ai">Doctor Strange: Quantum AI</option>
                    <option value="stark-cloud">Stark Industries: Cloud Systems</option>
                    <option value="wakanda-cyber">Wakanda: Cyber Warfare</option>
                    <option value="shield-algorithms">S.H.I.E.L.D.: Core Algorithms</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Hero Persona Archetype
                  </label>
                  <select
                    value={formData.marvelArchetype}
                    onChange={(e) =>
                      setFormData({ ...formData, marvelArchetype: e.target.value as MarvelArchetype })
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="iron-man">Iron Man (Full-Stack Architect)</option>
                    <option value="captain-america">Captain America (Team Lead / Strategist)</option>
                    <option value="doctor-strange">Doctor Strange (AI & Quantum)</option>
                    <option value="black-widow">Black Widow (Cybersecurity Specialist)</option>
                    <option value="thor">Thor (DevOps & Cloud Master)</option>
                    <option value="hulk">Hulk (High-Perf & SIMD)</option>
                  </select>
                </div>
              </div>

              {/* MANDATORY GitHub & LinkedIn Profiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    GitHub Profile Link *
                  </label>
                  <div className="relative">
                    <Github className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="url"
                      placeholder="https://github.com/your-username"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                  {errors.githubUrl && <p className="text-[11px] text-rose-400 mt-1">{errors.githubUrl}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    LinkedIn Profile Link *
                  </label>
                  <div className="relative">
                    <Linkedin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/your-username"
                      value={formData.linkedinUrl}
                      onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                  {errors.linkedinUrl && <p className="text-[11px] text-rose-400 mt-1">{errors.linkedinUrl}</p>}
                </div>
              </div>

              {/* Newsletter Opt-in */}
              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.newsletterOptIn}
                    onChange={(e) => setFormData({ ...formData, newsletterOptIn: e.target.checked })}
                    className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-400"
                  />
                  <span>
                    Receive automated confirmation email, QR pass credentials, and Discord squad invite.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-marvel font-black text-sm uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Synthesizing Multiverse Credentials & QR Pass...</span>
                  ) : (
                    <>
                      <Ticket className="w-4 h-4 fill-slate-950" />
                      <span>Lock In Registration & Generate QR Pass</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
