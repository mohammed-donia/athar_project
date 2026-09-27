import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { Tracker, Entry } from '../../types';
import { getCategory } from '../../utils/categories';
import { formatNumber, formatDate } from '../../utils/formatters';

interface RecentActivityProps {
  entries: Entry[];
  trackers: Tracker[];
}

export function RecentActivity({ entries, trackers }: RecentActivityProps) {
  if (entries.length === 0) return null;

  const recent = [...entries]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold">آخر النشاطات</h2>
        <Link
          to="/activity"
          className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1"
        >
          الكل
          <ArrowLeft size={12} />
        </Link>
      </div>

      <div className="card p-2">
        {recent.map((entry) => {
          const tracker = trackers.find((t) => t.id === entry.trackerId);
          if (!tracker) return null;

          const category = getCategory(tracker.category);
          const Icon = category.icon;

          return (
            <Link
              key={entry.id}
              to={`/trackers/${tracker.id}`}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${category.color}15` }}
              >
                <Icon size={16} style={{ color: category.color }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold truncate">
                    {tracker.name}
                  </span>
                  <span className="text-xs text-neutral-400 shrink-0">
                    {formatDate(entry.date)}
                  </span>
                </div>
                {entry.note && (
                  <div className="text-xs text-neutral-500 truncate">
                    {entry.note}
                  </div>
                )}
              </div>

              <div className="text-sm font-bold num shrink-0" dir="ltr">
                {formatNumber(entry.value)}
                <span className="text-xs text-neutral-400 font-normal mr-1">
                  {tracker.unit}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}