import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Who is eligible to assemble for Infinity Protocol?',
      a: 'All currently enrolled undergraduate and postgraduate students from Bennett University, as well as students from all other universities and engineering colleges across India! Both solo operatives and teams of 2 to 4 members are welcome.',
    },
    {
      q: 'Is there any registration fee to participate?',
      a: 'Zero. Infinity Protocol is 100% free of charge. GeeksForGeeks Student Chapter, Bennett University and our sponsors cover all hackathon resources, meals, refreshments, swag, and access to developer armories.',
    },
    {
      q: 'Can beginners or first-year students participate?',
      a: 'Absolutely! We even have a dedicated "Best Freshman Avengers Team" prize category (₹10,000 cash grant) along with round-the-clock mentorship from senior student developers, alumni, and industry experts.',
    },
    {
      q: 'What is the format of the hackathon (Online or On-Campus)?',
      a: 'Infinity Protocol features a hybrid Multiverse format: On-campus hacking at the Bennett University campus in Greater Noida, UP, alongside an interconnected virtual Discord portal for remote strike teams.',
    },
    {
      q: 'How does team formation work?',
      a: 'You can register directly as a squad with a team codename, or register as a Solo Operative and use our Multiverse Discord / WhatsApp team-building channel to find like-minded teammates before the event kickoff.',
    },
    {
      q: 'When will problem statements be uploaded and how does the timeline work?',
      a: 'Official problem statements are decrypted and uploaded 2 days before Round 1 Evaluation. Day 1 kicks off promptly at 10:00 AM IST on campus with mentor architecture reviews. Day 2 features the professional evaluation round and final pitching, followed by Day 3 with the Grand Finale and ₹1,50,000+ prize ceremony!',
    },
  ];

  return (
    <section id="faqs" className="py-24 bg-[#070b16] border-b border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-cyan-400 font-hud font-bold mb-2">
            Mission Clarifications
          </div>
          <h2 className="font-marvel text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Frequently Answered Transmissions
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Everything you need to know about the flagship GeeksForGeeks Bennett hackathon.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-800/80 bg-slate-900/50 overflow-hidden transition-colors hover:border-slate-700"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white focus:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-marvel text-cyan-400 text-xs font-bold font-mono">
                      Q{idx + 1}.
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
