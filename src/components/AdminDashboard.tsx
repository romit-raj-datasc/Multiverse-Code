import React, { useState, useEffect } from 'react';
import { 
  X, 
  Users, 
  Mail, 
  Download, 
  Search, 
  Filter, 
  Trash2, 
  Send, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Eye, 
  Copy, 
  Check, 
  RefreshCw, 
  BarChart3, 
  Database,
  ExternalLink,
  QrCode,
  Radio,
  Sparkles
} from 'lucide-react';
import { Attendee, SentEmail, QuickSubscriber, TrackType, MarvelArchetype } from '../types';
import { dbService, TRACK_NAMES } from '../services/storage';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onPreviewEmail: (email: SentEmail) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onPreviewEmail,
}) => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [emails, setEmails] = useState<SentEmail[]>([]);
  const [subscribers, setSubscribers] = useState<QuickSubscriber[]>([]);
  
  const [activeTab, setActiveTab] = useState<'attendees' | 'emails' | 'subscribers' | 'broadcast' | 'checkin' | 'analytics'>('attendees');
  const [searchQuery, setSearchQuery] = useState('');
  const [trackFilter, setTrackFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Broadcast state
  const [broadcastSubject, setBroadcastSubject] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastTrack, setBroadcastTrack] = useState<string>('all');

  // Check-in state
  const [checkInInput, setCheckInInput] = useState('');
  const [lastCheckedIn, setLastCheckedIn] = useState<Attendee | null>(null);
  const [checkInError, setCheckInError] = useState<string | null>(null);

  const reloadData = () => {
    setAttendees(dbService.getAttendees());
    setEmails(dbService.getSentEmails());
    setSubscribers(dbService.getSubscribers());
  };

  useEffect(() => {
    if (isOpen) {
      reloadData();
    }
  }, [isOpen]);

  useEffect(() => {
    const unsubscribe = dbService.subscribeRealtime(() => {
      reloadData();
    });
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(null), 3000);
  };

  const handleCopyEmail = (emailStr: string) => {
    navigator.clipboard.writeText(emailStr);
    setCopiedEmail(emailStr);
    showNotification(`Copied ${emailStr} for outreach!`);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleCopyAllEmails = () => {
    const allEmails = filteredAttendees.map((a) => a.email).join(', ');
    navigator.clipboard.writeText(allEmails);
    setCopiedAll(true);
    showNotification(`Copied ${filteredAttendees.length} emails to clipboard!`);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const handleResendEmail = (attendeeId: string) => {
    const email = dbService.resendConfirmationEmail(attendeeId);
    if (email) {
      reloadData();
      showNotification(`Automated pass re-dispatched to ${email.toEmail}!`);
    }
  };

  const handleStatusChange = (attendeeId: string, newStatus: Attendee['status']) => {
    dbService.updateAttendeeStatus(attendeeId, newStatus);
    reloadData();
    showNotification(`Operative status updated to ${newStatus}`);
  };

  const handleDeleteAttendee = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove operative ${name}?`)) {
      dbService.deleteAttendee(id);
      reloadData();
      showNotification(`Operative ${name} removed.`);
    }
  };

  const handleDeleteSubscriber = (id: string, emailStr: string) => {
    dbService.deleteSubscriber(id);
    reloadData();
    showNotification(`Removed subscriber ${emailStr}`);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastSubject.trim() || !broadcastMessage.trim()) {
      alert('Please fill out both subject and message.');
      return;
    }
    const count = dbService.broadcastAnnouncement(broadcastSubject.trim(), broadcastMessage.trim(), broadcastTrack);
    reloadData();
    setBroadcastSubject('');
    setBroadcastMessage('');
    showNotification(`Broadcast dispatched to ${count} operatives!`);
    setActiveTab('emails');
  };

  const handleCheckInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckInError(null);
    if (!checkInInput.trim()) return;

    const checked = dbService.checkInByQuery(checkInInput.trim());
    if (checked) {
      setLastCheckedIn(checked);
      setCheckInInput('');
      reloadData();
      showNotification(`Verified & Checked-in ${checked.fullName}!`);
    } else {
      setCheckInError(`No operative found matching "${checkInInput.trim()}". Check Ticket ID or Roll Number.`);
    }
  };

  // Filtered Attendees
  const filteredAttendees = attendees.filter((a) => {
    const matchesSearch =
      a.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.teamName && a.teamName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTrack = trackFilter === 'all' || a.track === trackFilter;
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;

    return matchesSearch && matchesTrack && matchesStatus;
  });

  // Filtered Emails
  const filteredEmails = emails.filter(
    (e) =>
      e.toName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.toEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.ticketId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Analytics Math
  const totalRegistrations = attendees.length;
  const soloCount = attendees.filter((a) => a.teamType === 'solo').length;
  const teamCount = attendees.filter((a) => a.teamType === 'team').length;
  const confirmedCount = attendees.filter((a) => a.status === 'confirmed').length;
  const checkedInCount = attendees.filter((a) => a.status === 'checked-in').length;

  const trackDistribution: Record<string, number> = {};
  attendees.forEach((a) => {
    trackDistribution[a.track] = (trackDistribution[a.track] || 0) + 1;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-hidden text-left">
      <div className="bg-[#090e1a] border border-cyan-500/50 rounded-2xl w-full max-w-6xl h-[94vh] flex flex-col shadow-[0_0_60px_rgba(6,182,212,0.25)] relative overflow-hidden">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#0c1424] border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-600/60 text-cyan-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-marvel font-black text-xl text-white tracking-wide">
                  S.H.I.E.L.D. Command Center
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/80 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  REAL-TIME ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Bennett University GeeksForGeeks Student Chapter · Outreach & Attendee Intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={reloadData}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Refresh Real-time Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Action Banner Toast */}
        {actionSuccessMsg && (
          <div className="bg-emerald-950/90 border-b border-emerald-700/60 px-6 py-2 text-xs text-emerald-300 font-semibold flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{actionSuccessMsg}</span>
            </div>
            <button onClick={() => setActionSuccessMsg(null)} className="text-emerald-400 text-xs">
              ✕
            </button>
          </div>
        )}

        {/* Navigation Tabs & Primary Actions */}
        <div className="px-6 py-3 bg-[#0a101d] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800 overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('attendees')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === 'attendees'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Attendees Directory</span>
              <span className="font-mono text-[10px] px-1.5 rounded bg-black/20 font-bold tabular-nums">
                {attendees.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('checkin')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === 'checkin'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Rapid Check-In</span>
              <span className="font-mono text-[10px] px-1.5 rounded bg-black/20 font-bold tabular-nums">
                {checkedInCount} In
              </span>
            </button>

            <button
              onClick={() => setActiveTab('broadcast')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === 'broadcast'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Broadcast Announcement</span>
            </button>

            <button
              onClick={() => setActiveTab('emails')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === 'emails'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Sent Confirmations Log</span>
              <span className="font-mono text-[10px] px-1.5 rounded bg-black/20 font-bold tabular-nums">
                {emails.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('subscribers')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === 'subscribers'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Newsletter Subscribers</span>
              <span className="font-mono text-[10px] px-1.5 rounded bg-black/20 font-bold tabular-nums">
                {subscribers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Analytics</span>
            </button>
          </div>

          {/* Quick Actions & CSV Export */}
          <div className="flex items-center gap-2">
            {activeTab === 'attendees' && (
              <>
                <button
                  onClick={handleCopyAllEmails}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
                  title="Copy all attendee emails to clipboard for BCC / outreach"
                >
                  {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAll ? 'Emails Copied' : 'Copy All Emails'}</span>
                </button>

                <button
                  onClick={() => dbService.exportAttendeesCSV()}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </>
            )}

            {activeTab === 'subscribers' && (
              <button
                onClick={() => dbService.exportSubscribersCSV()}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Subscribers CSV</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: Attendees Directory */}
        {activeTab === 'attendees' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Search & Filter Bar */}
            <div className="p-4 bg-[#080d1a] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by operative name, email, roll number, college or team..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={trackFilter}
                  onChange={(e) => setTrackFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
                >
                  <option value="all">All Tracks</option>
                  <option value="quantum-ai">Doctor Strange: Quantum AI</option>
                  <option value="stark-cloud">Stark: Cloud & Web3</option>
                  <option value="wakanda-cyber">Wakanda: Cyber Defense</option>
                  <option value="shield-algorithms">S.H.I.E.L.D.: Algorithms</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="checked-in">Checked In</option>
                  <option value="waitlisted">Waitlisted</option>
                </select>
              </div>
            </div>

            {/* Attendees Table */}
            <div className="flex-1 overflow-auto">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead className="sticky top-0 bg-[#0d1527] border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-hud font-bold">
                  <tr>
                    <th className="py-3 px-4">Operative & Email</th>
                    <th className="py-3 px-3">Roll & Institution</th>
                    <th className="py-3 px-3">Track & Archetype</th>
                    <th className="py-3 px-3">Squad Details</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredAttendees.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500">
                        No operatives matched your query.
                      </td>
                    </tr>
                  ) : (
                    filteredAttendees.map((att) => (
                      <tr key={att.id} className="hover:bg-slate-900/50 transition-colors group">
                        {/* Name & Email for easy outreach */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white flex items-center gap-2">
                            <span>{att.fullName}</span>
                            <span className="font-mono text-[10px] text-cyan-400/80 bg-cyan-950 px-1.5 rounded border border-cyan-800/50">
                              {att.ticketId}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400 mt-0.5">
                            <span className="font-mono text-cyan-300 text-[11px] truncate max-w-[200px]">
                              {att.email}
                            </span>
                            <button
                              onClick={() => handleCopyEmail(att.email)}
                              className="text-slate-500 hover:text-cyan-400 p-0.5"
                              title="Copy Email Address for Outreach"
                            >
                              {copiedEmail === att.email ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                            <a
                              href={`mailto:${att.email}?subject=Regarding%20GFG%20Bennett%20Infinity%20Protocol%20Hackathon`}
                              className="text-slate-500 hover:text-amber-400 p-0.5"
                              title="Send Email via Mail App"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </td>

                        {/* Roll & College */}
                        <td className="py-3.5 px-3">
                          <div className="font-mono text-slate-300 text-[11px]">{att.rollNumber}</div>
                          <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                            {att.college}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {att.branch} · {att.year}
                          </div>
                        </td>

                        {/* Track & Hero */}
                        <td className="py-3.5 px-3">
                          <div className="font-medium text-amber-300 truncate max-w-[180px]">
                            {TRACK_NAMES[att.track].split(':')[0]}
                          </div>
                          <div className="text-[11px] uppercase tracking-wider text-slate-400 mt-0.5 font-hud">
                            Persona: <span className="text-cyan-400 font-semibold">{att.marvelArchetype}</span>
                          </div>
                        </td>

                        {/* Squad */}
                        <td className="py-3.5 px-3">
                          {att.teamType === 'team' ? (
                            <div>
                              <div className="font-semibold text-white text-[11px]">
                                {att.teamName || 'Strike Team'}
                              </div>
                              <div className="text-[10px] text-cyan-400">Squad Mode</div>
                            </div>
                          ) : (
                            <div className="text-slate-400 text-[11px]">Solo Operative</div>
                          )}
                        </td>

                        {/* Status Switcher */}
                        <td className="py-3.5 px-3">
                          <select
                            value={att.status}
                            onChange={(e) =>
                              handleStatusChange(att.id, e.target.value as Attendee['status'])
                            }
                            className={`text-[11px] font-semibold rounded px-2 py-1 border outline-none cursor-pointer ${
                              att.status === 'confirmed'
                                ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                                : att.status === 'checked-in'
                                ? 'bg-cyan-950 text-cyan-400 border-cyan-800'
                                : 'bg-amber-950 text-amber-400 border-amber-800'
                            }`}
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="checked-in">Checked In</option>
                            <option value="waitlisted">Waitlisted</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleResendEmail(att.id)}
                              className="p-1.5 rounded bg-slate-800 hover:bg-cyan-950 text-slate-300 hover:text-cyan-400 border border-slate-700 transition-colors"
                              title="Resend Automated Confirmation Pass"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteAttendee(att.id, att.fullName)}
                              className="p-1.5 rounded bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors"
                              title="Delete Operative"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Rapid Check-in Mode */}
        {activeTab === 'checkin' && (
          <div className="flex-1 overflow-y-auto p-6 max-w-2xl mx-auto w-full space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/50 text-cyan-400 flex items-center justify-center mx-auto mb-3">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="font-marvel font-black text-2xl text-white">Bennett Campus Entry Check-in</h3>
              <p className="text-xs text-slate-400 mt-1">
                Scan or enter the operative's Ticket ID (e.g. <span className="font-mono text-cyan-300">GFG-BENNETT-AV-4182</span>) or Roll Number.
              </p>
            </div>

            <form onSubmit={handleCheckInSubmit} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Ticket ID or Roll Number..."
                  value={checkInInput}
                  onChange={(e) => setCheckInInput(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 font-mono uppercase focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-marvel font-bold text-xs uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors"
                >
                  Verify & Check-In
                </button>
              </div>

              {checkInError && (
                <div className="text-xs text-rose-400 bg-rose-950/40 p-3 rounded-lg border border-rose-800 animate-in fade-in">
                  {checkInError}
                </div>
              )}
            </form>

            {lastCheckedIn && (
              <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/50 shadow-xl animate-in fade-in space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-hud text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Verified Entry Pass
                  </span>
                  <span className="font-mono text-xs text-cyan-300">{lastCheckedIn.ticketId}</span>
                </div>

                <div>
                  <h4 className="font-marvel font-bold text-lg text-white">{lastCheckedIn.fullName}</h4>
                  <div className="text-xs text-slate-300 font-mono mt-0.5">{lastCheckedIn.rollNumber} · {lastCheckedIn.college}</div>
                  <div className="text-xs text-amber-300 mt-1">{TRACK_NAMES[lastCheckedIn.track]}</div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
                  <span>Persona: <span className="uppercase font-semibold text-white">{lastCheckedIn.marvelArchetype}</span></span>
                  <span className="text-emerald-400 font-bold">STATUS: CHECKED-IN</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab: Broadcast Announcement */}
        {activeTab === 'broadcast' && (
          <div className="flex-1 overflow-y-auto p-6 max-w-2xl mx-auto w-full space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-950 border border-amber-500/50 text-amber-400 flex items-center justify-center mx-auto mb-3">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="font-marvel font-black text-2xl text-white">Multiverse Broadcast Dispatcher</h3>
              <p className="text-xs text-slate-400 mt-1">
                Transmit an urgent mission bulletin or logistical notice to all registered attendees or specific tracks.
              </p>
            </div>

            <form onSubmit={handleSendBroadcast} className="space-y-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Track Audience
                </label>
                <select
                  value={broadcastTrack}
                  onChange={(e) => setBroadcastTrack(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="all">All Registered Operatives (Global Broadcast)</option>
                  <option value="quantum-ai">Doctor Strange Track only</option>
                  <option value="stark-cloud">Stark Industries Track only</option>
                  <option value="wakanda-cyber">Wakanda Defense Track only</option>
                  <option value="shield-algorithms">S.H.I.E.L.D. Track only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Transmission Subject Line *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bennett Campus Labs Open · Discord Channel Live"
                  value={broadcastSubject}
                  onChange={(e) => setBroadcastSubject(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Message Content *
                </label>
                <textarea
                  rows={5}
                  placeholder="Operatives, the problem statements have been decrypted. Join the livestream at 09:00 AM IST..."
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-marvel font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="w-4 h-4 fill-slate-950" />
                <span>Transmit Broadcast to Operatives</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Sent Confirmation Emails Log */}
        {activeTab === 'emails' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 bg-[#080d1a] border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-slate-300">
                Audit trail of automated confirmation dispatches generated in real time upon registration and broadcast.
              </div>
              <div className="text-xs font-mono text-cyan-400">
                Total Dispatches: {emails.length}
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead className="sticky top-0 bg-[#0d1527] border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-hud font-bold">
                  <tr>
                    <th className="py-3 px-4">Recipient Operative & Email</th>
                    <th className="py-3 px-3">Subject Line</th>
                    <th className="py-3 px-3">Dispatched Time</th>
                    <th className="py-3 px-3">Delivery Status</th>
                    <th className="py-3 px-4 text-right">Inspect Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredEmails.map((email) => (
                    <tr key={email.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{email.toName}</div>
                        <div className="font-mono text-cyan-300 text-[11px]">{email.toEmail}</div>
                      </td>
                      <td className="py-3 px-3 max-w-[280px]">
                        <div className="font-medium text-slate-200 truncate">{email.subject}</div>
                        <div className="text-[11px] text-slate-400 truncate">{email.previewText}</div>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-400">
                        {new Date(email.sentAt).toLocaleString()}
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/80">
                          ● Delivered
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onPreviewEmail(email)}
                          className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 font-medium text-xs inline-flex items-center gap-1.5 transition-colors border border-slate-700"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Dispatch</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Newsletter Subscribers */}
        {activeTab === 'subscribers' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 bg-[#080d1a] border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-slate-300">
                Direct list of audience email signups collected via the portal for hackathon alerts and updates.
              </div>
              <div className="text-xs font-mono text-cyan-400">
                Total Subscribers: {subscribers.length}
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead className="sticky top-0 bg-[#0d1527] border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-hud font-bold">
                  <tr>
                    <th className="py-3 px-4">Subscriber Email</th>
                    <th className="py-3 px-3">Subscribed Timestamp</th>
                    <th className="py-3 px-3">Channel Source</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {subscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3 px-4 font-mono text-cyan-300">
                        <div className="flex items-center gap-2">
                          <span>{sub.email}</span>
                          <button
                            onClick={() => handleCopyEmail(sub.email)}
                            className="text-slate-500 hover:text-cyan-400"
                            title="Copy Email"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-400">
                        {new Date(sub.subscribedAt).toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-slate-300">{sub.source}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeleteSubscriber(sub.id, sub.email)}
                          className="p-1.5 rounded bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors"
                          title="Remove Subscriber"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Analytics */}
        {activeTab === 'analytics' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400 font-hud uppercase">Total Assembled</div>
                <div className="font-marvel font-black text-3xl text-cyan-400 mt-1 tabular-nums">
                  {totalRegistrations}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">{checkedInCount} Checked-in on campus</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400 font-hud uppercase">Strike Teams</div>
                <div className="font-marvel font-black text-3xl text-sky-400 mt-1 tabular-nums">
                  {teamCount}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">{soloCount} Solo Operatives</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400 font-hud uppercase">Email Confirmations</div>
                <div className="font-marvel font-black text-3xl text-emerald-400 mt-1 tabular-nums">
                  100%
                </div>
                <div className="text-[11px] text-slate-500 mt-1">{emails.length} Dispatched</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs text-slate-400 font-hud uppercase">Newsletter Base</div>
                <div className="font-marvel font-black text-3xl text-amber-400 mt-1 tabular-nums">
                  {subscribers.length}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Real-time Subscribers</div>
              </div>
            </div>

            {/* Track Breakdown Bar Representation */}
            <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800">
              <h3 className="font-marvel font-bold text-base text-white mb-4">
                Track Registrations Distribution
              </h3>
              <div className="space-y-4">
                {Object.entries(TRACK_NAMES).map(([key, name]) => {
                  const count = trackDistribution[key] || 0;
                  const percentage = totalRegistrations > 0 ? Math.round((count / totalRegistrations) * 100) : 0;
                  return (
                    <div key={key}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300 font-medium">{name}</span>
                        <span className="font-mono text-cyan-400">
                          {count} ({percentage}%)
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
