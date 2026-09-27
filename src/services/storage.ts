import { Attendee, SentEmail, QuickSubscriber, TrackType } from '../types';

const ATTENDEES_STORAGE_KEY = 'gfg_bennett_infinity_attendees_v1';
const EMAILS_STORAGE_KEY = 'gfg_bennett_infinity_emails_v1';
const SUBSCRIBERS_STORAGE_KEY = 'gfg_bennett_infinity_subscribers_v1';

const BROADCAST_CHANNEL_NAME = 'gfg_bennett_marvel_db_channel';

export const TRACK_NAMES: Record<TrackType, string> = {
  'quantum-ai': 'Doctor Strange: Quantum AI & Autonomous Agents',
  'stark-cloud': 'Stark Industries: Cloud Systems & Scalable Web3',
  'wakanda-cyber': 'Wakanda Defense: Cyber Warfare & Cryptography',
  'shield-algorithms': 'S.H.I.E.L.D.: Algorithmic Warfare & Core Systems',
};

const SEED_ATTENDEES: Attendee[] = [
  {
    id: 'att-seed-1',
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@bennett.edu.in',
    rollNumber: 'E23CSEU0142',
    college: 'Bennett University',
    branch: 'Computer Science & Engineering',
    year: '3rd Year',
    marvelArchetype: 'iron-man',
    teamType: 'team',
    teamName: 'Jarvis Protocol',
    track: 'quantum-ai',
    githubUrl: 'https://github.com/aarav-sharma-tech',
    linkedinUrl: 'https://linkedin.com/in/aaravsharma',
    newsletterOptIn: true,
    registeredAt: '2026-09-25T10:15:00.000Z',
    status: 'confirmed',
    ticketId: 'GFG-BENNETT-AV-4182',
  },
  {
    id: 'att-seed-2',
    fullName: 'Rhea Sengupta',
    email: 'rhea.s@bennett.edu.in',
    rollNumber: 'E24AI0088',
    college: 'Bennett University',
    branch: 'Artificial Intelligence & Data Science',
    year: '2nd Year',
    marvelArchetype: 'doctor-strange',
    teamType: 'team',
    teamName: 'Jarvis Protocol',
    track: 'quantum-ai',
    githubUrl: 'https://github.com/rhea-ai-research',
    linkedinUrl: 'https://linkedin.com/in/rheasengupta',
    newsletterOptIn: true,
    registeredAt: '2026-09-25T10:20:00.000Z',
    status: 'confirmed',
    ticketId: 'GFG-BENNETT-AV-4183',
  },
  {
    id: 'att-seed-3',
    fullName: 'Devansh Verma',
    email: 'devansh.v@bennett.edu.in',
    rollNumber: 'E22CSEU0511',
    college: 'Bennett University',
    branch: 'CSE (Cyber Security)',
    year: '4th Year',
    marvelArchetype: 'black-widow',
    teamType: 'solo',
    track: 'wakanda-cyber',
    githubUrl: 'https://github.com/redroom-sec',
    linkedinUrl: 'https://linkedin.com/in/devanshverma-sec',
    newsletterOptIn: true,
    registeredAt: '2026-09-26T14:40:00.000Z',
    status: 'confirmed',
    ticketId: 'GFG-BENNETT-AV-7719',
  },
  {
    id: 'att-seed-4',
    fullName: 'Tanvi Kapoor',
    email: 'tanvi.kapoor@dtu.ac.in',
    rollNumber: '2K23/CO/341',
    college: 'Delhi Technological University (DTU)',
    branch: 'Software Engineering',
    year: '3rd Year',
    marvelArchetype: 'captain-america',
    teamType: 'team',
    teamName: 'Avenger Coder Squad',
    track: 'stark-cloud',
    githubUrl: 'https://github.com/tanvik-dev',
    linkedinUrl: 'https://linkedin.com/in/tanvikapoor',
    newsletterOptIn: true,
    registeredAt: '2026-09-26T18:12:00.000Z',
    status: 'confirmed',
    ticketId: 'GFG-BENNETT-AV-8802',
  },
  {
    id: 'att-seed-5',
    fullName: 'Kabir Patel',
    email: 'kabir.patel@bennett.edu.in',
    rollNumber: 'E25CSEU0091',
    college: 'Bennett University',
    branch: 'Computer Science & Engineering',
    year: '1st Year',
    marvelArchetype: 'hulk',
    teamType: 'solo',
    track: 'shield-algorithms',
    githubUrl: 'https://github.com/kabir-algo',
    linkedinUrl: 'https://linkedin.com/in/kabirpatel',
    newsletterOptIn: false,
    registeredAt: '2026-09-27T08:05:00.000Z',
    status: 'waitlisted',
    ticketId: 'GFG-BENNETT-AV-9912',
  },
];

const SEED_EMAILS: SentEmail[] = SEED_ATTENDEES.map((att) => ({
  id: `email-seed-${att.id}`,
  attendeeId: att.id,
  toEmail: att.email,
  toName: att.fullName,
  subject: `⚡ [ASSEMBLY CONFIRMED] You're In! GFG Bennett Infinity Hackathon Ticket: ${att.ticketId}`,
  sentAt: att.registeredAt,
  status: 'delivered',
  ticketId: att.ticketId,
  trackName: TRACK_NAMES[att.track],
  previewText: `Welcome to the Multiverse, ${att.fullName}! Your registration for GFG Bennett University Marvel Hackathon is confirmed.`,
}));

const SEED_SUBSCRIBERS: QuickSubscriber[] = [
  {
    id: 'sub-1',
    email: 'techleads@bennett.edu.in',
    subscribedAt: '2026-09-24T09:00:00.000Z',
    source: 'Hero Footer',
  },
  {
    id: 'sub-2',
    email: 'multiverse_coders@gmail.com',
    subscribedAt: '2026-09-25T11:30:00.000Z',
    source: 'CTA Banner',
  },
];

// Helper to broadcast changes
let broadcastChannel: BroadcastChannel | null = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
  } catch (err) {
    console.warn('BroadcastChannel not supported or failed to initialize', err);
  }
}

function notifyDataChanged() {
  if (broadcastChannel) {
    broadcastChannel.postMessage({ type: 'DB_UPDATED', timestamp: Date.now() });
  }
}

export const dbService = {
  getAttendees(): Attendee[] {
    if (typeof window === 'undefined') return SEED_ATTENDEES;
    const raw = localStorage.getItem(ATTENDEES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ATTENDEES_STORAGE_KEY, JSON.stringify(SEED_ATTENDEES));
      return SEED_ATTENDEES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return SEED_ATTENDEES;
    }
  },

  addAttendee(data: Omit<Attendee, 'id' | 'registeredAt' | 'ticketId' | 'status'>): { attendee: Attendee; email: SentEmail } {
    const attendees = this.getAttendees();
    
    // Generate a unique ticket ID like GFG-BENNETT-AV-XXXX
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `GFG-BENNETT-AV-${randomHex}`;
    const id = `att-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    const newAttendee: Attendee = {
      ...data,
      id,
      registeredAt: new Date().toISOString(),
      ticketId,
      status: 'confirmed',
    };

    const updated = [newAttendee, ...attendees];
    localStorage.setItem(ATTENDEES_STORAGE_KEY, JSON.stringify(updated));

    // Automated confirmation email generation
    const email: SentEmail = {
      id: `email-${Date.now()}`,
      attendeeId: id,
      toEmail: newAttendee.email,
      toName: newAttendee.fullName,
      subject: `⚡ [ASSEMBLY CONFIRMED] You're In! GFG Bennett Infinity Hackathon Ticket: ${ticketId}`,
      sentAt: new Date().toISOString(),
      status: 'delivered',
      ticketId,
      trackName: TRACK_NAMES[newAttendee.track],
      previewText: `Welcome to the Multiverse, ${newAttendee.fullName}! Your registration for GFG Bennett University Marvel Hackathon is confirmed.`,
    };

    const emails = this.getSentEmails();
    localStorage.setItem(EMAILS_STORAGE_KEY, JSON.stringify([email, ...emails]));

    notifyDataChanged();
    return { attendee: newAttendee, email };
  },

  updateAttendeeStatus(id: string, status: Attendee['status']): boolean {
    const attendees = this.getAttendees();
    const updated = attendees.map((a) => (a.id === id ? { ...a, status } : a));
    localStorage.setItem(ATTENDEES_STORAGE_KEY, JSON.stringify(updated));
    notifyDataChanged();
    return true;
  },

  deleteAttendee(id: string): boolean {
    const attendees = this.getAttendees();
    const updated = attendees.filter((a) => a.id !== id);
    localStorage.setItem(ATTENDEES_STORAGE_KEY, JSON.stringify(updated));
    notifyDataChanged();
    return true;
  },

  getSentEmails(): SentEmail[] {
    if (typeof window === 'undefined') return SEED_EMAILS;
    const raw = localStorage.getItem(EMAILS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(EMAILS_STORAGE_KEY, JSON.stringify(SEED_EMAILS));
      return SEED_EMAILS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return SEED_EMAILS;
    }
  },

  resendConfirmationEmail(attendeeId: string): SentEmail | null {
    const attendees = this.getAttendees();
    const attendee = attendees.find((a) => a.id === attendeeId);
    if (!attendee) return null;

    const email: SentEmail = {
      id: `email-${Date.now()}`,
      attendeeId: attendee.id,
      toEmail: attendee.email,
      toName: attendee.fullName,
      subject: `⚡ [RESENT PASS] GFG Bennett Infinity Hackathon Pass: ${attendee.ticketId}`,
      sentAt: new Date().toISOString(),
      status: 'delivered',
      ticketId: attendee.ticketId,
      trackName: TRACK_NAMES[attendee.track],
      previewText: `Resent confirmation pass for ${attendee.fullName}. Keep this email safe for entry at Bennett University.`,
    };

    const emails = this.getSentEmails();
    localStorage.setItem(EMAILS_STORAGE_KEY, JSON.stringify([email, ...emails]));
    notifyDataChanged();
    return email;
  },

  broadcastAnnouncement(subject: string, message: string, trackFilter: string = 'all'): number {
    const attendees = this.getAttendees();
    const targets = trackFilter === 'all' ? attendees : attendees.filter((a) => a.track === trackFilter);
    if (targets.length === 0) return 0;

    const newEmails: SentEmail[] = targets.map((att) => ({
      id: `email-broadcast-${Date.now()}-${att.id}`,
      attendeeId: att.id,
      toEmail: att.email,
      toName: att.fullName,
      subject: `📢 [MULTIVERSE ANNOUNCEMENT] ${subject}`,
      sentAt: new Date().toISOString(),
      status: 'delivered',
      ticketId: att.ticketId,
      trackName: TRACK_NAMES[att.track],
      previewText: message.slice(0, 140),
    }));

    const emails = this.getSentEmails();
    localStorage.setItem(EMAILS_STORAGE_KEY, JSON.stringify([...newEmails, ...emails]));
    notifyDataChanged();
    return targets.length;
  },

  checkInByQuery(query: string): Attendee | null {
    const clean = query.trim().toUpperCase();
    const attendees = this.getAttendees();
    const found = attendees.find(
      (a) => a.ticketId.toUpperCase() === clean || a.rollNumber.toUpperCase() === clean || a.email.toLowerCase() === query.trim().toLowerCase()
    );
    if (!found) return null;
    this.updateAttendeeStatus(found.id, 'checked-in');
    return { ...found, status: 'checked-in' };
  },

  getSubscribers(): QuickSubscriber[] {
    if (typeof window === 'undefined') return SEED_SUBSCRIBERS;
    const raw = localStorage.getItem(SUBSCRIBERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SUBSCRIBERS_STORAGE_KEY, JSON.stringify(SEED_SUBSCRIBERS));
      return SEED_SUBSCRIBERS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return SEED_SUBSCRIBERS;
    }
  },

  addSubscriber(email: string, source: string = 'General'): boolean {
    const subscribers = this.getSubscribers();
    if (subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase())) {
      return false; // already subscribed
    }
    const newSub: QuickSubscriber = {
      id: `sub-${Date.now()}`,
      email,
      subscribedAt: new Date().toISOString(),
      source,
    };
    localStorage.setItem(SUBSCRIBERS_STORAGE_KEY, JSON.stringify([newSub, ...subscribers]));
    notifyDataChanged();
    return true;
  },

  deleteSubscriber(id: string): boolean {
    const subscribers = this.getSubscribers();
    const updated = subscribers.filter((s) => s.id !== id);
    localStorage.setItem(SUBSCRIBERS_STORAGE_KEY, JSON.stringify(updated));
    notifyDataChanged();
    return true;
  },

  exportAttendeesCSV(): void {
    const attendees = this.getAttendees();
    if (attendees.length === 0) return;

    const headers = [
      'Ticket ID',
      'Full Name',
      'Email',
      'Roll Number',
      'College',
      'Branch',
      'Year',
      'Superhero Archetype',
      'Team Type',
      'Team Name',
      'Track',
      'Status',
      'GitHub',
      'LinkedIn',
      'Registered Date',
    ];

    const rows = attendees.map((a) => [
      `"${a.ticketId}"`,
      `"${a.fullName.replace(/"/g, '""')}"`,
      `"${a.email}"`,
      `"${a.rollNumber}"`,
      `"${a.college.replace(/"/g, '""')}"`,
      `"${a.branch.replace(/"/g, '""')}"`,
      `"${a.year}"`,
      `"${a.marvelArchetype}"`,
      `"${a.teamType}"`,
      `"${(a.teamName || 'Solo').replace(/"/g, '""')}"`,
      `"${TRACK_NAMES[a.track].replace(/"/g, '""')}"`,
      `"${a.status}"`,
      `"${a.githubUrl || ''}"`,
      `"${a.linkedinUrl || ''}"`,
      `"${new Date(a.registeredAt).toLocaleString()}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `gfg_bennett_infinity_attendees_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  exportSubscribersCSV(): void {
    const subs = this.getSubscribers();
    if (subs.length === 0) return;

    const headers = ['Subscriber ID', 'Email Address', 'Subscribed Date', 'Source'];
    const rows = subs.map((s) => [
      `"${s.id}"`,
      `"${s.email}"`,
      `"${new Date(s.subscribedAt).toLocaleString()}"`,
      `"${s.source}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `gfg_bennett_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  subscribeRealtime(callback: () => void): () => void {
    const handleStorage = (event: StorageEvent) => {
      if (
        event.key === ATTENDEES_STORAGE_KEY ||
        event.key === EMAILS_STORAGE_KEY ||
        event.key === SUBSCRIBERS_STORAGE_KEY
      ) {
        callback();
      }
    };

    const handleBroadcast = (event: MessageEvent) => {
      if (event.data?.type === 'DB_UPDATED') {
        callback();
      }
    };

    window.addEventListener('storage', handleStorage);
    if (broadcastChannel) {
      broadcastChannel.addEventListener('message', handleBroadcast);
    }

    return () => {
      window.removeEventListener('storage', handleStorage);
      if (broadcastChannel) {
        broadcastChannel.removeEventListener('message', handleBroadcast);
      }
    };
  },
};
