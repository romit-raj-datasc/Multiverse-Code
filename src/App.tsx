import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EventHighlights } from './components/EventHighlights';
import { HeroRoleSelector } from './components/HeroRoleSelector';
import { EmailSignupSection } from './components/EmailSignupSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { ConfirmationEmailViewer } from './components/ConfirmationEmailViewer';
import { AdminDashboard } from './components/AdminDashboard';
import { ProjectDownloadModal } from './components/ProjectDownloadModal';
import { dbService } from './services/storage';
import { MarvelArchetype, SentEmail, TrackType } from './types';
import { ShieldAlert, Download } from 'lucide-react';

export default function App() {
  const [registeredCount, setRegisteredCount] = useState<number>(5);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<MarvelArchetype>('iron-man');
  const [selectedTrack, setSelectedTrack] = useState<TrackType>('quantum-ai');
  const [previewEmail, setPreviewEmail] = useState<SentEmail | null>(null);

  const refreshCount = () => {
    const attendees = dbService.getAttendees();
    setRegisteredCount(attendees.length);
  };

  useEffect(() => {
    refreshCount();
    const unsubscribe = dbService.subscribeRealtime(() => {
      refreshCount();
    });

    // Check if URL has #admin
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#admin' || window.location.hash === '#admin-console') {
        setIsAdminOpen(true);
      }
      const handleHash = () => {
        if (window.location.hash === '#admin' || window.location.hash === '#admin-console') {
          setIsAdminOpen(true);
        }
      };
      window.addEventListener('hashchange', handleHash);
      return () => {
        unsubscribe();
        window.removeEventListener('hashchange', handleHash);
      };
    }

    return () => unsubscribe();
  }, []);

  const handleOpenRegisterWithRole = (role: MarvelArchetype) => {
    setSelectedRole(role);
    setIsRegisterOpen(true);
  };

  const handleOpenRegisterWithTrack = (track: TrackType) => {
    setSelectedTrack(track);
    setIsRegisterOpen(true);
  };

  const handleViewEmail = (email: SentEmail) => {
    setPreviewEmail(email);
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative">
      {/* Top Bar with Contract */}
      <Navbar
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenDownload={() => setIsDownloadOpen(true)}
        registeredCount={registeredCount}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Cinematic Hero with Live Countdown & Social Share */}
        <HeroSection
          onOpenRegister={() => setIsRegisterOpen(true)}
          onExploreTracks={() => {
            const el = document.getElementById('tracks');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          registeredCount={registeredCount}
        />

        {/* Multiverse Tracks, Timeline & Infinity Prizes */}
        <EventHighlights
          onSelectTrackForRegistration={handleOpenRegisterWithTrack}
        />

        {/* Superhero Archetype Selector & Persona Dossier */}
        <HeroRoleSelector
          onSelectRole={handleOpenRegisterWithRole}
        />

        {/* Email Signup / Newsletter Stream */}
        <EmailSignupSection
          onSuccessSubscribe={() => {
            refreshCount();
          }}
        />

        {/* Frequently Answered Transmissions */}
        <FaqSection />
      </main>

      {/* Floating Persistent Quick Action Dock */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Project Download Quick Action */}
        <button
          onClick={() => setIsDownloadOpen(true)}
          className="hidden sm:flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-emerald-950/90 hover:bg-emerald-900 text-emerald-300 hover:text-white border border-emerald-500/40 shadow-[0_4px_20px_rgba(16,185,129,0.3)] backdrop-blur-md transition-all duration-200 transform hover:scale-105 active:scale-95 text-xs font-semibold"
          title="Download Project ZIP & GitHub Repository"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Project ZIP</span>
        </button>

        {/* Admin Console Launcher */}
        <button
          onClick={() => setIsAdminOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-cyan-500/40 hover:border-cyan-400 shadow-[0_4px_25px_rgba(6,182,212,0.35)] backdrop-blur-md transition-all duration-200 transform hover:scale-105 active:scale-95"
          title="Open S.H.I.E.L.D. Admin Console"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <ShieldAlert className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
          <span className="font-marvel text-xs font-bold tracking-wider uppercase">
            Admin Console
          </span>
          <span className="font-mono text-[10px] text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-800/60 tabular-nums font-bold">
            {registeredCount}
          </span>
        </button>
      </div>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenDownload={() => setIsDownloadOpen(true)}
        registeredCount={registeredCount}
      />

      {/* Interactive Registration Modal with Real-time DB, QR Code & Digital Pass */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        defaultRole={selectedRole}
        defaultTrack={selectedTrack}
        onSuccess={() => {
          refreshCount();
        }}
        onViewEmail={handleViewEmail}
      />

      {/* Automated Confirmation Email Preview Modal */}
      <ConfirmationEmailViewer
        email={previewEmail}
        onClose={() => setPreviewEmail(null)}
      />

      {/* Admin Dashboard & Outreach Intelligence Console */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          if (window.location.hash === '#admin' || window.location.hash === '#admin-console') {
            history.pushState(null, '', window.location.pathname);
          }
        }}
        onPreviewEmail={handleViewEmail}
        onOpenDownload={() => setIsDownloadOpen(true)}
      />

      {/* Project Download & GitHub Repo Package Modal */}
      <ProjectDownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
    </div>
  );
}
