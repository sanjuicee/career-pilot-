import type { DimensionKey } from './profile';

export type QuestionFormat =
  | 'single-choice'
  | 'multi-select'
  | 'slider'
  | 'trade-off'
  | 'scenario'
  | 'ranking'
  | 'short-text';

export interface QuestionOption {
  id: string;
  label: string;
  sublabel?: string;
  value: any;
  dimensionImpact?: Partial<Record<DimensionKey, number>>;
  cognitiveImpact?: Record<string, number>;
  tag?: string;
}

export interface ConditionalBranchRule {
  dependsOnQuestionId: string;
  operator: 'equals' | 'includes' | 'greaterThan' | 'lessThan' | 'in';
  expectedValue: any;
}

export interface QuestionDefinition {
  id: string;
  dimension: DimensionKey;
  format: QuestionFormat;
  order: number;
  prompt: string;
  contextHelp?: string; // "Why we ask this" explanation
  options?: QuestionOption[];
  min?: number;
  max?: number;
  step?: number;
  labels?: { min: string; max: string; mid?: string };
  branchRule?: ConditionalBranchRule; // If defined, evaluated before displaying
  scenarioDetails?: {
    setting: string;
    dilemma: string;
  };
  tradeOffPair?: {
    optionA: { id: string; label: string; description: string; impact: string };
    optionB: { id: string; label: string; description: string; impact: string };
  };
  placeholder?: string;
  allowUncertainty?: boolean; // Can user mark "I'm unsure / still figuring this out"
}

export interface QuestionAnswer {
  questionId: string;
  dimension: DimensionKey;
  value: any;
  isUncertain?: boolean;
  answeredAt: string;
}

export interface DiscoveryProgress {
  totalQuestions: number;
  answeredCount: number;
  currentDimension: DimensionKey;
  dimensionCounts: Record<DimensionKey, { total: number; answered: number }>;
  uncertaintyRating: number;
}
