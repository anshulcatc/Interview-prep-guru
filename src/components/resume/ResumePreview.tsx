import React from 'react';
import { ResumeData, ResumeTemplateId } from '../../data/resumeTypes';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink } from 'lucide-react';

interface ResumePreviewProps {
  resume: ResumeData;
  scale?: number;
  containerId?: string;
  className?: string;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  resume,
  scale = 1,
  containerId = 'resume-preview-sheet',
  className = '',
}) => {
  const { personalInfo, education, experience, projects, skills, certifications, achievements, template } = resume;

  return (
    <div
      id={containerId}
      className={`bg-white text-slate-900 shadow-xl border border-slate-200/80 rounded-sm mx-auto overflow-hidden transition-all duration-200 font-sans print:border-none print:shadow-none print:m-0 print:w-full ${className}`}
      style={{
        width: '100%',
        maxWidth: '820px',
        minHeight: '1060px',
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'top center',
      }}
    >
      {/* RENDER BASED ON TEMPLATE */}
      {template === 'executive' && (
        <ExecutiveTemplate
          personalInfo={personalInfo}
          education={education}
          experience={experience}
          projects={projects}
          skills={skills}
          certifications={certifications}
          achievements={achievements}
        />
      )}

      {template === 'modern' && (
        <ModernTemplate
          personalInfo={personalInfo}
          education={education}
          experience={experience}
          projects={projects}
          skills={skills}
          certifications={certifications}
          achievements={achievements}
        />
      )}

      {template === 'classic' && (
        <ClassicTemplate
          personalInfo={personalInfo}
          education={education}
          experience={experience}
          projects={projects}
          skills={skills}
          certifications={certifications}
          achievements={achievements}
        />
      )}

      {template === 'minimal' && (
        <MinimalTemplate
          personalInfo={personalInfo}
          education={education}
          experience={experience}
          projects={projects}
          skills={skills}
          certifications={certifications}
          achievements={achievements}
        />
      )}

      {template === 'fresher' && (
        <FresherTemplate
          personalInfo={personalInfo}
          education={education}
          experience={experience}
          projects={projects}
          skills={skills}
          certifications={certifications}
          achievements={achievements}
        />
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------------
// 1. EXECUTIVE TEMPLATE (Dark Navy Header, Clean Border Rules, Authority & Precision)
// ---------------------------------------------------------------------------------
const ExecutiveTemplate: React.FC<any> = ({
  personalInfo,
  education,
  experience,
  projects,
  skills,
  certifications,
  achievements,
}) => {
  return (
    <div className="p-8 sm:p-10 space-y-6 text-slate-800 text-[13px] leading-relaxed">
      {/* Header */}
      <div className="border-b-2 border-indigo-950 pb-5">
        <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight font-display uppercase">
          {personalInfo.fullName || 'Candidate Name'}
        </h1>
        <p className="text-indigo-700 font-bold text-sm tracking-wide mt-0.5">
          {personalInfo.professionalTitle || 'Professional Title'}
        </p>

        {/* Contact Strip */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-3 font-mono">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-indigo-600" />
              <span>{personalInfo.email}</span>
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-indigo-600" />
              <span>{personalInfo.phone}</span>
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-indigo-600" />
              <span>{personalInfo.location}</span>
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1 text-indigo-700">
              <Linkedin className="w-3 h-3" />
              <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1 text-slate-800">
              <Github className="w-3 h-3" />
              <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </span>
          )}
        </div>
      </div>

      {/* Executive Summary */}
      {personalInfo.summary && (
        <section>
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-900 border-b border-slate-200 pb-1 mb-2">
            Executive Summary
          </h2>
          <p className="text-slate-700 text-xs sm:text-[13px] leading-relaxed">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section>
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-900 border-b border-slate-200 pb-1 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp: any) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <div className="font-bold text-slate-950 text-sm">
                    {exp.position} · <span className="text-indigo-800 font-semibold">{exp.company}</span>
                  </div>
                  <div className="text-xs font-mono text-slate-500">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate} | {exp.location}
                  </div>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-700 leading-normal">
                    {exp.bullets.map((b: string, i: number) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section>
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-900 border-b border-slate-200 pb-1 mb-3">
            Key Projects & Systems Architecture
          </h2>
          <div className="space-y-3">
            {projects.map((proj: any) => (
              <div key={proj.id} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <div className="font-bold text-slate-950 text-sm">
                    {proj.name} {proj.role && <span className="text-xs text-slate-500 font-normal">({proj.role})</span>}
                  </div>
                  {proj.link && (
                    <span className="text-xs font-mono text-indigo-600 truncate max-w-xs">
                      {proj.link.replace(/^https?:\/\/(www\.)?/, '')}
                    </span>
                  )}
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="text-[11px] font-mono text-slate-500">
                    Tech: {proj.technologies.join(', ')}
                  </div>
                )}
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs text-slate-700 leading-normal">
                    {proj.bullets.map((b: string, i: number) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section>
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-900 border-b border-slate-200 pb-1 mb-2.5">
            Technical & Core Competencies
          </h2>
          <div className="space-y-1.5 text-xs">
            {skills.map((cat: any) => (
              <div key={cat.id} className="flex flex-col sm:flex-row gap-1">
                <span className="font-bold text-slate-900 min-w-36">{cat.categoryName}:</span>
                <span className="text-slate-700">{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section>
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-900 border-b border-slate-200 pb-1 mb-2.5">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu: any) => (
              <div key={edu.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree} in {edu.fieldOfStudy}</span> ·{' '}
                  <span className="text-indigo-800">{edu.institution}</span>
                  {edu.gpa && <span className="text-slate-500 ml-1">(GPA: {edu.gpa})</span>}
                </div>
                <div className="font-mono text-slate-500">
                  {edu.startDate} – {edu.endDate} | {edu.location}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Achievements */}
      {((certifications && certifications.length > 0) || (achievements && achievements.length > 0)) && (
        <section>
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-900 border-b border-slate-200 pb-1 mb-2.5">
            Certifications & Honors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {certifications?.map((c: any) => (
              <div key={c.id}>
                <span className="font-bold text-slate-900">{c.name}</span>
                <span className="text-slate-500 font-mono block text-[11px]">{c.issuer} · {c.date}</span>
              </div>
            ))}
            {achievements?.map((a: any) => (
              <div key={a.id}>
                <span className="font-bold text-slate-900">{a.title}</span>
                <span className="text-slate-600 block text-[11px]">{a.description}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------------
// 2. MODERN TEMPLATE (Accented Left Rail, Pill Badges, Dynamic Spacing)
// ---------------------------------------------------------------------------------
const ModernTemplate: React.FC<any> = ({
  personalInfo,
  education,
  experience,
  projects,
  skills,
  certifications,
  achievements,
}) => {
  return (
    <div className="p-8 sm:p-10 space-y-6 text-slate-800 text-[13px]">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight font-display">
            {personalInfo.fullName || 'Candidate Name'}
          </h1>
          <div className="text-violet-700 font-bold text-sm mt-0.5">
            {personalInfo.professionalTitle || 'Professional Title'}
          </div>
        </div>
        <div className="text-xs font-mono text-slate-600 space-y-0.5 sm:text-right">
          <div>{personalInfo.email}</div>
          <div>{personalInfo.phone} · {personalInfo.location}</div>
          {personalInfo.linkedin && (
            <div className="text-indigo-600">{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</div>
          )}
        </div>
      </div>

      {personalInfo.summary && (
        <div className="bg-slate-50 p-3.5 rounded-xl border-l-4 border-indigo-600 text-xs text-slate-700 leading-relaxed">
          {personalInfo.summary}
        </div>
      )}

      {experience && experience.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 font-display">
              Work Experience
            </h2>
          </div>
          <div className="space-y-4">
            {experience.map((exp: any) => (
              <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                  <div className="font-bold text-slate-950 text-sm">
                    {exp.position} <span className="text-slate-400 font-normal">at</span>{' '}
                    <span className="text-indigo-700">{exp.company}</span>
                  </div>
                  <div className="font-mono text-slate-500 text-[11px]">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                {exp.bullets?.map((b: string, i: number) => (
                  <div key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                    <span className="text-indigo-500 font-bold">›</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-600"></span>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 font-display">
              Skills & Stack
            </h2>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skills.flatMap((c: any) => c.skills).map((s: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-900 border border-indigo-100 font-mono text-[11px] font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {projects && projects.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 font-display">
              Featured Projects
            </h2>
          </div>
          <div className="space-y-3">
            {projects.map((proj: any) => (
              <div key={proj.id} className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 space-y-1 text-xs">
                <div className="flex items-baseline justify-between font-bold text-slate-900">
                  <span>{proj.name}</span>
                  <span className="font-mono text-[11px] text-slate-400 font-normal">
                    {proj.technologies?.slice(0, 3).join(', ')}
                  </span>
                </div>
                {proj.bullets?.map((b: string, i: number) => (
                  <p key={i} className="text-slate-600 text-xs">
                    • {b}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {education && education.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 font-display">
              Education
            </h2>
          </div>
          {education.map((edu: any) => (
            <div key={edu.id} className="flex justify-between text-xs text-slate-700">
              <div>
                <strong>{edu.degree} in {edu.fieldOfStudy}</strong> · {edu.institution}
              </div>
              <div className="font-mono text-slate-500">{edu.startDate} – {edu.endDate}</div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------------
// 3. CLASSIC TEMPLATE (Harvard/Ivy Style, Strict ATS Compliance, Centered Header)
// ---------------------------------------------------------------------------------
const ClassicTemplate: React.FC<any> = ({
  personalInfo,
  education,
  experience,
  projects,
  skills,
  certifications,
}) => {
  return (
    <div className="p-8 sm:p-12 space-y-5 text-black text-[12px] leading-relaxed font-serif">
      {/* Centered Heading */}
      <div className="text-center border-b border-black pb-3">
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          {personalInfo.fullName || 'Candidate Name'}
        </h1>
        <div className="text-xs mt-1 space-x-2">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.email && <span>• {personalInfo.email}</span>}
          {personalInfo.linkedin && (
            <span>• {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
          )}
        </div>
      </div>

      {personalInfo.summary && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black mb-1">
            Summary
          </h2>
          <p className="text-xs leading-normal">{personalInfo.summary}</p>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black mb-2">
            Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp: any) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-xs">
                  <span>{exp.company}, {exp.location}</span>
                  <span className="font-normal">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="italic text-xs mb-1">{exp.position}</div>
                {exp.bullets && (
                  <ul className="list-disc pl-5 space-y-0.5 text-xs">
                    {exp.bullets.map((b: string, i: number) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education && education.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black mb-2">
            Education
          </h2>
          {education.map((edu: any) => (
            <div key={edu.id} className="text-xs">
              <div className="flex justify-between font-bold">
                <span>{edu.institution}, {edu.location}</span>
                <span className="font-normal">{edu.startDate} – {edu.endDate}</span>
              </div>
              <div>{edu.degree} in {edu.fieldOfStudy} {edu.gpa && `(GPA: ${edu.gpa})`}</div>
            </div>
          ))}
        </section>
      )}

      {projects && projects.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black mb-2">
            Projects
          </h2>
          <div className="space-y-2">
            {projects.map((proj: any) => (
              <div key={proj.id} className="text-xs">
                <span className="font-bold">{proj.name}</span>
                {proj.technologies && <span className="italic"> ({proj.technologies.join(', ')})</span>}
                <ul className="list-disc pl-5 space-y-0.5 mt-0.5">
                  {proj.bullets?.map((b: string, i: number) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black mb-1.5">
            Skills
          </h2>
          <div className="space-y-1 text-xs">
            {skills.map((c: any) => (
              <div key={c.id}>
                <strong>{c.categoryName}: </strong>
                <span>{c.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------------
// 4. MINIMAL TEMPLATE (Ultra-Clean, High Information Density, Monospace Accents)
// ---------------------------------------------------------------------------------
const MinimalTemplate: React.FC<any> = ({
  personalInfo,
  education,
  experience,
  projects,
  skills,
}) => {
  return (
    <div className="p-8 sm:p-10 space-y-5 text-slate-900 text-xs">
      <div className="flex justify-between items-baseline border-b border-slate-300 pb-3">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tight">
            {personalInfo.fullName || 'Candidate Name'}
          </h1>
          <div className="text-slate-500 font-mono text-[11px]">
            {personalInfo.professionalTitle}
          </div>
        </div>
        <div className="text-right font-mono text-[11px] text-slate-600">
          <div>{personalInfo.email}</div>
          <div>{personalInfo.phone} · {personalInfo.location}</div>
        </div>
      </div>

      {personalInfo.summary && (
        <p className="text-slate-700 leading-relaxed border-b border-slate-100 pb-3">
          {personalInfo.summary}
        </p>
      )}

      {experience && (
        <section className="space-y-3">
          <div className="font-mono font-bold text-slate-400 uppercase text-[10px] tracking-widest">
            // EXPERIENCE
          </div>
          {experience.map((exp: any) => (
            <div key={exp.id} className="space-y-1">
              <div className="flex justify-between font-bold">
                <span>{exp.position} @ {exp.company}</span>
                <span className="font-mono font-normal text-slate-500 text-[11px]">
                  {exp.startDate} - {exp.current ? 'NOW' : exp.endDate}
                </span>
              </div>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                {exp.bullets?.map((b: string, i: number) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {skills && (
        <section className="space-y-2">
          <div className="font-mono font-bold text-slate-400 uppercase text-[10px] tracking-widest">
            // SKILLS
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {skills.map((c: any) => (
              <div key={c.id}>
                <span className="font-bold">{c.categoryName}: </span>
                <span className="text-slate-600">{c.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {education && (
        <section className="space-y-2">
          <div className="font-mono font-bold text-slate-400 uppercase text-[10px] tracking-widest">
            // EDUCATION
          </div>
          {education.map((edu: any) => (
            <div key={edu.id} className="flex justify-between">
              <div>
                <strong>{edu.degree} in {edu.fieldOfStudy}</strong>, {edu.institution}
              </div>
              <div className="font-mono text-slate-500 text-[11px]">{edu.startDate} - {edu.endDate}</div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------------
// 5. FRESHER / STUDENT TEMPLATE (Education & Projects Elevated First)
// ---------------------------------------------------------------------------------
const FresherTemplate: React.FC<any> = ({
  personalInfo,
  education,
  experience,
  projects,
  skills,
  certifications,
  achievements,
}) => {
  return (
    <div className="p-8 sm:p-10 space-y-5 text-slate-800 text-xs">
      <div className="text-center border-b-2 border-emerald-700 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-950 font-display">
          {personalInfo.fullName || 'Candidate Name'}
        </h1>
        <div className="text-emerald-700 font-bold text-xs mt-0.5">
          {personalInfo.professionalTitle || 'Aspiring Software Engineer'}
        </div>
        <div className="flex justify-center gap-3 text-[11px] text-slate-500 font-mono mt-2">
          <span>{personalInfo.email}</span>
          <span>•</span>
          <span>{personalInfo.phone}</span>
          <span>•</span>
          <span>{personalInfo.location}</span>
        </div>
      </div>

      {/* Education Elevated First for Freshers */}
      {education && education.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-100 pb-1 mb-2">
            Education & Academic Credentials
          </h2>
          {education.map((edu: any) => (
            <div key={edu.id} className="space-y-1">
              <div className="flex justify-between font-bold text-slate-900">
                <span>{edu.degree} in {edu.fieldOfStudy}</span>
                <span className="font-mono text-slate-500">{edu.startDate} – {edu.endDate}</span>
              </div>
              <div className="text-slate-600">{edu.institution}, {edu.location} {edu.gpa && `• GPA: ${edu.gpa}`}</div>
              {edu.highlights && (
                <ul className="list-disc pl-4 text-slate-600 text-[11px]">
                  {edu.highlights.map((h: string, i: number) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects Second */}
      {projects && projects.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-100 pb-1 mb-2">
            Technical Projects & Capstones
          </h2>
          <div className="space-y-3">
            {projects.map((proj: any) => (
              <div key={proj.id} className="space-y-1">
                <div className="flex justify-between font-bold text-slate-950">
                  <span>{proj.name}</span>
                  <span className="font-mono text-[11px] text-emerald-700">{proj.technologies?.join(', ')}</span>
                </div>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                  {proj.bullets?.map((b: string, i: number) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-100 pb-1 mb-2">
            Skills & Competencies
          </h2>
          <div className="space-y-1">
            {skills.map((c: any) => (
              <div key={c.id}>
                <strong>{c.categoryName}: </strong>
                <span>{c.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience / Internships */}
      {experience && experience.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-100 pb-1 mb-2">
            Internship & Work Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp: any) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold">
                  <span>{exp.position} · {exp.company}</span>
                  <span className="font-mono text-slate-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-600 mt-1">
                  {exp.bullets?.map((b: string, i: number) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
