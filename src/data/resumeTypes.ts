export type ResumeTemplateId = 'classic' | 'modern' | 'minimal' | 'executive' | 'fresher';

export interface PersonalInformation {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  summary: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  highlights: string[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface ProjectEntry {
  id: string;
  name: string;
  role?: string;
  technologies: string[];
  link?: string;
  startDate?: string;
  endDate?: string;
  bullets: string[];
}

export interface SkillCategory {
  id: string;
  categoryName: string; // e.g. "Languages", "Frameworks & Cloud", "Databases", "Leadership"
  skills: string[];
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface AchievementEntry {
  id: string;
  title: string;
  organization?: string;
  date?: string;
  description: string;
}

export interface CustomSectionItem {
  id: string;
  heading: string;
  subheading?: string;
  date?: string;
  details: string[];
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface ResumeData {
  id: string;
  name: string; // Display title, e.g. "Senior SWE Resume"
  template: ResumeTemplateId;
  targetRole?: string;
  targetCompany?: string;
  lastUpdated: string;
  personalInfo: PersonalInformation;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  internships?: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: SkillCategory[];
  certifications: CertificationEntry[];
  achievements: AchievementEntry[];
  customSections?: CustomSection[];
  atsScore?: number;
  jobMatchScore?: number;
}

export interface KeywordMatch {
  keyword: string;
  category: 'technical' | 'tool' | 'soft' | 'responsibility' | 'industry';
  status: 'present' | 'partial' | 'missing';
  contextInResume?: string;
}

export interface ATSIssue {
  id: string;
  category: 'formatting' | 'structure' | 'keywords' | 'readability' | 'relevance';
  severity: 'critical' | 'warning' | 'info';
  problem: string;
  whyItMatters: string;
  recommendation: string;
  canAutoFix: boolean;
  fixActionKey?: 'switch_template' | 'standardize_headings' | 'add_contact' | 'quantify_bullets' | 'remove_tables';
}

export interface ATSAnalysisResult {
  overallScore: number;
  categoryScores: {
    keywordMatch: number;
    formatting: number;
    structure: number;
    readability: number;
    jobRelevance: number;
  };
  issues: ATSIssue[];
  summary: string;
  detectedSections: string[];
  missingCrucialSections: string[];
}

export interface JobTailoringResult {
  matchScore: number;
  targetJobTitle: string;
  targetCompany?: string;
  keywords: KeywordMatch[];
  strengths: string[];
  weaknesses: string[];
  tailoringRecommendations: {
    section: string;
    suggestion: string;
    impactLevel: 'high' | 'medium' | 'low';
  }[];
  tailoredSummary?: string;
}
