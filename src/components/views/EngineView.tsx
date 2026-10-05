import React, { useEffect, useState } from 'react';
import { SubdomainId, RolePreset } from '../../types';
import { Activity, Gauge, Sliders, ArrowRight, ArrowLeft, Volume2, Sparkles, Check, LineChart } from 'lucide-react';

interface EngineViewProps {
  onNavigateSubdomain: (id: SubdomainId) => void;
  selectedRole: RolePreset;
  onOpenRoleModal: () => void;
}

export const EngineView: React.FC<EngineViewProps> = ({
  onNavigateSubdomain,
  selectedRole,
  onOpenRoleModal,
}) => {
  const [radialOffset, setRadialOffset] = useState(427.2);
  const [scoreVal, setScoreVal] = useState(0);
  const [wpmVal, setWpmVal] = useState(0);
  const [fillerVal, setFillerVal] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRadialOffset(51.2); // ~88%

      // Score count-up
      let currentScore = 0;
      const scoreInterval = setInterval(() => {
        currentScore += 2;
        if (currentScore >= 88) {
          currentScore = 88;
          clearInterval(scoreInterval);
        }
        setScoreVal(currentScore);
      }, 25);

      // WPM count-up
      let currentWpm = 0;
      const wpmInterval = setInterval(() => {
        currentWpm += 4;
        if (currentWpm >= 138) {
          currentWpm = 138;
          clearInterval(wpmInterval);
        }
        setWpmVal(currentWpm);
      }, 25);

      setFillerVal(1.2);
    }, 150);

    return () => clearTimeout(timer);
  }, [selectedRole]);

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
            engine.interviewprepguru.ai
          </span>
        </div>
        <button
          onClick={() => onNavigateSubdomain('moat')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-950 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-full transition-colors border border-indigo-200 shrink-0 self-start xs:self-auto cursor-pointer"
        >
          <span>Next: Why We Win</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs mb-5">
          <Gauge className="w-3.5 h-3.5 text-indigo-600" />
          <span>04 · REAL-TIME TELEMETRY ENGINE</span>
        </div>

        <h1 className="font-display fluid-h1 text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight mb-6 leading-[1.12]">
          The Employability <br />
          <span className="text-gradient-accent">
            Intelligence Console
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
          Every vocal fluctuation, answer trajectory, and structural progression decomposed into clean, mathematical telemetry in real time.
        </p>

        <div className="mt-5 inline-flex items-center gap-2 text-xs font-mono text-slate-700 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs">
          <span>Active Calibration: <strong className="text-slate-900">{selectedRole.title}</strong></span>
          <button onClick={onOpenRoleModal} className="text-indigo-600 font-bold hover:underline">
            (Switch Role)
          </button>
        </div>
      </div>

      {/* Main Console Surface */}
      <div className="glass-premium rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-10 border border-slate-200/90 shadow-sm mb-14">
        {/* Console Header Bar */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-8 border-b border-slate-100 gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-xs font-mono font-bold text-slate-800">
              CONSOLE // LIVE_CALIBRATION_STREAM_v3.4
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
            <span className="bg-slate-100 px-3 py-1 rounded-md text-slate-700 font-bold">
              ROLE: {selectedRole.level}
            </span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              SUB-200MS INGESTION
            </span>
          </div>
        </div>

        {/* Metric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8">
          {/* 1. Radial Progress Bar (Employability Score) */}
          <div className="lg:col-span-4 bg-slate-50/80 rounded-2xl p-4 sm:p-6 border border-slate-200 flex flex-col items-center justify-center text-center shadow-2xs">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-4 sm:mb-6 font-bold">
              Overall Employability Score
            </h4>

            {/* SVG Radial Gauge */}
            <div className="relative w-44 h-44 xs:w-52 xs:h-52 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r="68"
                  stroke="#e2e8f0"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="68"
                  stroke="url(#indigoVioletLightGlow)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  fill="transparent"
                  strokeDasharray="427.2"
                  strokeDashoffset={radialOffset}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="indigoVioletLightGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-display text-4xl sm:text-5xl font-black text-slate-950 tracking-tighter">
                  {scoreVal}
                </span>
                <span className="text-[11px] sm:text-xs font-mono text-indigo-700 font-bold uppercase mt-1">
                  High Distinction
                </span>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 flex items-center justify-between w-full text-xs font-mono text-slate-500 pt-3 sm:pt-4 border-t border-slate-200">
              <span className="font-bold">BENCHMARK: TOP 5%</span>
              <span className="text-emerald-700 font-bold">+14 pts vs Baseline</span>
            </div>
          </div>

          {/* 2. Speech Metrics (WPM + Filler Words) */}
          <div className="lg:col-span-8 bg-slate-50/80 rounded-2xl p-4 sm:p-6 border border-slate-200 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Speech & Delivery Diagnostics
                </h4>
                <span className="text-xs font-mono text-indigo-700 bg-white px-2.5 py-0.5 rounded border border-indigo-200 font-bold shadow-2xs">
                  Acoustic Engine v2
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                {/* WPM Widget */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-medium">Speaking Cadence</span>
                    <span className="text-emerald-700 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded">OPTIMAL</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-display text-4xl font-extrabold text-slate-950">{wpmVal}</span>
                    <span className="text-xs text-slate-400 font-mono">Words Per Min</span>
                  </div>
                  {/* Range Indicator Bar */}
                  <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div className="absolute left-[50%] w-[25%] h-full bg-emerald-100 rounded"></div>
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full transition-all duration-1000"
                      style={{ width: `${(wpmVal / 180) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2 font-medium">
                    <span>Slow (&lt;110)</span>
                    <span className="text-emerald-700 font-bold">Ideal (130-150 WPM)</span>
                    <span>Fast (&gt;170)</span>
                  </div>
                </div>

                {/* Filler Word Widget */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-medium">Filler Word Ratio</span>
                    <span className="text-emerald-700 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded">EXCELLENT</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-display text-4xl font-extrabold text-slate-950">{fillerVal}</span>
                    <span className="text-xs text-slate-400 font-mono">% of Utterances</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                      style={{ width: '24%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2 font-medium">
                    <span>Detected: "um" (2), "like" (1)</span>
                    <span className="text-slate-400">Industry Avg: 4.8%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Audio Waveform Simulation */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-2 overflow-hidden shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-700 font-bold shrink-0">
                <Volume2 className="w-4 h-4 text-indigo-600" />
                <span>SPECTROGRAM STREAM (60Hz)</span>
              </div>
              <div className="flex items-end gap-1 h-8 w-full max-w-md justify-end">
                <span className="w-1.5 bg-indigo-300 rounded-full h-3 animate-pulse"></span>
                <span className="w-1.5 bg-indigo-500 rounded-full h-6 animate-pulse"></span>
                <span className="w-1.5 bg-violet-600 rounded-full h-4 animate-pulse"></span>
                <span className="w-1.5 bg-indigo-600 rounded-full h-8 animate-pulse"></span>
                <span className="w-1.5 bg-indigo-400 rounded-full h-5 animate-pulse"></span>
                <span className="w-1.5 bg-violet-500 rounded-full h-7 animate-pulse"></span>
                <span className="w-1.5 bg-emerald-500 rounded-full h-6 animate-pulse"></span>
                <span className="w-1.5 bg-indigo-500 rounded-full h-4 animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Progression Across 4 Dimensions */}
        <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                Multi-Turn Progression Across 4 Evaluation Dimensions
              </h4>
              <p className="font-display text-base font-bold text-slate-950 mt-1">
                Dynamic Competency Evolution Across Progressive Follow-Up Probes
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-mono font-bold">
              <span className="flex items-center gap-1.5 text-indigo-700"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span> Relevance</span>
              <span className="flex items-center gap-1.5 text-violet-700"><span className="w-2.5 h-2.5 rounded-full bg-violet-600"></span> Specificity</span>
              <span className="flex items-center gap-1.5 text-blue-700"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Structure</span>
              <span className="flex items-center gap-1.5 text-emerald-700"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Ownership</span>
            </div>
          </div>

          {/* SVG Progression Chart in Light Theme */}
          <div className="w-full h-48 relative overflow-hidden bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 800 150" preserveAspectRatio="none">
              <line x1="0" y1="30" x2="800" y2="30" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="0" y1="75" x2="800" y2="75" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="0" y1="120" x2="800" y2="120" stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" />

              {/* Curve 1: Relevance */}
              <path d="M0,120 Q200,90 400,60 T800,25" fill="none" stroke="#4f46e5" strokeWidth="3.5" strokeLinecap="round" />
              {/* Curve 2: Specificity */}
              <path d="M0,135 Q200,110 400,75 T800,35" fill="none" stroke="#7c3aed" strokeWidth="3.5" strokeLinecap="round" />
              {/* Curve 3: Structure */}
              <path d="M0,110 Q200,80 400,50 T800,30" fill="none" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" />
              {/* Curve 4: Ownership */}
              <path d="M0,140 Q200,105 400,70 T800,20" fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
            </svg>

            <div className="absolute bottom-2 left-3 right-3 sm:left-6 sm:right-6 flex justify-between text-[9px] sm:text-[10px] font-mono text-slate-400 font-semibold">
              <span>T1 (Intro)</span>
              <span>T2 (Arch)</span>
              <span>T3 (Tradeoffs)</span>
              <span>T4 (Synth)</span>
            </div>
          </div>

          {/* Breakdown cards */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-[11px] font-mono text-slate-500 uppercase font-bold">Relevance</div>
              <div className="font-display text-2xl font-extrabold text-indigo-700 mt-1">94%</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Answer directly hit core criteria</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-[11px] font-mono text-slate-500 uppercase font-bold">Specificity</div>
              <div className="font-display text-2xl font-extrabold text-violet-700 mt-1">89%</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Quantified business metrics cited</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-[11px] font-mono text-slate-500 uppercase font-bold">Structure</div>
              <div className="font-display text-2xl font-extrabold text-blue-700 mt-1">92%</div>
              <div className="text-[10px] text-slate-500 mt-0.5">STAR framing adhered to</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-[11px] font-mono text-slate-500 uppercase font-bold">Ownership</div>
              <div className="font-display text-2xl font-extrabold text-emerald-600 mt-1">96%</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Active verbs used ("I designed")</div>
            </div>
          </div>
        </div>
      </div>

      {/* Subdomain Footer Navigation */}
      <div className="p-4 sm:p-6 rounded-2xl glass-premium border border-slate-200/90 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        <button
          onClick={() => onNavigateSubdomain('ecosystem')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-950 bg-white sm:bg-transparent border sm:border-transparent border-slate-200 rounded-xl transition-colors cursor-pointer min-h-[40px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous: The Ecosystem</span>
        </button>

        <button
          onClick={() => onNavigateSubdomain('moat')}
          className="shimmer-btn inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-95 rounded-xl shadow-md shadow-indigo-500/20 transition-all cursor-pointer min-h-[40px]"
        >
          <span>Continue to Competitive Moat</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
