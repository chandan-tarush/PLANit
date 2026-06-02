import type { GeneratedPlan } from '../types';

type PlanSectionsProps = {
  plan: GeneratedPlan;
  compact?: boolean;
};

export function PlanSections({ plan, compact = false }: PlanSectionsProps) {
  return (
    <div className="space-y-4">
      <section className="panel p-5">
        <h2 className="mb-3 text-base font-semibold">Overview</h2>
        <p className="text-sm leading-6 text-stone-700">{plan.summary}</p>
        <p className="mt-3 text-sm leading-6 text-stone-700">{plan.problem_statement}</p>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <ListPanel title="Scope" items={plan.scope} />
        <ListPanel title="MVP" items={plan.mvp} />
      </div>

      <section className="panel p-5">
        <h2 className="mb-4 text-base font-semibold">Features</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {plan.features.map((feature) => (
            <div key={feature.name} className="rounded-md border border-line p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-medium">{feature.name}</h3>
                <span className="rounded-md bg-panel px-2 py-1 text-xs font-medium text-stone-600">{feature.priority}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-stone-600">{feature.outcome}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel p-5">
        <h2 className="mb-4 text-base font-semibold">Milestones</h2>
        <div className="space-y-3">
          {plan.milestones.map((milestone) => (
            <div key={milestone.name} className="rounded-md border border-line p-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-medium">{milestone.name}</h3>
                <span className="text-sm text-stone-500">{milestone.timeframe}</span>
              </div>
              <ul className="mt-3 grid gap-2 text-sm text-stone-700 sm:grid-cols-2">
                {milestone.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {!compact && (
        <>
          <section className="panel p-5">
            <h2 className="mb-4 text-base font-semibold">Tasks</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {plan.tasks.map((group) => (
                <ListPanel key={group.area} title={group.area} items={group.tasks} embedded />
              ))}
            </div>
          </section>

          <div className="grid gap-4 lg:grid-cols-3">
            <ListPanel title="Risks" items={plan.risks} />
            <ListPanel title="Assumptions" items={plan.assumptions} />
            <ListPanel title="Dependencies" items={plan.dependencies} />
          </div>

          <section className="panel p-5">
            <h2 className="mb-4 text-base font-semibold">Roadmap</h2>
            <div className="grid gap-3 lg:grid-cols-2">
              {plan.roadmap.map((phase) => (
                <div key={phase.phase} className="rounded-md border border-line p-4">
                  <div className="text-sm font-semibold text-moss">{phase.phase}</div>
                  <h3 className="mt-1 font-medium">{phase.focus}</h3>
                  <ol className="mt-3 space-y-2 text-sm text-stone-700">
                    {phase.build_order.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {phase.roles.map((role) => (
                      <span key={role} className="rounded-md bg-panel px-2 py-1 text-xs text-stone-600">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function ListPanel({ title, items, embedded = false }: { title: string; items: string[]; embedded?: boolean }) {
  const className = embedded ? 'rounded-md border border-line p-4' : 'panel p-5';
  return (
    <section className={className}>
      <h2 className="mb-3 text-base font-semibold">{title}</h2>
      <ul className="space-y-2 text-sm leading-6 text-stone-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
