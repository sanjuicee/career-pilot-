import type { DimensionKey } from '../../types/profile';

export interface RepresentativeQuestion {
  id: string;
  dimension: DimensionKey;
  format: 'single-choice' | 'slider' | 'trade-off';
  prompt: string;
  contextHelp: string;
  options?: {
    id: string;
    label: string;
    sublabel?: string;
    value: any;
    impact: Partial<Record<DimensionKey, number>>;
  }[];
  sliderConfig?: {
    min: number;
    max: number;
    step: number;
    leftLabel: string;
    rightLabel: string;
    leftDescription: string;
    rightDescription: string;
    dimensionImpact: (val: number) => Partial<Record<DimensionKey, number>>;
  };
  tradeOffConfig?: {
    optionA: {
      id: string;
      title: string;
      description: string;
      gain: string;
      sacrifice: string;
      impact: Partial<Record<DimensionKey, number>>;
    };
    optionB: {
      id: string;
      title: string;
      description: string;
      gain: string;
      sacrifice: string;
      impact: Partial<Record<DimensionKey, number>>;
    };
  };
}

export const REPRESENTATIVE_QUESTIONS: RepresentativeQuestion[] = [
  {
    id: 'rep-q-01',
    dimension: 'interests',
    format: 'single-choice',
    prompt: 'When investigating complex problems, what primary domain of reality sustains your curiosity the longest?',
    contextHelp:
      'Isolating whether your intrinsic curiosity is sparked by abstract mathematical rules, physical engineering constraints, living biological systems, or human group dynamics.',
    options: [
      {
        id: 'opt-abstract',
        label: 'Abstract Formal Systems & Computational Logic',
        sublabel: 'e.g., Distributed algorithms, cryptosystems, economic mechanics, formal models',
        value: 'abstract_systems',
        impact: { interests: 0.15, aptitudes: 0.1 },
      },
      {
        id: 'opt-physical',
        label: 'Cyber-Physical Machinery & Real-World Hardware',
        sublabel: 'e.g., Robotics, sensor fusion, clean energy grids, aerospace systems',
        value: 'physical_systems',
        impact: { interests: 0.15, aptitudes: 0.1 },
      },
      {
        id: 'opt-living',
        label: 'Biological Codes & Molecular Mechanisms',
        sublabel: 'e.g., Genomics, protein design, computational biology, neuroscience',
        value: 'biological_systems',
        impact: { interests: 0.15, education: 0.1 },
      },
      {
        id: 'opt-human',
        label: 'Behavioral Psychology & Socio-Technical Systems',
        sublabel: 'e.g., Product strategy, organizational design, behavioral incentives',
        value: 'human_systems',
        impact: { interests: 0.15, values: 0.1 },
      },
    ],
  },
  {
    id: 'rep-q-02',
    dimension: 'aptitudes',
    format: 'slider',
    prompt: 'Cognitive Polarity: How do you balance velocity of execution against exhaustive analytical rigor?',
    contextHelp:
      'High-velocity environments reward bias for action and heuristic decision-making, while high-consequence environments (aerospace, cryptography, surgical robotics) strictly penalize haste.',
    sliderConfig: {
      min: 0,
      max: 100,
      step: 1,
      leftLabel: 'Rapid Heuristic Velocity',
      rightLabel: 'Exhaustive Formal Rigor',
      leftDescription: 'Iterate quickly in production, test hypotheses live, optimize for tempo.',
      rightDescription: 'Verify invariants first, prove boundary conditions, eliminate tail risks.',
      dimensionImpact: (val) => ({
        aptitudes: 0.15,
        workStyle: val > 50 ? 0.05 : -0.05,
      }),
    },
  },
  {
    id: 'rep-q-03',
    dimension: 'workStyle',
    format: 'single-choice',
    prompt: 'What synchronization density and autonomy balance enables your highest-caliber output?',
    contextHelp:
      'Careers differ enormously on coordination overhead. Pure deep-work IC roles require high self-management, while orchestration roles require continuous stakeholder synthesis.',
    options: [
      {
        id: 'opt-asynch-deep',
        label: 'Asynchronous Deep Focus (80% uninterrupted / 20% team alignment)',
        sublabel: 'Rigorous written specs, minimal meetings, high autonomy, high solitary discipline.',
        value: 'deep_solo',
        impact: { workStyle: 0.18, riskTolerance: 0.05 },
      },
      {
        id: 'opt-squad-pair',
        label: 'High-Bandwidth Technical Pairing (50% collaboration / 50% solo)',
        sublabel: 'Rapid feedback loops, collaborative whiteboarding, shared code ownership.',
        value: 'collaborative_squad',
        impact: { workStyle: 0.18, aptitudes: 0.05 },
      },
      {
        id: 'opt-cross-leader',
        label: 'Strategic Cross-Functional Orchestrator (70% synthesis & leadership)',
        sublabel: 'Connecting technical architecture with product vision and executive priorities.',
        value: 'orchestrator',
        impact: { workStyle: 0.18, ambitions: 0.1 },
      },
    ],
  },
  {
    id: 'rep-q-04',
    dimension: 'values',
    format: 'single-choice',
    prompt: 'What intrinsic payoff most reliably sustains your sense of professional craftsmanship?',
    contextHelp:
      'Understanding your root value hierarchy ensures that you do not pursue high-prestige roles that fail to satisfy your internal motivations.',
    options: [
      {
        id: 'opt-mastery',
        label: 'Technical Mastery & Deep Intellectual Elegance',
        sublabel: 'Solving problems that very few people in the world understand how to solve.',
        value: 'mastery',
        impact: { values: 0.2, aptitudes: 0.05 },
      },
      {
        id: 'opt-tangible-impact',
        label: 'Tangible Societal Decarbonization or Healthcare Impact',
        sublabel: 'Directly improving human lifespan, clinical outcomes, or planetary sustainability.',
        value: 'societal_impact',
        impact: { values: 0.2, interests: 0.05 },
      },
      {
        id: 'opt-agency',
        label: 'Total Agency, Sovereignty & High Operating Autonomy',
        sublabel: 'Full ownership of your time, technical trajectory, and decision authority.',
        value: 'autonomy',
        impact: { values: 0.2, workStyle: 0.08 },
      },
      {
        id: 'opt-scale',
        label: 'Planetary Leverage & Systemic Scale',
        sublabel: 'Building infrastructure or products that reach millions of daily users.',
        value: 'scale',
        impact: { values: 0.2, ambitions: 0.1 },
      },
    ],
  },
  {
    id: 'rep-q-05',
    dimension: 'riskTolerance',
    format: 'trade-off',
    prompt: 'Forced Trade-Off: How do you calibrate career volatility against upside asymmetry?',
    contextHelp:
      'Identifying your true tolerance for ambiguity prevents chronic career anxiety or premature compromise.',
    tradeOffConfig: {
      optionA: {
        id: 'opt-stability',
        title: 'Institutional Predictability & Floor Protection',
        description:
          'Structured career ladders, guaranteed compensation bands, high reputational brand protection, and low organizational volatility.',
        gain: 'Peace of mind, clear promotion benchmarks, stable compensation.',
        sacrifice: 'Slower decision velocity, bureaucratic friction, capped upside.',
        impact: { riskTolerance: 0.05, financialLifestyle: 0.1 },
      },
      optionB: {
        id: 'opt-variance',
        title: 'High-Variance Asymmetry & Frontier Autonomy',
        description:
          'Early-stage technological frontiers, equity-leveraged upside, zero-to-one exploration, and rapid tactical pivot freedom.',
        gain: 'Uncapped financial and technical leverage, complete intellectual latitude.',
        sacrifice: 'Uncertain runway, high ambiguity, zero institutional safety net.',
        impact: { riskTolerance: 0.25, ambitions: 0.15 },
      },
    },
  },
  {
    id: 'rep-q-06',
    dimension: 'ambitions',
    format: 'single-choice',
    prompt: 'Looking 5 to 7 years ahead, what strategic horizon represents your ideal professional posture?',
    contextHelp:
      'Differentiates between Principal Technical Fellow, Executive General Management, and Independent Founder/Researcher pathways.',
    options: [
      {
        id: 'opt-fellow',
        label: 'Principal Systems Fellow / Distinguished Domain Specialist',
        sublabel: 'The recognized authority on deep technical architecture, writing seminal RFCs.',
        value: 'distinguished_specialist',
        impact: { ambitions: 0.2, aptitudes: 0.1 },
      },
      {
        id: 'opt-founder',
        label: 'Venture Founder / Zero-to-One Chief Architect',
        sublabel: 'Leading an autonomous enterprise or venture from initial genesis to market scale.',
        value: 'founder',
        impact: { ambitions: 0.25, riskTolerance: 0.15 },
      },
      {
        id: 'opt-executive',
        label: 'Engineering / Product Executive (VP / CTO / Head of Research)',
        sublabel: 'Directing multi-disciplinary engineering organizations, budgets, and strategic direction.',
        value: 'executive_leader',
        impact: { ambitions: 0.2, workStyle: 0.1 },
      },
    ],
  },
];
