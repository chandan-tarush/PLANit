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
    <article className="surface p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link to={`/plans/${plan.id}`} className="text-lg font-black hover:text-[#b879ff]">
            {plan.title}
          </Link>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/58">{plan.summary}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-white/42">{new Date(plan.updatedAt).toLocaleDateString()}</span>
        <div className="flex gap-2">
          <button className="button-secondary !min-h-10 !px-3" onClick={() => onExport(plan)} title="Export" aria-label="Export">
            <FileDown size={16} />
          </button>
          <button className="button-secondary !min-h-10 !px-3" onClick={() => onDuplicate(plan.id)} title="Duplicate" aria-label="Duplicate">
            <Copy size={16} />
          </button>
          <button className="button-danger !min-h-10 !px-3" onClick={() => onDelete(plan.id)} title="Delete" aria-label="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
