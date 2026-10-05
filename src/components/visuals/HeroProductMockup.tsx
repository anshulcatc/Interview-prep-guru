import React from 'react';
import { Mic, Video, Volume2, Sparkles, CheckCircle2, ShieldCheck, Zap, User } from 'lucide-react';

interface HeroProductMockupProps {
  roleTitle: string;
  roleLevel: string;
}

export const HeroProductMockup: React.FC<HeroProductMockupProps> = ({ roleTitle, roleLevel }) => {
  return (
    <div className="w-full rounded-2xl bg-white border border-slate-200/90 shadow-[0_12px_40px_-10px_rgba(79,70,229,0.12)] overflow-hidden">
      {/* Browser/Window Header */}
      <div className="bg-slate-100/90 border-b border-slate-200/80 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 pl-2 border-l border-slate-200 truncate max-w-[140px] xs:max-w-[220px] sm:max-w-none">
            app.interviewprepguru.ai/session/live-eval
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            SYNC: 142ms
          </span>
        </div>
      </div>

      {/* Main Cockpit Layout */}
      <div className="p-3.5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 bg-gradient-to-b from-slate-50/50 to-white">
        {/* Left: Video & Voice Streams */}
        <div className="md:col-span-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* AI Interviewer Video Tile */}
            <div className="relative rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 p-4 min-h-[190px] flex flex-col justify-between overflow-hidden shadow-inner text-white">
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-mono uppercase tracking-wider bg-white/10 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
                  AI Interviewer (PrepMind)
                </span>
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              </div>

              {/* Minimalist AI Face / Wave Animation */}
              <div className="my-auto flex flex-col items-center justify-center py-2 z-10">
                <div className="w-14 h-14 rounded-full bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center relative">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-indigo-500/50">
                    AI
                  </div>
                  <span className="absolute inset-0 rounded-full border border-indigo-400/30 animate-ping"></span>
                </div>
                <div className="mt-3 flex items-center gap-1">
                  <span className="w-1 bg-indigo-400 rounded-full h-2 animate-pulse"></span>
                  <span className="w-1 bg-indigo-300 rounded-full h-4 animate-pulse"></span>
                  <span className="w-1 bg-violet-400 rounded-full h-5 animate-pulse"></span>
                  <span className="w-1 bg-indigo-300 rounded-full h-3 animate-pulse"></span>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-300 z-10 truncate">
                "Describe how you isolated the database contention..."
              </div>
            </div>

            {/* Candidate Live Stream Tile */}
            <div className="relative rounded-2xl bg-slate-900 p-4 min-h-[190px] flex flex-col justify-between overflow-hidden shadow-inner text-white">
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-mono uppercase tracking-wider bg-white/10 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
                  Candidate Camera (You)
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">
                  FACS: CONFIDENT
                </span>
              </div>

              {/* Candidate Wireframe / Landmark Simulation */}
              <div className="my-auto flex flex-col items-center justify-center py-2 z-10 relative">
                <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 relative">
                  <User className="w-7 h-7" />
                  {/* Facial landmark points */}
                  <span className="absolute top-3 left-4 w-1 h-1 rounded-full bg-indigo-400"></span>
                  <span className="absolute top-3 right-4 w-1 h-1 rounded-full bg-indigo-400"></span>
                  <span className="absolute top-7 left-6 w-1 h-1 rounded-full bg-indigo-400"></span>
                  <span className="absolute bottom-3 left-5 w-3 h-0.5 bg-indigo-400/80 rounded-full"></span>
                </div>
                <div className="mt-2 text-[10px] font-mono text-slate-400">
                  Gaze: 94% Direct · Prosody: Calm
                </div>
              </div>

              {/* Waveform tracker */}
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 z-10 pt-1 border-t border-slate-800">
                <span>Mic: 48kHz</span>
                <span className="text-indigo-400 font-bold">140 WPM (Ideal)</span>
              </div>
            </div>
          </div>

          {/* Live Ingestion Speech-to-Intent Banner */}
          <div className="p-3 sm:p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-1.5 text-[10px] sm:text-[11px] font-mono">
              <span className="text-slate-500 font-bold flex items-center gap-1.5 min-w-0">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="truncate">LIVE TRANSCRIPT & SEMANTIC PARSING</span>
              </span>
              <span className="text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded shrink-0">
                STAR Method: Action (98%)
              </span>
            </div>
            <p className="text-xs text-slate-800 italic leading-relaxed">
              "...I isolated the stale replica with fencing tokens and transitioned our write-path to synchronous Raft quorum..."
            </p>
          </div>
        </div>

        {/* Right: Live Telemetry & Employability Score */}
        <div className="md:col-span-4 bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-4 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                Live Employability Bar
              </span>
              <span className="text-[10px] font-mono text-emerald-600 font-bold">PASSING</span>
            </div>

            {/* Score Ring Preview */}
            <div className="my-4 text-center">
              <div className="inline-flex items-baseline gap-1">
                <span className="font-display text-4xl font-extrabold text-indigo-600">88</span>
                <span className="text-xs font-mono text-slate-400 font-bold">/100</span>
              </div>
              <div className="text-[11px] font-bold text-slate-800 mt-0.5">Top 5% · Ready to Offer</div>
              <div className="text-[10px] text-slate-400 font-mono">Calibrated: {roleTitle}</div>
            </div>

            {/* 3 Metric Progress Rows */}
            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>Pacing (WPM)</span>
                  <span className="font-mono font-bold text-slate-900">138 / 150</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-emerald-500 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>Answer Specificity</span>
                  <span className="font-mono font-bold text-slate-900">92%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[92%] h-full bg-indigo-600 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>Filler Suppression</span>
                  <span className="font-mono font-bold text-slate-900">1.2%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[94%] h-full bg-violet-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>Level: {roleLevel}</span>
            <span className="text-indigo-600 font-bold">Sub-200ms Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
