import React from 'react';
import { ResumeData, ResumeTemplateId } from '../../data/resumeTypes';
import { Layout, Check, Sparkles, ArrowRight, ShieldCheck, Eye } from 'lucide-react';

interface TemplatesGalleryProps {
  resume: ResumeData;
  onSelectTemplate: (templateId: ResumeTemplateId) => void;
  onNavigateToBuilder: () => void;
}

interface TemplateOption {
  id: ResumeTemplateId;
  name: string;
  tagline: string;
  recommendedFor: string;
  atsFidelity: string;
  accentBg: string;
  features: string[];
}

const TEMPLATES: TemplateOption[] = [
  {
    id: 'executive',
    name: 'Executive Leadership',
    tagline: 'Refined navy hierarchy with clean horizontal divider rules',
    recommendedFor: 'Senior, Staff, Principal Engineers & Management',
    atsFidelity: '99.4% Parsing Rate',
    accentBg: 'from-indigo-900 to-slate-900',
    features: ['Bold contact header', 'Prominent summary highlight', 'Compact date alignment'],
  },
  {
    id: 'modern',
    name: 'Modern Platform',
    tagline: 'Contemporary accented left rail with pill tags and dynamic spacing',
    recommendedFor: 'Tech Startups, Growth Scale-ups & Full-Stack Developers',
    atsFidelity: '98.2% Parsing Rate',
    accentBg: 'from-violet-700 to-indigo-800',
    features: ['Keyword pill badges', 'Clean milestone markers', 'High-contrast section titles'],
  },
  {
    id: 'classic',
    name: 'Classic Ivy / ATS Standard',
    tagline: 'Strict Harvard/Ivy League formatting optimized for legacy parsers',
    recommendedFor: 'FinTech, Defense, Enterprise IT & Government Portals',
    atsFidelity: '99.8% Parsing Rate',
    accentBg: 'from-slate-800 to-slate-950',
    features: ['Centered contact header', 'Zero parse obstacles', 'Traditional bullet hierarchy'],
  },
  {
    id: 'minimal',
    name: 'Silicon Valley Minimal',
    tagline: 'Ultra-clean monochrome layout with maximum information density',
    recommendedFor: 'Systems Architecture, Quantitative Dev & Low-Level Engineering',
    atsFidelity: '99.1% Parsing Rate',
    accentBg: 'from-slate-700 to-slate-800',
    features: ['Monospace delimiters', 'High spatial density', 'Zero visual fluff'],
  },
  {
    id: 'fresher',
    name: 'Fresher & Academic',
    tagline: 'Education, capstone projects, and coursework elevated above experience',
    recommendedFor: 'New Graduates, Interns, Career Changers & Bootcamp Grads',
    atsFidelity: '98.9% Parsing Rate',
    accentBg: 'from-emerald-700 to-teal-800',
    features: ['Education prioritized', 'Highlighted academic coursework', 'Project focus'],
  },
];

export const TemplatesGalleryView: React.FC<TemplatesGalleryProps> = ({
  resume,
  onSelectTemplate,
  onNavigateToBuilder,
}) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="glass-premium rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-8 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
              Verified ATS Templates
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Zero-Loss Format Switching
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950">
            Professional Resume Templates
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Switch styles instantly. All templates use the same underlying structured data so your content, achievements, and metrics are never erased or corrupted.
          </p>
        </div>

        <button
          onClick={onNavigateToBuilder}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-md shadow-indigo-500/20 self-start sm:self-auto cursor-pointer"
        >
          <span>Open Live Editor</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map((tmpl) => {
          const isSelected = resume.template === tmpl.id;
          return (
            <div
              key={tmpl.id}
              onClick={() => onSelectTemplate(tmpl.id)}
              className={`group glass-premium rounded-2xl sm:rounded-3xl p-4 sm:p-6 border transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-600 ring-2 ring-indigo-500/20 shadow-md bg-white'
                  : 'border-slate-200/90 hover:border-indigo-300 hover:shadow-sm'
              }`}
            >
              <div>
                {/* Visual Thumbnail Simulator */}
                <div
                  className={`h-40 rounded-2xl bg-gradient-to-br ${tmpl.accentBg} p-4 text-white flex flex-col justify-between mb-4 shadow-2xs relative overflow-hidden`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold tracking-widest opacity-80">
                      {tmpl.atsFidelity}
                    </span>
                    {isSelected && (
                      <span className="w-6 h-6 rounded-full bg-white text-indigo-900 flex items-center justify-center font-bold text-xs shadow-xs">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  {/* Wireframe Mockup lines */}
                  <div className="space-y-1.5 opacity-60">
                    <div className="h-2 bg-white rounded-full w-2/3"></div>
                    <div className="h-1.5 bg-white/70 rounded-full w-full"></div>
                    <div className="h-1.5 bg-white/70 rounded-full w-4/5"></div>
                    <div className="h-1.5 bg-white/50 rounded-full w-1/2"></div>
                  </div>

                  <div className="font-display font-bold text-sm tracking-wide">
                    {tmpl.name}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-extrabold text-base text-slate-950">
                      {tmpl.name}
                    </h3>
                    {isSelected && (
                      <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {tmpl.tagline}
                  </p>
                  <div className="text-[11px] font-mono text-indigo-700 font-medium">
                    Best for: {tmpl.recommendedFor}
                  </div>
                </div>

                <ul className="space-y-1 text-[11px] text-slate-500 mb-4 border-t border-slate-100 pt-3">
                  {tmpl.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTemplate(tmpl.id);
                  onNavigateToBuilder();
                }}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-50 text-indigo-900 border border-indigo-200'
                    : 'bg-white hover:bg-indigo-600 hover:text-white text-slate-700 border border-slate-200'
                }`}
              >
                {isSelected ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Selected · Continue Editing</span>
                  </>
                ) : (
                  <>
                    <span>Select this Template</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
