import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Plus, Trash2, Archive } from 'lucide-react';
import { useTrackerStore } from '../../stores/trackerStore';
import { useEntryStore } from '../../stores/entryStore';
import { getCategory } from '../../utils/categories';
import {
  calculateTotal,
  calculateAverage,
  filterByPeriod,
} from '../../utils/statistics';
import { formatNumber } from '../../utils/formatters';
import { GoalProgress } from '../../components/trackers/GoalProgress';
import { EntryList } from '../../components/entries/EntryList';
import { EntryForm } from '../../components/entries/EntryForm';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import type { Entry } from '../../types';

export function TrackerDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const tracker = useTrackerStore((s) =>
    s.trackers.find((t) => t.id === id)
  );
  const archiveTracker = useTrackerStore((s) => s.archiveTracker);
  const deleteTracker = useTrackerStore((s) => s.deleteTracker);

  const allEntries = useEntryStore((s) => s.entries);
  const addEntry = useEntryStore((s) => s.addEntry);
  const updateEntry = useEntryStore((s) => s.updateEntry);
  const deleteEntry = useEntryStore((s) => s.deleteEntry);
  const deleteEntriesByTracker = useEntryStore((s) => s.deleteEntriesByTracker);

  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<Entry | null>(null);

  const entries = useMemo(
    () => allEntries.filter((e) => e.trackerId === id),
    [allEntries, id]
  );

  const currentValue = useMemo(() => {
    if (!tracker?.goal) return calculateTotal(entries);
    const filtered = filterByPeriod(entries, tracker.goal.period);
    return calculateTotal(filtered);
  }, [entries, tracker]);

  const stats = useMemo(
    () => ({
      total: calculateTotal(entries),
      average: calculateAverage(entries),
      count: entries.length,
    }),
    [entries]
  );

  if (!tracker) {
    return (
      <div className="p-8 text-center">
        <p className="text-neutral-500 mb-4">المتابعة غير موجودة</p>
        <Link to="/trackers" className="btn-primary">
          الرجوع للمتابعات
        </Link>
      </div>
    );
  }

  const category = getCategory(tracker.category);
  const Icon = category.icon;

  const handleAdd = (data: Omit<Entry, 'id' | 'createdAt' | 'updatedAt'>) => {
    addEntry(data);
    setAddOpen(false);
  };

  const handleEdit = (data: Omit<Entry, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editing) {
      updateEntry(editing.id, data);
      setEditing(null);
    }
  };

  const handleArchive = () => {
    if (confirm('سيتم إخفاء المتابعة. البيانات ستبقى محفوظة. متابعة؟')) {
      archiveTracker(tracker.id);
      navigate('/trackers');
    }
  };

  const handleDelete = () => {
    if (
      confirm(
        'هل أنت متأكد من حذف هذه المتابعة؟ سيتم حذف جميع التسجيلات المرتبطة بها نهائياً.'
      )
    ) {
      deleteEntriesByTracker(tracker.id);
      deleteTracker(tracker.id);
      navigate('/trackers');
    }
  };

  return (
    <div className="p-5 md:p-8 max-w-3xl mx-auto">

      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/trackers')}
          className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="رجوع"
        >
          <ArrowRight size={20} />
        </button>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${category.color}15` }}
        >
          <Icon size={22} style={{ color: category.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold truncate">{tracker.name}</h1>
          <p className="text-xs text-neutral-500">
            {tracker.unit} · {category.label}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <GoalProgress tracker={tracker} currentValue={currentValue} />
      </div>

      {entries.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <StatBox label="المجموع" value={formatNumber(stats.total)} unit={tracker.unit} />
          <StatBox label="المتوسط" value={formatNumber(Math.round(stats.average * 100) / 100)} unit={tracker.unit} />
          <StatBox label="التسجيلات" value={stats.count.toString()} unit="مرة" />
        </div>
      )}

      <Button
        onClick={() => setAddOpen(true)}
        className="w-full mb-6"
        size="lg"
      >
        <Plus size={18} />
        إضافة تسجيل
      </Button>

      <div className="card">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold">التسجيلات</h2>
          <span className="text-xs text-neutral-500 num">{entries.length}</span>
        </div>

        {entries.length === 0 ? (
          <EmptyState
            icon={Plus}
            title="لا توجد تسجيلات بعد"
            description="ابدأ بتسجيل أول قيمة لهذه المتابعة."
          />
        ) : (
          <EntryList
            entries={entries}
            unit={tracker.unit}
            color={category.color}
            onEdit={setEditing}
            onDelete={deleteEntry}
          />
        )}
      </div>

      <div className="flex gap-3 mt-6">
        <Button variant="secondary" onClick={handleArchive} className="flex-1">
          <Archive size={16} />
          أرشفة
        </Button>
        <Button variant="danger" onClick={handleDelete} className="flex-1">
          <Trash2 size={16} />
          حذف
        </Button>
      </div>

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="إضافة تسجيل"
      >
        <EntryForm
          trackerId={tracker.id}
          trackerName={tracker.name}
          unit={tracker.unit}
          onSubmit={handleAdd}
          onCancel={() => setAddOpen(false)}
        />
      </Modal>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title="تعديل التسجيل"
      >
        {editing && (
          <EntryForm
            trackerId={tracker.id}
            trackerName={tracker.name}
            unit={tracker.unit}
            initial={editing}
            onSubmit={handleEdit}
            onCancel={() => setEditing(null)}
          />
        )}
      </Modal>
    </div>
  );
}

function StatBox({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div className="card text-center py-4 px-3">
      <div className="text-xs text-neutral-500 mb-1">{label}</div>
      <div className="text-lg font-bold num" dir="ltr">
        {value}
      </div>
      <div className="text-[10px] text-neutral-400">{unit}</div>
    </div>
  );
}