import React, { useState } from 'react';
import { Star, CheckCircle2, Quote, Building2, GraduationCap, UserCheck, ArrowUpRight } from 'lucide-react';

interface TestimonialItem {
  id: string;
  category: 'candidate' | 'institution';
  name: string;
  role: string;
  organization: string;
  badge: string;
  quote: string;
  outcome: string;
  metric: string;
  initials: string;
  gradient: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'c1',
    category: 'candidate',
    name: 'Marcus Vance',
    role: 'Senior Distributed Systems Engineer',
    organization: 'Hired at Stripe (Infrastructure L5)',
    badge: 'Candidate Success',
    quote:
      'PrepMind pointed out that whenever I was pressed on partition tolerances, my speech rate spiked to 175 WPM and I used passive phrasing ("we handled it"). After 4 simulator sessions, my pacing locked at 140 WPM with clear ownership. I passed all 5 onsite rounds.',
    outcome: 'Offer Accepted · Distributed Storage Team',
    metric: '94/100 Readiness Score',
    initials: 'MV',
    gradient: 'from-indigo-500 to-violet-600',
  },
  {
    id: 'i1',
    category: 'institution',
    name: 'Dr. Aris Thorne',
    role: 'Dean of Career Advancement',
    organization: 'Midwest Technological University',
    badge: 'University Partner',
    quote:
      'With a 1:380 counselor ratio, our staff could never give personalized behavioral mock interviews to 2,000+ graduating engineers. Interview Prep Guru gave every senior unlimited calibrated practice. Our corporate campus offer conversion jumped by 34% in one semester.',
    outcome: 'Campus Offer Rate: 62% → 83%',
    metric: '2,400+ Students Coached',
    initials: 'AT',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    id: 'c2',
    category: 'candidate',
    name: 'Ananya Sharma',
    role: 'AI Product Lead',
    organization: 'Hired at Scale AI (Platform Team)',
    badge: 'Candidate Success',
    quote:
      'Traditional mock tools just evaluate whether you mention buzzwords. PrepMind challenged my assumptions when my metrics were vague: "How would that trade-off affect your gross margins?" That exact line of questioning came up in my executive bar-raiser.',
    outcome: 'Offer Accepted · Lead Product Manager',
    metric: '92/100 Specificity Index',
    initials: 'AS',
    gradient: 'from-sky-500 to-indigo-600',
  },
  {
    id: 'i2',
    category: 'institution',
    name: 'Rachel Sterling',
    role: 'Head of Global Technical Talent',
    organization: 'Apex FinTech Global',
    badge: 'Enterprise Talent Partner',
    quote:
      'We replaced redundant 30-minute first-round screening calls with calibrated PrepMind sessions. Hiring managers receive a 3-minute executive highlight dossier with timestamped trade-off discussions. We saved 380 senior engineering hours in Q3 alone.',
    outcome: 'Screening Cycle: 18 days → 4 days',
    metric: '68% Recruiter Hours Saved',
    initials: 'RS',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'c3',
    category: 'candidate',
    name: 'David O\'Connor',
    role: 'Management Consultant',
    organization: 'Hired at MBB Strategy Advisory',
    badge: 'Candidate Success',
    quote:
      'Case interviews require razor-sharp MECE top-down communication. The live spectrogram feedback showed me when my tone lost resonance and where my structuring broke down. It cured my imposter syndrome before the final partner round.',
    outcome: 'Offer Accepted · Strategy Engagement Manager',
    metric: '98% STAR Adherence',
    initials: 'DO',
    gradient: 'from-amber-500 to-indigo-600',
  },
  {
    id: 'i3',
    category: 'institution',
    name: 'Elena Rostova',
    role: 'Director of Placement & Industry Relations',
    organization: 'NextGen Engineering Academy',
    badge: 'Bootcamp Partner',
    quote:
      'Our graduates have strong coding skills but frequently stumbled when explaining architecture trade-offs under stress. Providing objective Employability Score dossiers to our hiring partners turned cold outreach into instant onsite invitations.',
    outcome: 'Median Time-to-Offer: 28 Days',
    metric: '91% Graduate Placement',
    initials: 'ER',
    gradient: 'from-fuchsia-500 to-indigo-600',
  },
];

export const Testimonials: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'candidate' | 'institution'>('all');

  const filteredTestimonials =
    filter === 'all' ? TESTIMONIALS : TESTIMONIALS.filter((t) => t.category === filter);

  return (
    <section className="mb-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
              Verified Social Proof
            </span>
            <span className="text-slate-400 text-xs">·</span>
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <h2 className="font-display fluid-h2 text-2xl sm:text-3xl font-extrabold text-slate-950">
            Real Outcomes from Candidates & Partners
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            From premier tech offers to campus-wide career transformations, see how multimodal employability intelligence creates tangible career velocity.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex flex-wrap sm:inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold self-start sm:self-auto shadow-2xs gap-1 max-w-full">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer min-h-[36px] ${
              filter === 'all'
                ? 'bg-white text-indigo-950 font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Stories (6)
          </button>
          <button
            onClick={() => setFilter('candidate')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer min-h-[36px] ${
              filter === 'candidate'
                ? 'bg-white text-indigo-950 font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Candidates</span>
          </button>
          <button
            onClick={() => setFilter('institution')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer min-h-[36px] ${
              filter === 'institution'
                ? 'bg-white text-indigo-950 font-bold shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Institutions & Enterprise</span>
          </button>
        </div>
      </div>

      {/* Testimonials Grid with glass-premium styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((item) => (
          <div
            key={item.id}
            className="glass-premium rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/90 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Ambient Background Aura on hover */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/30 rounded-full blur-2xl group-hover:scale-125 transition-transform pointer-events-none"></div>

            <div>
              {/* Header: Avatar, Name, Role, and Verified Tag */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${item.gradient} text-white font-display font-bold text-sm flex items-center justify-center shadow-md shadow-indigo-500/15`}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-display text-sm font-bold text-slate-950">{item.name}</h4>
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">{item.role}</p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    item.category === 'candidate'
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      : 'bg-violet-50 text-violet-700 border-violet-200'
                  }`}
                >
                  {item.badge}
                </span>
              </div>

              {/* Organization / Offer context */}
              <div className="text-xs font-semibold text-slate-800 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 mb-4 flex flex-col xs:flex-row xs:items-center justify-between gap-1">
                <span className="truncate">{item.organization}</span>
                <span className="text-[10px] font-mono text-indigo-600 font-bold shrink-0">{item.metric}</span>
              </div>

              {/* Quote Body */}
              <p className="text-xs text-slate-600 leading-relaxed font-normal italic relative">
                "{item.quote}"
              </p>
            </div>

            {/* Footer Outcome Banner */}
            <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{item.outcome}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
