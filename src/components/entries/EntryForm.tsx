import { useState, type FormEvent } from 'react';
import type { Entry } from '../../types';
import { todayISO } from '../../utils/formatters';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

interface EntryFormProps {
  trackerId: string;
  trackerName: string;
  unit: string;
  initial?: Partial<Entry>;
  onSubmit: (data: Omit<Entry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export function EntryForm({
  trackerId,
  trackerName,
  unit,
  initial,
  onSubmit,
  onCancel,
}: EntryFormProps) {
  const [value, setValue] = useState(initial?.value?.toString() ?? '');
  const [date, setDate] = useState(initial?.date ?? todayISO());
  const [note, setNote] = useState(initial?.note ?? '');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const num = parseFloat(value);
    if (!num || num <= 0) {
      setError('القيمة لازم تكون رقم أكبر من صفر');
      return;
    }

    onSubmit({
      trackerId,
      value: num,
      date,
      note: note.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-sm text-neutral-500">
        إضافة تسجيل جديد في <span className="font-semibold text-neutral-900 dark:text-neutral-100">{trackerName}</span>
      </div>

      <Input
        label={`القيمة (${unit})`}
        type="number"
        inputMode="decimal"
        step="any"
        placeholder="0"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (error) setError('');
        }}
        error={error}
        autoFocus
      />

      <Input
        label="التاريخ"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <Input
        label="ملاحظة (اختياري)"
        placeholder="مثال: مراجعة الفصل الثالث"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1">
          {initial?.id ? 'حفظ التعديلات' : 'إضافة التسجيل'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          إلغاء
        </Button>
      </div>
    </form>
  );
}