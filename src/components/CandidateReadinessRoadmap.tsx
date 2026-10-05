import React, { useState } from 'react';
import { RolePreset } from '../types';
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Sliders,
  PlayCircle,
  Activity,
  Layers,
  ShieldCheck,
  Award,
  ChevronRight,
} from 'lucide-react';

interface CandidateReadinessRoadmapProps {
  selectedRole: RolePreset;
  onStartPractice: () => void;
  onOpenRoleModal: () => void;
}

interface RoadmapPhase {
  step: number;
  id: string;
  name: string;
  tagline: string;
  targetMetric: string;
  completionScore: string;
  focusArea: string;
  deliverable: string;
  color: string;
  badgeBg: string;
}

export const CandidateReadinessRoadmap: React.FC<CandidateReadinessRoadmapProps> = ({
  selectedRole,
  onStartPractice,
  onOpenRoleModal,
}) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(1); // Default to Step 2

  const phases: RoadmapPhase[] = [
    {
      step: 1,
      id: 'diagnostic',
      name: 'Baseline Diagnostic & Acoustic Audit',
      tagline: 'Establish raw cadence, vocal prosody, and filler word frequency',
      targetMetric: 'Cadence: 130–150 WPM · Filler Words <2.0%',
      completionScore: 'Initial Index: 58/100',
      focusArea: `Calibrates vocal stability and initial conversational poise for ${selectedRole.title} (${selectedRole.level}).`,
      deliverable: 'Acoustic Baseline Map & Prosody Heatmap',
      color: 'from-blue-500 to-indigo-600',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      step: 2,
      id: 'technical',
      name: 'Role-Specific Technical Architecture',
      tagline: `Rigorous probing on ${selectedRole.evalCriteria.technicalPillars[0] || 'Domain Architecture'}`,
      targetMetric: `Pillars: ${selectedRole.evalCriteria.technicalPillars.slice(0, 2).join(' & ')}`,
      completionScore: 'Competency Index: 76/100',
      focusArea: `Tests domain mastery and expected key terms: "${selectedRole.evalCriteria.expectedKeyPhrases.slice(0, 3).join('", "')}".`,
      deliverable: 'STAR Methodology & Domain Proof Dossier',
      color: 'from-indigo-600 to-violet-600',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      step: 3,
      id: 'pressure',
      name: 'Adaptive Pressure & Follow-Up Defense',
      tagline: 'Simulated counter-probes when answers lack specificity',
      targetMetric: 'FACS Conviction: 92% · Zero Imposter Defensiveness',
      completionScore: 'Readiness Index: 88/100',
      focusArea: selectedRole.evalCriteria.behavioralFocus,
      deliverable: 'Stress-Resistance & Cognitive Stamina Audit',
      color: 'from-violet-600 to-purple-600',
      badgeBg: 'bg-violet-50 text-violet-700 border-violet-200',
    },
    {
      step: 4,
      id: 'certified',
      name: 'Offer-Ready Accreditation & Calibration',
      tagline: `Final benchmark against ${selectedRole.companyContext}`,
      targetMetric: 'Employability Score: 94+/100 · Top 5% Percentile',
      completionScore: 'Certified: Senior Hirable Bar',
      focusArea: `Complete 45-minute longitudinal simulation evaluated against verified hiring rubrics.`,
      deliverable: 'Verifiable Employability Certificate & ATS Dossier',
      color: 'from-emerald-500 to-teal-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ];

  const currentPhase = phases[activePhaseIndex];

  return (
    <section className="mb-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
              Candidate Readiness Roadmap
            </span>
            <span className="text-slate-400 text-xs">·</span>
            <span className="text-xs font-mono font-bold text-slate-700 bg-white px-2.5 py-0.5 rounded border border-slate-200 shadow-2xs">
              Role: <strong className="text-indigo-600">{selectedRole.title}</strong>
            </span>
          </div>
          <h2 className="font-display fluid-h2 text-2xl sm:text-3xl font-extrabold text-slate-950">
            From Raw Candidate to Offer-Ready Professional
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            A 4-phase structured journey tailored to the exact requirements, vocabulary, and behavioral bar of your target position.
          </p>
        </div>

        <button
          onClick={onOpenRoleModal}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-950 bg-white hover:bg-indigo-50 px-3.5 py-2 rounded-xl border border-indigo-200 shadow-2xs transition-all self-start sm:self-auto"
        >
          <Sliders className="w-3.5 h-3.5 text-indigo-600" />
          <span>Switch Target Role</span>
        </button>
      </div>

      {/* Main Roadmap Container */}
      <div className="glass-premium rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-10 border border-slate-200/90 shadow-sm">
        {/* Horizontal Stepper Connector */}
        <div className="relative mb-6 sm:mb-8 pb-2 sm:pb-4">
          {/* Subtle Progress Track Line */}
          <div className="hidden md:block absolute top-6 left-8 right-8 h-1 bg-slate-200 -z-0">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${(activePhaseIndex / (phases.length - 1)) * 100}%` }}
            ></div>
          </div>

          {/* Stepper Node Buttons */}
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 relative z-10">
            {phases.map((phase, idx) => {
              const isActive = activePhaseIndex === idx;
              const isPast = activePhaseIndex > idx;
              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer min-h-[52px] ${
                    isActive
                      ? 'bg-white border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                      : isPast
                      ? 'bg-white/80 border-slate-200 hover:border-slate-300'
                      : 'bg-slate-50/60 border-slate-200/70 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : isPast
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isPast ? '✓' : `0${phase.step}`}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">
                      PHASE 0{phase.step}
                    </span>
                  </div>
                  <div className="font-display text-xs font-bold text-slate-900 truncate">
                    {phase.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">
                    {phase.completionScore}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Phase Detail Showcase Card */}
        <div className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/90 shadow-2xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-6 mb-6 border-b border-slate-200/80 gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border ${currentPhase.badgeBg}`}>
                  PHASE 0{currentPhase.step} OF 04 · ACTIVE FOCUS
                </span>
                <span className="hidden sm:inline text-slate-300">|</span>
                <span className="text-xs font-mono font-bold text-slate-700">
                  {currentPhase.targetMetric}
                </span>
              </div>
              <h3 className="font-display fluid-h3 text-xl sm:text-2xl font-extrabold text-slate-950">
                {currentPhase.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                {currentPhase.tagline}
              </p>
            </div>

            <button
              onClick={onStartPractice}
              className="shimmer-btn px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2 whitespace-nowrap self-stretch sm:self-auto justify-center"
            >
              <PlayCircle className="w-4 h-4 text-indigo-200" />
              <span>Practice Phase 0{currentPhase.step} Scenario</span>
            </button>
          </div>

          {/* Phase Deep-Dive Grid tailored to the Selected Role */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1: Evaluated Criteria */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-[11px] font-mono uppercase font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span>Evaluated Pillars for this Phase</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {selectedRole.evalCriteria.technicalPillars.map((pillar, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{pillar}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box 2: Contextual Behavioral Bar */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-[11px] font-mono uppercase font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-violet-600" />
                <span>Behavioral & Prosody Objective</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentPhase.focusArea}
              </p>
            </div>

            {/* Box 3: Phase Outcome & Deliverable */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-[11px] font-mono uppercase font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                <span>Milestone Verification</span>
              </div>
              <div className="text-xs font-bold text-slate-900 mb-1">
                {currentPhase.deliverable}
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-mono">
                Passing threshold: {currentPhase.completionScore}. Verified automatically by PrepMind Multimodal Engine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
