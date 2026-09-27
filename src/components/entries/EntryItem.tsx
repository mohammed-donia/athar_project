import { useState } from 'react';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import type { Entry } from '../../types';
import { formatNumber } from '../../utils/formatters';

interface EntryItemProps {
  entry: Entry;
  unit: string;
  color: string;
  onEdit: (entry: Entry) => void;
  onDelete: (id: string) => void;
}

export function EntryItem({
  entry,
  unit,
  color,
  onEdit,
  onDelete,
}: EntryItemProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group">
      {/* Dot */}
      <div
        className="w-1 h-10 rounded-full shrink-0"
        style={{ backgroundColor: color }}
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-bold num" dir="ltr">
            {formatNumber(entry.value)}
          </span>
          <span className="text-xs text-neutral-500">{unit}</span>
        </div>
        {entry.note && (
          <div className="text-xs text-neutral-500 truncate mt-0.5">
            {entry.note}
          </div>
        )}
      </div>

      {/* Menu */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="خيارات"
        >
          <MoreVertical size={16} />
        </button>

        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute left-0 top-8 z-20 bg-white dark:bg-neutral-900 border rounded-xl shadow-elevated py-1 min-w-[140px]">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit(entry);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 text-right"
              >
                <Pencil size={14} />
                تعديل
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  if (confirm('هل أنت متأكد من حذف هذا التسجيل؟')) {
                    onDelete(entry.id);
                  }
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 text-danger text-right"
              >
                <Trash2 size={14} />
                حذف
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}