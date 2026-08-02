import { FileJson, FolderOpen, PencilLine } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { PageHeader } from '../components/PageHeader';
import { PlanCard } from '../components/PlanCard';
import { downloadJson, downloadMarkdown } from '../lib/exporters';
import { deletePlan, duplicatePlan, readPlans } from '../lib/storage';
import type { SavedPlan } from '../types';

export function PlansPage() {
  const [plans, setPlans] = useState(readPlans);

  function refresh() {
    setPlans(readPlans());
  }

  function onDelete(id: string) {
    deletePlan(id);
    refresh();
  }

  function onDuplicate(id: string) {
    duplicatePlan(id);
    refresh();
  }

  function onExport(plan: SavedPlan) {
    downloadMarkdown(plan);
  }

  return (
    <>
      <PageHeader
        eyebrow="Library"
        title="Saved planning systems"
        description="Review, duplicate, export, and evolve plans as project context changes."
        actions={
          <Link to="/planner" className="button-primary">
            <PencilLine size={18} />
            New plan
          </Link>
        }
      />

      {plans.length ? (
        <>
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-white/48">{plans.length} saved</div>
            <button className="button-secondary" onClick={() => plans.forEach(downloadJson)}>
              <FileJson size={18} />
              JSON
            </button>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} onDelete={onDelete} onDuplicate={onDuplicate} onExport={onExport} />
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          icon={FolderOpen}
          title="No saved plans"
          action={
            <Link to="/planner" className="button-primary">
              <PencilLine size={18} />
              Planner
            </Link>
          }
        />
      )}
    </>
  );
}
