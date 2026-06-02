import type { PlanInput } from '../types';

export function planTitle(input: PlanInput) {
  return input.idea
    .split(/\s+/)
    .slice(0, 6)
    .join(' ')
    .replace(/[^\w\s-]/g, '')
    .trim() || 'Untitled plan';
}
