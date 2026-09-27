import { type ReactNode } from 'react';
import { type LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-950 flex items-center justify-center mb-4">
        <Icon size={28} className="text-primary-600 dark:text-primary-400" />
      </div>
      <h3 className="text-lg font-bold mb-1.5">{title}</h3>
      <p className="text-sm text-neutral-500 mb-6 max-w-xs">{description}</p>
      {action}
    </div>
  );
}