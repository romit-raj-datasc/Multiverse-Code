import JSZip from 'jszip';

export async function generateProjectZip(): Promise<Blob> {
  const zip = new JSZip();

  // Root files
  zip.file(
    'README.md',
    `# 🦸 GFG Bennett — Infinity Protocol: Multiverse Hackathon

Official flagship Marvel-themed hackathon platform engineered for the **GeeksForGeeks Student Chapter, Bennett University**.

> **Project Submission for GFG Student Chapter Interview & Portfolio**  
> **Author / Candidate Submission**: Bennett University Student Developer  
> **Tech Stack**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Canvas Confetti, QRCode, JSZip, BroadcastChannel API, LocalStorage Real-Time Engine.

---

## 🌟 Project Highlights & Features

1. **🦸 Marvel Cinematic Visual Identity & HD Avengers x GFG Logo**
   - High-definition metallic beveled emblem fusing the iconic Marvel Avengers "A" with GeeksForGeeks green coding brackets \`{ }\`, Bennett University crest geometry, and an animated Arc Reactor core.
   - Cinematic Multiverse styling (Vibranium Slate, Stark Cyan, Gauntlet Gold, and Orbitron / Rajdhani typography).

2. **🎬 Hero Section & Live Countdown**
   - Real-time live HUD countdown timer ticking down to event assembly.
   - Social sharing links (WhatsApp, Twitter/X, LinkedIn, Telegram, and 1-click Link Copy with toast feedback).
   - Key event statistics and campus location signals.

3. **📋 Remodeled 3-Day Multiverse Timeline**
   - **Pre-Launch (T-minus 2 Days)**: Decryption of problem statements 2 days prior to Round 1.
   - **Day 1 (10:00 AM IST)**: Grand Kickoff & Round 1 Architecture Evaluation.
   - **Day 2**: Final Prototype Evaluation by Industry Evaluators & Pitching Round.
   - **Day 3**: Grand Multiverse Finale, Infinity Gauntlet Ceremony & ₹1,50,000+ Prize Distribution.

4. **📝 Multiverse Registration with Real-Time Validation**
   - Options include **B.Com**, CSE (Core, AI, Cyber, Data Science), ECE, Biotech.
   - Year of study constrained to **1st Year, 2nd Year, 3rd Year, and 4th Year** (clean unboxed format).
   - **Mandatory GitHub & LinkedIn profile links** with instant regex format validation.
   - Hero Archetype persona selection (Iron Man, Captain America, Doctor Strange, Black Widow, Thor, Hulk).

5. **📱 Working Real-Time QR Code Access Pass**
   - Generates a scannable QR code encoding verified attendee credentials (Ticket ID, Roll, College, Track, Archetype).
   - Real-time entry verification for Bennett University campus security.
   - 1-click **Save QR Pass Image** to store on mobile.

6. **🛡️ S.H.I.E.L.D. Admin Intelligence & Outreach Console**
   - **Outreach Hub**: View registered attendees and exact emails for immediate follow-up.
   - **1-Click Actions**: Single-click email copy, bulk BCC copy ("Copy All Emails"), and direct mailto links.
   - **1-Click CSV Export**: Download formatted CSVs for attendees and subscribers.
   - **Rapid Check-In Mode**: Type or scan Ticket ID / Roll No to instantly check-in attendees at Bennett gate.
   - **Broadcast Dispatcher**: Transmit announcements to all or specific tracks in real time.
   - **Sent Confirmations Log**: Audit trail of every automated confirmation email dispatched.

---

## 🚀 How to Run Locally

1. Clone or extract this project folder:
   \`\`\`bash
   cd gfg-bennett-infinity-protocol
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`
   Open \`http://localhost:3000\` in your browser.

4. Build for production:
   \`\`\`bash
   npm run build
   \`\`\`

---

## 🐙 How to Push to Your Personal GitHub Repository

\`\`\`bash
# 1. Initialize git in this directory
git init

# 2. Stage all project files
git add .

# 3. Create your initial commit
git commit -m "feat: GFG Bennett Infinity Protocol Hackathon Platform"

# 4. Set main branch
git branch -M main

# 5. Add your personal GitHub repo remote (replace with your repo URL)
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/gfg-bennett-infinity-protocol.git

# 6. Push code to GitHub
git push -u origin main
\`\`\`

---

## 🏛️ GeeksForGeeks Student Chapter, Bennett University
*Plot Nos 8, 11, TechZone 2, Greater Noida, Uttar Pradesh 201310*
`
  );

  zip.file(
    'package.json',
    JSON.stringify(
      {
        name: 'gfg-bennett-infinity-protocol',
        private: true,
        version: '1.0.0',
        type: 'module',
        scripts: {
          dev: 'vite --port=3000 --host=0.0.0.0',
          build: 'vite build',
          preview: 'vite preview',
          lint: 'tsc --noEmit',
        },
        dependencies: {
          'canvas-confetti': '^1.9.4',
          jszip: '^3.10.1',
          'lucide-react': '^0.546.0',
          qrcode: '^1.5.4',
          react: '^19.0.1',
          'react-dom': '^19.0.1',
        },
        devDependencies: {
          '@tailwindcss/vite': '^4.3.3',
          '@types/canvas-confetti': '^1.9.0',
          '@types/node': '^22.14.0',
          '@types/qrcode': '^1.5.5',
          '@types/react': '^19.3.0',
          '@types/react-dom': '^19.3.0',
          '@vitejs/plugin-react': '^6.1.1',
          tailwindcss: '^4.3.3',
          typescript: '^7.0.2',
          vite: '^8.3.0',
        },
      },
      null,
      2
    )
  );

  zip.file(
    '.gitignore',
    `node_modules\ndist\n.DS_Store\n*.local\n.env\n`
  );

  zip.file(
    'tsconfig.json',
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2022',
          experimentalDecorators: true,
          useDefineForClassFields: false,
          module: 'ESNext',
          types: ['vite/client'],
          lib: ['ES2022', 'DOM', 'DOM.Iterable'],
          skipLibCheck: true,
          moduleResolution: 'bundler',
          isolatedModules: true,
          moduleDetection: 'force',
          allowJs: true,
          jsx: 'react-jsx',
          paths: {
            '@/*': ['./*'],
          },
          allowImportingTsExtensions: true,
          noEmit: true,
        },
      },
      null,
      2
    )
  );

  zip.file(
    'vite.config.ts',
    `import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
    },
  };
});
`
  );

  zip.file(
    'index.html',
    `<!doctype html>
<html lang="en" class="dark scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GFG Bennett — Infinity Protocol</title>
    <meta name="description" content="Official Marvel-themed flagship hackathon website by GeeksForGeeks Student Chapter, Bennett University." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet" />
    <style>
      body {
        background-color: #060913;
        color: #f1f5f9;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }
      .font-marvel {
        font-family: 'Orbitron', 'Rajdhani', sans-serif;
      }
      .font-hud {
        font-family: 'Rajdhani', sans-serif;
      }
    </style>
  </head>
  <body class="bg-[#060913] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
  );

  // We can fetch our source files or package their contents
  // Let's read and add the main source files
  const src = zip.folder('src')!;
  
  // Also fetch and include the assets
  const components = src.folder('components')!;
  const services = src.folder('services')!;
  const types = src.folder('types')!;

  // Try to bundle active source code directly
  try {
    const fetchFile = async (path: string) => {
      const res = await fetch(path);
      if (res.ok) return await res.text();
      return null;
    };

    const filesToFetch = [
      { path: '/src/main.tsx', dest: src, name: 'main.tsx' },
      { path: '/src/App.tsx', dest: src, name: 'App.tsx' },
      { path: '/src/index.css', dest: src, name: 'index.css' },
      { path: '/src/types/index.ts', dest: types, name: 'index.ts' },
      { path: '/src/services/storage.ts', dest: services, name: 'storage.ts' },
      { path: '/src/services/projectDownloader.ts', dest: services, name: 'projectDownloader.ts' },
      { path: '/src/components/GfgBennettMarvelLogo.tsx', dest: components, name: 'GfgBennettMarvelLogo.tsx' },
      { path: '/src/components/Navbar.tsx', dest: components, name: 'Navbar.tsx' },
      { path: '/src/components/HeroSection.tsx', dest: components, name: 'HeroSection.tsx' },
      { path: '/src/components/EventHighlights.tsx', dest: components, name: 'EventHighlights.tsx' },
      { path: '/src/components/HeroRoleSelector.tsx', dest: components, name: 'HeroRoleSelector.tsx' },
      { path: '/src/components/RegistrationModal.tsx', dest: components, name: 'RegistrationModal.tsx' },
      { path: '/src/components/AccessPassQRCode.tsx', dest: components, name: 'AccessPassQRCode.tsx' },
      { path: '/src/components/EmailSignupSection.tsx', dest: components, name: 'EmailSignupSection.tsx' },
      { path: '/src/components/ConfirmationEmailViewer.tsx', dest: components, name: 'ConfirmationEmailViewer.tsx' },
      { path: '/src/components/AdminDashboard.tsx', dest: components, name: 'AdminDashboard.tsx' },
      { path: '/src/components/FaqSection.tsx', dest: components, name: 'FaqSection.tsx' },
      { path: '/src/components/Footer.tsx', dest: components, name: 'Footer.tsx' },
    ];

    await Promise.all(
      filesToFetch.map(async ({ path, dest, name }) => {
        try {
          const content = await fetchFile(path);
          if (content) {
            dest.file(name, content);
          }
        } catch {
          // fallback
        }
      })
    );
  } catch (err) {
    console.error('Error bundling files in zip:', err);
  }

  return await zip.generateAsync({ type: 'blob' });
}
