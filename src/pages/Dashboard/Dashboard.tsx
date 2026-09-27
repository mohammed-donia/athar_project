import { useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTrackerStore } from '../../stores/trackerStore';
import { useEntryStore } from '../../stores/entryStore';
import { Greeting } from '../../components/dashboard/Greeting';
import { SummaryStats } from '../../components/dashboard/SummaryStats';
import { TodayOverview } from '../../components/dashboard/TodayOverview';
import { RecentActivity } from '../../components/dashboard/RecentActivity';
import { EmptyState } from '../../components/common/EmptyState';
import { Button } from '../../components/common/Button';
import {
  calculateTotal,
  filterByPeriod,
} from '../../utils/statistics';

export function Dashboard() {
  const trackers = useTrackerStore((s) => s.trackers);
  const entries = useEntryStore((s) => s.entries);

  const activeTrackers = useMemo(
    () => trackers.filter((t) => !t.archivedAt),
    [trackers]
  );

  const goalsMetCount = useMemo(() => {
    return activeTrackers.filter((t) => {
      if (!t.goal) return false;
      const trackerEntries = entries.filter((e) => e.trackerId === t.id);
      const current = calculateTotal(
        filterByPeriod(trackerEntries, t.goal.period)
      );
      return current >= t.goal.target;
    }).length;
  }, [activeTrackers, entries]);

  if (activeTrackers.length === 0) {
    return (
      <div className="p-5 md:p-8 max-w-3xl mx-auto">
        <Greeting />
        <div className="card">
          <EmptyState
            icon={Plus}
            title="ابدأ رحلتك مع أثر"
            description="أنشئ أول متابعة وسجّل أي شي يهمك — دراسة، رياضة، مصاريف، أو أي شي ثاني."
            action={
              <Link to="/trackers" className="btn-primary">
                <Plus size={18} />
                إنشاء متابعة
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-8 max-w-3xl mx-auto">
      <Greeting />

      <SummaryStats
        trackersCount={activeTrackers.length}
        entriesCount={entries.length}
        goalsMetCount={goalsMetCount}
      />

      <TodayOverview trackers={activeTrackers} entries={entries} />

      <RecentActivity entries={entries} trackers={trackers} />
    </div>
  );
}