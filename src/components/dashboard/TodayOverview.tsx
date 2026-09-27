import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { Tracker, Entry } from '../../types';
import { getCategory } from '../../utils/categories';
import { filterByPeriod, calculateTotal } from '../../utils/statistics';

interface TodayOverviewProps {
  trackers: Tracker[];
  entries: Entry[];
}

export function TodayOverview({ trackers, entries }: TodayOverviewProps) {
  const active = trackers.filter((t) => !t.archivedAt);

  if (active.length === 0) return null;

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold">نظرة اليوم</h2>
        <Link
          to="/trackers"
          className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1"
        >
          الكل
          <ArrowLeft size={12} />
        </Link>
      </div>

      <div className="space-y-2">
        {active.slice(0, 4).map((tracker) => {
          const trackerEntries = entries.filter((e) => e.trackerId === tracker.id);
          const currentValue = tracker.goal
            ? calculateTotal(filterByPeriod(trackerEntries, tracker.goal.period))
            : calculateTotal(trackerEntries);

          const category = getCategory(tracker.category);
          const Icon = category.icon;

          const hasGoal = !!tracker.goal;
          const percent = hasGoal
            ? Math.round(Math.min(currentValue / tracker.goal!.target, 1) * 100)
            : 0;

          return (
            <Link
              key={tracker.id}
              to={`/trackers/${tracker.id}`}
              className="card-hover flex items-center gap-3 p-4"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${category.color}15` }}
              >
                <Icon size={18} style={{ color: category.color }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-sm truncate">
                    {tracker.name}
                  </span>
                  {hasGoal && (
                    <span
                      className="text-xs font-bold num shrink-0"
                      style={{ color: category.color }}
                      dir="ltr"
                    >
                      {percent}%
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="text-neutral-500 num" dir="ltr">
                    {currentValue}
                    {hasGoal && ` / ${tracker.goal!.target}`}
                    {' '}
                    {tracker.unit}
                  </span>
                </div>

                {hasGoal && (
                  <div className="progress-bar mt-1.5 h-1.5">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: category.color,
                      }}
                    />
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}