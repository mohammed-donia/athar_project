import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Activity as ActivityIcon } from 'lucide-react';
import { useTrackerStore } from '../../stores/trackerStore';
import { useEntryStore } from '../../stores/entryStore';
import { TimelineGroup } from '../../components/entries/TimelineGroup';
import { EmptyState } from '../../components/common/EmptyState';
import { groupByDay } from '../../utils/statistics';
import { getCategory } from '../../utils/categories';
import type { TrackerCategory } from '../../types';

export function Activity() {
  const trackers = useTrackerStore((s) => s.trackers);
  const entries = useEntryStore((s) => s.entries);

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<TrackerCategory | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = entries;

    if (filterCategory !== 'all') {
      const trackerIds = trackers
        .filter((t) => t.category === filterCategory)
        .map((t) => t.id);
      list = list.filter((e) => trackerIds.includes(e.trackerId));
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((e) => {
        const tracker = trackers.find((t) => t.id === e.trackerId);
        return (
          tracker?.name.toLowerCase().includes(q) ||
          e.note?.toLowerCase().includes(q)
        );
      });
    }

    return list;
  }, [entries, trackers, search, filterCategory]);

  const grouped = useMemo(() => {
    const sorted = [...filtered].sort((a, b) => {
      if (a.date !== b.date) return b.date.localeCompare(a.date);
      return b.createdAt.localeCompare(a.createdAt);
    });
    return groupByDay(sorted);
  }, [filtered]);

  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  const hasCategories = trackers.length > 0;
  const usedCategories = useMemo(() => {
    const cats = new Set(trackers.filter(t => !t.archivedAt).map((t) => t.category));
    return Array.from(cats);
  }, [trackers]);

  return (
    <div className="p-5 md:p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">النشاط</h1>
        <p className="text-sm text-neutral-500 mt-0.5">
          {entries.length} تسجيل في {trackers.length} متابعات
        </p>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            className="input pr-11"
            placeholder="ابحث في التسجيلات والملاحظات..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {hasCategories && (
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3.5 rounded-xl border transition-colors flex items-center gap-1.5 text-sm ${
              showFilters || filterCategory !== 'all'
                ? 'bg-primary-50 border-primary-300 text-primary-700 dark:bg-primary-950 dark:border-primary-700 dark:text-primary-300'
                : 'hover:bg-neutral-50 dark:hover:bg-neutral-800'
            }`}
            aria-label="فلاتر"
          >
            <SlidersHorizontal size={16} />
          </button>
        )}
      </div>

      {showFilters && hasCategories && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-1 px-1">
          <FilterChip
            label="الكل"
            active={filterCategory === 'all'}
            onClick={() => setFilterCategory('all')}
          />
          {usedCategories.map((cat) => {
            const info = getCategory(cat);
            return (
              <FilterChip
                key={cat}
                label={info.label}
                active={filterCategory === cat}
                onClick={() => setFilterCategory(cat)}
              />
            );
          })}
        </div>
      )}

      {dates.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={ActivityIcon}
            title={entries.length === 0 ? 'لا يوجد نشاط بعد' : 'لا توجد نتائج'}
            description={
              entries.length === 0
                ? 'ابدأ بتسجيل أول قيمة في إحدى متابعاتك.'
                : 'جربي تعديل البحث أو الفلاتر.'
            }
          />
        </div>
      ) : (
        <div>
          {dates.map((date) => (
            <TimelineGroup
              key={date}
              date={date}
              entries={grouped[date]}
              trackers={trackers}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
        active
          ? 'bg-primary-500 text-white'
          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
      }`}
    >
      {label}
    </button>
  );
}