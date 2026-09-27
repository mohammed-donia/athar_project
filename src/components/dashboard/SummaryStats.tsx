import { ListChecks, ClipboardList, Target } from 'lucide-react';

interface SummaryStatsProps {
  trackersCount: number;
  entriesCount: number;
  goalsMetCount: number;
}

export function SummaryStats({
  trackersCount,
  entriesCount,
  goalsMetCount,
}: SummaryStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <StatCard
        icon={ListChecks}
        label="متابعات"
        value={trackersCount}
      />
      <StatCard
        icon={ClipboardList}
        label="تسجيلات"
        value={entriesCount}
      />
      <StatCard
        icon={Target}
        label="أهداف محققة"
        value={goalsMetCount}
      />
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof ListChecks;
  label: string;
  value: number;
}) {
  return (
    <div className="card p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950 flex items-center justify-center shrink-0">
        <Icon size={18} className="text-primary-600 dark:text-primary-400" />
      </div>
      <div className="min-w-0">
        <div className="text-xl font-bold num" dir="ltr">
          {value}
        </div>
        <div className="text-[11px] text-neutral-500 truncate">{label}</div>
      </div>
    </div>
  );
}