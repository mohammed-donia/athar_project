import { useState, type FormEvent } from 'react';
import type {
  Tracker,
  TrackerCategory,
  GoalPeriod,
} from '../../types';
import { CATEGORIES } from '../../utils/categories';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

interface TrackerFormProps {
  initial?: Partial<Tracker>;
  onSubmit: (data: Omit<Tracker, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export function TrackerForm({ initial, onSubmit, onCancel }: TrackerFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [unit, setUnit] = useState(initial?.unit ?? '');
  const [category, setCategory] = useState<TrackerCategory>(
    initial?.category ?? 'other'
  );
  const [hasGoal, setHasGoal] = useState(!!initial?.goal);
  const [goalTarget, setGoalTarget] = useState(
    initial?.goal?.target?.toString() ?? ''
  );
  const [goalPeriod, setGoalPeriod] = useState<GoalPeriod>(
    initial?.goal?.period ?? 'weekly'
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'الاسم مطلوب';
    if (!unit.trim()) newErrors.unit = 'الوحدة مطلوبة';

    if (hasGoal) {
      const target = parseFloat(goalTarget);
      if (!target || target <= 0) newErrors.goal = 'الهدف لازم يكون رقم موجب';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      name: name.trim(),
      unit: unit.trim(),
      category,
      type: 'number',
      icon: initial?.icon,
      goal: hasGoal
        ? { target: parseFloat(goalTarget), period: goalPeriod }
        : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <Input
        label="اسم المتابعة"
        placeholder="مثال: دراسة، جري، قراءة"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (errors.name) setErrors({ ...errors, name: '' });
        }}
        error={errors.name}
        autoFocus
      />

      <Input
        label="الوحدة"
        placeholder="مثال: ساعة، كم، صفحة، كوب"
        value={unit}
        onChange={(e) => {
          setUnit(e.target.value);
          if (errors.unit) setErrors({ ...errors, unit: '' });
        }}
        error={errors.unit}
      />

      <div>
        <label className="label">الفئة</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const active = category === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  active
                    ? 'border-transparent text-white'
                    : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300'
                }`}
                style={active ? { backgroundColor: cat.color } : undefined}
              >
                <Icon size={14} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border p-4 space-y-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={hasGoal}
            onChange={(e) => setHasGoal(e.target.checked)}
            className="w-4 h-4 accent-primary-500"
          />
          <span className="text-sm font-medium">إضافة هدف</span>
          <span className="text-xs text-neutral-500">(اختياري)</span>
        </label>

        {hasGoal && (
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="القيمة المستهدفة"
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="15"
              value={goalTarget}
              onChange={(e) => {
                setGoalTarget(e.target.value);
                if (errors.goal) setErrors({ ...errors, goal: '' });
              }}
              error={errors.goal}
            />
            <div>
              <label className="label">الفترة</label>
              <select
                className="input"
                value={goalPeriod}
                onChange={(e) => setGoalPeriod(e.target.value as GoalPeriod)}
              >
                <option value="daily">يومي</option>
                <option value="weekly">أسبوعي</option>
                <option value="monthly">شهري</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1">
          {initial?.id ? 'حفظ التعديلات' : 'إنشاء المتابعة'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          إلغاء
        </Button>
      </div>
    </form>
  );
}