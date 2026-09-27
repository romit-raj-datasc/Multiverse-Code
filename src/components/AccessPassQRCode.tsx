import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Download, QrCode as QrIcon, Check, Copy, ExternalLink } from 'lucide-react';
import { Attendee } from '../types';

interface AccessPassQRCodeProps {
  attendee: Attendee;
  size?: number;
  className?: string;
  showDownloadButton?: boolean;
}

export const AccessPassQRCode: React.FC<AccessPassQRCodeProps> = ({
  attendee,
  size = 180,
  className = '',
  showDownloadButton = true,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);

  // Generate payload for verification
  // Can be scanned by any smartphone camera or event scanner!
  const qrPayload = JSON.stringify({
    event: 'GFG_BENNETT_INFINITY_PROTOCOL_2026',
    ticketId: attendee.ticketId,
    name: attendee.fullName,
    roll: attendee.rollNumber,
    college: attendee.college,
    branch: attendee.branch,
    year: attendee.year,
    track: attendee.track,
    role: attendee.marvelArchetype,
    team: attendee.teamName || 'Solo',
    github: attendee.githubUrl,
    linkedin: attendee.linkedinUrl,
    status: attendee.status,
    verifiedAt: attendee.registeredAt,
  });

  useEffect(() => {
    QRCode.toDataURL(
      qrPayload,
      {
        width: size * 2,
        margin: 1.5,
        color: {
          dark: '#030712', // deep slate/black
          light: '#38bdf8', // radiant cyan/arc reactor glow background
        },
        errorCorrectionLevel: 'M',
      },
      (err, url) => {
        if (!err && url) {
          setQrDataUrl(url);
        }
      }
    );
  }, [qrPayload, size]);

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `${attendee.ticketId}_QR_PASS.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyTicket = () => {
    navigator.clipboard.writeText(attendee.ticketId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Outer Holographic Reticle */}
      <div className="relative p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500/30 via-slate-800/80 to-emerald-500/30 border border-cyan-400/50 shadow-[0_0_25px_rgba(6,182,212,0.3)]">
        {/* Corner Target Reticles */}
        <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400 rounded-br-sm pointer-events-none" />

        {qrDataUrl ? (
          <img
            src={qrDataUrl}
            alt={`Access Pass QR for ${attendee.fullName} - ${attendee.ticketId}`}
            className="rounded-xl shadow-inner transition-transform duration-200 hover:scale-105"
            style={{ width: size, height: size }}
          />
        ) : (
          <div
            className="flex items-center justify-center bg-slate-900 rounded-xl animate-pulse text-xs text-cyan-400 font-mono"
            style={{ width: size, height: size }}
          >
            Generating QR...
          </div>
        )}
      </div>

      {/* Ticket ID & Verification Notice */}
      <div className="mt-2.5 text-center">
        <button
          onClick={handleCopyTicket}
          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-cyan-300 bg-cyan-950/80 hover:bg-cyan-900/80 px-2.5 py-1 rounded border border-cyan-800/80 transition-colors"
          title="Click to copy Ticket ID"
        >
          <span>{attendee.ticketId}</span>
          {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-cyan-400" />}
        </button>
        <div className="text-[10px] text-slate-400 font-hud tracking-wide mt-1">
          Scan with any mobile camera at Bennett entry gate
        </div>
      </div>

      {/* Download QR Button */}
      {showDownloadButton && (
        <button
          onClick={handleDownloadQR}
          className="mt-3 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Save QR Pass Image</span>
        </button>
      )}
    </div>
  );
};
