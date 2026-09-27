import { Link } from 'react-router-dom';
import type { Tracker } from '../../types';
import { getCategory } from '../../utils/categories';

interface TrackerCardProps {
  tracker: Tracker;
  currentValue?: number;
}

export function TrackerCard({ tracker, currentValue = 0 }: TrackerCardProps) {
  const category = getCategory(tracker.category);
  const Icon = category.icon;

  const hasGoal = !!tracker.goal;
  const progress = hasGoal
    ? Math.min(currentValue / tracker.goal!.target, 1)
    : 0;
  const percent = Math.round(progress * 100);

  return (
    <Link
      to={`/trackers/${tracker.id}`}
      className="card-hover block"
    >
      <div className="flex items-start gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${category.color}15` }}
        >
          <Icon size={20} style={{ color: category.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold truncate">{tracker.name}</h3>
          <p className="text-xs text-neutral-500">
            {tracker.unit} · {category.label}
          </p>
        </div>
      </div>

      {hasGoal && (
        <>
          <div className="flex items-center justify-between mb-2 text-sm">
           <span className="num font-semibold" dir="ltr">
  {currentValue} / {tracker.goal!.target}
</span>
            <span className="num text-xs text-neutral-500">{percent}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${percent}%`, backgroundColor: category.color }}
            />
          </div>
        </>
      )}

      {!hasGoal && (
        <div className="text-sm text-neutral-500">
          <span className="num font-semibold text-neutral-900 dark:text-neutral-100">
            {currentValue}
          </span>{' '}
          {tracker.unit}
        </div>
      )}
    </Link>
  );
}