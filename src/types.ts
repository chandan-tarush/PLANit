export type PlanInput = {
  idea: string;
  target_users: string;
  timeline: string;
  constraints: string;
  budget: string;
  team_size: string;
};

export type Feature = {
  name: string;
  priority: string;
  outcome: string;
};

export type Milestone = {
  name: string;
  timeframe: string;
  deliverables: string[];
};

export type TaskGroup = {
  area: string;
  tasks: string[];
};

export type RoadmapPhase = {
  phase: string;
  focus: string;
  build_order: string[];
  roles: string[];
};

export type GeneratedPlan = {
  summary: string;
  problem_statement: string;
  scope: string[];
  mvp: string[];
  features: Feature[];
  milestones: Milestone[];
  tasks: TaskGroup[];
  risks: string[];
  assumptions: string[];
  dependencies: string[];
  roadmap: RoadmapPhase[];
  source: string;
};

export type SavedPlan = GeneratedPlan & {
  id: string;
  title: string;
  input: PlanInput;
  createdAt: string;
  updatedAt: string;
};
