import type { LucideIcon } from 'lucide-react';

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  action?: React.ReactNode;
};

export function EmptyState({ icon: Icon, title, action }: EmptyStateProps) {
  return (
    <div className="panel flex min-h-72 flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-panel text-moss">
        <Icon size={24} />
      </div>
      <div className="text-lg font-semibold">{title}</div>
      {action}
    </div>
  );
}
