import type { SavedPlan } from '../types';

const KEY = 'planit:plans';

export function readPlans(): SavedPlan[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function writePlans(plans: SavedPlan[]) {
  localStorage.setItem(KEY, JSON.stringify(plans));
}

export function savePlan(plan: SavedPlan) {
  const plans = readPlans();
  const next = [plan, ...plans.filter((item) => item.id !== plan.id)];
  writePlans(next);
}

export function deletePlan(id: string) {
  writePlans(readPlans().filter((plan) => plan.id !== id));
}

export function duplicatePlan(id: string): SavedPlan | undefined {
  const plan = readPlans().find((item) => item.id === id);
  if (!plan) return undefined;
  const copy = {
    ...plan,
    id: crypto.randomUUID(),
    title: `${plan.title} Copy`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  savePlan(copy);
  return copy;
}
