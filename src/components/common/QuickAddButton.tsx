import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useTrackerStore } from '../../stores/trackerStore';
import { useEntryStore } from '../../stores/entryStore';
import { getCategory } from '../../utils/categories';
import { EntryForm } from '../entries/EntryForm';
import { Modal } from './Modal';
import type { Tracker } from '../../types';

export function QuickAddButton() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Tracker | null>(null);

  const trackers = useTrackerStore((s) => s.trackers);
  const addEntry = useEntryStore((s) => s.addEntry);

  const active = trackers.filter((t) => !t.archivedAt);

  const handleAdd = (data: any) => {
    addEntry(data);
    setOpen(false);
    setSelected(null);
  };

  const close = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 md:bottom-8 left-6 md:left-8 w-14 h-14 rounded-full bg-primary-500 hover:bg-primary-600 text-white shadow-elevated flex items-center justify-center transition-all hover:scale-105 active:scale-95 z-30"
        aria-label="إضافة سريعة"
      >
        <Plus size={24} />
      </button>

      <Modal
        open={open}
        onClose={close}
        title={selected ? 'إضافة تسجيل' : 'اختر متابعة'}
      >
        {!selected && (
          <>
            {active.length === 0 ? (
              <div className="text-center py-8 text-sm text-neutral-500">
                لا توجد متابعات نشطة. أنشئ متابعة أولاً.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {active.map((tracker) => {
                  const cat = getCategory(tracker.category);
                  const Icon = cat.icon;
                  return (
                    <button
                      key={tracker.id}
                      onClick={() => setSelected(tracker)}
                      className="flex items-center gap-2 p-3 rounded-xl border hover:border-primary-300 hover:bg-primary-50/50 dark:hover:bg-primary-950/30 transition-all text-right"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${cat.color}15` }}
                      >
                        <Icon size={16} style={{ color: cat.color }} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold truncate">
                          {tracker.name}
                        </div>
                        <div className="text-[10px] text-neutral-500 truncate">
                          {tracker.unit}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}

        {selected && (
          <div>
            <button
              onClick={() => setSelected(null)}
              className="text-xs text-neutral-500 hover:text-neutral-700 mb-4 flex items-center gap-1"
            >
              <X size={12} />
              اختيار متابعة أخرى
            </button>
            <EntryForm
              trackerId={selected.id}
              trackerName={selected.name}
              unit={selected.unit}
              onSubmit={handleAdd}
              onCancel={close}
            />
          </div>
        )}
      </Modal>
    </>
  );
}