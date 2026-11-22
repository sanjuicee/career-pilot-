import type { DimensionKey } from './profile';

export type JobFamily =
  | 'Engineering & Systems'
  | 'Data & Intelligence'
  | 'Product & Strategy'
  | 'Design & Creative Systems'
  | 'Scientific Inquiry & Research'
  | 'Healthcare & Clinical'
  | 'Operations & Logistics'
  | 'Finance & Economic Analysis'
  | 'Legal & Governance';

export type ExperienceLevel =
  | 'Entry / Apprenticeship'
  | 'Mid-Level Specialist'
  | 'Senior Specialist'
  | 'Principal / Staff'
  | 'Strategic / Leadership';

export interface SkillRequirement {
  skillId: string;
  name: string;
  category: 'core' | 'supporting' | 'tool' | 'mindset' | 'domain';
  importance: 'essential' | 'advantageous' | 'optional';
  transferability: 'high' | 'moderate' | 'domain-specific';
}

export interface TradeOffItem {
  dimension: string;
  positive: string;
  negativeOrCost: string;
  severity: 'low' | 'moderate' | 'high';
}

export interface CareerNode {
  id: string;
  title: string;
  code: string; // e.g. "SOC-15-1252" or internal technical ID
  jobFamily: JobFamily;
  industry: string;
  level: ExperienceLevel;
  summary: string;
  dayInTheLife: string[];
  requiredSkills: SkillRequirement[];
  preferredSkills: SkillRequirement[];
  salaryBand: {
    entryUsd: number;
    medianUsd: number;
    topDecileUsd: number;
    source: string;
  };
  workCharacteristics: {
    autonomyLevel: number; // 1-10
    collaborationDensity: number; // 1-10
    analyticalIntensity: number; // 1-10
    paceStressIndex: number; // 1-10
    remoteFeasibility: 'High' | 'Partial' | 'Onsite Only';
    physicalDemands: 'Sedentary' | 'Moderate' | 'High';
  };
  growthOutlook: {
    trend: 'Expanding Rapidly' | 'Stable Growth' | 'Specialized Niche' | 'Transforming with AI';
    demandScore: number; // 1-100
  };
  keyTradeOffs: TradeOffItem[];
  predecessorRoles: string[]; // career IDs
  lateralTransitions: string[]; // career IDs
  advancementRoles: string[]; // career IDs
}

export interface DimensionMatchScore {
  dimension: DimensionKey;
  score: number; // 0 to 100
  weight: number;
  rationale: string;
}

export interface MatchResult {
  careerId: string;
  career: CareerNode;
  compositeScore: number; // 0 to 100
  confidenceScore: number; // 0 to 100 (based on user profile certainty)
  dimensionScores: DimensionMatchScore[];
  skillsOverlap: {
    matchedSkills: string[];
    missingSkills: SkillRequirement[];
    transferableSkills: string[];
  };
  supportingEvidence: string[];
  frictionPoints: string[];
  keyTradeOffs: TradeOffItem[];
  sensitivityNote?: string;
}
