# Planit

Planit is a full-stack project planning application that turns raw product or software ideas into structured execution plans. It is designed for early-stage project definition, MVP planning, task breakdown, risk identification, and implementation sequencing.

The application helps users move from an unstructured idea to a practical delivery plan that can be reviewed, edited, saved, duplicated, and exported.

## Overview

Many project ideas start as loose notes, assumptions, and scattered requirements. Planit provides a focused workspace where users can enter the key context for a project and generate a structured plan that is easier to execute.

Planit captures the core information needed to reason about a project:

| Input | Purpose |
| --- | --- |
| Project idea | Defines the concept or product to be planned |
| Target users | Clarifies who the solution is for |
| Timeline | Helps shape milestones and delivery sequencing |
| Constraints | Captures technical, business, or operational limits |
| Budget | Guides scope and delivery expectations |
| Team size | Helps assign responsibilities and estimate execution capacity |

From these inputs, Planit creates a practical planning document with scope, MVP definition, feature prioritization, milestones, task groups, risks, assumptions, dependencies, and a development roadmap.

## Product Capabilities

### Planner

The Planner page is the main workflow for creating a new project plan. Users provide project context through a focused input form and generate a structured plan through the backend planning API.

Generated plans include:

- Project summary
- Problem statement
- Project scope
- MVP scope
- Feature prioritization
- Milestones
- Task breakdown
- Risks
- Assumptions
- Dependencies
- Implementation roadmap
- Recommended build order
- Suggested responsibilities

### Dashboard

The Dashboard provides a quick view of saved planning activity. It summarizes the number of saved plans, milestones, and tasks, and surfaces recent plans for fast access.

### Plans

The Plans page manages saved plans stored in the browser. Users can browse saved plans, duplicate plans, delete plans, and export plans.

### Details

The Details page presents a complete plan in a structured format. Users can rename a plan, review all generated sections, duplicate the plan, delete it, or export it.

### Export

Planit supports two export formats:

| Format | Use case |
| --- | --- |
| JSON | Machine-readable export for backups, integrations, or further processing |
| Markdown | Human-readable project handoff for documentation, GitHub issues, planning docs, or team review |

## Technical Architecture

Planit uses a compact full-stack architecture:

```text
React + Vite frontend
        |
        | /api/plans
        v
FastAPI backend
        |
        | optional
        v
Hugging Face Inference API
```

The frontend handles routing, user interaction, local persistence, and exports. The backend validates planning requests, builds concise prompts, calls the optional inference provider, and returns structured planning responses.

If no Hugging Face API token is configured, the backend falls back to a deterministic local planning engine. This keeps the application usable without paid services or mandatory external dependencies.

## Technology Stack

### Frontend

| Technology | Role |
| --- | --- |
| React | Component-based user interface |
| Vite | Development server and production build tooling |
| TypeScript | Type-safe application code |
| Tailwind CSS | Utility-first styling |
| React Router | Multi-page client-side routing |
| Lucide React | Interface icons |
| localStorage | Browser-based plan persistence |

### Backend

| Technology | Role |
| --- | --- |
| FastAPI | HTTP API framework |
| Pydantic | Request and response validation |
| HTTPX | External inference provider requests |
| Uvicorn | ASGI development server |

### AI Integration

Planit supports optional generation through Hugging Face Inference API.

| Configuration | Behavior |
| --- | --- |
| `HF_API_TOKEN` set | Uses Hugging Face Inference API |
| `HF_API_TOKEN` not set | Uses the built-in local structured planner |
| `HF_MODEL` set | Uses the configured Hugging Face model |
| `HF_MODEL` not set | Uses `mistralai/Mistral-7B-Instruct-v0.3` |

The fallback planner is intentionally included so the application remains functional in local development, demos, and environments where an inference token is unavailable.

## Project Structure

```text
PLANit/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── planner.py
│   └── requirements.txt
├── src/
│   ├── components/
│   │   ├── AppLayout.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Field.tsx
│   │   ├── PageHeader.tsx
│   │   ├── PlanCard.tsx
│   │   └── PlanSections.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   ├── exporters.ts
│   │   ├── storage.ts
│   │   └── title.ts
│   ├── pages/
│   │   ├── DashboardPage.tsx
│   │   ├── PlanDetailPage.tsx
│   │   ├── PlannerPage.tsx
│   │   └── PlansPage.tsx
│   ├── main.tsx
│   ├── styles.css
│   └── types.ts
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Frontend Routes

| Route | Page | Description |
| --- | --- | --- |
| `/` | Dashboard | Summary of saved planning activity |
| `/planner` | Planner | Create and preview a new project plan |
| `/plans` | Plans | Browse and manage saved plans |
| `/plans/:id` | Details | Review, rename, export, duplicate, or delete a saved plan |

## API Reference

### Health Check

```http
GET /api/health
```

Response:

```json
{
  "status": "ok"
}
```

### Generate Plan

```http
POST /api/plans
```

Request body:

```json
{
  "idea": "A project management tool for student teams",
  "target_users": "College students working on group projects",
  "timeline": "8 weeks",
  "constraints": "Small team, limited budget",
  "budget": "Low",
  "team_size": "3 developers"
}
```

Response body:

```json
{
  "summary": "Short project summary",
  "problem_statement": "Problem statement",
  "scope": ["Scope item"],
  "mvp": ["MVP item"],
  "features": [
    {
      "name": "Feature name",
      "priority": "High",
      "outcome": "Expected outcome"
    }
  ],
  "milestones": [
    {
      "name": "Milestone name",
      "timeframe": "Week 1",
      "deliverables": ["Deliverable"]
    }
  ],
  "tasks": [
    {
      "area": "Frontend",
      "tasks": ["Task"]
    }
  ],
  "risks": ["Risk"],
  "assumptions": ["Assumption"],
  "dependencies": ["Dependency"],
  "roadmap": [
    {
      "phase": "Phase 1",
      "focus": "Foundation",
      "build_order": ["Step"],
      "roles": ["Role"]
    }
  ],
  "source": "local"
}
```

## Local Setup

### Prerequisites

- Node.js
- npm
- Python 3.10 or newer

### Install Frontend Dependencies

```bash
npm install
```

### Install Backend Dependencies

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

## Running the Application

Start the backend:

```bash
cd backend
uvicorn app.main:app --reload
```

Start the frontend from the project root:

```bash
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

The backend runs at:

```text
http://127.0.0.1:8000
```

The Vite development server proxies `/api` requests to the FastAPI backend.

## Environment Variables

Create a `.env` file or configure environment variables in your shell if you want to use Hugging Face generation.

| Variable | Required | Description |
| --- | --- | --- |
| `HF_API_TOKEN` | No | Hugging Face token used for inference requests |
| `HF_MODEL` | No | Optional Hugging Face model override |

Example:

```bash
set HF_API_TOKEN=your_token_here
set HF_MODEL=mistralai/Mistral-7B-Instruct-v0.3
```

Without `HF_API_TOKEN`, Planit uses the local planner and continues to work normally.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production frontend build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Data Storage

Planit stores saved plans in `localStorage`.

This keeps the application simple and easy to run without a database. It is suitable for local use, demos, and portfolio review. Because the data is stored in the browser, clearing browser storage will remove saved plans.

## Design Principles

Planit is intentionally designed as a product-focused workspace rather than a marketing page or single-screen demo.

Key interface principles:

- Concise navigation
- Multi-page workflow
- Clear hierarchy between planning, management, and detail views
- Minimal copy
- Responsive layout
- Practical actions for saving, editing, duplicating, deleting, and exporting plans

## Validation and Quality

The project includes:

- TypeScript for frontend type safety
- Pydantic models for backend validation
- Structured API responses
- ESLint configuration
- Production build configuration
- Explicit frontend/backend separation
- Graceful fallback when external AI inference is unavailable

Recommended checks:

```bash
npm run lint
npm run build
python -m compileall backend/app
```

## Deployment Notes

Planit can be deployed as two services:

| Service | Suggested target |
| --- | --- |
| Frontend | Vercel, Netlify, Cloudflare Pages, or any static host |
| Backend | Render, Railway, Fly.io, or any ASGI-compatible host |

For production deployment:

- Configure the frontend to call the deployed backend API.
- Set `HF_API_TOKEN` only on the backend host.
- Keep `.env` files out of version control.
- Review CORS origins in `backend/app/main.py`.

## Repository Status

Planit is structured as a compact, maintainable full-stack application. It avoids unnecessary infrastructure while still providing a complete product workflow from idea intake to plan export.
