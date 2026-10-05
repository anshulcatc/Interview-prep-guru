import React from 'react';
import { SubdomainId } from '../../types';
import { MultimodalPillarsVisual } from '../visuals/MultimodalPillarsVisual';
import { Zap, HeartPulse, Clock, ShieldCheck, ArrowRight, ArrowLeft, Layers } from 'lucide-react';

interface MultimodalViewProps {
  onNavigateSubdomain: (id: SubdomainId) => void;
  onStartPractice: () => void;
}

export const MultimodalView: React.FC<MultimodalViewProps> = ({
  onNavigateSubdomain,
  onStartPractice,
}) => {
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
            multimodal.interviewprepguru.ai
          </span>
        </div>
        <button
          onClick={() => onNavigateSubdomain('ecosystem')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-950 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-full transition-colors border border-indigo-200 shrink-0 self-start xs:self-auto cursor-pointer"
        >
          <span>Next: Ecosystem</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs mb-4">
          <Layers className="w-3.5 h-3.5 text-indigo-600" />
          <span>02 · UNIFIED MULTIMODAL INGESTION</span>
        </div>

        <h1 className="font-display fluid-h1 text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mb-3 leading-tight">
          Synchronized Perception Layer
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto font-normal">
          In-gesting voice, video, face, language, and behavior simultaneously at 60Hz.
        </p>
      </div>

      {/* Primary Visual Pipeline Diagram */}
      <div className="mb-10">
        <MultimodalPillarsVisual />
      </div>

      {/* Quick Interactive Demo Box */}
      <div className="glass-premium rounded-2xl p-4 sm:p-6 border border-slate-200/90 mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-display fluid-h4 text-base font-bold text-slate-950">
            Want to test this multimodal pipeline live?
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Run a 30-second sample response in our Practice Studio with real-time waveform and FACS simulation.
          </p>
        </div>
        <button
          onClick={onStartPractice}
          className="shimmer-btn px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all whitespace-nowrap self-stretch sm:self-auto cursor-pointer min-h-[40px] text-center"
        >
          Launch Live Simulator
        </button>
      </div>

      {/* Subdomain Footer Navigation */}
      <div className="p-4 sm:p-5 rounded-2xl glass-premium border border-slate-200/90 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        <button
          onClick={() => onNavigateSubdomain('problem')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-950 bg-white sm:bg-transparent border sm:border-transparent border-slate-200 rounded-xl transition-colors cursor-pointer min-h-[40px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous: The Problem</span>
        </button>

        <button
          onClick={() => onNavigateSubdomain('ecosystem')}
          className="shimmer-btn inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-95 rounded-xl shadow-md shadow-indigo-500/20 transition-all cursor-pointer min-h-[40px]"
        >
          <span>Continue to The Ecosystem</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
