import React from 'react';
import { SubdomainId } from '../../types';
import { SignalLostDiagram } from '../visuals/SignalLostDiagram';
import { ArrowRight, AlertTriangle, ShieldAlert, ArrowLeft, MicOff, EyeOff, FileText, TrendingDown } from 'lucide-react';

interface ProblemViewProps {
  onNavigateSubdomain: (id: SubdomainId) => void;
  onOpenRoleModal: () => void;
}

export const ProblemView: React.FC<ProblemViewProps> = ({ onNavigateSubdomain, onOpenRoleModal }) => {
  return (
    <div className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background accents */}
      <div className="absolute inset-0 bg-mesh-light pointer-events-none -z-10 opacity-70"></div>
      <div className="absolute inset-0 dot-pattern pointer-events-none -z-10 opacity-30"></div>

      {/* Subdomain Header */}
      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2.5 mb-6 pb-3 border-b border-slate-200/80">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-mono text-slate-500 min-w-0 max-w-full">
          <button
            onClick={() => onNavigateSubdomain('overview')}
            className="hover:text-indigo-600 transition-colors font-medium truncate"
          >
            hub.interviewprepguru.ai
          </button>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-slate-900 bg-white px-2 sm:px-2.5 py-0.5 rounded border border-slate-200 shadow-2xs truncate">
            problem.interviewprepguru.ai
          </span>
        </div>
        <button
          onClick={() => onNavigateSubdomain('multimodal')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-950 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-full transition-colors border border-indigo-200 shrink-0 self-start xs:self-auto cursor-pointer"
        >
          <span>Next: Multimodal Layer</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Headline */}
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs mb-4">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          <span>01 · THE EMPLOYABILITY INSIGHT</span>
        </div>

        <h1 className="font-display fluid-h1 text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mb-4 leading-tight">
          AI Can Process Words, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-indigo-600">
            But Cannot Understand People.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal">
          70% of evaluation in high-stakes interviews occurs outside words: vocal tremors, defensive cadence, cognitive hesitation, and authentic conviction.
        </p>
      </div>

      {/* 42.6% Stat Card (Visual Infographic format) */}
      <div className="glass-premium rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-8 mb-10 border border-rose-200/80 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-200/80 pb-6 md:pb-0 md:pr-6">
            <div className="font-display text-5xl sm:text-6xl font-black text-rose-600 tracking-tight">
              42.6%
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mt-1">
              Global Graduate Employability Index
            </div>
            <div className="text-[11px] font-mono text-rose-700 font-semibold mt-1">
              57.4% Fail at Behavioral Synthesis
            </div>
          </div>

          {/* Breakdown bars */}
          <div className="md:col-span-8 space-y-3 text-xs">
            <div className="font-bold text-slate-900 text-sm mb-1">
              Why Candidates Fail High-Stakes Screenings:
            </div>
            <div>
              <div className="flex justify-between items-center text-slate-600 mb-1 gap-2">
                <span>Inability to structure answers under pressure (STAR)</span>
                <span className="font-mono font-bold text-rose-600 shrink-0">38%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[38%] h-full bg-rose-500 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center text-slate-600 mb-1 gap-2">
                <span>Speech pacing & nervous filler word frequency (&gt;5%)</span>
                <span className="font-mono font-bold text-amber-600 shrink-0">32%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[32%] h-full bg-amber-500 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center text-slate-600 mb-1 gap-2">
                <span>Vague responses when challenged by follow-up probes</span>
                <span className="font-mono font-bold text-indigo-600 shrink-0">30%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[30%] h-full bg-indigo-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Diagram: Signal Lost vs Multimodal Engine */}
      <div className="mb-10">
        <SignalLostDiagram />
      </div>

      {/* Bottom Subdomain Navigation */}
      <div className="p-4 sm:p-5 rounded-2xl glass-premium border border-slate-200/90 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        <button
          onClick={() => onNavigateSubdomain('overview')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-950 bg-white sm:bg-transparent border sm:border-transparent border-slate-200 rounded-xl transition-colors cursor-pointer min-h-[40px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Hub Overview</span>
        </button>

        <button
          onClick={() => onNavigateSubdomain('multimodal')}
          className="shimmer-btn inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-95 rounded-xl shadow-md shadow-indigo-500/20 transition-all cursor-pointer min-h-[40px]"
        >
          <span>Continue to Multimodal Layer</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
