import json
import os
from typing import Any

import httpx

from .models import Decision, Feature, Milestone, PlanRequest, PlanResponse, RoadmapPhase, SuccessMetric, TaskGroup


HF_MODEL = os.getenv("HF_MODEL", "mistralai/Mistral-7B-Instruct-v0.3")
HF_URL = f"https://api-inference.huggingface.co/models/{HF_MODEL}"


def build_plan(request: PlanRequest) -> PlanResponse:
    token = os.getenv("HF_API_TOKEN")
    if token:
        try:
            generated = _generate_with_hugging_face(request, token)
            if generated:
                return generated
        except Exception:
            pass
    return _local_plan(request)


def _generate_with_hugging_face(request: PlanRequest, token: str) -> PlanResponse | None:
    prompt = _prompt(request)
    payload = {
        "inputs": prompt,
        "parameters": {
            "max_new_tokens": 1200,
            "temperature": 0.35,
            "return_full_text": False,
        },
    }
    headers = {"Authorization": f"Bearer {token}"}

    with httpx.Client(timeout=35) as client:
        response = client.post(HF_URL, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()

    text = data[0]["generated_text"] if isinstance(data, list) and data else ""
    parsed = _extract_json(text)
    if not parsed:
        return None
    parsed["source"] = "hugging-face"
    return PlanResponse.model_validate(parsed)


def _prompt(request: PlanRequest) -> str:
    payload = request.model_dump()
    return (
        "[INST] Return only valid JSON matching this schema: "
        "{summary:string,problem_statement:string,scope:string[],mvp:string[],"
        "positioning:string,success_metrics:[{metric:string,target:string,why_it_matters:string}],"
        "product_decisions:[{area:string,recommendation:string,tradeoff:string}],"
        "features:[{name:string,priority:string,outcome:string}],"
        "milestones:[{name:string,timeframe:string,deliverables:string[]}],"
        "tasks:[{area:string,tasks:string[]}],risks:string[],assumptions:string[],"
        "dependencies:string[],roadmap:[{phase:string,focus:string,build_order:string[],roles:string[]}]}.\n"
        f"Create a practical execution plan from: {json.dumps(payload)} [/INST]"
    )


def _extract_json(text: str) -> dict[str, Any] | None:
    start = text.find("{")
    end = text.rfind("}")
    if start == -1 or end == -1 or end <= start:
        return None
    try:
        return json.loads(text[start : end + 1])
    except json.JSONDecodeError:
        return None


def _local_plan(request: PlanRequest) -> PlanResponse:
    idea = request.idea.strip()
    users = request.target_users.strip() or "primary users"
    timeline = request.timeline.strip() or "6-8 weeks"
    constraints = request.constraints.strip() or "limited scope and fast validation"
    budget = request.budget.strip() or "lean budget"
    team = request.team_size.strip() or "small product team"

    noun = _short_name(idea)
    audience = users.rstrip(".")
    return PlanResponse(
        summary=f"{noun} is a focused product initiative for {audience}, planned for delivery in {timeline}.",
        problem_statement=f"{audience} need a reliable way to solve the core problem described by the idea without extra process or unnecessary tooling.",
        positioning=f"A lean planning-first product that prioritizes clarity, guided execution, and fast handoff for {audience}.",
        scope=[
            "Validate the primary workflow with one complete user journey",
            "Define the smallest useful feature set before expanding into secondary use cases",
            "Keep operational complexity low enough for quick iteration",
            "Create a clear review surface for stakeholders and contributors",
            f"Plan around {budget} and {team}",
            f"Respect delivery constraints: {constraints}",
        ],
        mvp=[
            "Guided intake that captures the idea, audience, limits, and delivery context",
            "Structured plan generation with clear sections and practical next steps",
            "Editable saved records that can be reused across planning cycles",
            "Roadmap view that explains build order and ownership",
            "Exportable summary for stakeholder handoff",
        ],
        features=[
            Feature(name="Guided intake", priority="High", outcome="Collects enough context to generate a useful first plan"),
            Feature(name="Strategy brief", priority="High", outcome="Turns a raw idea into a clear problem, audience, and scope"),
            Feature(name="Execution map", priority="High", outcome="Explains milestones, phases, build order, and ownership"),
            Feature(name="Saved workspace", priority="High", outcome="Lets users compare, duplicate, and refine plans over time"),
            Feature(name="Portable handoff", priority="Medium", outcome="Exports the plan into formats useful for teams and documentation"),
        ],
        milestones=[
            Milestone(name="Discovery", timeframe="Week 1", deliverables=["User definition", "Success criteria", "MVP boundary"]),
            Milestone(name="Prototype", timeframe="Weeks 2-3", deliverables=["Core journey", "Plan output model", "Review interface"]),
            Milestone(name="Productization", timeframe="Weeks 4-5", deliverables=["Persistence", "Plan operations", "Export workflow"]),
            Milestone(name="Release readiness", timeframe="Final week", deliverables=["QA pass", "Deployment checklist", "Stakeholder review"]),
        ],
        tasks=[
            TaskGroup(area="Product", tasks=["Define target user jobs", "Prioritize MVP scope", "Write launch criteria", "Review failure cases"]),
            TaskGroup(area="Design", tasks=["Map core screens", "Design dense review states", "Polish empty and loading states", "Validate mobile layouts"]),
            TaskGroup(area="Frontend", tasks=["Build routed workspace", "Implement guided intake", "Persist plans", "Add export and duplicate actions"]),
            TaskGroup(area="Backend", tasks=["Validate requests", "Generate structured plans", "Normalize provider output", "Return graceful fallbacks"]),
        ],
        success_metrics=[
            SuccessMetric(metric="Activation", target="User can create a complete plan in under 5 minutes", why_it_matters="Shows the product reduces planning friction"),
            SuccessMetric(metric="Plan usefulness", target="At least 80% of generated sections are kept after review", why_it_matters="Measures whether output is practical instead of decorative"),
            SuccessMetric(metric="Handoff readiness", target="Plan can be exported without manual restructuring", why_it_matters="Supports real collaboration and documentation"),
            SuccessMetric(metric="Repeat usage", target="Users save or duplicate more than one plan", why_it_matters="Indicates the workspace is valuable beyond a single generation"),
        ],
        product_decisions=[
            Decision(area="Data storage", recommendation="Use local persistence for the first release", tradeoff="Faster setup and privacy, but no account sync"),
            Decision(area="Planning depth", recommendation="Prefer structured sections over long narrative output", tradeoff="More scannable, but less conversational"),
            Decision(area="AI dependency", recommendation="Keep a deterministic planner fallback", tradeoff="Less model creativity, but reliable demos and development"),
            Decision(area="Interface model", recommendation="Separate intake, strategy, delivery, and risk review", tradeoff="More product depth, but requires stronger navigation"),
        ],
        risks=[
            "Scope expansion delays the first usable release",
            "Inputs may be too vague to generate a precise plan",
            "External model availability can vary",
            "Unclear ownership may slow execution",
        ],
        assumptions=[
            "Users can describe the project idea in plain language",
            "The first release can rely on local persistence",
            "A compact MVP is more valuable than broad feature coverage",
            "Stakeholders can review JSON or Markdown exports",
        ],
        dependencies=[
            "Frontend runtime and build tooling",
            "FastAPI service",
            "Optional Hugging Face API token",
            "Deployment target for frontend and API",
        ],
        roadmap=[
            RoadmapPhase(
                phase="Phase 1",
                focus="Define the operating model",
                build_order=["Problem framing", "User jobs", "Success metrics", "MVP boundary"],
                roles=["Product owner", "Designer"],
            ),
            RoadmapPhase(
                phase="Phase 2",
                focus="Build the core planning loop",
                build_order=["Guided intake", "Planning API", "Generated plan view", "Save flow"],
                roles=["Frontend engineer", "Backend engineer"],
            ),
            RoadmapPhase(
                phase="Phase 3",
                focus="Make plans operational",
                build_order=["Details view", "Duplicate", "Delete", "Markdown export", "JSON export"],
                roles=["Full-stack engineer", "Reviewer"],
            ),
            RoadmapPhase(
                phase="Phase 4",
                focus="Prepare for handoff",
                build_order=["Responsive QA", "Failure states", "Documentation", "Deployment"],
                roles=["Engineer", "Stakeholder"],
            ),
        ],
        source="local",
    )


def _short_name(idea: str) -> str:
    words = [word.strip(".,:;!?()[]{}").capitalize() for word in idea.split()[:5]]
    return " ".join(words) or "The project"
