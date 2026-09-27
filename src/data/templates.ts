import type { TrackerCategory, GoalPeriod } from '../types';

export interface TrackerTemplate {
  id: string;
  name: string;
  icon: string;
  unit: string;
  category: TrackerCategory;
  defaultGoal?: { target: number; period: GoalPeriod };
}

export const TEMPLATES: TrackerTemplate[] = [
  {
    id: 'study',
    name: 'دراسة',
    icon: '📚',
    unit: 'ساعة',
    category: 'education',
    defaultGoal: { target: 15, period: 'weekly' },
  },
  {
    id: 'running',
    name: 'جري',
    icon: '🏃',
    unit: 'كم',
    category: 'fitness',
    defaultGoal: { target: 20, period: 'weekly' },
  },
  {
    id: 'reading',
    name: 'قراءة',
    icon: '📖',
    unit: 'صفحة',
    category: 'reading',
    defaultGoal: { target: 100, period: 'weekly' },
  },
  {
    id: 'water',
    name: 'ماء',
    icon: '💧',
    unit: 'كوب',
    category: 'health',
    defaultGoal: { target: 8, period: 'daily' },
  },
  {
    id: 'coding',
    name: 'برمجة',
    icon: '💻',
    unit: 'ساعة',
    category: 'work',
    defaultGoal: { target: 20, period: 'weekly' },
  },
  {
    id: 'expenses',
    name: 'مصاريف',
    icon: '💰',
    unit: 'شيكل',
    category: 'finance',
    defaultGoal: { target: 1000, period: 'monthly' },
  },
  {
    id: 'gym',
    name: 'نادي رياضي',
    icon: '💪',
    unit: 'تمرين',
    category: 'fitness',
    defaultGoal: { target: 4, period: 'weekly' },
  },
  {
    id: 'meditation',
    name: 'تأمل',
    icon: '🧘',
    unit: 'دقيقة',
    category: 'personal',
    defaultGoal: { target: 10, period: 'daily' },
  },
];