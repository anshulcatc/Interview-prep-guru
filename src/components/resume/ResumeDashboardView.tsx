import React from 'react';
import { ResumeData } from '../../data/resumeTypes';
import {
  FileText,
  Plus,
  Upload,
  Copy,
  Trash2,
  Edit3,
  Sparkles,
  Download,
  ShieldCheck,
  Briefcase,
  ArrowRight,
  Clock,
  Layers,
} from 'lucide-react';
import { downloadResumePDF } from '../../utils/pdfExport';

interface ResumeDashboardProps {
  resumes: ResumeData[];
  activeResumeId: string;
  onSelectResume: (id: string) => void;
  onCreateNew: () => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onOpenUploadModal: () => void;
  onNavigateToBuilder: () => void;
  onNavigateToTailor: () => void;
  onNavigateToATS: () => void;
}

export const ResumeDashboardView: React.FC<ResumeDashboardProps> = ({
  resumes,
  activeResumeId,
  onSelectResume,
  onCreateNew,
  onDuplicate,
  onDelete,
  onOpenUploadModal,
  onNavigateToBuilder,
  onNavigateToTailor,
  onNavigateToATS,
}) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="glass-premium rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-8 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
              Workspace Dossiers
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {resumes.length} {resumes.length === 1 ? 'Resume' : 'Resumes'} Saved
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950">
            My Resumes & Tailored Versions
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Manage multiple tailored versions for distinct roles, run instant ATS audits, or spin up new targeted resumes.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={onOpenUploadModal}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-2xs cursor-pointer min-h-[40px]"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>Upload Existing</span>
          </button>

          <button
            onClick={onCreateNew}
            className="flex-1 sm:flex-none shimmer-btn inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 rounded-xl shadow-md shadow-indigo-500/20 cursor-pointer min-h-[40px]"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span>Create New Resume</span>
          </button>
        </div>
      </div>

      {/* Grid of Resumes */}
      {resumes.length === 0 ? (
        <div className="glass-premium rounded-3xl p-16 text-center border border-slate-200/90 shadow-2xs space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-xs">
            <FileText className="w-7 h-7" />
          </div>
          <h3 className="font-display font-extrabold text-lg text-slate-950">
            Create Your First Resume
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Build a high-impact, ATS-optimized resume with AI guidance or upload an existing document to parse into structured sections.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={onCreateNew}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 cursor-pointer"
            >
              Build from Scratch
            </button>
            <button
              onClick={onOpenUploadModal}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs shadow-2xs cursor-pointer"
            >
              Upload Document
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((res) => {
            const isActive = res.id === activeResumeId;
            return (
              <div
                key={res.id}
                onClick={() => onSelectResume(res.id)}
                className={`group glass-premium rounded-2xl sm:rounded-3xl p-4 sm:p-6 border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isActive
                    ? 'border-indigo-600 ring-2 ring-indigo-500/20 shadow-md bg-white'
                    : 'border-slate-200/90 hover:border-indigo-300 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                        Template: {res.template}
                      </span>
                      <h3 className="font-display font-extrabold text-base text-slate-950 group-hover:text-indigo-600 transition-colors mt-0.5 line-clamp-1">
                        {res.name}
                      </h3>
                    </div>
                    {isActive && (
                      <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 shrink-0">
                        Active
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed font-normal">
                    {res.personalInfo.summary || 'No professional summary provided yet.'}
                  </p>

                  {/* Telemetry Scores */}
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mb-4 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">
                        ATS Score
                      </span>
                      <span className="font-extrabold text-indigo-700 text-sm">
                        {res.atsScore || 88}/100
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">
                        Target Match
                      </span>
                      <span className="font-extrabold text-emerald-700 text-sm">
                        {res.jobMatchScore ? `${res.jobMatchScore}%` : 'Not Tailored'}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 mb-4">
                    <Clock className="w-3 h-3" />
                    <span>Updated {new Date(res.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectResume(res.id);
                        onNavigateToBuilder();
                      }}
                      className="p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                      title="Edit Resume"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectResume(res.id);
                        onNavigateToTailor();
                      }}
                      className="p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                      title="Tailor for Job Description"
                    >
                      <Briefcase className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectResume(res.id);
                        onNavigateToATS();
                      }}
                      className="p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                      title="Check ATS Compatibility"
                    >
                      <ShieldCheck className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDuplicate(res.id);
                      }}
                      className="p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                      title="Duplicate Resume"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    {resumes.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Delete resume "${res.name}"?`)) {
                            onDelete(res.id);
                          }
                        }}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Resume"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectResume(res.id);
                        onNavigateToBuilder();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                    >
                      <span>Open</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
