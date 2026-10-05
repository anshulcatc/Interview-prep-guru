import React, { useState, useEffect } from 'react';
import { ResumeData, ResumeTemplateId } from '../../data/resumeTypes';
import { SAMPLE_RESUME_DATA, createBlankResume } from '../../data/initialResumeData';
import { ResumeLandingView } from '../resume/ResumeLandingView';
import { ResumeDashboardView } from '../resume/ResumeDashboardView';
import { ResumeEditor } from '../resume/ResumeEditor';
import { ResumePreview } from '../resume/ResumePreview';
import { TailorResumeView } from '../resume/TailorResumeView';
import { ATSCheckerVIew } from '../resume/ATSCheckerVIew';
import { TemplatesGalleryView } from '../resume/TemplatesGalleryView';
import { ResumeUploaderModal } from '../resume/ResumeUploaderModal';
import { downloadResumePDF, printResume, exportResumeJSON } from '../../utils/pdfExport';
import {
  FileText,
  Briefcase,
  ShieldCheck,
  Layout,
  Layers,
  Sparkles,
  Download,
  Printer,
  Eye,
  Sliders,
  Check,
  RefreshCw,
  Plus,
  Share2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

export type ResumeTab = 'landing' | 'dashboard' | 'builder' | 'tailor' | 'ats-check' | 'templates';

interface ResumeModuleViewProps {
  initialSubTab?: ResumeTab;
  onNavigateSubdomain?: (id: any) => void;
}

const STORAGE_KEY = 'prepmind_saved_resumes';
const ACTIVE_RESUME_KEY = 'prepmind_active_resume_id';

export const ResumeModuleView: React.FC<ResumeModuleViewProps> = ({
  initialSubTab = 'landing',
}) => {
  const [activeTab, setActiveTab] = useState<ResumeTab>(initialSubTab);
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [activeResumeId, setActiveResumeId] = useState<string>('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [previewScale, setPreviewScale] = useState<number>(0.92);
  const [mobileViewMode, setMobileViewMode] = useState<'editor' | 'preview'>('editor');
  const [isExportingPDF, setIsExportingPDF] = useState<boolean>(false);

  // Initialize or load resumes from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setResumes(parsed);
          const lastActive = localStorage.getItem(ACTIVE_RESUME_KEY) || parsed[0].id;
          setActiveResumeId(lastActive);
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to load stored resumes, using sample:', e);
    }

    // Default seed
    setResumes([SAMPLE_RESUME_DATA]);
    setActiveResumeId(SAMPLE_RESUME_DATA.id);
  }, []);

  // Save resumes whenever they change
  const saveResumes = (updatedList: ResumeData[]) => {
    setResumes(updatedList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  const activeResume: ResumeData =
    resumes.find((r) => r.id === activeResumeId) || resumes[0] || SAMPLE_RESUME_DATA;

  const handleUpdateActiveResume = (updated: ResumeData) => {
    const updatedList = resumes.map((r) => (r.id === updated.id ? updated : r));
    saveResumes(updatedList);
  };

  const handleCreateNew = () => {
    const fresh = createBlankResume();
    const updatedList = [fresh, ...resumes];
    saveResumes(updatedList);
    setActiveResumeId(fresh.id);
    setActiveTab('builder');
  };

  const handleDuplicate = (id: string) => {
    const target = resumes.find((r) => r.id === id);
    if (!target) return;
    const duplicated: ResumeData = {
      ...target,
      id: `resume-${Date.now()}`,
      name: `${target.name} (Copy)`,
      lastUpdated: new Date().toISOString(),
    };
    const updatedList = [duplicated, ...resumes];
    saveResumes(updatedList);
    setActiveResumeId(duplicated.id);
  };

  const handleDelete = (id: string) => {
    const filtered = resumes.filter((r) => r.id !== id);
    saveResumes(filtered);
    if (activeResumeId === id) {
      setActiveResumeId(filtered[0]?.id || '');
    }
  };

  const handleSelectResume = (id: string) => {
    setActiveResumeId(id);
    localStorage.setItem(ACTIVE_RESUME_KEY, id);
  };

  const handleDownloadPDF = async () => {
    setIsExportingPDF(true);
    try {
      await downloadResumePDF('resume-preview-sheet', `${activeResume.name}.pdf`);
    } finally {
      setIsExportingPDF(false);
    }
  };

  // Sub-navigation items
  const navTabs: { id: ResumeTab; label: string; icon: React.ReactNode }[] = [
    { id: 'landing', label: 'Overview', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'dashboard', label: 'My Resumes', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'builder', label: 'Resume Builder', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'tailor', label: 'Tailor for Job', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'ats-check', label: 'ATS Check', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: 'templates', label: 'Templates', icon: <Layout className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="relative py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Mesh Accent */}
      <div className="absolute inset-0 bg-mesh-light pointer-events-none -z-10 opacity-70"></div>
      <div className="absolute inset-0 dot-pattern pointer-events-none -z-10 opacity-30"></div>

      {/* Subdomain Breadcrumb Header */}
      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2.5 mb-6 pb-3 border-b border-slate-200/80">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-mono text-slate-500 min-w-0 max-w-full">
          <span className="font-bold text-slate-900 bg-white px-2 sm:px-2.5 py-0.5 rounded border border-slate-200 shadow-2xs truncate">
            resume.interviewprepguru.ai
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-indigo-600 font-bold uppercase truncate">{activeTab}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 sm:px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            AI Resume Intelligence Online
          </span>
        </div>
      </div>

      {/* Internal Sub-Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 shadow-2xs">
        <nav className="flex items-center gap-1 text-xs font-semibold overflow-x-auto scrollbar-none max-w-full py-0.5">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap min-h-[38px] ${
                  isActive
                    ? 'bg-white text-indigo-950 font-bold shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Global Action CTAs for active resume */}
        <div className="flex items-center gap-2 justify-end pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-200/60">
          <button
            onClick={() => exportResumeJSON(activeResume)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl shadow-2xs cursor-pointer min-h-[36px]"
            title="Export JSON"
          >
            <span>JSON</span>
          </button>
          <button
            onClick={printResume}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-950 bg-white border border-slate-200 rounded-xl shadow-2xs cursor-pointer min-h-[36px]"
            title="Print to PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Print</span>
          </button>
          <button
            disabled={isExportingPDF}
            onClick={handleDownloadPDF}
            className="shimmer-btn inline-flex items-center justify-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-500/20 cursor-pointer min-h-[36px] flex-1 sm:flex-none"
          >
            {isExportingPDF ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* ACTIVE SUB-TAB VIEW ROUTER */}
      {/* ======================================================== */}

      {/* 1. LANDING OVERVIEW */}
      {activeTab === 'landing' && (
        <ResumeLandingView
          onStartBuilder={() => setActiveTab('builder')}
          onOpenUpload={() => setIsUploadModalOpen(true)}
          onNavigateTab={(tab) => setActiveTab(tab)}
        />
      )}

      {/* 2. DASHBOARD */}
      {activeTab === 'dashboard' && (
        <ResumeDashboardView
          resumes={resumes}
          activeResumeId={activeResumeId}
          onSelectResume={handleSelectResume}
          onCreateNew={handleCreateNew}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
          onOpenUploadModal={() => setIsUploadModalOpen(true)}
          onNavigateToBuilder={() => setActiveTab('builder')}
          onNavigateToTailor={() => setActiveTab('tailor')}
          onNavigateToATS={() => setActiveTab('ats-check')}
        />
      )}

      {/* 3. RESUME BUILDER (Split Screen: Left Editor, Right Live Preview) */}
      {activeTab === 'builder' && (
        <div className="space-y-6">
          {/* Mobile view segment toggle (Editor vs Preview) */}
          <div className="lg:hidden flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setMobileViewMode('editor')}
              className={`w-1/2 py-2 rounded-lg transition-all ${
                mobileViewMode === 'editor' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Structured Editor
            </button>
            <button
              onClick={() => setMobileViewMode('preview')}
              className={`w-1/2 py-2 rounded-lg transition-all ${
                mobileViewMode === 'preview' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Live Preview
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left 6 Cols: Structured Editor */}
            <div className={`lg:col-span-6 space-y-6 ${mobileViewMode === 'preview' ? 'hidden lg:block' : ''}`}>
              <ResumeEditor
                resume={activeResume}
                onChange={handleUpdateActiveResume}
                onOpenUploadModal={() => setIsUploadModalOpen(true)}
              />
            </div>

            {/* Right 6 Cols: Live Sheet Preview */}
            <div
              className={`lg:col-span-6 space-y-4 lg:sticky lg:top-24 ${
                mobileViewMode === 'editor' ? 'hidden lg:block' : ''
              }`}
            >
              {/* Preview Controls Bar */}
              <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">Template:</span>
                  <select
                    value={activeResume.template}
                    onChange={(e) =>
                      handleUpdateActiveResume({
                        ...activeResume,
                        template: e.target.value as ResumeTemplateId,
                      })
                    }
                    className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 font-sans font-bold text-indigo-900 focus:outline-none"
                  >
                    <option value="executive">Executive</option>
                    <option value="modern">Modern</option>
                    <option value="classic">Classic (Ivy ATS)</option>
                    <option value="minimal">Minimal</option>
                    <option value="fresher">Fresher & Academic</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewScale((prev) => Math.max(0.7, prev - 0.05))}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-slate-500 font-bold w-12 text-center">
                    {Math.round(previewScale * 100)}%
                  </span>
                  <button
                    onClick={() => setPreviewScale((prev) => Math.min(1.15, prev + 0.05))}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Sheet Container */}
              <div className="bg-slate-100/70 p-2 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 overflow-x-auto max-h-[85vh] overflow-y-auto shadow-inner">
                <ResumePreview resume={activeResume} scale={previewScale} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAILOR FOR JOB */}
      {activeTab === 'tailor' && (
        <TailorResumeView
          resume={activeResume}
          onUpdateResume={handleUpdateActiveResume}
          onNavigateToBuilder={() => setActiveTab('builder')}
          onNavigateToATS={() => setActiveTab('ats-check')}
        />
      )}

      {/* 5. ATS COMPATIBILITY CHECK */}
      {activeTab === 'ats-check' && (
        <ATSCheckerVIew
          resume={activeResume}
          onUpdateResume={handleUpdateActiveResume}
          onNavigateToBuilder={() => setActiveTab('builder')}
        />
      )}

      {/* 6. TEMPLATES GALLERY */}
      {activeTab === 'templates' && (
        <TemplatesGalleryView
          resume={activeResume}
          onSelectTemplate={(tmplId) =>
            handleUpdateActiveResume({ ...activeResume, template: tmplId })
          }
          onNavigateToBuilder={() => setActiveTab('builder')}
        />
      )}

      {/* Upload & Parse Modal */}
      <ResumeUploaderModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onApplyParsedData={(parsedResume) => {
          const updatedList = [parsedResume, ...resumes];
          saveResumes(updatedList);
          setActiveResumeId(parsedResume.id);
          setActiveTab('builder');
        }}
      />
    </div>
  );
};
