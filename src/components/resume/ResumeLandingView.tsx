import React from 'react';
import {
  FileText,
  Sparkles,
  Briefcase,
  ShieldCheck,
  Download,
  ArrowRight,
  Upload,
  CheckCircle2,
  Wand2,
  TrendingUp,
  Award,
  Layers,
  PlayCircle,
  FileCheck,
} from 'lucide-react';

interface ResumeLandingViewProps {
  onStartBuilder: () => void;
  onOpenUpload: () => void;
  onNavigateTab: (tab: 'builder' | 'tailor' | 'ats-check' | 'templates' | 'dashboard') => void;
}

export const ResumeLandingView: React.FC<ResumeLandingViewProps> = ({
  onStartBuilder,
  onOpenUpload,
  onNavigateTab,
}) => {
  return (
    <div className="space-y-14 max-w-7xl mx-auto">
      {/* Hero Headline Section */}
      <div className="text-center max-w-4xl mx-auto pt-4 sm:pt-8">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-2xl sm:rounded-full border border-indigo-200 bg-white text-slate-800 text-xs font-medium mb-6 shadow-2xs max-w-full">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
          <span className="text-slate-500 font-mono text-[10px]">MODULE:</span>
          <span className="font-bold text-slate-900">AI Resume Intelligence</span>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold shrink-0">
            Workday & Lever Verified
          </span>
        </div>

        <h1 className="font-display fluid-h1 text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.1] mb-5 text-balance">
          Build Resumes That{' '}
          <span className="text-gradient-accent">Get Interviews</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
          AI-driven resume builder, job-specific requirement tailoring, deep ATS audit, and print-ready PDF generation without fabricated qualifications.
        </p>

        {/* Primary Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onStartBuilder}
            className="shimmer-btn w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 hover:opacity-95 shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-indigo-200" />
            <span>Get Started Free</span>
          </button>

          <button
            onClick={onOpenUpload}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4 text-slate-400" />
            <span>Upload Existing Resume</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-500">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Zero Data Fabrication</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>5 Single-Column ATS Templates</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Instant Vector PDF Download</span>
          </span>
        </div>
      </div>

      {/* Feature Pillars: 3 Major Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card A: AI Resume Builder */}
        <div
          onClick={() => onNavigateTab('builder')}
          className="group glass-premium rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/90 transition-all cursor-pointer relative flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
              <FileText className="w-6 h-6" />
            </div>
            <div className="text-[10px] font-mono uppercase font-bold text-indigo-700 mb-1">
              Core Module
            </div>
            <h3 className="font-display font-extrabold text-xl text-slate-950 group-hover:text-indigo-600 transition-colors mb-2.5">
              AI Resume Builder
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Create professional resumes with live side-by-side preview, action-verb suggestions, and structured section autosaving.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-900 mt-6">
            <span>Open Builder</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card B: Job-Specific Tailoring */}
        <div
          onClick={() => onNavigateTab('tailor')}
          className="group glass-premium rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/90 transition-all cursor-pointer relative flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="text-[10px] font-mono uppercase font-bold text-violet-700 mb-1">
              Keyword Optimization
            </div>
            <h3 className="font-display font-extrabold text-xl text-slate-950 group-hover:text-indigo-600 transition-colors mb-2.5">
              Job-Specific Tailoring
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Paste a target job description and generate tailored bullet points that emphasize real relevant accomplishments and terminology.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-900 mt-6">
            <span>Tailor For Job</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card C: ATS Compatibility */}
        <div
          onClick={() => onNavigateTab('ats-check')}
          className="group glass-premium rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/90 transition-all cursor-pointer relative flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-[10px] font-mono uppercase font-bold text-emerald-700 mb-1">
              Compliance Audit
            </div>
            <h3 className="font-display font-extrabold text-xl text-slate-950 group-hover:text-indigo-600 transition-colors mb-2.5">
              ATS Compatibility Check
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Analyze your resume for formatting consistency, table parse errors, non-standard section headers, and apply 1-click fixes.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-900 mt-6">
            <span>Audit ATS Score</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* "How It Works" 4-Step Interactive Workflow */}
      <div className="glass-premium rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 border border-slate-200/90 shadow-sm space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
            End-to-End Workflow
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 mt-2">
            From Raw Experience to Offer Letter
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Follow our verified 4-phase methodology to turn your background into an interview-generating asset.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            onClick={() => onNavigateTab('builder')}
            className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 hover:bg-white hover:border-indigo-300 transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                01
              </span>
              <span className="text-[10px] font-mono text-slate-400">Step 1</span>
            </div>
            <h4 className="font-display font-bold text-sm text-slate-950 group-hover:text-indigo-600 transition-colors">
              Upload or Build
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Import existing PDF/DOCX or start with structured fields for experience, skills, and projects.
            </p>
          </div>

          <div
            onClick={() => onNavigateTab('builder')}
            className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 hover:bg-white hover:border-indigo-300 transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                02
              </span>
              <span className="text-[10px] font-mono text-slate-400">Step 2</span>
            </div>
            <h4 className="font-display font-bold text-sm text-slate-950 group-hover:text-indigo-600 transition-colors">
              AI Enhancement
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Polish bullets with action verbs, concise phrasing, and quantified business impact without fabricating.
            </p>
          </div>

          <div
            onClick={() => onNavigateTab('tailor')}
            className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 hover:bg-white hover:border-indigo-300 transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                03
              </span>
              <span className="text-[10px] font-mono text-slate-400">Step 3</span>
            </div>
            <h4 className="font-display font-bold text-sm text-slate-950 group-hover:text-indigo-600 transition-colors">
              Tailor & Check
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Paste the target job description to verify keyword density and run an estimated ATS parsing simulation.
            </p>
          </div>

          <div
            onClick={() => onNavigateTab('builder')}
            className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 hover:bg-white hover:border-indigo-300 transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                04
              </span>
              <span className="text-[10px] font-mono text-slate-400">Step 4</span>
            </div>
            <h4 className="font-display font-bold text-sm text-slate-950 group-hover:text-indigo-600 transition-colors">
              Download PDF
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Choose an ATS template and download print-ready vector PDF with clean formatting and no watermarks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
