import React, { useState } from 'react';
import { SubdomainId, RolePreset } from '../../types';
import { EcosystemMockups } from '../visuals/EcosystemMockups';
import { UserCheck, GraduationCap, Briefcase, CheckCircle2, ArrowRight, ArrowLeft, Users } from 'lucide-react';

interface EcosystemViewProps {
  onNavigateSubdomain: (id: SubdomainId) => void;
  onOpenDemoModal: () => void;
  onStartPractice: () => void;
  selectedRole: RolePreset;
}

export const EcosystemView: React.FC<EcosystemViewProps> = ({
  onNavigateSubdomain,
  onOpenDemoModal,
  onStartPractice,
  selectedRole,
}) => {
  const [activeStakeholder, setActiveStakeholder] = useState<'candidates' | 'institutions' | 'hiring'>('candidates');

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
            ecosystem.interviewprepguru.ai
          </span>
        </div>
        <button
          onClick={() => onNavigateSubdomain('engine')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-950 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-full transition-colors border border-indigo-200 shrink-0 self-start xs:self-auto cursor-pointer"
        >
          <span>Next: Intelligence Console</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs mb-4">
          <Users className="w-3.5 h-3.5 text-indigo-600" />
          <span>03 · THREE STAKEHOLDERS, ONE PLATFORM</span>
        </div>

        <h1 className="font-display fluid-h1 text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mb-3 leading-tight">
          Unified Ecosystem
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto font-normal">
          Connecting candidate preparation, university placement readiness, and corporate hiring workflows.
        </p>
      </div>

      {/* Stakeholder Selector Segmented Control */}
      <div className="flex justify-center mb-8 max-w-full">
        <div className="flex flex-wrap sm:inline-flex p-1 sm:p-1.5 rounded-2xl glass-premium border border-slate-200 shadow-xs max-w-full justify-center gap-1">
          <button
            onClick={() => setActiveStakeholder('candidates')}
            className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[38px] ${
              activeStakeholder === 'candidates'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
            }`}
          >
            <UserCheck className="w-4 h-4 shrink-0" />
            <span>Candidates</span>
          </button>
          <button
            onClick={() => setActiveStakeholder('institutions')}
            className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[38px] ${
              activeStakeholder === 'institutions'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
            }`}
          >
            <GraduationCap className="w-4 h-4 shrink-0" />
            <span>Universities</span>
          </button>
          <button
            onClick={() => setActiveStakeholder('hiring')}
            className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[38px] ${
              activeStakeholder === 'hiring'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
            }`}
          >
            <Briefcase className="w-4 h-4 shrink-0" />
            <span>Hiring Teams</span>
          </button>
        </div>
      </div>

      {/* Visual Product Mockup for Selected Stakeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center glass-premium rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-10 border border-slate-200/90 shadow-sm mb-10">
        <div className="lg:col-span-6 space-y-4">
          {activeStakeholder === 'candidates' && (
            <>
              <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded">
                INDIVIDUAL JOB SEEKERS
              </span>
              <h2 className="font-display fluid-h2 text-2xl sm:text-3xl font-extrabold text-slate-950 leading-tight">
                Personalized AI Coaching & Measurable Employability
              </h2>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Objective Employability Score benchmarked against real offers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Unscripted dynamic follow-ups testing technical depth</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Millisecond acoustic replay with WPM & filler word analysis</span>
                </li>
              </ul>
              <button
                onClick={onStartPractice}
                className="shimmer-btn mt-2 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all"
              >
                Launch Candidate Studio
              </button>
            </>
          )}

          {activeStakeholder === 'institutions' && (
            <>
              <span className="text-[11px] font-mono font-bold text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded">
                COLLEGES & BOOTCAMPS
              </span>
              <h2 className="font-display fluid-h2 text-2xl sm:text-3xl font-extrabold text-slate-950 leading-tight">
                Assess Placement Readiness at Scale Without Counselor Bottlenecks
              </h2>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0" />
                  <span>Cohort skill diagnostics across engineering, PM & finance majors</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0" />
                  <span>Eliminate 1:400 advisor strain with 24/7 unlimited AI simulations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0" />
                  <span>Verifiable placement badges for corporate recruiters</span>
                </li>
              </ul>
              <button
                onClick={onOpenDemoModal}
                className="shimmer-btn mt-2 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-violet-600 hover:bg-violet-700 shadow-sm transition-all"
              >
                Schedule University Demo
              </button>
            </>
          )}

          {activeStakeholder === 'hiring' && (
            <>
              <span className="text-[11px] font-mono font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded">
                ENTERPRISE RECRUITING
              </span>
              <h2 className="font-display fluid-h2 text-2xl sm:text-3xl font-extrabold text-slate-950 leading-tight">
                Slash Screening Workloads by 68% and Evaluate Soft Skills Early
              </h2>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Calibrated AI screening bar with zero interviewer fatigue or bias</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>3-minute executive summary dossiers with timestamped clips</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Direct bi-directional sync into Greenhouse, Ashby, and Workday</span>
                </li>
              </ul>
              <button
                onClick={onOpenDemoModal}
                className="shimmer-btn mt-2 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-sky-600 hover:bg-sky-700 shadow-sm transition-all"
              >
                Request Enterprise Pilot
              </button>
            </>
          )}
        </div>

        {/* Visual Mockup Dashboard representation */}
        <div className="lg:col-span-6">
          <EcosystemMockups activeTab={activeStakeholder} roleTitle={selectedRole.title} />
        </div>
      </div>

      {/* Subdomain Footer Navigation */}
      <div className="p-4 sm:p-5 rounded-2xl glass-premium border border-slate-200/90 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        <button
          onClick={() => onNavigateSubdomain('multimodal')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-950 bg-white sm:bg-transparent border sm:border-transparent border-slate-200 rounded-xl transition-colors cursor-pointer min-h-[40px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous: Multimodal Layer</span>
        </button>

        <button
          onClick={() => onNavigateSubdomain('engine')}
          className="shimmer-btn inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-95 rounded-xl shadow-md shadow-indigo-500/20 transition-all cursor-pointer min-h-[40px]"
        >
          <span>Continue to Intelligence Console</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
