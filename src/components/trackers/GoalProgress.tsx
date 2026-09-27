import type { Tracker } from '../../types';
import { getCategory } from '../../utils/categories';
import { PERIOD_LABELS } from '../../utils/formatters';

interface GoalProgressProps {
  tracker: Tracker;
  currentValue: number;
}

export function GoalProgress({ tracker, currentValue }: GoalProgressProps) {
  const category = getCategory(tracker.category);

  if (!tracker.goal) {
    return (
      <div className="card text-center py-8">
        <div className="text-4xl font-bold num" dir="ltr">
          {currentValue}
        </div>
        <div className="text-sm text-neutral-500 mt-1">{tracker.unit}</div>
      </div>
    );
  }

  const { target, period } = tracker.goal;
  const progress = currentValue / target;
  const percent = Math.round(Math.min(progress, 1) * 100);
  const exceeded = progress > 1;

  return (
    <div className="card">
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <div className="text-3xl font-bold num" dir="ltr">
            {currentValue}
            <span className="text-lg text-neutral-400 font-normal">
              {' / '}{target}
            </span>
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            {tracker.unit} · هدف {PERIOD_LABELS[period]}
          </div>
        </div>
        <div
          className="text-2xl font-bold num"
          style={{ color: category.color }}
          dir="ltr"
        >
          {percent}%
        </div>
      </div>

      <div className="progress-bar h-3">
        <div
          className="progress-fill"
          style={{
            width: `${percent}%`,
            backgroundColor: category.color,
          }}
        />
      </div>

      {exceeded && (
        <div className="mt-3 text-xs font-medium text-success flex items-center gap-1">
          🎉 تجاوزت الهدف! ({Math.round(progress * 100)}%)
        </div>
      )}
    </div>
  );
}