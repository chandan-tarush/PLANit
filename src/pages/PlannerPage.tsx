import { Save, Sparkles } from 'lucide-react';
import { FormEvent, useState } from 'react';
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

export function PlannerPage() {
  const [input, setInput] = useState(initialInput);
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      <PageHeader title="Planner" />
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <form className="panel h-fit space-y-4 p-5" onSubmit={onSubmit}>
          <Field label="Idea">
            <textarea
              className="input min-h-36 resize-y"
              required
              minLength={12}
              value={input.idea}
              onChange={(event) => setInput({ ...input, idea: event.target.value })}
            />
          </Field>
          <Field label="Target users">
            <input className="input" value={input.target_users} onChange={(event) => setInput({ ...input, target_users: event.target.value })} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <Field label="Timeline">
              <input className="input" value={input.timeline} onChange={(event) => setInput({ ...input, timeline: event.target.value })} />
            </Field>
            <Field label="Team size">
              <input className="input" value={input.team_size} onChange={(event) => setInput({ ...input, team_size: event.target.value })} />
            </Field>
          </div>
          <Field label="Constraints">
            <textarea className="input min-h-24 resize-y" value={input.constraints} onChange={(event) => setInput({ ...input, constraints: event.target.value })} />
          </Field>
          <Field label="Budget">
            <input className="input" value={input.budget} onChange={(event) => setInput({ ...input, budget: event.target.value })} />
          </Field>
          {error ? <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}
          <div className="flex gap-2">
            <button className="button-primary flex-1" disabled={isLoading}>
              <Sparkles size={18} />
              {isLoading ? 'Generating' : 'Generate'}
            </button>
            <button type="button" className="button-secondary" disabled={!plan} onClick={onSave} title="Save">
              <Save size={18} />
            </button>
          </div>
        </form>

        <div>
          {plan ? (
            <PlanSections plan={plan} />
          ) : (
            <div className="panel flex min-h-[520px] items-center justify-center p-8 text-center">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-panel text-moss">
                  <Sparkles size={24} />
                </div>
                <div className="mt-4 text-lg font-semibold">Plan preview</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
