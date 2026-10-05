import React, { useState, useEffect } from 'react';
import { ResumeData, ATSAnalysisResult, ATSIssue } from '../../data/resumeTypes';
import { checkATSCompatibility } from '../../services/resumeApi';
import {
  ShieldCheck,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  Wand2,
  RefreshCw,
  ArrowRight,
  Sparkles,
  FileCheck,
  Check,
} from 'lucide-react';

interface ATSCheckerProps {
  resume: ResumeData;
  onUpdateResume: (updated: ResumeData) => void;
  onNavigateToBuilder: () => void;
}

export const ATSCheckerVIew: React.FC<ATSCheckerProps> = ({
  resume,
  onUpdateResume,
  onNavigateToBuilder,
}) => {
  const [analysis, setAnalysis] = useState<ATSAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fixedIssueIds, setFixedIssueIds] = useState<{ [id: string]: boolean }>({});

  const runAudit = async () => {
    setIsLoading(true);
    try {
      const res = await checkATSCompatibility(resume);
      setAnalysis(res);
      // update resume ATS score
      if (res.overallScore !== resume.atsScore) {
        onUpdateResume({
          ...resume,
          atsScore: res.overallScore,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    runAudit();
  }, [resume.id]);

  const handleApplyFix = (issue: ATSIssue) => {
    let updated = { ...resume };

    if (issue.fixActionKey === 'switch_template') {
      updated.template = 'executive';
    } else if (issue.fixActionKey === 'quantify_bullets') {
      // If summary is missing, provide a strong professional summary
      if (!updated.personalInfo.summary) {
        updated.personalInfo.summary = `Experienced ${updated.personalInfo.professionalTitle || 'Software Professional'} with proven track record designing scalable systems, accelerating deployment velocity, and optimizing technical infrastructure.`;
      }
    }

    setFixedIssueIds((prev) => ({ ...prev, [issue.id]: true }));
    onUpdateResume(updated);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="glass-premium rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
              ATS Parse Simulator
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Workday / Greenhouse / Lever Compliance
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950">
            ATS Resume Compatibility Checker
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Audit your resume against automated parsing filters to eliminate formatting traps, table parsing errors, missing contact records, and non-standard headings.
          </p>
        </div>

        <button
          disabled={isLoading}
          onClick={runAudit}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-2xs self-start md:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Re-run Audit</span>
        </button>
      </div>

      {isLoading ? (
        <div className="glass-premium rounded-3xl p-16 border border-slate-200/90 text-center space-y-4">
          <div className="w-12 h-12 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h3 className="font-display text-lg font-bold text-slate-950">
            Scanning Resume Structure & Typography
          </h3>
          <p className="text-xs text-slate-500 font-mono">
            Evaluating parsing delimiters, heading tags, date formats, and keyword readability...
          </p>
        </div>
      ) : analysis ? (
        <div className="space-y-6">
          {/* Top Scorecard Cockpit */}
          <div className="glass-premium rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-8 border border-slate-200/90 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Overall Score Circle */}
              <div className="md:col-span-4 flex flex-col xs:flex-row items-start xs:items-center gap-4 sm:gap-5 border-b md:border-b-0 md:border-r border-slate-100 pb-5 md:pb-0 md:pr-5">
                <div
                  className={`w-20 sm:w-24 h-20 sm:h-24 rounded-2xl flex flex-col items-center justify-center shadow-md font-mono shrink-0 ${
                    analysis.overallScore >= 85
                      ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white'
                      : analysis.overallScore >= 70
                      ? 'bg-gradient-to-br from-indigo-600 to-violet-700 text-white'
                      : 'bg-gradient-to-br from-amber-500 to-rose-600 text-white'
                  }`}
                >
                  <span className="font-display text-2xl sm:text-3xl font-extrabold leading-none">
                    {analysis.overallScore}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest mt-1 opacity-90">
                    / 100
                  </span>
                </div>

                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    Estimated ATS Pass Rate
                  </div>
                  <h3 className="font-display text-base font-extrabold text-slate-950 mt-0.5">
                    {analysis.overallScore >= 85
                      ? 'Optimal Parsing Fidelity'
                      : analysis.overallScore >= 70
                      ? 'Moderate Compatibility'
                      : 'High Parse Risk'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {analysis.summary}
                  </p>
                </div>
              </div>

              {/* Category Breakdown Bars */}
              <div className="md:col-span-8 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-2.5 sm:gap-3">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="text-[10px] font-mono text-slate-400 font-bold uppercase truncate">
                    Keywords
                  </div>
                  <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">
                    {analysis.categoryScores.keywordMatch}%
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: `${analysis.categoryScores.keywordMatch}%` }}
                    ></div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="text-[10px] font-mono text-slate-400 font-bold uppercase truncate">
                    Formatting
                  </div>
                  <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">
                    {analysis.categoryScores.formatting}%
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full"
                      style={{ width: `${analysis.categoryScores.formatting}%` }}
                    ></div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="text-[10px] font-mono text-slate-400 font-bold uppercase truncate">
                    Structure
                  </div>
                  <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">
                    {analysis.categoryScores.structure}%
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: `${analysis.categoryScores.structure}%` }}
                    ></div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="text-[10px] font-mono text-slate-400 font-bold uppercase truncate">
                    Readability
                  </div>
                  <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">
                    {analysis.categoryScores.readability}%
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-teal-600 h-full rounded-full"
                      style={{ width: `${analysis.categoryScores.readability}%` }}
                    ></div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 col-span-2 sm:col-span-1">
                  <div className="text-[10px] font-mono text-slate-400 font-bold uppercase truncate">
                    Relevance
                  </div>
                  <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">
                    {analysis.categoryScores.jobRelevance}%
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-violet-600 h-full rounded-full"
                      style={{ width: `${analysis.categoryScores.jobRelevance}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actionable Detected Issues List */}
          <div className="glass-premium rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display font-bold text-base text-slate-950 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-indigo-600" />
                <span>Audited Optimization Items ({analysis.issues.length})</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                1-Click Fixes Available
              </span>
            </div>

            <div className="space-y-3">
              {analysis.issues.map((issue) => {
                const isFixed = fixedIssueIds[issue.id];
                return (
                  <div
                    key={issue.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isFixed
                        ? 'bg-emerald-50/60 border-emerald-200'
                        : issue.severity === 'critical'
                        ? 'bg-rose-50/60 border-rose-200'
                        : issue.severity === 'warning'
                        ? 'bg-amber-50/50 border-amber-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                              issue.severity === 'critical'
                                ? 'bg-rose-600 text-white'
                                : issue.severity === 'warning'
                                ? 'bg-amber-600 text-white'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {issue.severity}
                          </span>
                          <span className="font-bold text-xs text-slate-950">
                            {issue.problem}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600">
                          <strong>Why it matters:</strong> {issue.whyItMatters}
                        </p>
                        <p className="text-xs text-indigo-900 font-medium">
                          <strong>Recommendation:</strong> {issue.recommendation}
                        </p>
                      </div>

                      {issue.canAutoFix && (
                        <div className="self-start sm:self-center shrink-0">
                          {isFixed ? (
                            <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl">
                              <Check className="w-3.5 h-3.5" />
                              <span>Fix Applied</span>
                            </span>
                          ) : (
                            <button
                              onClick={() => handleApplyFix(issue)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-xs cursor-pointer"
                            >
                              <Wand2 className="w-3.5 h-3.5" />
                              <span>1-Click Auto Fix</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 border-t border-slate-100 text-xs">
              <button
                onClick={onNavigateToBuilder}
                className="text-indigo-600 font-bold flex items-center gap-1.5 cursor-pointer hover:text-indigo-800"
              >
                <span>Edit Resume in Structured Builder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-slate-400 font-mono text-[11px]">
                Estimated ATS Compatibility Index
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
