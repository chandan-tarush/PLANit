import json
import os
from typing import Any

import httpx

from .models import Feature, Milestone, PlanRequest, PlanResponse, RoadmapPhase, TaskGroup


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
    return PlanResponse(
        summary=f"{noun} is a focused product initiative for {users}, planned for delivery in {timeline}.",
        problem_statement=f"{users} need a reliable way to solve the core problem described by the idea without extra process or unnecessary tooling.",
        scope=[
            "Validate the core workflow end to end",
            "Ship the minimum interface needed for repeated use",
            "Keep operational complexity low",
            f"Work within {constraints}",
            f"Plan around {budget} and {team}",
        ],
        mvp=[
            "User input and capture flow",
            "Structured output or result view",
            "Editable saved records",
            "Basic status tracking",
            "Exportable summary",
        ],
        features=[
            Feature(name="Intake", priority="High", outcome="Collects the information needed to start work"),
            Feature(name="Planning", priority="High", outcome="Turns inputs into a structured project plan"),
            Feature(name="Workspace", priority="High", outcome="Lets users review, edit, and reuse saved plans"),
            Feature(name="Export", priority="Medium", outcome="Supports handoff to teammates and stakeholders"),
            Feature(name="Settings", priority="Low", outcome="Keeps preferences and defaults manageable"),
        ],
        milestones=[
            Milestone(name="Foundation", timeframe="Week 1", deliverables=["Requirements", "Information architecture", "Base UI"]),
            Milestone(name="Workflow", timeframe="Weeks 2-3", deliverables=["Input flow", "Plan generation", "Plan detail view"]),
            Milestone(name="Management", timeframe="Weeks 4-5", deliverables=["Save", "Edit", "Duplicate", "Delete"]),
            Milestone(name="Release", timeframe="Final week", deliverables=["Exports", "QA", "Deployment checklist"]),
        ],
        tasks=[
            TaskGroup(area="Product", tasks=["Define success criteria", "Prioritize MVP scope", "Review edge cases"]),
            TaskGroup(area="Design", tasks=["Map core screens", "Create responsive layouts", "Polish empty and error states"]),
            TaskGroup(area="Frontend", tasks=["Build routing", "Implement forms", "Persist plans", "Add export actions"]),
            TaskGroup(area="Backend", tasks=["Validate requests", "Generate structured plans", "Handle provider failures"]),
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
                focus="Foundation",
                build_order=["Project setup", "Routing", "Layout", "Shared components"],
                roles=["Full-stack engineer", "Product owner"],
            ),
            RoadmapPhase(
                phase="Phase 2",
                focus="Core workflow",
                build_order=["Planner form", "API contract", "Generation service", "Result view"],
                roles=["Frontend engineer", "Backend engineer"],
            ),
            RoadmapPhase(
                phase="Phase 3",
                focus="Plan operations",
                build_order=["Save", "Edit", "Duplicate", "Delete", "Exports"],
                roles=["Full-stack engineer"],
            ),
            RoadmapPhase(
                phase="Phase 4",
                focus="Release",
                build_order=["Responsive QA", "Failure states", "Documentation", "Deployment"],
                roles=["Engineer", "Reviewer"],
            ),
        ],
        source="local",
    )


def _short_name(idea: str) -> str:
    words = [word.strip(".,:;!?()[]{}").capitalize() for word in idea.split()[:5]]
    return " ".join(words) or "The project"
