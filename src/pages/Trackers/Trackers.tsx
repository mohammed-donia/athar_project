import { useState, useMemo } from 'react';
import { Plus, Search, ListChecks } from 'lucide-react';
import { useTrackerStore } from '../../stores/trackerStore';
import { useEntryStore } from '../../stores/entryStore';
import { TrackerCard } from '../../components/trackers/TrackerCard';
import { TrackerForm } from '../../components/trackers/TrackerForm';
import { TemplateSelector } from '../../components/trackers/TemplateSelector';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import type { Tracker, TrackerCategory } from '../../types';
import { CATEGORIES } from '../../utils/categories';
import type { TrackerTemplate } from '../../data/templates';

export function Trackers() {
  const trackers = useTrackerStore((s) => s.trackers);
  const addTracker = useTrackerStore((s) => s.addTracker);
  const entries = useEntryStore((s) => s.entries);

  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<TrackerCategory | 'all'>('all');

  const totals = useMemo(() => {
    const map: Record<string, number> = {};
    for (const e of entries) {
      map[e.trackerId] = (map[e.trackerId] ?? 0) + e.value;
    }
    return map;
  }, [entries]);

  const visibleTrackers = useMemo(() => {
    let list = trackers.filter((t) => !t.archivedAt);
    if (activeCategory !== 'all') {
      list = list.filter((t) => t.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((t) => t.name.toLowerCase().includes(q));
    }
    return list;
  }, [trackers, activeCategory, search]);

  const handleCreate = (
    data: Omit<Tracker, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    addTracker(data);
    setModalOpen(false);
  };

  const handleTemplate = (template: TrackerTemplate) => {
    addTracker({
      name: template.name,
      unit: template.unit,
      category: template.category,
      type: 'number',
      icon: template.icon,
      goal: template.defaultGoal,
    });
    setModalOpen(false);
  };

  const hasTrackers = trackers.filter((t) => !t.archivedAt).length > 0;

  return (
    <div className="p-5 md:p-8 max-w-5xl mx-auto">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">المتابعات</h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            {hasTrackers
              ? `${trackers.filter((t) => !t.archivedAt).length} متابعة`
              : 'لا يوجد متابعات بعد'}
          </p>
        </div>
        {hasTrackers && (
          <Button onClick={() => setModalOpen(true)}>
            <Plus size={18} />
            <span className="hidden sm:inline">متابعة جديدة</span>
          </Button>
        )}
      </div>

      {!hasTrackers && (
        <div className="card">
          <EmptyState
            icon={ListChecks}
            title="ابدأ رحلتك مع أثر"
            description="أنشئ أول متابعة وسجّل أي شي يهمك — دراسة، رياضة، مصاريف، أو أي شي ثاني."
            action={
              <Button onClick={() => setModalOpen(true)}>
                <Plus size={18} />
                إنشاء متابعة
              </Button>
            }
          />
        </div>
      )}

      {hasTrackers && (
        <>
          <div className="relative mb-4">
            <Search
              size={18}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              className="input pr-11"
              placeholder="ابحث عن متابعة..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
            <FilterChip
              label="الكل"
              active={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
            />
            {CATEGORIES.map((c) => {
              const count = trackers.filter(
                (t) => !t.archivedAt && t.category === c.value
              ).length;
              if (count === 0) return null;
              return (
                <FilterChip
                  key={c.value}
                  label={c.label}
                  active={activeCategory === c.value}
                  onClick={() => setActiveCategory(c.value)}
                />
              );
            })}
          </div>

          {visibleTrackers.length === 0 ? (
            <div className="text-center py-12 text-neutral-500 text-sm">
              ما في نتائج مطابقة
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleTrackers.map((t) => (
                <TrackerCard
                  key={t.id}
                  tracker={t}
                  currentValue={totals[t.id] ?? 0}
                />
              ))}
            </div>
          )}
        </>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="متابعة جديدة"
      >
        <div className="space-y-6">
          <TemplateSelector onSelect={handleTemplate} />
          <div className="border-t pt-6">
            <p className="text-sm text-neutral-500 mb-3">أو أنشئ متابعة مخصصة:</p>
            <TrackerForm
              onSubmit={handleCreate}
              onCancel={() => setModalOpen(false)}
            />
          </div>
        </div>
      </Modal>
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