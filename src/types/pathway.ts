import type { CareerNode, SkillRequirement } from './career';

export type StageType =
  | 'foundation'
  | 'demonstration_portfolio'
  | 'gateway_role'
  | 'specialization'
  | 'horizon';

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  category: 'learning' | 'project' | 'networking' | 'credential' | 'application';
  estimatedHours: number;
  timeframe: 'next-7-days' | 'next-30-days' | 'next-90-days';
  status: 'pending' | 'in-progress' | 'completed';
  resourceHint?: string;
}

export interface PortfolioProject {
  title: string;
  objective: string;
  demonstratedSkills: string[];
  deliverableType: 'code-repo' | 'case-study' | 'system-diagram' | 'prototype' | 'research-paper';
  complexity: 'foundational' | 'intermediate' | 'advanced';
}

export interface PathwayStage {
  id: string;
  order: number;
  stageType: StageType;
  title: string;
  durationMonths: number;
  description: string;
  skillsToAcquire: SkillRequirement[];
  recommendedProjects: PortfolioProject[];
  keyMilestones: string[];
  potentialBlockers: string[];
  mitigations: string[];
}

export interface CareerPathway {
  id: string;
  targetCareerId: string;
  targetCareerTitle: string;
  originBackgroundSummary: string;
  estimatedTotalMonths: number;
  feasibilityScore: number; // 0 to 100
  riskProfile: 'Conservative' | 'Balanced' | 'Aggressive / Accelerated';
  stages: PathwayStage[];
  alternativeForkPaths: string[]; // IDs of alternate careers or lateral pivots
}

export interface RoadmapPlan {
  pathwayId: string;
  targetCareer: CareerNode;
  generatedDate: string;
  currentStageIndex: number;
  immediateActions: ActionItem[];
  progressPercent: number;
  notes: string;
}
