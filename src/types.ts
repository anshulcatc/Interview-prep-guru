export type SubdomainId = 
  | 'overview' 
  | 'problem' 
  | 'multimodal' 
  | 'ecosystem' 
  | 'engine' 
  | 'moat' 
  | 'practice'
  | 'resume';

export interface RolePreset {
  id: string;
  title: string;
  category: string;
  level: string;
  companyContext: string;
  defaultJD: string;
  sampleQuestion: string;
  evalCriteria: {
    technicalPillars: string[];
    behavioralFocus: string;
    expectedKeyPhrases: string[];
  };
  sampleSimulatedAnswer: {
    opening: string;
    action: string;
    result: string;
    metrics: {
      wpm: number;
      score: number;
      fillers: number;
      starAccuracy: string;
    };
  };
}

export interface PracticeSessionConfig {
  roleId: string;
  customRoleTitle: string;
  seniority: 'entry' | 'mid' | 'senior' | 'lead';
  jobDescription: string;
  focusArea: 'behavioral' | 'technical' | 'product' | 'comprehensive';
}
