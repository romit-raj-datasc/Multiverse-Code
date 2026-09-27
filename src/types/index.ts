export type MarvelArchetype = 
  | 'iron-man' // Full-Stack Architect
  | 'captain-america' // Team Strategist / Lead
  | 'doctor-strange' // AI & Quantum Sorcerer
  | 'black-widow' // Cybersecurity Specialist
  | 'thor' // Cloud & DevOps Master
  | 'hulk'; // High-Performance Systems & Algo

export type TrackType = 
  | 'quantum-ai' 
  | 'stark-cloud' 
  | 'wakanda-cyber' 
  | 'shield-algorithms';

export type AttendeeStatus = 'confirmed' | 'waitlisted' | 'checked-in';

export interface Attendee {
  id: string;
  fullName: string;
  email: string;
  rollNumber: string;
  college: string;
  branch: string;
  year: string;
  marvelArchetype: MarvelArchetype;
  teamType: 'solo' | 'team';
  teamName?: string;
  track: TrackType;
  githubUrl: string;
  linkedinUrl: string;
  newsletterOptIn: boolean;
  registeredAt: string;
  status: AttendeeStatus;
  ticketId: string;
}

export interface SentEmail {
  id: string;
  attendeeId: string;
  toEmail: string;
  toName: string;
  subject: string;
  sentAt: string;
  status: 'sent' | 'delivered';
  ticketId: string;
  trackName: string;
  previewText: string;
}

export interface QuickSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  source: string;
}
