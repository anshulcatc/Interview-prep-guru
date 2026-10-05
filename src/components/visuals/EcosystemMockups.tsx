import React from 'react';
import { UserCheck, GraduationCap, Briefcase, CheckCircle2, TrendingUp, Award, BarChart3, Users, Clock } from 'lucide-react';

interface EcosystemMockupsProps {
  activeTab: 'candidates' | 'institutions' | 'hiring';
  roleTitle: string;
}

export const EcosystemMockups: React.FC<EcosystemMockupsProps> = ({ activeTab, roleTitle }) => {
  if (activeTab === 'candidates') {
    return (
      <div className="w-full rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        {/* Candidate Dashboard Preview Card */}
        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">
              JD
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">Your Employability Dossier</div>
              <div className="text-[10px] text-slate-500 font-mono truncate">Calibrated to: {roleTitle}</div>
            </div>
          </div>
          <span className="text-[10px] xs:text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200 shrink-0 self-start xs:self-auto">
            READY TO HIRE
          </span>
        </div>

        {/* Visual score meter */}
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-3 text-center">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="font-display text-2xl font-black text-indigo-600">88%</div>
            <div className="text-[10px] font-medium text-slate-500 mt-0.5">Overall Index</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="font-display text-2xl font-black text-violet-600">138</div>
            <div className="text-[10px] font-medium text-slate-500 mt-0.5">Optimal WPM</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="font-display text-2xl font-black text-emerald-600">96%</div>
            <div className="text-[10px] font-medium text-slate-500 mt-0.5">STAR Framing</div>
          </div>
        </div>

        {/* Milestone feedback */}
        <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <Award className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="text-slate-800 font-medium truncate">Earned: Senior Systems Readiness Badge</span>
          </div>
          <span className="text-indigo-700 font-mono font-bold text-[10px] shrink-0">Verified</span>
        </div>
      </div>
    );
  }

  if (activeTab === 'institutions') {
    return (
      <div className="w-full rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        {/* University Cohort Preview Card */}
        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center font-bold text-xs shrink-0">
              CS
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">Department Placement Radar</div>
              <div className="text-[10px] text-slate-500 font-mono truncate">Cohort 2026 · 2,480 Active Students</div>
            </div>
          </div>
          <span className="text-[10px] xs:text-[11px] font-mono text-violet-700 bg-violet-50 px-2 py-0.5 rounded font-bold border border-violet-200 shrink-0 self-start xs:self-auto">
            +38.4% PLACEMENT
          </span>
        </div>

        {/* Visual Chart Bars */}
        <div className="space-y-2.5 text-xs">
          <div>
            <div className="flex justify-between text-[11px] text-slate-600 mb-1 gap-2">
              <span className="truncate">Distributed Systems Track (Senior)</span>
              <span className="font-mono font-bold text-slate-900 shrink-0">84% Ready</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-[84%] h-full bg-violet-600 rounded-full"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-slate-600 mb-1 gap-2">
              <span className="truncate">Product & Strategy Track</span>
              <span className="font-mono font-bold text-slate-900 shrink-0">79% Ready</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-[79%] h-full bg-indigo-600 rounded-full"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-slate-600 mb-1 gap-2">
              <span className="truncate">Quantitative Finance Track</span>
              <span className="font-mono font-bold text-slate-900 shrink-0">91% Ready</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-[91%] h-full bg-emerald-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-violet-50/60 rounded-xl border border-violet-100 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <TrendingUp className="w-4 h-4 text-violet-600 shrink-0" />
            <span className="text-slate-800 font-medium truncate">14.2 Days Faster Time-to-Offer across campus</span>
          </div>
          <span className="text-violet-700 font-mono font-bold text-[10px] shrink-0">Accredited</span>
        </div>
      </div>
    );
  }

  // Hiring Teams
  return (
    <div className="w-full rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
      {/* ATS Pipeline Preview Card */}
      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xs shrink-0">
            ATS
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-900 truncate">Automated Screening Funnel</div>
            <div className="text-[10px] text-slate-500 font-mono truncate">Synced: Greenhouse · Lever · Ashby</div>
          </div>
        </div>
        <span className="text-[10px] xs:text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200 shrink-0 self-start xs:self-auto">
          68% HOURS SAVED
        </span>
      </div>

      {/* Visual Pipeline Funnel */}
      <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
          <div className="font-mono font-bold text-slate-900 text-sm">412</div>
          <div className="text-[10px] text-slate-500">Inbound Apps</div>
        </div>
        <div className="p-2.5 bg-indigo-50/80 rounded-xl border border-indigo-100">
          <div className="font-mono font-bold text-indigo-700 text-sm">24</div>
          <div className="text-[10px] text-indigo-600 font-medium">AI Shortlist</div>
        </div>
        <div className="p-2.5 bg-emerald-50/80 rounded-xl border border-emerald-100">
          <div className="font-mono font-bold text-emerald-700 text-sm">83%</div>
          <div className="text-[10px] text-emerald-600 font-medium">Onsite Offer</div>
        </div>
      </div>

      <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-100 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <Clock className="w-4 h-4 text-sky-600 shrink-0" />
          <span className="text-slate-800 font-medium truncate">Zero interviewer fatigue or subconscious bias</span>
        </div>
        <span className="text-sky-700 font-mono font-bold text-[10px] shrink-0">Verified Bar</span>
      </div>
    </div>
  );
};
