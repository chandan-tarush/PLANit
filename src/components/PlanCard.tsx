import { Copy, FileDown, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { SavedPlan } from '../types';

type PlanCardProps = {
  plan: SavedPlan;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onExport: (plan: SavedPlan) => void;
};

export function PlanCard({ plan, onDuplicate, onDelete, onExport }: PlanCardProps) {
  return (
    <article className="panel p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link to={`/plans/${plan.id}`} className="text-lg font-semibold hover:text-moss">
            {plan.title}
          </Link>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600">{plan.summary}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-stone-500">{new Date(plan.updatedAt).toLocaleDateString()}</span>
        <div className="flex gap-2">
          <button className="button-secondary !h-9 !px-3" onClick={() => onExport(plan)} title="Export">
            <FileDown size={16} />
          </button>
          <button className="button-secondary !h-9 !px-3" onClick={() => onDuplicate(plan.id)} title="Duplicate">
            <Copy size={16} />
          </button>
          <button className="button-danger !h-9 !px-3" onClick={() => onDelete(plan.id)} title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
