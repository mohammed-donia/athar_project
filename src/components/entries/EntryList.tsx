import type { Entry } from '../../types';
import { groupByDay } from '../../utils/statistics';
import { formatDate } from '../../utils/formatters';
import { EntryItem } from './EntryItem';

interface EntryListProps {
  entries: Entry[];
  unit: string;
  color: string;
  onEdit: (entry: Entry) => void;
  onDelete: (id: string) => void;
}

export function EntryList({
  entries,
  unit,
  color,
  onEdit,
  onDelete,
}: EntryListProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-10 text-sm text-neutral-500">
        لا توجد تسجيلات بعد
      </div>
    );
  }

  const sorted = [...entries].sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    return b.createdAt.localeCompare(a.createdAt);
  });

  const grouped = groupByDay(sorted);
  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="space-y-4">
      {dates.map((date) => (
        <div key={date}>
          <div className="text-xs font-semibold text-neutral-500 px-3 mb-1">
            {formatDate(date)}
          </div>
          <div className="space-y-0.5">
            {grouped[date].map((entry) => (
              <EntryItem
                key={entry.id}
                entry={entry}
                unit={unit}
                color={color}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}