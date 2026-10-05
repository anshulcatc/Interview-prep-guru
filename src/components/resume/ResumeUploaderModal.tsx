import React, { useState } from 'react';
import { ResumeData } from '../../data/resumeTypes';
import { SAMPLE_RESUME_DATA, createBlankResume } from '../../data/initialResumeData';
import { parseResumeFromText } from '../../services/resumeApi';
import { X, Upload, FileText, Sparkles, Check, AlertCircle, ArrowRight } from 'lucide-react';

interface ResumeUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyParsedData: (resume: ResumeData) => void;
}

export const ResumeUploaderModal: React.FC<ResumeUploaderModalProps> = ({
  isOpen,
  onClose,
  onApplyParsedData,
}) => {
  const [pasteText, setPasteText] = useState<string>('');
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [parseError, setParseError] = useState<string>('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setParseError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setPasteText(content || '');
    };
    reader.onerror = () => {
      setParseError('Failed to read file. Please paste your resume text directly.');
    };
    reader.readAsText(file);
  };

  const handleRunParse = async () => {
    if (!pasteText.trim()) {
      setParseError('Please paste your resume text or upload a document file.');
      return;
    }

    setIsParsing(true);
    setParseError('');

    try {
      const parsedPartial = await parseResumeFromText(pasteText);
      const base = createBlankResume();

      const mergedResume: ResumeData = {
        ...base,
        name: uploadedFileName ? `Imported (${uploadedFileName})` : 'Imported Resume',
        personalInfo: {
          ...base.personalInfo,
          ...(parsedPartial.personalInfo || {}),
        },
        education: (parsedPartial.education as any) || base.education,
        experience: (parsedPartial.experience as any) || base.experience,
        projects: (parsedPartial.projects as any) || base.projects,
        skills: (parsedPartial.skills as any) || base.skills,
        lastUpdated: new Date().toISOString(),
      };

      onApplyParsedData(mergedResume);
      onClose();
    } catch (err: any) {
      console.error(err);
      setParseError('Failed to parse resume structure. Try loading the curated sample instead.');
    } finally {
      setIsParsing(false);
    }
  };

  const handleLoadSample = () => {
    onApplyParsedData(SAMPLE_RESUME_DATA);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose}></div>

      <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl p-4 sm:p-7 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150 my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center shadow-xs">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-950">
                Import or Parse Existing Resume
              </h3>
              <p className="text-xs text-slate-500">
                Upload a document or paste raw text to populate editable sections automatically
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="py-5 space-y-4">
          {/* File input dropzone */}
          <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-4 text-center transition-colors bg-slate-50/50">
            <input
              type="file"
              id="resume-file-input"
              accept=".txt,.json,.md,.doc,.docx,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label htmlFor="resume-file-input" className="cursor-pointer block">
              <FileText className="w-6 h-6 text-indigo-600 mx-auto mb-1.5" />
              <span className="text-xs font-bold text-slate-900 block">
                {uploadedFileName ? `Loaded: ${uploadedFileName}` : 'Click to upload resume file (TXT, JSON, PDF text)'}
              </span>
              <span className="text-[11px] text-slate-400">
                PDF/DOCX/TXT/JSON supported
              </span>
            </label>
          </div>

          <div className="relative flex items-center justify-center text-xs text-slate-400 font-mono">
            <span className="bg-white px-3 z-10 uppercase">or paste resume text directly</span>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
          </div>

          <textarea
            rows={7}
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            placeholder="Paste your resume contents here (work experience, education, skills, contact details)..."
            className="w-full p-3.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none font-mono leading-relaxed"
          />

          {parseError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{parseError}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 gap-3">
          <button
            onClick={handleLoadSample}
            className="text-xs font-mono font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Load Curated Senior Systems Resume Sample</span>
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              disabled={isParsing || !pasteText.trim()}
              onClick={handleRunParse}
              className="w-1/2 sm:w-auto shimmer-btn px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isParsing ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Parsing Sections...</span>
                </>
              ) : (
                <>
                  <span>Parse into Resume</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
