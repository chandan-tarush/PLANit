import type { GeneratedPlan, PlanInput } from '../types';

export async function generatePlan(input: PlanInput): Promise<GeneratedPlan> {
  const response = await fetch('/api/plans', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const message = response.status === 422 ? 'Complete the required fields.' : 'Planner is unavailable.';
    throw new Error(message);
  }

  return response.json();
}
