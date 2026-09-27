import { Link } from 'react-router-dom';
import type { Tracker, Entry } from '../../types';
import { getCategory } from '../../utils/categories';
import { formatNumber, formatDate } from '../../utils/formatters';

interface TimelineGroupProps {
  date: string;
  entries: Entry[];
  trackers: Tracker[];
}

export function TimelineGroup({ date, entries, trackers }: TimelineGroupProps) {
  const totalCount = entries.length;

  return (
    <div className="mb-6">
      <div className="flex items-baseline justify-between mb-2 px-1">
        <h3 className="font-bold text-sm">{formatDate(date)}</h3>
        <span className="text-xs text-neutral-500">
          {totalCount} {totalCount === 1 ? 'تسجيل' : 'تسجيلات'}
        </span>
      </div>

      <div className="card p-2">
        {entries.map((entry) => {
          const tracker = trackers.find((t) => t.id === entry.trackerId);
          if (!tracker) return null;

          const category = getCategory(tracker.category);
          const Icon = category.icon;

          return (
            <Link
              key={entry.id}
              to={`/trackers/${tracker.id}`}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${category.color}15` }}
              >
                <Icon size={18} style={{ color: category.color }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">
                  {tracker.name}
                </div>
                {entry.note && (
                  <div className="text-xs text-neutral-500 truncate mt-0.5">
                    {entry.note}
                  </div>
                )}
              </div>

              <div className="text-left shrink-0">
                <div className="font-bold num text-sm" dir="ltr">
                  {formatNumber(entry.value)}
                </div>
                <div className="text-[10px] text-neutral-400">
                  {tracker.unit}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}