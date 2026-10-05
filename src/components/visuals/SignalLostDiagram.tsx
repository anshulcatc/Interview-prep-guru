import React from 'react';
import { MicOff, EyeOff, FileText, CheckCircle2, ArrowRight, Activity, Zap, AlertCircle } from 'lucide-react';

export const SignalLostDiagram: React.FC = () => {
  return (
    <div className="w-full rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-4 sm:p-7 lg:p-8 shadow-sm">
      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
          Visual Comparison
        </span>
        <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-950 mt-2">
          Text Transcripts Discard 70% of Human Signal
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Why traditional ATS and GPT wrappers fail to assess true candidate employability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
        {/* Left: Traditional Siloed AI (Broken & Flat) */}
        <div className="rounded-2xl bg-rose-50/40 border border-rose-200/80 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-rose-200/60 mb-4">
            <span className="text-xs font-mono font-bold text-rose-700 uppercase">Traditional AI (Text-Only)</span>
            <span className="text-[10px] font-mono text-rose-700 font-bold bg-white px-2 py-0.5 rounded border border-rose-200 shrink-0">
              70% SIGNAL LOST
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4 my-2">
            {/* Visual audio drop */}
            <div className="p-3 bg-white rounded-xl border border-rose-200/60 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <MicOff className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 truncate">Audio Voice Cadence</div>
                  <div className="text-[11px] text-slate-500 truncate">Stripped to ASCII characters</div>
                </div>
              </div>
              <span className="text-rose-600 font-mono font-bold text-xs shrink-0">Discarded</span>
            </div>

            {/* Visual video drop */}
            <div className="p-3 bg-white rounded-xl border border-rose-200/60 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <EyeOff className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 truncate">FACS Micro-Expressions</div>
                  <div className="text-[11px] text-slate-500 truncate">Hesitation vs genuine conviction</div>
                </div>
              </div>
              <span className="text-rose-600 font-mono font-bold text-xs shrink-0">Ignored</span>
            </div>

            {/* Result */}
            <div className="p-3 bg-white rounded-xl border border-rose-200/60 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 truncate">Static Keyword Match</div>
                  <div className="text-[11px] text-slate-500 truncate">Rewards memorized scripts</div>
                </div>
              </div>
              <span className="text-amber-600 font-mono font-bold text-xs shrink-0">Biased</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-rose-200/60 text-center text-xs font-mono text-rose-800 font-semibold">
            Outcome: False rejections for top engineers & high mis-hires.
          </div>
        </div>

        {/* Right: PrepMind Multimodal Engine (Unified & 5D) */}
        <div className="rounded-2xl bg-indigo-50/40 border border-indigo-200 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-indigo-200/60 mb-4">
            <span className="text-xs font-mono font-bold text-indigo-700 uppercase">PrepMind Multimodal Engine</span>
            <span className="text-[10px] font-mono text-emerald-700 font-bold bg-white px-2 py-0.5 rounded border border-emerald-200 shrink-0">
              100% SENSOR FUSION
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4 my-2">
            {/* Visual audio stream */}
            <div className="p-3 bg-white rounded-xl border border-indigo-100 flex items-center justify-between gap-2 text-xs shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 truncate">Acoustic Prosody & Pitch (60Hz)</div>
                  <div className="text-[11px] text-slate-500 truncate">Tracks pacing (130-150 WPM) & stability</div>
                </div>
              </div>
              <span className="text-emerald-600 font-mono font-bold text-xs shrink-0">Live 60Hz</span>
            </div>

            {/* Visual FACS */}
            <div className="p-3 bg-white rounded-xl border border-indigo-100 flex items-center justify-between gap-2 text-xs shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 truncate">18 FACS Action Units</div>
                  <div className="text-[11px] text-slate-500 truncate">Gaze stability, cognitive load & presence</div>
                </div>
              </div>
              <span className="text-indigo-600 font-mono font-bold text-xs shrink-0">Synchronized</span>
            </div>

            {/* Visual STAR */}
            <div className="p-3 bg-white rounded-xl border border-indigo-100 flex items-center justify-between gap-2 text-xs shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 truncate">STAR Framing & Specificity</div>
                  <div className="text-[11px] text-slate-500 truncate">Penalizes passive phrasing, validates impact</div>
                </div>
              </div>
              <span className="text-emerald-600 font-mono font-bold text-xs shrink-0">Quantified</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-indigo-200/60 text-center text-xs font-mono text-indigo-900 font-semibold">
            Outcome: Standardized, objective employability calibration.
          </div>
        </div>
      </div>
    </div>
  );
};
