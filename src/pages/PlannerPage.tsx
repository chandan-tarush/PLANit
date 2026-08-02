import { ArrowRight, Building2, Clock3, DollarSign, Save, Sparkles, Target, Users } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Field } from '../components/Field';
import { PageHeader } from '../components/PageHeader';
import { PlanSections } from '../components/PlanSections';
import { generatePlan } from '../lib/api';
import { savePlan } from '../lib/storage';
import { planTitle } from '../lib/title';
import type { GeneratedPlan, PlanInput, SavedPlan } from '../types';

const initialInput: PlanInput = {
  idea: '',
  target_users: '',
  timeline: '',
  constraints: '',
  budget: '',
  team_size: '',
};

const inputSignals = [
  { key: 'target_users', label: 'Audience', icon: Users },
  { key: 'timeline', label: 'Timing', icon: Clock3 },
  { key: 'constraints', label: 'Limits', icon: Target },
  { key: 'budget', label: 'Budget', icon: DollarSign },
  { key: 'team_size', label: 'Team', icon: Building2 },
] as const;

export function PlannerPage() {
  const [input, setInput] = useState(initialInput);
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const readiness = useMemo(() => {
    const fields = [input.idea, input.target_users, input.timeline, input.constraints, input.budget, input.team_size];
    return Math.round((fields.filter((value) => value.trim().length > 0).length / fields.length) * 100);
  }, [input]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      setPlan(await generatePlan(input));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Planner is unavailable.');
    } finally {
      setIsLoading(false);
    }
  }

  function onSave() {
    if (!plan) return;
    const now = new Date().toISOString();
    const saved: SavedPlan = {
      ...plan,
      id: crypto.randomUUID(),
      title: planTitle(input),
      input,
      createdAt: now,
      updatedAt: now,
    };
    savePlan(saved);
    navigate(`/plans/${saved.id}`);
  }

  return (
    <>
      <PageHeader
        eyebrow="Planner"
        title="Shape the project before the build"
        description="Turn raw context into strategy, MVP scope, delivery phases, risks, and team-ready handoff."
      />

      <div className="grid gap-5 2xl:grid-cols-[460px_1fr]">
        <form className="surface h-fit overflow-hidden p-0" onSubmit={onSubmit}>
          <div className="border-b border-white/10 bg-[#060b1b] p-5 text-white">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">Project intake</div>
                <div className="mt-2 text-2xl font-black">{readiness}% ready</div>
              </div>
              <div className="h-14 w-14 rounded-2xl border border-white/15 bg-white/10 p-1.5">
                <div className="h-full rounded-xl bg-[conic-gradient(from_180deg,#b5d66b_0deg,#7258e8_var(--ready),rgba(255,255,255,0.16)_var(--ready))]" style={{ '--ready': `${readiness * 3.6}deg` } as CSSProperties} />
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/12">
              <div className="h-full rounded-full bg-lime transition-all duration-300" style={{ width: `${readiness}%` }} />
            </div>
          </div>

          <div className="space-y-4 p-5">
            <Field label="Idea">
              <textarea
                className="input min-h-40 resize-y"
                required
                minLength={12}
                value={input.idea}
                onChange={(event) => setInput({ ...input, idea: event.target.value })}
                placeholder="Describe the project, product, or startup idea..."
              />
            </Field>

            <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-1">
              <Field label="Target users">
                <input className="input" value={input.target_users} onChange={(event) => setInput({ ...input, target_users: event.target.value })} placeholder="Who is this for?" />
              </Field>
              <Field label="Timeline">
                <input className="input" value={input.timeline} onChange={(event) => setInput({ ...input, timeline: event.target.value })} placeholder="Example: 8 weeks" />
              </Field>
            </div>

            <Field label="Constraints">
              <textarea
                className="input min-h-24 resize-y"
                value={input.constraints}
                onChange={(event) => setInput({ ...input, constraints: event.target.value })}
                placeholder="Technical, business, team, deadline, or launch constraints"
              />
            </Field>

            <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-1">
              <Field label="Budget">
                <input className="input" value={input.budget} onChange={(event) => setInput({ ...input, budget: event.target.value })} placeholder="Lean, fixed, open, etc." />
              </Field>
              <Field label="Team size">
                <input className="input" value={input.team_size} onChange={(event) => setInput({ ...input, team_size: event.target.value })} placeholder="Example: 3 developers" />
              </Field>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {inputSignals.map((signal) => {
                const active = input[signal.key].trim().length > 0;
                return (
                  <div key={signal.key} className={`rounded-xl border p-3 text-center transition ${active ? 'border-[#b879ff]/30 bg-[#7c3aed]/15 text-[#b879ff]' : 'border-white/10 bg-white/[0.035] text-white/35'}`}>
                    <signal.icon size={18} className="mx-auto" />
                    <div className="mt-1 hidden text-[11px] font-bold sm:block">{signal.label}</div>
                  </div>
                );
              })}
            </div>

            {error ? <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</div> : null}

            <div className="flex gap-2">
              <button className="button-primary flex-1" disabled={isLoading}>
                <Sparkles size={18} />
                {isLoading ? 'Generating plan' : 'Generate plan'}
              </button>
              <button type="button" className="button-secondary min-w-12" disabled={!plan} onClick={onSave} title="Save plan" aria-label="Save plan">
                <Save size={18} />
              </button>
            </div>
          </div>
        </form>

        <div>
          {plan ? (
            <PlanSections plan={plan} />
          ) : (
            <div className="surface grid min-h-[660px] place-items-center overflow-hidden p-6">
              <div className="max-w-2xl text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#6d4cff] to-[#ff7a2f] text-white shadow-[0_0_48px_rgba(124,58,237,0.36)]">
                  <Sparkles size={28} />
                </div>
                <h2 className="mt-6 text-3xl font-black">Planning cockpit</h2>
                <p className="mt-3 text-sm leading-6 text-white/58">
                  Generate once, then review the plan through strategy, scope, delivery, risk, and handoff tabs.
                </p>
                <div className="mt-6 grid gap-3 text-left md:grid-cols-3">
                  {['Product clarity', 'Execution order', 'Team handoff'].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <ArrowRight size={18} className="text-[#b879ff]" />
                      <div className="mt-3 text-sm font-bold">{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
