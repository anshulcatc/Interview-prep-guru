import React, { useState } from 'react';
import { ResumeData, JobTailoringResult } from '../../data/resumeTypes';
import { SAMPLE_JOB_DESCRIPTIONS } from '../../data/initialResumeData';
import { tailorResumeWithAI } from '../../services/resumeApi';
import {
  Briefcase,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  RefreshCw,
  Building2,
  Check,
  Zap,
  Layers,
  Award,
} from 'lucide-react';

interface TailorResumeViewProps {
  resume: ResumeData;
  onUpdateResume: (updated: ResumeData) => void;
  onNavigateToBuilder: () => void;
  onNavigateToATS: () => void;
}

export const TailorResumeView: React.FC<TailorResumeViewProps> = ({
  resume,
  onUpdateResume,
  onNavigateToBuilder,
  onNavigateToATS,
}) => {
  const [jobTitle, setJobTitle] = useState<string>(resume.targetRole || 'Senior Distributed Systems Engineer');
  const [company, setCompany] = useState<string>(resume.targetCompany || 'Stripe');
  const [jobDescription, setJobDescription] = useState<string>(SAMPLE_JOB_DESCRIPTIONS[0].description);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tailorResult, setTailorResult] = useState<JobTailoringResult | null>(null);
  const [appliedTailoring, setAppliedTailoring] = useState<boolean>(false);

  const handleRunAnalysis = async () => {
    if (!jobDescription.trim()) return;
    setIsLoading(true);
    setAppliedTailoring(false);
    try {
      const result = await tailorResumeWithAI(resume, jobDescription, jobTitle, company);
      setTailorResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyTailoring = () => {
    if (!tailorResult) return;
    const updated: ResumeData = {
      ...resume,
      targetRole: jobTitle,
      targetCompany: company,
      jobMatchScore: tailorResult.matchScore,
      personalInfo: {
        ...resume.personalInfo,
        summary: tailorResult.tailoredSummary || resume.personalInfo.summary,
      },
      lastUpdated: new Date().toISOString(),
    };
    onUpdateResume(updated);
    setAppliedTailoring(true);
  };

  const handleSelectSampleJD = (sample: (typeof SAMPLE_JOB_DESCRIPTIONS)[0]) => {
    setJobTitle(sample.title);
    setCompany(sample.company);
    setJobDescription(sample.description);
    setTailorResult(null);
    setAppliedTailoring(false);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* View Header */}
      <div className="glass-premium rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
              Role Match Calibration
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Zero-Fabrication Guardrail
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950">
            Job-Specific Resume Tailoring
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Paste target job requirements to diagnose keyword coverage, discover missing technical pillars, and align wording without inventing experiences.
          </p>
        </div>

        {tailorResult && (
          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs self-start md:self-auto">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center font-display font-extrabold text-xl shadow-xs">
              {tailorResult.matchScore}%
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase text-slate-400">
                Job Match Score
              </div>
              <div className="text-xs font-bold text-slate-900">
                {tailorResult.matchScore >= 80 ? 'Strong Alignment' : 'Needs Optimization'}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left: Input parameters */}
        <div className="lg:col-span-6 space-y-5">
          <div className="glass-premium rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                <span>Target Role & Company</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">Step 1 of 2</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-600 uppercase mb-1">
                  Target Job Title
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-indigo-600 font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-600 uppercase mb-1">
                  Target Company
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Stripe, OpenAI, Google"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-indigo-600 font-semibold text-slate-900"
                />
              </div>
            </div>

            {/* Quick 1-click sample JDs */}
            <div>
              <span className="block text-[10px] font-mono text-slate-400 uppercase font-semibold mb-1.5">
                Load Verified Sample Job Descriptions:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_JOB_DESCRIPTIONS.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSampleJD(s)}
                    className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 border border-slate-200/80 transition-colors font-medium cursor-pointer"
                  >
                    {s.company} ({s.title.split(' ')[0]} {s.title.split(' ')[1]})
                  </button>
                ))}
              </div>
            </div>

            {/* Job Description Textarea */}
            <div>
              <label className="block text-[11px] font-mono font-bold text-slate-600 uppercase mb-1">
                Paste Job Description & Requirements
              </label>
              <textarea
                rows={9}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job post, responsibilities, required qualifications and technical stack..."
                className="w-full p-3.5 text-xs rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none font-mono text-slate-800 leading-relaxed"
              />
            </div>

            <button
              disabled={isLoading || !jobDescription.trim()}
              onClick={handleRunAnalysis}
              className="w-full shimmer-btn py-3 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 rounded-xl shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Auditing Match & Keyword Coverage...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-indigo-200" />
                  <span>Analyze Alignment Against Current Resume</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Tailoring results */}
        <div className="lg:col-span-6 space-y-5">
          {!tailorResult && !isLoading ? (
            <div className="glass-premium rounded-3xl p-8 border border-slate-200/90 shadow-2xs text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-base text-slate-900">
                Ready for Job Alignment Audit
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Click "Analyze Alignment" to inspect how your experiences, skills, and metrics compare against this exact job specification.
              </p>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-[11px] text-slate-600 font-mono text-left space-y-1.5">
                <div className="font-bold text-slate-800">What the Tailoring Engine Evaluates:</div>
                <div className="flex items-center gap-1.5 text-emerald-700">✓ Technical skill overlap and density</div>
                <div className="flex items-center gap-1.5 text-indigo-700">✓ Terminology synchronization (e.g. Raft vs Consensus)</div>
                <div className="flex items-center gap-1.5 text-rose-700">✓ Missing non-negotiable requirements</div>
              </div>
            </div>
          ) : isLoading ? (
            <div className="glass-premium rounded-3xl p-12 border border-slate-200/90 shadow-2xs text-center space-y-4">
              <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <h3 className="font-display font-bold text-base text-slate-900">
                Extracting Job Keywords & Comparing Schemas
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Matching candidate accomplishments to {company || 'target role'}...
              </p>
            </div>
          ) : (
            tailorResult && (
              <div className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
                {/* Score & Summary Banner */}
                <div className="glass-premium rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                        Target Match Telemetry
                      </span>
                      <h3 className="font-display text-lg font-extrabold text-slate-950">
                        {tailorResult.targetJobTitle}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-indigo-700 font-mono">
                        {tailorResult.matchScore}%
                      </span>
                      <span className="block text-[10px] font-mono text-emerald-700 font-semibold">
                        ATS Pass Probable
                      </span>
                    </div>
                  </div>

                  {/* Tailored Summary Recommendation */}
                  {tailorResult.tailoredSummary && (
                    <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Recommended Tailored Executive Summary</span>
                        </span>
                        <span className="text-[10px] font-mono text-indigo-600">Grounded in Real Data</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed italic">
                        "{tailorResult.tailoredSummary}"
                      </p>
                    </div>
                  )}

                  {/* Apply Tailoring Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                    <span className="text-[11px] text-slate-500 font-mono">
                      Updates summary & logs job match score
                    </span>
                    <button
                      onClick={handleApplyTailoring}
                      className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px] ${
                        appliedTailoring
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20'
                      }`}
                    >
                      {appliedTailoring ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Tailoring Applied to Resume!</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5" />
                          <span>Apply Tailoring to Resume</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Keyword Analysis Matrix */}
                <div className="glass-premium rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                      Key Competency Alignment
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {tailorResult.keywords.filter((k) => k.status === 'present').length} of{' '}
                      {tailorResult.keywords.length} Detected
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {tailorResult.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-mono font-medium border ${
                          kw.status === 'present'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : kw.status === 'partial'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}
                        title={kw.contextInResume || (kw.status === 'missing' ? 'Missing from your resume' : '')}
                      >
                        {kw.status === 'present' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : kw.status === 'partial' ? (
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                        ) : (
                          <XCircle className="w-3 h-3 text-rose-600" />
                        )}
                        <span>{kw.keyword}</span>
                      </span>
                    ))}
                  </div>

                  {tailorResult.keywords.some((k) => k.status === 'missing') && (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 space-y-1 mt-2">
                      <span className="font-bold block">Notice on Missing Requirements:</span>
                      <span>
                        If you possess experience with any missing keywords above, add them to your skills or project bullets in the Editor. The AI will never invent them for you.
                      </span>
                    </div>
                  )}
                </div>

                {/* Specific Recommendations */}
                <div className="glass-premium rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-2xs space-y-3">
                  <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                    Recommended Action Items
                  </h4>
                  <div className="space-y-2">
                    {tailorResult.tailoringRecommendations.map((rec, i) => (
                      <div
                        key={i}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-start justify-between gap-3"
                      >
                        <div>
                          <span className="font-bold text-slate-900 block">{rec.section}</span>
                          <span className="text-slate-600 text-[11px]">{rec.suggestion}</span>
                        </div>
                        <span
                          className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                            rec.impactLevel === 'high'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-indigo-100 text-indigo-700'
                          }`}
                        >
                          {rec.impactLevel} Impact
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Navigation to ATS or Builder */}
                  <div className="pt-2 flex items-center justify-between gap-2">
                    <button
                      onClick={onNavigateToBuilder}
                      className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Return to Editor</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={onNavigateToATS}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Run ATS Compatibility Check</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
