import React from 'react';
import { Mic, Eye, Brain, ShieldCheck, ArrowRight, Zap, Play, Check } from 'lucide-react';

export const MultimodalPillarsVisual: React.FC = () => {
  return (
    <div className="w-full rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-4 sm:p-7 lg:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
            Hardware-Accelerated Ingestion
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-950 mt-1.5">
            The 4-Pillar Multimodal Architecture
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-500 font-medium">Loop Latency:</span>
          <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            &lt;200ms Synced
          </span>
        </div>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {/* Pipe 1: Acoustic */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-indigo-50/60 to-white border border-indigo-100/90 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-3 shadow-md shadow-indigo-500/20">
              <Mic className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-indigo-600 uppercase">STREAM 01</div>
            <h4 className="font-display text-base font-bold text-slate-950 mt-0.5">Acoustic Prosody</h4>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Real-time 60Hz audio spectrogram analysis detecting vocal tremor, monotone pitch, and 130-150 WPM pacing.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-indigo-50 text-[10px] font-mono font-bold text-indigo-700 flex items-center justify-between">
            <span>Sampling: 48kHz</span>
            <span>60Hz FPS</span>
          </div>
        </div>

        {/* Pipe 2: Vision FACS */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-violet-50/60 to-white border border-violet-100/90 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center mb-3 shadow-md shadow-violet-500/20">
              <Eye className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-violet-600 uppercase">STREAM 02</div>
            <h4 className="font-display text-base font-bold text-slate-950 mt-0.5">FACS Action Units</h4>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              18 facial muscle action units tracked to separate nervous avoidance from deep cognitive reflection.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-violet-50 text-[10px] font-mono font-bold text-violet-700 flex items-center justify-between">
            <span>Landmarks: 468</span>
            <span>Gaze Vectors</span>
          </div>
        </div>

        {/* Pipe 3: Language STAR */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-sky-50/60 to-white border border-sky-100/90 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center mb-3 shadow-md shadow-sky-500/20">
              <Brain className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-sky-600 uppercase">STREAM 03</div>
            <h4 className="font-display text-base font-bold text-slate-950 mt-0.5">Contextual STAR</h4>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Longitudinal tracking over the 45-minute session validating metric consistency between early claims and technical follow-ups.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-sky-50 text-[10px] font-mono font-bold text-sky-700 flex items-center justify-between">
            <span>Memory: 45 min</span>
            <span>STAR Graph</span>
          </div>
        </div>

        {/* Pipe 4: Privacy Vault */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-emerald-50/60 to-white border border-emerald-100/90 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-md shadow-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-emerald-600 uppercase">STREAM 04</div>
            <h4 className="font-display text-base font-bold text-slate-950 mt-0.5">Zero-Storage Vault</h4>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Mathematical vector extraction in-flight with zero raw biometric video hoarding. SOC2 Type II & GDPR certified.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-emerald-50 text-[10px] font-mono font-bold text-emerald-700 flex items-center justify-between">
            <span>Zero Video Saved</span>
            <span>REST / GraphQL</span>
          </div>
        </div>
      </div>
    </div>
  );
};
