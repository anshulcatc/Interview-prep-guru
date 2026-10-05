import React, { useState } from 'react';
import { RolePreset } from '../types';
import { ROLE_PRESETS } from '../data/rolesAndJDs';
import { Briefcase, Sliders, Check, FileText, Sparkles, X, ChevronRight } from 'lucide-react';

interface RoleJDModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRole: RolePreset;
  onSelectRole: (role: RolePreset) => void;
  onProceedToPractice: (role: RolePreset) => void;
}

export const RoleJDModal: React.FC<RoleJDModalProps> = ({
  isOpen,
  onClose,
  selectedRole,
  onSelectRole,
  onProceedToPractice,
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [currentRole, setCurrentRole] = useState<RolePreset>(selectedRole);
  const [customTitle, setCustomTitle] = useState('');
  const [customLevel, setCustomLevel] = useState('Senior (L5/L6)');
  const [customJD, setCustomJD] = useState(selectedRole.defaultJD);
  const [customQuestion, setCustomQuestion] = useState(selectedRole.sampleQuestion);

  if (!isOpen) return null;

  const handleApplyPreset = (preset: RolePreset) => {
    setCurrentRole(preset);
    setCustomJD(preset.defaultJD);
    setCustomQuestion(preset.sampleQuestion);
  };

  const handleSaveAndConfirm = () => {
    if (activeTab === 'presets') {
      const updated = {
        ...currentRole,
        defaultJD: customJD,
        sampleQuestion: customQuestion,
      };
      onSelectRole(updated);
      onProceedToPractice(updated);
    } else {
      const newCustomRole: RolePreset = {
        id: `custom-${Date.now()}`,
        title: customTitle.trim() || 'Custom Interview Candidate',
        category: 'Custom Defined Role',
        level: customLevel,
        companyContext: 'Tailored to Target Job Description',
        defaultJD: customJD,
        sampleQuestion: customQuestion.trim() || 'Describe a high-impact technical or operational initiative you led that directly influenced key organizational metrics.',
        evalCriteria: {
          technicalPillars: ['Domain Competency', 'Operational Rigor', 'Strategic Alignment'],
          behavioralFocus: 'Ownership, accountability, and clarity under challenging cross-functional environments.',
          expectedKeyPhrases: ['quantifiable metrics', 'trade-off analysis', 'systemic improvement'],
        },
        sampleSimulatedAnswer: {
          opening: 'In my previous position tackling our principal workflow bottleneck, I initiated a root-cause audit across stakeholders.',
          action: 'I developed an iterative milestone roadmap with quantifiable SLAs and introduced automated regression verifications.',
          result: 'We successfully met our performance benchmarks 3 weeks ahead of schedule with zero operational regressions.',
          metrics: {
            wpm: 138,
            score: 92,
            fillers: 0.9,
            starAccuracy: '96% (Clear STAR methodology applied)',
          },
        },
      };
      onSelectRole(newCustomRole);
      onProceedToPractice(newCustomRole);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="glass-premium rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full p-4 sm:p-7 lg:p-8 relative my-4 sm:my-8 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start sm:items-center gap-3 mb-6 pr-8">
          <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-2xl bg-indigo-50 border border-indigo-200/80 flex items-center justify-center text-indigo-600 shadow-2xs shrink-0">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-lg sm:text-2xl font-bold text-slate-950">
              Select Target Role & Job Description
            </h3>
            <p className="text-xs text-slate-500">
              PrepMind AI tailors speech cadence thresholds, rubric criteria, and question depth to your exact target JD.
            </p>
          </div>
        </div>

        {/* Tab switch between presets and custom */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mb-6 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer min-h-[38px] ${
              activeTab === 'presets'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Curated Industry Roles (4)
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer min-h-[38px] ${
              activeTab === 'custom'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Custom Role / Paste Your Own JD
          </button>
        </div>

        {activeTab === 'presets' ? (
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              Choose Verified Role Profile
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
              {ROLE_PRESETS.map((preset) => {
                const isSelected = currentRole.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleApplyPreset(preset)}
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 ring-1 ring-indigo-500 shadow-xs'
                        : 'border-slate-200/90 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-display text-xs font-bold text-slate-950">{preset.title}</span>
                      {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 font-medium">{preset.level} · {preset.category}</div>
                    <div className="text-[10px] text-indigo-700 mt-2 font-mono font-semibold">{preset.companyContext}</div>
                  </button>
                );
              })}
            </div>

            {/* Editable Job Description for selected preset */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Job Description & Responsibilities</span>
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">Editable before practice</span>
                </div>
                <textarea
                  rows={4}
                  value={customJD}
                  onChange={(e) => setCustomJD(e.target.value)}
                  className="w-full text-xs font-mono p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Target Evaluation Question
                </label>
                <input
                  type="text"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Target Job Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior Frontend Architect / Data Scientist"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Seniority Level
                </label>
                <select
                  value={customLevel}
                  onChange={(e) => setCustomLevel(e.target.value)}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                >
                  <option>University Graduate / Associate (0-2 yrs)</option>
                  <option>Mid-Level (3-5 yrs)</option>
                  <option>Senior (L5/L6, 6-9 yrs)</option>
                  <option>Staff / Principal / Director (10+ yrs)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Paste Job Description / Requirements
              </label>
              <textarea
                rows={5}
                placeholder="Paste the target job description, bullet points, tech stack, or behavioral expectations here..."
                value={customJD}
                onChange={(e) => setCustomJD(e.target.value)}
                className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Interview Scenario / Prompt
              </label>
              <input
                type="text"
                placeholder="e.g. Walk me through a time you solved an ambiguous technical blocker..."
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>AI rubric calibrates pacing, STAR metrics & vocabulary automatically</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAndConfirm}
              className="shimmer-btn w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-95 rounded-xl shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Apply & Launch Practice</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
