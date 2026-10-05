import React, { useState } from 'react';
import { RolePreset } from '../types';
import { ROLE_PRESETS } from '../data/rolesAndJDs';
import { Building2, X, CheckCircle2, Sparkles, FileText, Send } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRole: RolePreset;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose, selectedRole }) => {
  const [submitted, setSubmitted] = useState(false);
  const [roleSelection, setRoleSelection] = useState<string>(selectedRole.id);
  const [cohortType, setCohortType] = useState('University Career Services (Undergrad/Masters)');
  const [cohortSize, setCohortSize] = useState('500 - 2,500 candidates');
  const [includeCustomJD, setIncludeCustomJD] = useState(true);
  const [sampleJD, setSampleJD] = useState(selectedRole.defaultJD);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setRoleSelection(val);
    const found = ROLE_PRESETS.find((r) => r.id === val);
    if (found) {
      setSampleJD(found.defaultJD);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="glass-premium rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-4 sm:p-7 lg:p-8 relative my-4 sm:my-8 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-start sm:items-center gap-3 mb-6 pr-8">
              <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-2xl bg-violet-50 border border-violet-200/80 flex items-center justify-center text-violet-600 shadow-2xs shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg sm:text-2xl font-bold text-slate-950">
                  Request Enterprise Cohort Demo
                </h3>
                <p className="text-xs text-slate-500">
                  Calibrate automated multimodal rubrics to your institution's specific roles and hiring partners.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Name & Title
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Dr. Evelyn Carter, Dean of Career Services"
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Institutional Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="evelyn.carter@university.edu"
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Organization Type
                  </label>
                  <select
                    value={cohortType}
                    onChange={(e) => setCohortType(e.target.value)}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                  >
                    <option>University Career Services (Undergrad/Masters)</option>
                    <option>Engineering & CS Department</option>
                    <option>Business / MBA Career Management</option>
                    <option>Enterprise Talent Acquisition (Tech / Finance)</option>
                    <option>Workforce Development Agency</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Annual Candidate Volume
                  </label>
                  <select
                    value={cohortSize}
                    onChange={(e) => setCohortSize(e.target.value)}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                  >
                    <option>100 - 500 candidates</option>
                    <option>500 - 2,500 candidates</option>
                    <option>2,500 - 10,000 candidates</option>
                    <option>10,000+ candidates (Enterprise / Multi-Campus)</option>
                  </select>
                </div>
              </div>

              {/* Specific Role & Job Description Configuration for the Demo */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Target Demo Role & Job Description</span>
                  </span>
                  <label className="flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer font-medium shrink-0">
                    <input
                      type="checkbox"
                      checked={includeCustomJD}
                      onChange={(e) => setIncludeCustomJD(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Attach Specific JD</span>
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Select Target Industry Role to Preview
                  </label>
                  <select
                    value={roleSelection}
                    onChange={handleRoleChange}
                    className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                  >
                    {ROLE_PRESETS.map((preset) => (
                      <option key={preset.id} value={preset.id}>
                        {preset.title} ({preset.level}) — {preset.companyContext}
                      </option>
                    ))}
                  </select>
                </div>

                {includeCustomJD && (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Sample Job Description / Rubric Context (Pre-loaded from Role)
                    </label>
                    <textarea
                      rows={3}
                      value={sampleJD}
                      onChange={(e) => setSampleJD(e.target.value)}
                      className="w-full text-xs font-mono p-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="shimmer-btn w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-95 rounded-xl shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Schedule 20-Min Architecture Demo for This Role</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-950">Demo Walkthrough Scheduled</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed font-normal">
              We have provisioned an institutional sandbox pre-calibrated with the{' '}
              <strong className="text-slate-900 font-semibold">{selectedRole.title}</strong> role and job description.
              Our enterprise solutions lead will send the calendar invite and sandbox access token within 2 business hours.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-7 py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-xs"
              >
                Return to Overview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
