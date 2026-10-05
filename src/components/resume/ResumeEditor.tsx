import React, { useState } from 'react';
import {
  ResumeData,
  ExperienceEntry,
  EducationEntry,
  ProjectEntry,
  SkillCategory,
  CertificationEntry,
  AchievementEntry,
} from '../../data/resumeTypes';
import {
  Sparkles,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Wand2,
  Check,
  RefreshCw,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Code2,
  FolderGit2,
  Award,
  BookOpen,
  ArrowUpDown,
  Upload,
} from 'lucide-react';
import { enhanceTextWithAI } from '../../services/resumeApi';

interface ResumeEditorProps {
  resume: ResumeData;
  onChange: (updated: ResumeData) => void;
  onOpenUploadModal: () => void;
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({
  resume,
  onChange,
  onOpenUploadModal,
}) => {
  const [activeAccordion, setActiveAccordion] = useState<string>('personal');
  const [isEnhancing, setIsEnhancing] = useState<string | null>(null);

  const toggleAccordion = (key: string) => {
    setActiveAccordion((prev) => (prev === key ? '' : key));
  };

  // --- Personal Info updates ---
  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...resume,
      personalInfo: {
        ...resume.personalInfo,
        [field]: value,
      },
      lastUpdated: new Date().toISOString(),
    });
  };

  // --- AI enhance handler ---
  const handleEnhance = async (
    targetField: string,
    currentText: string,
    type: 'improve' | 'professional' | 'concise' | 'action_verbs' | 'quantify',
    callback: (newText: string) => void
  ) => {
    if (!currentText.trim()) return;
    setIsEnhancing(targetField);
    try {
      const enhanced = await enhanceTextWithAI(currentText, type);
      callback(enhanced);
    } catch (err) {
      console.error(err);
    } finally {
      setIsEnhancing(null);
    }
  };

  // --- Experience Handlers ---
  const addExperience = () => {
    const newEntry: ExperienceEntry = {
      id: `exp-${Date.now()}`,
      company: 'New Company',
      position: 'Software Engineer',
      location: 'City, State',
      startDate: '2023-01',
      endDate: '',
      current: true,
      bullets: ['Engineered key feature achieving measurable operational impact.'],
    };
    onChange({
      ...resume,
      experience: [newEntry, ...resume.experience],
      lastUpdated: new Date().toISOString(),
    });
  };

  const updateExperience = (id: string, field: keyof ExperienceEntry, value: any) => {
    onChange({
      ...resume,
      experience: resume.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
      lastUpdated: new Date().toISOString(),
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...resume,
      experience: resume.experience.filter((exp) => exp.id !== id),
      lastUpdated: new Date().toISOString(),
    });
  };

  const addExperienceBullet = (expId: string) => {
    onChange({
      ...resume,
      experience: resume.experience.map((exp) =>
        exp.id === expId
          ? { ...exp, bullets: [...exp.bullets, 'Spearheaded deployment that improved system efficiency by [insert %].'] }
          : exp
      ),
      lastUpdated: new Date().toISOString(),
    });
  };

  const updateExperienceBullet = (expId: string, bulletIdx: number, val: string) => {
    onChange({
      ...resume,
      experience: resume.experience.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              bullets: exp.bullets.map((b, i) => (i === bulletIdx ? val : b)),
            }
          : exp
      ),
      lastUpdated: new Date().toISOString(),
    });
  };

  const removeExperienceBullet = (expId: string, bulletIdx: number) => {
    onChange({
      ...resume,
      experience: resume.experience.map((exp) =>
        exp.id === expId
          ? { ...exp, bullets: exp.bullets.filter((_, i) => i !== bulletIdx) }
          : exp
      ),
      lastUpdated: new Date().toISOString(),
    });
  };

  // --- Education Handlers ---
  const addEducation = () => {
    const newEdu: EducationEntry = {
      id: `edu-${Date.now()}`,
      institution: 'University Name',
      degree: 'Bachelor of Science (B.S.)',
      fieldOfStudy: 'Computer Science',
      location: 'Location',
      startDate: '2020-08',
      endDate: '2024-05',
      current: false,
      highlights: [],
    };
    onChange({
      ...resume,
      education: [...resume.education, newEdu],
      lastUpdated: new Date().toISOString(),
    });
  };

  const updateEducation = (id: string, field: keyof EducationEntry, val: any) => {
    onChange({
      ...resume,
      education: resume.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: val } : edu
      ),
      lastUpdated: new Date().toISOString(),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...resume,
      education: resume.education.filter((edu) => edu.id !== id),
      lastUpdated: new Date().toISOString(),
    });
  };

  // --- Project Handlers ---
  const addProject = () => {
    const newProj: ProjectEntry = {
      id: `proj-${Date.now()}`,
      name: 'New Technical Project',
      role: 'Lead Architect',
      technologies: ['TypeScript', 'Node.js', 'PostgreSQL'],
      link: 'https://github.com/example/project',
      bullets: ['Architected scalable open-source system with high reliability.'],
    };
    onChange({
      ...resume,
      projects: [...resume.projects, newProj],
      lastUpdated: new Date().toISOString(),
    });
  };

  const updateProject = (id: string, field: keyof ProjectEntry, val: any) => {
    onChange({
      ...resume,
      projects: resume.projects.map((p) => (p.id === id ? { ...p, [field]: val } : p)),
      lastUpdated: new Date().toISOString(),
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...resume,
      projects: resume.projects.filter((p) => p.id !== id),
      lastUpdated: new Date().toISOString(),
    });
  };

  // --- Skills Handlers ---
  const addSkillCategory = () => {
    const newCat: SkillCategory = {
      id: `cat-${Date.now()}`,
      categoryName: 'Specialized Skills',
      skills: ['Skill 1', 'Skill 2'],
    };
    onChange({
      ...resume,
      skills: [...resume.skills, newCat],
      lastUpdated: new Date().toISOString(),
    });
  };

  const updateSkillCategoryName = (id: string, name: string) => {
    onChange({
      ...resume,
      skills: resume.skills.map((c) => (c.id === id ? { ...c, categoryName: name } : c)),
      lastUpdated: new Date().toISOString(),
    });
  };

  const updateSkillsList = (id: string, commaString: string) => {
    const list = commaString
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    onChange({
      ...resume,
      skills: resume.skills.map((c) => (c.id === id ? { ...c, skills: list } : c)),
      lastUpdated: new Date().toISOString(),
    });
  };

  const removeSkillCategory = (id: string) => {
    onChange({
      ...resume,
      skills: resume.skills.filter((c) => c.id !== id),
      lastUpdated: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-4">
      {/* Quick Action Top Bar */}
      <div className="flex flex-wrap items-center justify-between p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs gap-3">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-slate-500">Document:</span>
          <input
            type="text"
            value={resume.name}
            onChange={(e) => onChange({ ...resume, name: e.target.value })}
            className="font-bold text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-indigo-600 focus:outline-none bg-transparent"
          />
        </div>

        <button
          onClick={onOpenUploadModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl border border-indigo-200 transition-colors shadow-2xs cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload / Import Existing Resume</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 1. PERSONAL INFORMATION */}
      {/* ======================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <button
          onClick={() => toggleAccordion('personal')}
          className="w-full px-5 py-4 flex items-center justify-between bg-slate-50/70 hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-slate-950">
                Personal & Contact Information
              </h3>
              <p className="text-[11px] text-slate-500">
                {resume.personalInfo.fullName || 'Unspecified'} · {resume.personalInfo.professionalTitle || 'No title set'}
              </p>
            </div>
          </div>
          {activeAccordion === 'personal' ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {activeAccordion === 'personal' && (
          <div className="p-5 space-y-4 border-t border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={resume.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  placeholder="e.g. Alex Vance Chen"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                  Professional Title *
                </label>
                <input
                  type="text"
                  value={resume.personalInfo.professionalTitle}
                  onChange={(e) => updatePersonalInfo('professionalTitle', e.target.value)}
                  placeholder="e.g. Senior Distributed Systems Engineer"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={resume.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  placeholder="e.g. alex.chen@example.com"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={resume.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  placeholder="e.g. +1 (415) 890-4321"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                  Location (City, State / Remote)
                </label>
                <input
                  type="text"
                  value={resume.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  placeholder="e.g. San Francisco, CA (Open to Remote)"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="text"
                  value={resume.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  placeholder="e.g. linkedin.com/in/alex-chen"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                  GitHub Profile
                </label>
                <input
                  type="text"
                  value={resume.personalInfo.github}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                  placeholder="e.g. github.com/alexvchen"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                  Portfolio / Website
                </label>
                <input
                  type="text"
                  value={resume.personalInfo.portfolio}
                  onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                  placeholder="e.g. https://alexchen.dev"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Executive Summary with AI buttons */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
                <label className="text-[11px] font-mono font-bold text-slate-700 uppercase">
                  Executive Summary / Career Objective
                </label>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    disabled={isEnhancing === 'summary'}
                    onClick={() =>
                      handleEnhance(
                        'summary',
                        resume.personalInfo.summary,
                        'professional',
                        (newText) => updatePersonalInfo('summary', newText)
                      )
                    }
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{isEnhancing === 'summary' ? 'Enhancing...' : 'AI Polish'}</span>
                  </button>
                  <button
                    disabled={isEnhancing === 'summary_concise'}
                    onClick={() =>
                      handleEnhance(
                        'summary_concise',
                        resume.personalInfo.summary,
                        'concise',
                        (newText) => updatePersonalInfo('summary', newText)
                      )
                    }
                    className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-mono text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Concise</span>
                  </button>
                </div>
              </div>
              <textarea
                rows={3}
                value={resume.personalInfo.summary}
                onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                placeholder="2-4 sentences synthesizing your core domain expertise, years of experience, and signature technical or business achievements..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none leading-relaxed"
              />
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 2. WORK EXPERIENCE */}
      {/* ======================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <button
          onClick={() => toggleAccordion('experience')}
          className="w-full px-5 py-4 flex items-center justify-between bg-slate-50/70 hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-slate-950">
                Work Experience ({resume.experience.length})
              </h3>
              <p className="text-[11px] text-slate-500">
                Positions, quantifiable achievements, and technical contributions
              </p>
            </div>
          </div>
          {activeAccordion === 'experience' ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {activeAccordion === 'experience' && (
          <div className="p-5 space-y-6 border-t border-slate-100">
            {resume.experience.map((exp, expIdx) => (
              <div
                key={exp.id}
                className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/90 space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    Role #{expIdx + 1}
                  </span>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                    title="Delete Experience Entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-0.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-0.5">
                      Position Title
                    </label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-0.5">
                      Dates (e.g. 2022-03 to Present)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        placeholder="Start Date"
                        className="w-1/2 px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none"
                      />
                      <input
                        type="text"
                        value={exp.current ? 'Present' : exp.endDate}
                        onChange={(e) => {
                          if (e.target.value.toLowerCase() === 'present') {
                            updateExperience(exp.id, 'current', true);
                          } else {
                            updateExperience(exp.id, 'current', false);
                            updateExperience(exp.id, 'endDate', e.target.value);
                          }
                        }}
                        placeholder="End Date"
                        className="w-1/2 px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-0.5">
                      Location
                    </label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                {/* Bullets with AI Action Verbs & Quantify */}
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 font-bold">
                    <span>Key Achievements / Responsibilities</span>
                    <button
                      onClick={() => addExperienceBullet(exp.id)}
                      className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Bullet Point</span>
                    </button>
                  </div>

                  {exp.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-200">
                      <div className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold mt-1 text-xs">•</span>
                        <textarea
                          rows={2}
                          value={bullet}
                          onChange={(e) => updateExperienceBullet(exp.id, bIdx, e.target.value)}
                          className="w-full text-xs text-slate-800 focus:outline-none resize-none"
                        />
                        <button
                          onClick={() => removeExperienceBullet(exp.id, bIdx)}
                          className="text-slate-300 hover:text-rose-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* AI Enhancement Toolbar for this bullet */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-slate-100 text-[10px] font-mono">
                        <span className="text-slate-400">AI Assist:</span>
                        <button
                          disabled={isEnhancing === `b-${exp.id}-${bIdx}`}
                          onClick={() =>
                            handleEnhance(
                              `b-${exp.id}-${bIdx}`,
                              bullet,
                              'action_verbs',
                              (newText) => updateExperienceBullet(exp.id, bIdx, newText)
                            )
                          }
                          className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
                        >
                          + Action Verbs
                        </button>
                        <button
                          disabled={isEnhancing === `b-${exp.id}-${bIdx}`}
                          onClick={() =>
                            handleEnhance(
                              `b-${exp.id}-${bIdx}`,
                              bullet,
                              'quantify',
                              (newText) => updateExperienceBullet(exp.id, bIdx, newText)
                            )
                          }
                          className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
                        >
                          + Quantify Metric
                        </button>
                        <button
                          disabled={isEnhancing === `b-${exp.id}-${bIdx}`}
                          onClick={() =>
                            handleEnhance(
                              `b-${exp.id}-${bIdx}`,
                              bullet,
                              'concise',
                              (newText) => updateExperienceBullet(exp.id, bIdx, newText)
                            )
                          }
                          className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                        >
                          More Concise
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={addExperience}
              className="w-full py-2.5 border-2 border-dashed border-slate-200 hover:border-indigo-400 text-slate-600 hover:text-indigo-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Another Work Experience Entry</span>
            </button>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 3. TECHNICAL SKILLS */}
      {/* ======================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <button
          onClick={() => toggleAccordion('skills')}
          className="w-full px-5 py-4 flex items-center justify-between bg-slate-50/70 hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-slate-950">
                Skills & Technical Competencies ({resume.skills.length} Categories)
              </h3>
              <p className="text-[11px] text-slate-500">
                Categorized keyword blocks for ATS parsing fidelity
              </p>
            </div>
          </div>
          {activeAccordion === 'skills' ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {activeAccordion === 'skills' && (
          <div className="p-5 space-y-4 border-t border-slate-100">
            {resume.skills.map((cat) => (
              <div key={cat.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={cat.categoryName}
                    onChange={(e) => updateSkillCategoryName(cat.id, e.target.value)}
                    className="font-bold text-xs text-slate-900 bg-transparent border-b border-slate-300 focus:outline-none focus:border-indigo-600 px-1 py-0.5"
                  />
                  <button
                    onClick={() => removeSkillCategory(cat.id)}
                    className="text-slate-400 hover:text-rose-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-500 mb-1">
                    Comma-separated skills:
                  </label>
                  <input
                    type="text"
                    value={cat.skills.join(', ')}
                    onChange={(e) => updateSkillsList(cat.id, e.target.value)}
                    placeholder="e.g. Go, Rust, Kubernetes, Docker, gRPC, Kafka"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-indigo-600 font-mono"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={addSkillCategory}
              className="w-full py-2 border border-dashed border-slate-200 hover:border-indigo-400 text-slate-600 hover:text-indigo-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill Category</span>
            </button>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 4. PROJECTS */}
      {/* ======================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <button
          onClick={() => toggleAccordion('projects')}
          className="w-full px-5 py-4 flex items-center justify-between bg-slate-50/70 hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-slate-950">
                Key Projects & Open Source ({resume.projects.length})
              </h3>
              <p className="text-[11px] text-slate-500">
                Independent builds, architecture demos, or open-source repositories
              </p>
            </div>
          </div>
          {activeAccordion === 'projects' ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {activeAccordion === 'projects' && (
          <div className="p-5 space-y-4 border-t border-slate-100">
            {resume.projects.map((proj) => (
              <div key={proj.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    value={proj.name}
                    onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                    placeholder="Project Name"
                    className="font-bold text-xs text-slate-900 bg-transparent border-b border-slate-300 focus:outline-none focus:border-indigo-600 px-1 py-0.5 w-2/3"
                  />
                  <button
                    onClick={() => removeProject(proj.id)}
                    className="text-slate-400 hover:text-rose-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    value={proj.link || ''}
                    onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                    placeholder="Project Link (GitHub / Live URL)"
                    className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                  />
                  <input
                    type="text"
                    value={proj.technologies.join(', ')}
                    onChange={(e) =>
                      updateProject(
                        proj.id,
                        'technologies',
                        e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                      )
                    }
                    placeholder="Technologies (e.g. Rust, Tokio, gRPC)"
                    className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-500 mb-0.5">
                    Description & Bullet Highlights:
                  </label>
                  <textarea
                    rows={2}
                    value={proj.bullets.join('\n')}
                    onChange={(e) =>
                      updateProject(
                        proj.id,
                        'bullets',
                        e.target.value.split('\n').filter(Boolean)
                      )
                    }
                    placeholder="Enter key project metrics and architecture choices (one per line)..."
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={addProject}
              className="w-full py-2 border border-dashed border-slate-200 hover:border-indigo-400 text-slate-600 hover:text-indigo-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Another Project</span>
            </button>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 5. EDUCATION */}
      {/* ======================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <button
          onClick={() => toggleAccordion('education')}
          className="w-full px-5 py-4 flex items-center justify-between bg-slate-50/70 hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-slate-950">
                Education ({resume.education.length})
              </h3>
              <p className="text-[11px] text-slate-500">
                Degrees, universities, GPAs, and academic honors
              </p>
            </div>
          </div>
          {activeAccordion === 'education' ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {activeAccordion === 'education' && (
          <div className="p-5 space-y-4 border-t border-slate-100">
            {resume.education.map((edu) => (
              <div key={edu.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    placeholder="University / College"
                    className="font-bold text-xs text-slate-900 bg-transparent border-b border-slate-300 focus:outline-none focus:border-indigo-600 px-1 py-0.5 w-2/3"
                  />
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="text-slate-400 hover:text-rose-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="Degree (e.g. Bachelor of Science)"
                    className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                  />
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) => updateEducation(edu.id, 'fieldOfStudy', e.target.value)}
                    placeholder="Field of Study (e.g. Computer Science)"
                    className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                  />
                  <input
                    type="text"
                    value={`${edu.startDate} - ${edu.endDate}`}
                    onChange={(e) => {
                      const [s, eDate] = e.target.value.split('-');
                      updateEducation(edu.id, 'startDate', s?.trim() || '');
                      updateEducation(edu.id, 'endDate', eDate?.trim() || '');
                    }}
                    placeholder="Dates (e.g. 2018 - 2022)"
                    className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                  />
                  <input
                    type="text"
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    placeholder="GPA (e.g. 3.8 / 4.0)"
                    className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={addEducation}
              className="w-full py-2 border border-dashed border-slate-200 hover:border-indigo-400 text-slate-600 hover:text-indigo-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Education Entry</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
