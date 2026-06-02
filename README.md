# Planit

Planit turns raw project ideas into structured execution plans with scope, MVP, features, milestones, tasks, risks, dependencies, and roadmap phases.

## Stack

- React, Vite, Tailwind CSS
- FastAPI
- localStorage
- Optional Hugging Face Inference API

## Run

Frontend:

```bash
npm install
npm run dev
```

Backend:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Set `HF_API_TOKEN` to enable Hugging Face generation. Without it, Planit uses a local structured planner.
