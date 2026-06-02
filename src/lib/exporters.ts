import type { SavedPlan } from '../types';

export function downloadJson(plan: SavedPlan) {
  download(`${slug(plan.title)}.json`, JSON.stringify(plan, null, 2), 'application/json');
}

export function downloadMarkdown(plan: SavedPlan) {
  const markdown = [
    `# ${plan.title}`,
    '',
    `Updated: ${new Date(plan.updatedAt).toLocaleString()}`,
    '',
    '## Overview',
    plan.summary,
    '',
    '## Problem',
    plan.problem_statement,
    '',
    section('Scope', plan.scope),
    section('MVP', plan.mvp),
    '## Features',
    ...plan.features.map((item) => `- **${item.name}** (${item.priority}): ${item.outcome}`),
    '',
    '## Milestones',
    ...plan.milestones.map((item) => `- **${item.name}** (${item.timeframe}): ${item.deliverables.join(', ')}`),
    '',
    '## Tasks',
    ...plan.tasks.flatMap((group) => [`### ${group.area}`, ...group.tasks.map((task) => `- ${task}`), '']),
    section('Risks', plan.risks),
    section('Assumptions', plan.assumptions),
    section('Dependencies', plan.dependencies),
    '## Roadmap',
    ...plan.roadmap.map((phase) => `- **${phase.phase} - ${phase.focus}**: ${phase.build_order.join(' -> ')}`),
    '',
  ].join('\n');

  download(`${slug(plan.title)}.md`, markdown, 'text/markdown');
}

function section(title: string, items: string[]) {
  return [`## ${title}`, ...items.map((item) => `- ${item}`), ''].join('\n');
}

function download(fileName: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'plan';
}
