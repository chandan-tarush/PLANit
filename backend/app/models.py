from pydantic import BaseModel, Field


class PlanRequest(BaseModel):
    idea: str = Field(min_length=12, max_length=2400)
    target_users: str = Field(default="", max_length=1200)
    timeline: str = Field(default="", max_length=200)
    constraints: str = Field(default="", max_length=1200)
    budget: str = Field(default="", max_length=200)
    team_size: str = Field(default="", max_length=120)


class Feature(BaseModel):
    name: str
    priority: str
    outcome: str


class Milestone(BaseModel):
    name: str
    timeframe: str
    deliverables: list[str]


class TaskGroup(BaseModel):
    area: str
    tasks: list[str]


class RoadmapPhase(BaseModel):
    phase: str
    focus: str
    build_order: list[str]
    roles: list[str]


class SuccessMetric(BaseModel):
    metric: str
    target: str
    why_it_matters: str


class Decision(BaseModel):
    area: str
    recommendation: str
    tradeoff: str


class PlanResponse(BaseModel):
    summary: str
    problem_statement: str
    positioning: str
    scope: list[str]
    mvp: list[str]
    features: list[Feature]
    milestones: list[Milestone]
    tasks: list[TaskGroup]
    success_metrics: list[SuccessMetric]
    product_decisions: list[Decision]
    risks: list[str]
    assumptions: list[str]
    dependencies: list[str]
    roadmap: list[RoadmapPhase]
    source: str
