import React from 'react';
import { SubdomainId } from '../../types';
import { Shield, Check, X, ArrowLeft, ArrowRight, PlayCircle, Building2, Sparkles, Trophy } from 'lucide-react';

interface MoatViewProps {
  onNavigateSubdomain: (id: SubdomainId) => void;
  onStartPractice: () => void;
  onOpenDemoModal: () => void;
}

export const MoatView: React.FC<MoatViewProps> = ({
  onNavigateSubdomain,
  onStartPractice,
  onOpenDemoModal,
}) => {
  return (
    <div className="relative py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background accents */}
      <div className="absolute inset-0 bg-mesh-light pointer-events-none -z-10 opacity-70"></div>
      <div className="absolute inset-0 dot-pattern pointer-events-none -z-10 opacity-30"></div>

      {/* Subdomain Header */}
      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2.5 mb-8 pb-4 border-b border-slate-200/80">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-mono text-slate-500 min-w-0 max-w-full">
          <button
            onClick={() => onNavigateSubdomain('overview')}
            className="hover:text-indigo-600 transition-colors font-medium truncate"
          >
            hub.interviewprepguru.ai
          </button>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-slate-900 bg-white px-2 sm:px-2.5 py-0.5 rounded border border-slate-200 shadow-2xs truncate">
            moat.interviewprepguru.ai
          </span>
        </div>
        <button
          onClick={() => onNavigateSubdomain('overview')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-950 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-full transition-colors border border-indigo-200 shrink-0 self-start xs:self-auto cursor-pointer"
        >
          <span>Back to Hub Overview</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs mb-5">
          <Trophy className="w-3.5 h-3.5 text-indigo-600" />
          <span>05 · STRATEGIC COMPETITIVE ADVANTAGE</span>
        </div>

        <h1 className="font-display fluid-h1 text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight mb-6 leading-[1.12]">
          Why Interview Prep Guru <br />
          <span className="text-gradient-accent">
            Wins the Category
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
          Legacy tools treat interview prep as memorization flashcards or dumb video recording boxes. PrepMind AI operates as an intelligent conversational agent that listens, watches, evaluates, and coaches in real-time.
        </p>
      </div>

      {/* Comparison Table in Light Theme */}
      <div className="glass-premium rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm mb-16">
        {/* Mobile scroll hint */}
        <div className="sm:hidden px-4 py-2 bg-slate-100/90 border-b border-slate-200 text-[10px] font-mono text-slate-500 flex items-center justify-between">
          <span>← Swipe horizontally to compare matrix →</span>
          <span className="font-bold text-indigo-700">4 Columns</span>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[620px] text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/90 text-xs font-mono tracking-wider">
                <th className="p-5 sm:p-6 text-slate-700 font-bold uppercase">Capability / Dimension</th>
                <th className="p-5 sm:p-6 text-indigo-900 font-bold uppercase bg-indigo-50/70 border-x border-indigo-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                    <span>Interview Prep Guru</span>
                  </div>
                </th>
                <th className="p-5 sm:p-6 text-slate-500 font-semibold uppercase">Traditional Mock Tools</th>
                <th className="p-5 sm:p-6 text-slate-500 font-semibold uppercase">Legacy One-Way ATS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="p-5 sm:p-6 font-semibold text-slate-900">
                  Multimodal Sensor Fusion
                  <div className="text-xs text-slate-500 font-normal mt-0.5">
                    Synchronized voice acoustics, facial action units, and semantic intent
                  </div>
                </td>
                <td className="p-5 sm:p-6 font-mono font-bold text-indigo-900 bg-indigo-50/40 border-x border-indigo-100">
                  <span className="inline-flex items-center gap-1.5 text-emerald-700">
                    <Check className="w-4 h-4 text-emerald-600 font-bold" /> Sub-200ms Unified Layer
                  </span>
                </td>
                <td className="p-5 sm:p-6 text-slate-500 font-mono">
                  <span className="inline-flex items-center gap-1 text-rose-600">
                    <X className="w-4 h-4" /> Text-only LLM
                  </span>
                </td>
                <td className="p-5 sm:p-6 text-slate-500 font-mono">
                  <span className="inline-flex items-center gap-1 text-rose-600">
                    <X className="w-4 h-4" /> Dumb video recording
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="p-5 sm:p-6 font-semibold text-slate-900">
                  Dynamic Adaptive Probing
                  <div className="text-xs text-slate-500 font-normal mt-0.5">
                    Generates unscripted follow-up challenges when answers lack specificity
                  </div>
                </td>
                <td className="p-5 sm:p-6 font-mono font-bold text-indigo-900 bg-indigo-50/40 border-x border-indigo-100">
                  <span className="inline-flex items-center gap-1.5 text-emerald-700">
                    <Check className="w-4 h-4 text-emerald-600 font-bold" /> Intelligent Conversationalist
                  </span>
                </td>
                <td className="p-5 sm:p-6 text-slate-500 font-mono">
                  <span className="inline-flex items-center gap-1 text-rose-600">
                    <X className="w-4 h-4" /> Static question script
                  </span>
                </td>
                <td className="p-5 sm:p-6 text-slate-500 font-mono">
                  <span className="inline-flex items-center gap-1 text-rose-600">
                    <X className="w-4 h-4" /> Fixed timer countdown
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="p-5 sm:p-6 font-semibold text-slate-900">
                  Millisecond Replay & Acoustic Feedback
                  <div className="text-xs text-slate-500 font-normal mt-0.5">
                    WPM, filler suppression, pitch stability, and cognitive pause metrics
                  </div>
                </td>
                <td className="p-5 sm:p-6 font-mono font-bold text-indigo-900 bg-indigo-50/40 border-x border-indigo-100">
                  <span className="inline-flex items-center gap-1.5 text-emerald-700">
                    <Check className="w-4 h-4 text-emerald-600 font-bold" /> Full Spectrogram Telemetry
                  </span>
                </td>
                <td className="p-5 sm:p-6 text-slate-500 font-mono">
                  <span className="text-amber-700 font-medium">~ Basic word counter</span>
                </td>
                <td className="p-5 sm:p-6 text-slate-500 font-mono">
                  <span className="inline-flex items-center gap-1 text-rose-600">
                    <X className="w-4 h-4" /> Manual human grading
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="p-5 sm:p-6 font-semibold text-slate-900">
                  Calibrated Employability Scoring
                  <div className="text-xs text-slate-500 font-normal mt-0.5">
                    Standardized benchmark calibrated against verified enterprise offers
                  </div>
                </td>
                <td className="p-5 sm:p-6 font-mono font-bold text-indigo-900 bg-indigo-50/40 border-x border-indigo-100">
                  <span className="inline-flex items-center gap-1.5 text-emerald-700">
                    <Check className="w-4 h-4 text-emerald-600 font-bold" /> Normalized 100-Point Index
                  </span>
                </td>
                <td className="p-5 sm:p-6 text-slate-500 font-mono">
                  <span className="inline-flex items-center gap-1 text-rose-600">
                    <X className="w-4 h-4" /> Subjective feedback
                  </span>
                </td>
                <td className="p-5 sm:p-6 text-slate-500 font-mono">
                  <span className="inline-flex items-center gap-1 text-rose-600">
                    <X className="w-4 h-4" /> Keyword scraping only
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Philosophical Callout Card */}
      <div className="glass-premium rounded-3xl p-8 sm:p-14 border border-indigo-200/90 text-center max-w-3xl mx-auto mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none"></div>

        <blockquote className="font-display italic text-lg sm:text-2xl text-slate-900 leading-snug mb-5 text-balance">
          "Intelligence without understanding is automation. Understanding is the threshold of something genuinely new."
        </blockquote>
        <div className="text-xs font-mono uppercase text-indigo-700 font-bold tracking-widest">
          — PrepMind AI Founding Principle
        </div>
      </div>

      {/* Subdomain Footer Navigation */}
      <div className="p-6 rounded-2xl glass-premium border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => onNavigateSubdomain('engine')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-950"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous: Intelligence Console</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onStartPractice}
            className="shimmer-btn px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-95 rounded-xl shadow-md shadow-indigo-500/20 transition-all"
          >
            Launch Practice Studio
          </button>
          <button
            onClick={onOpenDemoModal}
            className="px-6 py-3 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl transition-all shadow-2xs"
          >
            Book Enterprise Demo
          </button>
        </div>
      </div>
    </div>
  );
};
