import React, { useState } from 'react';
import { X, Download, Github, Check, Terminal, FileCode, Sparkles, FolderArchive } from 'lucide-react';
import { generateProjectZip } from '../services/projectDownloader';

interface ProjectDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDownloadModal: React.FC<ProjectDownloadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedGit, setCopiedGit] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const blob = await generateProjectZip();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'GFG_Bennett_Infinity_Protocol_Project.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to generate project zip:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const gitSnippet = `# 1. Extract zip and navigate inside:
cd gfg-bennett-infinity-protocol

# 2. Initialize Git repository:
git init

# 3. Add all project files:
git add .

# 4. Commit:
git commit -m "feat: GFG Bennett Infinity Protocol Hackathon Platform"

# 5. Set branch & remote (replace with your repo URL):
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/gfg-bennett-infinity-protocol.git

# 6. Push to GitHub:
git push -u origin main`;

  const handleCopyGit = () => {
    navigator.clipboard.writeText(gitSnippet);
    setCopiedGit(true);
    setTimeout(() => setCopiedGit(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto text-left">
      <div className="bg-[#090e1a] border border-cyan-500/50 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-[#090e1a]/95 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-emerald-950 border border-emerald-600/60 text-emerald-400">
              <FolderArchive className="w-5 h-5" />
            </span>
            <div>
              <div className="text-[10px] font-hud uppercase tracking-widest text-cyan-400 font-bold">
                GFG Chapter Interview Submission
              </div>
              <h3 className="font-marvel font-bold text-lg text-white">
                Download Project Codebase & GitHub Repo
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <p className="text-xs text-slate-300 leading-relaxed">
            Download the complete, self-contained project package bundled with all components, custom Marvel Avengers x Bennett HD logos, styles, real-time database, QR generator, and documentation ready for your <strong>GeeksForGeeks Student Chapter, Bennett University</strong> interview round.
          </p>

          {/* Download Action Card */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-[#0d1627] to-[#09101d] border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-marvel font-bold text-sm text-white">
                GFG_Bennett_Infinity_Protocol_Project.zip
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Complete React 19 + TypeScript + Tailwind CSS v4 codebase
              </div>
            </div>

            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-marvel font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] shrink-0 disabled:opacity-50"
            >
              {isGenerating ? (
                <span>Packing Multiverse Code...</span>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Download Started!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Full ZIP</span>
                </>
              )}
            </button>
          </div>

          {/* GitHub Push Instructions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-hud uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                <Github className="w-4 h-4 text-white" />
                <span>Commands to Push to Your Personal GitHub Repository:</span>
              </span>

              <button
                onClick={handleCopyGit}
                className="text-[11px] font-semibold text-cyan-300 hover:text-white flex items-center gap-1"
              >
                {copiedGit ? <Check className="w-3 h-3 text-emerald-400" /> : <Terminal className="w-3 h-3" />}
                <span>{copiedGit ? 'Commands Copied!' : 'Copy Script'}</span>
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre leading-relaxed">
              {gitSnippet}
            </div>
          </div>

          {/* Included Files Checklist */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
            <div className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
              Package Contents Included in ZIP:
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-300 text-[11px] font-mono">
              <div>✓ README.md (Interview spec)</div>
              <div>✓ Working QR Code generator</div>
              <div>✓ package.json & tsconfig.json</div>
              <div>✓ Real-time LocalStorage DB</div>
              <div>✓ Vite & Tailwind CSS v4 setup</div>
              <div>✓ S.H.I.E.L.D. Admin Console</div>
              <div>✓ B.Com & 1st-4th Year schema</div>
              <div>✓ Mandatory GitHub/LinkedIn</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
