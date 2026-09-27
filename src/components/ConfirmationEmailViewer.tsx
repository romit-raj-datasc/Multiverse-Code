import React from 'react';
import { X, Mail, CheckCircle2, Calendar, MapPin, Shield, ExternalLink, Printer } from 'lucide-react';
import { SentEmail } from '../types';

interface ConfirmationEmailViewerProps {
  email: SentEmail | null;
  onClose: () => void;
}

export const ConfirmationEmailViewer: React.FC<ConfirmationEmailViewerProps> = ({
  email,
  onClose,
}) => {
  if (!email) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0f172a] border border-cyan-500/50 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl text-left">
        
        {/* Email Client Header bar */}
        <div className="sticky top-0 z-20 bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span className="font-marvel font-bold text-xs uppercase tracking-wider text-slate-200">
              Automated Email Dispatch System
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              title="Print Dispatch"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Envelope Metadata */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800/80 text-xs space-y-1.5 font-mono">
          <div className="text-slate-400">
            <span className="text-slate-500 font-semibold">From: </span>
            <span className="text-cyan-300">gfg-chapter@bennett.edu.in</span> (GeeksForGeeks Bennett Student Chapter)
          </div>
          <div className="text-slate-400">
            <span className="text-slate-500 font-semibold">To: </span>
            <span className="text-white">{email.toName}</span> &lt;{email.toEmail}&gt;
          </div>
          <div className="text-slate-400">
            <span className="text-slate-500 font-semibold">Subject: </span>
            <span className="text-amber-300 font-semibold">{email.subject}</span>
          </div>
          <div className="text-slate-400">
            <span className="text-slate-500 font-semibold">Status: </span>
            <span className="text-emerald-400 font-semibold uppercase">● DELIVERED IN REAL TIME</span> ({new Date(email.sentAt).toLocaleString()})
          </div>
        </div>

        {/* Rendered Email Body in Stark Industries / GFG Style */}
        <div className="p-6 sm:p-8 bg-[#090d16] text-slate-200 font-sans text-xs sm:text-sm space-y-6">
          
          {/* Header Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#111928] via-[#0e1726] to-[#0a101d] border border-cyan-500/30 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-hud uppercase tracking-widest text-cyan-400 font-bold">
                Official Assembly Confirmation
              </div>
              <h2 className="font-marvel font-black text-lg text-white">
                GFG × BENNETT: INFINITY PROTOCOL
              </h2>
            </div>
            <div className="text-right font-mono">
              <div className="text-[9px] text-slate-400">PASS CODE</div>
              <div className="text-xs font-bold text-cyan-300">{email.ticketId}</div>
            </div>
          </div>

          {/* Salutation */}
          <div>
            <p className="font-semibold text-sm text-white">
              Greetings, Operative {email.toName},
            </p>
            <p className="mt-2 text-slate-300 leading-relaxed">
              Your registration for <strong>INFINITY PROTOCOL: MULTIVERSE CODE 2026</strong> has been officially confirmed by the GeeksForGeeks Student Chapter at Bennett University. The multiverse timeline has been secured under your watch.
            </p>
          </div>

          {/* Mission Spec Card */}
          <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2 font-mono text-xs">
            <div className="text-cyan-400 font-bold text-[11px] uppercase tracking-wider mb-2">
              ✦ Multiverse Mission Credentials
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
              <span className="text-slate-400">Operative:</span>
              <span className="text-white font-semibold">{email.toName}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
              <span className="text-slate-400">Assigned Track:</span>
              <span className="text-amber-300 font-semibold">{email.trackName}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
              <span className="text-slate-400">Pass Identification:</span>
              <span className="text-cyan-300 font-bold">{email.ticketId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Access Tier:</span>
              <span className="text-emerald-400 font-bold">VERIFIED ATTENDEE</span>
            </div>
          </div>

          {/* Logistics & Action Items */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300">
              Immediate Mission Directives:
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <Calendar className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Event Schedule & Milestones</div>
                  <div className="text-slate-400 text-xs space-y-0.5 mt-0.5">
                    <div>• <strong>T-Minus 2 Days</strong>: Problem statements uploaded 48h prior to Round 1.</div>
                    <div>• <strong>Day 1 (10:00 AM IST)</strong>: Grand Kickoff & Round 1 Architecture Evaluation.</div>
                    <div>• <strong>Day 2</strong>: Professional Prototype Evaluation by Industry Experts & Pitching.</div>
                    <div>• <strong>Day 3</strong>: Multiverse Grand Finale & ₹1,50,000+ Prize Distribution.</div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Location</div>
                  <div className="text-slate-400 text-xs">Bennett University Campus, TechZone 2, Greater Noida, UP + Discord Multiverse Hub</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Discord & WhatsApp Squad Links</div>
                  <div className="text-slate-400 text-xs">Join the dedicated channel to form alliances, talk to mentors, and view workshop schedules.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Signoff */}
          <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
            <p>Whatever it takes,</p>
            <p className="font-semibold text-white mt-1">Organizing Committee</p>
            <p className="text-[11px] text-slate-500">GeeksForGeeks Student Chapter · Bennett University</p>
          </div>

        </div>

      </div>
    </div>
  );
};
