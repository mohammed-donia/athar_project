import { useRef } from 'react';
import {
  Sun,
  Moon,
  Monitor,
  Download,
  Upload,
  Sparkles,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import { useUIStore } from '../../stores/uiStore';
import { useTrackerStore } from '../../stores/trackerStore';
import { useEntryStore } from '../../stores/entryStore';
import { useToastStore } from '../../stores/toastStore';
import { Button } from '../../components/common/Button';
import { DEMO_TRACKERS, generateDemoEntries } from '../../data/demoData';
import { generateId } from '../../lib/ids';
import type { Tracker } from '../../types';

export function Settings() {
  const theme = useUIStore((s) => s.theme);
  const setTheme = useUIStore((s) => s.setTheme);

  const trackers = useTrackerStore((s) => s.trackers);
  const setTrackers = useTrackerStore.setState;
  const entries = useEntryStore((s) => s.entries);
  const setEntries = useEntryStore.setState;

  const showToast = useToastStore((s) => s.show);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      trackers,
      entries,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `athar-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    showToast('تم تصدير البيانات');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (!data.trackers || !data.entries) {
          throw new Error('صيغة الملف غير صحيحة');
        }

        if (
          !confirm(
            `سيتم استبدال كل بياناتك الحالية.\n${data.trackers.length} متابعة و ${data.entries.length} تسجيل.\n\nمتابعة؟`
          )
        ) {
          return;
        }

        setTrackers({ trackers: data.trackers });
        setEntries({ entries: data.entries });
        showToast('تم استيراد البيانات');
      } catch (err) {
        showToast('الملف غير صالح', 'error');
        console.error(err);
      }
    };
    reader.readAsText(file);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleLoadDemo = () => {
    if (
      !confirm(
        'سيتم استبدال بياناتك الحالية ببيانات تجريبية.\n\nمتابعة؟'
      )
    ) {
      return;
    }

    const now = new Date().toISOString();
    const newTrackers: Tracker[] = DEMO_TRACKERS.map((t) => ({
      ...t,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    }));

    const newEntries = generateDemoEntries(newTrackers.map((t) => t.id)).map(
      (e) => ({
        ...e,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      })
    );

    setTrackers({ trackers: newTrackers });
    setEntries({ entries: newEntries });
    showToast('تم تحميل البيانات التجريبية');
  };

  const handleClearAll = () => {
    if (
      !confirm(
        '⚠️ سيتم حذف كل البيانات نهائياً.\n\nهذا الإجراء لا يمكن التراجع عنه.\n\nمتابعة؟'
      )
    ) {
      return;
    }

    setTrackers({ trackers: [] });
    setEntries({ entries: [] });
    showToast('تم حذف كل البيانات');
  };

  return (
    <div className="p-5 md:p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">الإعدادات</h1>
        <p className="text-sm text-neutral-500 mt-0.5">
          تخصيص التطبيق وإدارة بياناتك
        </p>
      </div>

      <section className="mb-6">
        <h2 className="font-bold mb-3">المظهر</h2>
        <div className="grid grid-cols-3 gap-2">
          <ThemeButton
            icon={Sun}
            label="فاتح"
            active={theme === 'light'}
            onClick={() => setTheme('light')}
          />
          <ThemeButton
            icon={Moon}
            label="داكن"
            active={theme === 'dark'}
            onClick={() => setTheme('dark')}
          />
          <ThemeButton
            icon={Monitor}
            label="تلقائي"
            active={theme === 'system'}
            onClick={() => setTheme('system')}
          />
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-bold mb-3">البيانات</h2>
        <div className="card space-y-3">
          <SettingRow
            icon={Download}
            title="تصدير البيانات"
            description={`${trackers.length} متابعة · ${entries.length} تسجيل`}
            action={
              <Button variant="secondary" size="sm" onClick={handleExport}>
                تصدير
              </Button>
            }
          />

          <div className="border-t" />

          <SettingRow
            icon={Upload}
            title="استيراد من ملف"
            description="استبدل بياناتك الحالية بملف JSON"
            action={
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  اختيار
                </Button>
              </>
            }
          />

          <div className="border-t" />

          <SettingRow
            icon={Sparkles}
            title="تحميل بيانات تجريبية"
            description="جرب التطبيق ببيانات جاهزة"
            action={
              <Button variant="secondary" size="sm" onClick={handleLoadDemo}>
                تحميل
              </Button>
            }
          />
        </div>
      </section>

      <section>
        <h2 className="font-bold mb-3 text-danger flex items-center gap-2">
          <AlertTriangle size={16} />
          منطقة الخطر
        </h2>
        <div className="card border-danger/20">
          <SettingRow
            icon={Trash2}
            title="حذف كل البيانات"
            description="حذف كل المتابعات والتسجيلات نهائياً"
            action={
              <Button variant="danger" size="sm" onClick={handleClearAll}>
                حذف الكل
              </Button>
            }
            danger
          />
        </div>
      </section>

      <div className="text-center text-xs text-neutral-500 mt-10 mb-4">
        <div className="font-semibold text-primary-600 mb-1">أثر</div>
        <div>سجّل حياتك، شوف تقدمك</div>
        <div className="mt-2">الإصدار 1.0.0</div>
      </div>
    </div>
  );
}

function ThemeButton({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: typeof Sun;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
        active
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300'
          : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
      }`}
    >
      <Icon size={20} />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

function SettingRow({
  icon: Icon,
  title,
  description,
  action,
  danger,
}: {
  icon: typeof Sun;
  title: string;
  description: string;
  action: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
          danger
            ? 'bg-danger/10 text-danger'
            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
        }`}
      >
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-semibold ${danger ? 'text-danger' : ''}`}>
          {title}
        </div>
        <div className="text-xs text-neutral-500 truncate">{description}</div>
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  );
}