import { useState, useMemo } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import { useTrackerStore } from '../../stores/trackerStore';
import { useEntryStore } from '../../stores/entryStore';
import { ActivityBarChart } from '../../components/charts/ActivityBarChart';
import { TrendLineChart } from '../../components/charts/TrendLineChart';
import { EmptyState } from '../../components/common/EmptyState';
import { getCategory } from '../../utils/categories';
import {
  calculateTotal,
  calculateAverage,
  calculateMin,
  calculateMax,
} from '../../utils/statistics';
import { formatNumber } from '../../utils/formatters';

export function Statistics() {
  const trackers = useTrackerStore((s) => s.trackers);
  const entries = useEntryStore((s) => s.entries);

  const active = trackers.filter((t) => !t.archivedAt);
  const [selectedId, setSelectedId] = useState<string | null>(
    active[0]?.id ?? null
  );

  const selected = active.find((t) => t.id === selectedId);

  const trackerEntries = useMemo(
    () => (selected ? entries.filter((e) => e.trackerId === selected.id) : []),
    [entries, selected]
  );

  const stats = useMemo(
    () => ({
      total: calculateTotal(trackerEntries),
      average: calculateAverage(trackerEntries),
      min: calculateMin(trackerEntries),
      max: calculateMax(trackerEntries),
      count: trackerEntries.length,
    }),
    [trackerEntries]
  );

  if (active.length === 0) {
    return (
      <div className="p-5 md:p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">الإحصائيات</h1>
        <div className="card">
          <EmptyState
            icon={BarChart3}
            title="لا توجد بيانات بعد"
            description="أنشئ متابعة وابدأ بتسجيل القيم لترى الإحصائيات هنا."
          />
        </div>
      </div>
    );
  }

  const category = selected ? getCategory(selected.category) : null;

  return (
    <div className="p-5 md:p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">الإحصائيات</h1>
        <p className="text-sm text-neutral-500 mt-0.5">
          تحليل بياناتك عبر المتابعات
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
        {active.map((t) => {
          const isActive = t.id === selectedId;
          const cat = getCategory(t.category);
          const Icon = cat.icon;
          return (
            <button
              key={t.id}
              onClick={() => setSelectedId(t.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors border ${
                isActive
                  ? 'border-transparent text-white'
                  : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
              }`}
              style={isActive ? { backgroundColor: cat.color } : undefined}
            >
              <Icon size={16} />
              {t.name}
            </button>
          );
        })}
      </div>

      {selected && category && (
        <>
          {trackerEntries.length === 0 ? (
            <div className="card">
              <EmptyState
                icon={TrendingUp}
                title="لا توجد تسجيلات بعد"
                description={`ابدأ بإضافة تسجيلات في "${selected.name}" لترى الإحصائيات.`}
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <StatBox label="المجموع" value={formatNumber(stats.total)} unit={selected.unit} />
                <StatBox label="المتوسط" value={formatNumber(Math.round(stats.average * 100) / 100)} unit={selected.unit} />
                <StatBox label="الأعلى" value={formatNumber(stats.max)} unit={selected.unit} />
                <StatBox label="الأدنى" value={formatNumber(stats.min)} unit={selected.unit} />
              </div>

              <div className="card mb-4">
                <h2 className="font-bold mb-4">آخر 7 أيام</h2>
                <ActivityBarChart entries={trackerEntries} color={category.color} />
              </div>

              <div className="card">
                <h2 className="font-bold mb-4">الاتجاه الأسبوعي</h2>
                <TrendLineChart entries={trackerEntries} color={category.color} />
              </div>
            </>
          )}
        </>
      )}
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
      <div className="text-[10px] text-neutral-400 truncate">{unit}</div>
    </div>
  );
}