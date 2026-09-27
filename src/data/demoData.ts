import type { Tracker, Entry } from '../types';

export const DEMO_TRACKERS: Omit<Tracker, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'دراسة',
    category: 'education',
    unit: 'ساعة',
    type: 'number',
    icon: '📚',
    goal: { target: 15, period: 'weekly' },
  },
  {
    name: 'جري',
    category: 'fitness',
    unit: 'كم',
    type: 'number',
    icon: '🏃',
    goal: { target: 20, period: 'weekly' },
  },
  {
    name: 'قراءة',
    category: 'reading',
    unit: 'صفحة',
    type: 'number',
    icon: '📖',
    goal: { target: 100, period: 'weekly' },
  },
  {
    name: 'ماء',
    category: 'health',
    unit: 'كوب',
    type: 'number',
    icon: '💧',
    goal: { target: 8, period: 'daily' },
  },
  {
    name: 'مصاريف',
    category: 'finance',
    unit: 'شيكل',
    type: 'number',
    icon: '💰',
    goal: { target: 2000, period: 'monthly' },
  },
];

export function generateDemoEntries(
  trackerIds: string[]
): Omit<Entry, 'id' | 'createdAt' | 'updatedAt'>[] {
  const entries: Omit<Entry, 'id' | 'createdAt' | 'updatedAt'>[] = [];

  const today = new Date();
  const notes = {
    study: ['مراجعة فصل', 'حل تمارين', 'محاضرة', 'مشروع', 'كتاب'],
    running: ['صباح', 'مساء', 'تحدي', 'مع صديق'],
    reading: ['رواية', 'كتاب تقني', 'مقالات'],
    water: ['', '', '', ''],
    expenses: ['غداء', 'مواصلات', 'قهوة', 'كتب', 'ملابس'],
  };

  for (let daysAgo = 29; daysAgo >= 0; daysAgo--) {
    const d = new Date(today);
    d.setDate(today.getDate() - daysAgo);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    const patterns = [
      { tracker: trackerIds[0], chance: 0.7, min: 1, max: 3, notesKey: 'study' },
      { tracker: trackerIds[1], chance: 0.5, min: 3, max: 8, notesKey: 'running' },
      { tracker: trackerIds[2], chance: 0.6, min: 15, max: 50, notesKey: 'reading' },
      { tracker: trackerIds[3], chance: 0.9, min: 4, max: 10, notesKey: 'water' },
      { tracker: trackerIds[4], chance: 0.3, min: 20, max: 200, notesKey: 'expenses' },
    ];

    for (const p of patterns) {
      if (!p.tracker) continue;
      if (Math.random() > p.chance) continue;

      const value =
        Math.round((Math.random() * (p.max - p.min) + p.min) * 10) / 10;
      const notesArr = notes[p.notesKey as keyof typeof notes];
      const note = notesArr[Math.floor(Math.random() * notesArr.length)] || undefined;

      entries.push({
        trackerId: p.tracker,
        value,
        date: dateStr,
        note,
      });
    }
  }

  return entries;
}