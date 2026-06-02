import { ArrowRight, FolderOpen, ListChecks, PencilLine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { PageHeader } from '../components/PageHeader';
import { readPlans } from '../lib/storage';

export function DashboardPage() {
  const plans = readPlans();
  const recent = plans.slice(0, 3);

  return (
    <>
      <PageHeader
        title="Dashboard"
        actions={
          <Link to="/planner" className="button-primary">
            <PencilLine size={18} />
            New plan
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Metric label="Plans" value={plans.length} icon={FolderOpen} />
        <Metric label="Milestones" value={plans.reduce((sum, plan) => sum + plan.milestones.length, 0)} icon={ListChecks} />
        <Metric label="Tasks" value={plans.reduce((sum, plan) => sum + plan.tasks.flatMap((group) => group.tasks).length, 0)} icon={PencilLine} />
      </div>

      <section className="mt-6">
        {recent.length ? (
          <div className="panel overflow-hidden">
            <div className="border-b border-line px-5 py-4">
              <h2 className="font-semibold">Recent</h2>
            </div>
            <div className="divide-y divide-line">
              {recent.map((plan) => (
                <Link key={plan.id} to={`/plans/${plan.id}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-panel">
                  <div>
                    <div className="font-medium">{plan.title}</div>
                    <div className="mt-1 text-sm text-stone-500">{new Date(plan.updatedAt).toLocaleDateString()}</div>
                  </div>
                  <ArrowRight size={18} />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <EmptyState
            icon={FolderOpen}
            title="No plans yet"
            action={
              <Link to="/planner" className="button-primary">
                <PencilLine size={18} />
                Planner
              </Link>
            }
          />
        )}
      </section>
    </>
  );
}

function Metric({ label, value, icon: Icon }: { label: string; value: number; icon: typeof FolderOpen }) {
  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between">
        <span className="label">{label}</span>
        <Icon size={18} className="text-moss" />
      </div>
      <div className="mt-3 text-3xl font-semibold">{value}</div>
    </div>
  );
}
