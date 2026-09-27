import { TEMPLATES, type TrackerTemplate } from '../../data/templates';
import { getCategory } from '../../utils/categories';

interface TemplateSelectorProps {
  onSelect: (template: TrackerTemplate) => void;
}

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  return (
    <div>
      <p className="text-sm text-neutral-500 mb-3">أو اختر من القوالب الجاهزة:</p>
      <div className="grid grid-cols-2 gap-2">
        {TEMPLATES.map((t) => {
          const cat = getCategory(t.category);
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelect(t)}
              className="flex items-center gap-2 p-3 rounded-xl border hover:border-primary-300 hover:bg-primary-50/50 dark:hover:bg-primary-950/30 transition-all text-right"
            >
              <span className="text-2xl">{t.icon}</span>
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">{t.name}</div>
                <div className="text-xs text-neutral-500 truncate">
                  {t.unit} · {cat.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}