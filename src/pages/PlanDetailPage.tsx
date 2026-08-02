import { Copy, FileJson, FileText, PencilLine, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Field } from '../components/Field';
import { PageHeader } from '../components/PageHeader';
import { PlanSections } from '../components/PlanSections';
import { downloadJson, downloadMarkdown } from '../lib/exporters';
import { deletePlan, duplicatePlan, readPlans, savePlan } from '../lib/storage';
import type { SavedPlan } from '../types';

export function PlanDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const plan = useMemo(() => readPlans().find((item) => item.id === id), [id]);
  const [title, setTitle] = useState(plan?.title ?? '');

  if (!plan) return <Navigate to="/plans" replace />;

  function persist(next: SavedPlan) {
    savePlan(next);
    setTitle(next.title);
  }

  function onDuplicate() {
    const copy = duplicatePlan(plan.id);
    if (copy) navigate(`/plans/${copy.id}`);
  }

  function onDelete() {
    deletePlan(plan.id);
    navigate('/plans');
  }

  function onRename() {
    const nextTitle = title.trim();
    if (!nextTitle) return;
    persist({ ...plan, title: nextTitle, updatedAt: new Date().toISOString() });
  }

  return (
    <>
      <PageHeader
        eyebrow="Plan detail"
        title="Execution workspace"
        description="Review the plan, export the handoff, or duplicate it for a new version."
        actions={
          <>
            <button className="button-secondary" onClick={() => downloadMarkdown(plan)}>
              <FileText size={18} />
              Markdown
            </button>
            <button className="button-secondary" onClick={() => downloadJson(plan)}>
              <FileJson size={18} />
              JSON
            </button>
            <button className="button-secondary" onClick={onDuplicate}>
              <Copy size={18} />
            </button>
            <button className="button-danger" onClick={onDelete}>
              <Trash2 size={18} />
            </button>
          </>
        }
      />

      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto]">
        <div className="surface p-5">
          <Field label="Name">
            <input className="input" value={title} onChange={(event) => setTitle(event.target.value)} onBlur={onRename} />
          </Field>
          <div className="mt-3 text-sm text-white/42">Updated {new Date(plan.updatedAt).toLocaleString()}</div>
        </div>
        <Link to="/planner" className="button-primary h-fit">
          <PencilLine size={18} />
          Planner
        </Link>
      </div>

      <PlanSections plan={plan} />
    </>
  );
}
