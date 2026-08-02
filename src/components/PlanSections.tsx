import { AlertTriangle, Boxes, CheckCircle2, ClipboardList, Gauge, GitBranch, Layers3, Route, ShieldAlert, Target } from 'lucide-react';
import { useState } from 'react';
import type { GeneratedPlan } from '../types';

type PlanSectionsProps = {
  plan: GeneratedPlan;
  compact?: boolean;
};

const tabs = [
  { id: 'strategy', label: 'Strategy', icon: Target },
  { id: 'scope', label: 'Scope', icon: Layers3 },
  { id: 'delivery', label: 'Delivery', icon: Route },
  { id: 'risk', label: 'Risk', icon: ShieldAlert },
  { id: 'handoff', label: 'Handoff', icon: ClipboardList },
] as const;

type TabId = (typeof tabs)[number]['id'];

export function PlanSections({ plan, compact = false }: PlanSectionsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('strategy');
  const metrics = plan.success_metrics ?? [];
  const decisions = plan.product_decisions ?? [];

  if (compact) {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <HeroPanel plan={plan} />
        <ListPanel title="MVP" items={plan.mvp} icon={CheckCircle2} />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <HeroPanel plan={plan} />

      <div className="surface p-2">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.id} className={`tab-button shrink-0 ${activeTab === tab.id ? 'tab-button-active' : ''}`} onClick={() => setActiveTab(tab.id)}>
              <tab.icon size={17} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'strategy' && (
        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="surface p-5">
            <SectionTitle icon={Target} title="Positioning" />
            <p className="text-lg font-semibold leading-8">{plan.positioning ?? plan.summary}</p>
            <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Problem</div>
              <p className="mt-2 text-sm leading-6 text-white/62">{plan.problem_statement}</p>
            </div>
          </section>
          <section className="surface p-5">
            <SectionTitle icon={Gauge} title="Success metrics" />
            <div className="space-y-3">
              {(metrics.length ? metrics : fallbackMetrics()).map((metric) => (
                <div key={metric.metric} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-bold">{metric.metric}</h3>
                    <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-bold text-emerald-200">{metric.target}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/58">{metric.why_it_matters}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === 'scope' && (
        <div className="grid gap-4 xl:grid-cols-3">
          <ListPanel title="Scope" items={plan.scope} icon={Boxes} />
          <ListPanel title="MVP" items={plan.mvp} icon={CheckCircle2} />
          <section className="surface p-5 xl:row-span-2">
            <SectionTitle icon={GitBranch} title="Product decisions" />
            <div className="space-y-3">
              {(decisions.length ? decisions : fallbackDecisions()).map((decision) => (
                <div key={decision.area} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#b879ff]">{decision.area}</div>
                  <p className="mt-2 text-sm font-semibold leading-6">{decision.recommendation}</p>
                  <p className="mt-2 text-xs leading-5 text-white/48">{decision.tradeoff}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="surface p-5 xl:col-span-2">
            <SectionTitle icon={Layers3} title="Features" />
            <div className="grid gap-3 md:grid-cols-2">
              {plan.features.map((feature) => (
                <div key={feature.name} className="rounded-xl border border-white/10 bg-white/[0.04] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-fuchsia-400/25">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold">{feature.name}</h3>
                    <span className="rounded-full bg-[#7c3aed]/20 px-2.5 py-1 text-xs font-bold text-[#d7b6ff]">{feature.priority}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/58">{feature.outcome}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === 'delivery' && (
        <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <section className="surface p-5">
            <SectionTitle icon={Route} title="Roadmap" />
            <div className="space-y-4">
              {plan.roadmap.map((phase, index) => (
                <div key={phase.phase} className="relative rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#6d4cff] to-[#ff7a2f] text-sm font-black text-white">{index + 1}</div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#b879ff]">{phase.phase}</div>
                      <h3 className="mt-1 font-bold">{phase.focus}</h3>
                      <ol className="mt-3 space-y-2 text-sm leading-6 text-white/62">
                        {phase.build_order.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ol>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {phase.roles.map((role) => (
                          <span key={role} className="rounded-full bg-white/[0.055] px-2.5 py-1 text-xs font-semibold text-white/58">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="surface p-5">
            <SectionTitle icon={ClipboardList} title="Task system" />
            <div className="grid gap-3 md:grid-cols-2">
              {plan.tasks.map((group) => (
                <ListPanel key={group.area} title={group.area} items={group.tasks} embedded icon={ClipboardList} />
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === 'risk' && (
        <div className="grid gap-4 lg:grid-cols-3">
          <ListPanel title="Risks" items={plan.risks} icon={AlertTriangle} />
          <ListPanel title="Assumptions" items={plan.assumptions} icon={Target} />
          <ListPanel title="Dependencies" items={plan.dependencies} icon={GitBranch} />
        </div>
      )}

      {activeTab === 'handoff' && (
        <section className="surface p-5">
          <SectionTitle icon={ClipboardList} title="Execution brief" />
          <div className="grid gap-4 lg:grid-cols-3">
            <BriefStat label="Sections" value={String(8 + metrics.length + decisions.length)} />
            <BriefStat label="Milestones" value={String(plan.milestones.length)} />
            <BriefStat label="Tasks" value={String(plan.tasks.reduce((total, group) => total + group.tasks.length, 0))} />
          </div>
          <div className="mt-5 grid gap-3">
            {plan.milestones.map((milestone) => (
              <div key={milestone.name} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-bold">{milestone.name}</h3>
                  <span className="text-sm font-semibold text-[#b879ff]">{milestone.timeframe}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {milestone.deliverables.map((item) => (
                    <span key={item} className="rounded-full bg-white/[0.055] px-2.5 py-1 text-xs font-semibold text-white/58">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function HeroPanel({ plan }: { plan: GeneratedPlan }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#050a1a] p-6 text-white shadow-[0_30px_100px_rgba(124,58,237,0.18)]">
      <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-violet/35 blur-3xl" />
      <div className="absolute -bottom-28 left-20 h-72 w-72 rounded-full bg-moss/30 blur-3xl" />
      <div className="relative">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white/75">
          <Target size={14} />
          Plan source: {plan.source}
        </div>
        <h2 className="max-w-4xl text-2xl font-black leading-tight md:text-4xl">{plan.summary}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-white/70">{plan.problem_statement}</p>
      </div>
    </section>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: typeof Target; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#7c3aed]/20 text-[#b879ff]">
        <Icon size={18} />
      </div>
      <h2 className="text-lg font-black">{title}</h2>
    </div>
  );
}

function ListPanel({ title, items, embedded = false, icon: Icon }: { title: string; items: string[]; embedded?: boolean; icon: typeof Target }) {
  const className = embedded ? 'rounded-xl border border-white/10 bg-white/[0.04] p-4' : 'surface p-5';
  return (
    <section className={className}>
      <SectionTitle icon={Icon} title={title} />
      <ul className="space-y-2 text-sm leading-6 text-white/62">
        {items.map((item) => (
          <li key={item} className="flex gap-3 rounded-lg px-1 py-1">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-coral" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function BriefStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">{label}</div>
      <div className="mt-2 text-3xl font-black">{value}</div>
    </div>
  );
}

function fallbackMetrics() {
  return [
    { metric: 'Activation', target: '< 5 min', why_it_matters: 'Users should reach a complete plan quickly.' },
    { metric: 'Handoff', target: 'Export ready', why_it_matters: 'The plan should be useful outside the app.' },
  ];
}

function fallbackDecisions() {
  return [
    { area: 'MVP', recommendation: 'Keep the first release focused on one complete workflow.', tradeoff: 'Less breadth, more execution clarity.' },
    { area: 'Delivery', recommendation: 'Sequence foundation before polish.', tradeoff: 'Visual refinement follows product certainty.' },
  ];
}
