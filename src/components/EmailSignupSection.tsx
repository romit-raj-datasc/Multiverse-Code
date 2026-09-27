import React, { useState } from 'react';
import { Mail, Check, Sparkles, Send } from 'lucide-react';
import { dbService } from '../services/storage';

interface EmailSignupSectionProps {
  onSuccessSubscribe?: () => void;
}

export const EmailSignupSection: React.FC<EmailSignupSectionProps> = ({
  onSuccessSubscribe,
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'already' | 'error'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }

    const added = dbService.addSubscriber(email.trim().toLowerCase(), 'Multiverse Newsletter Portal');
    if (added) {
      setStatus('success');
      setEmail('');
      if (onSuccessSubscribe) onSuccessSubscribe();
    } else {
      setStatus('already');
    }

    setTimeout(() => {
      setStatus('idle');
    }, 4000);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#060913] to-[#090e1c] border-b border-slate-800/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Glow halo */}
        <div className="inline-flex p-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 mb-4 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="font-marvel text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          Stay Connected to Multiverse Frequencies
        </h2>
        
        <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          Get real-time alerts on secret bounty problem statements, speaker announcements, Bennett campus logistics, and workshop links.
        </p>

        {/* Email Form */}
        <form onSubmit={handleSubscribe} className="mt-8 max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-2 bg-slate-900/90 border border-slate-700/80 rounded-xl p-1.5 focus-within:border-cyan-400 focus-within:ring-1 focus-within:ring-cyan-400 shadow-xl">
            <div className="flex items-center gap-2 px-3 w-full sm:w-auto flex-1">
              <Mail className="w-4 h-4 text-slate-500 shrink-0" />
              <input
                type="email"
                placeholder="Enter your student email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-xs text-white placeholder-slate-500 outline-none w-full py-2"
              />
            </div>
            
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg font-marvel font-bold text-xs uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shrink-0 flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            >
              <span>Transmit</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          {status === 'success' && (
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-semibold animate-in fade-in">
              <Check className="w-4 h-4" />
              <span>Transmitted! You are now subscribed to the Multiverse dispatch list.</span>
            </div>
          )}

          {status === 'already' && (
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-amber-400 font-semibold animate-in fade-in">
              <Sparkles className="w-4 h-4" />
              <span>This email frequency is already registered on our radar!</span>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-3 text-xs text-rose-400 font-semibold animate-in fade-in">
              Please enter a valid student email address.
            </div>
          )}
        </form>

      </div>
    </section>
  );
};
