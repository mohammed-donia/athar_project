import {
  Wallet,
  GraduationCap,
  Heart,
  Dumbbell,
  BookOpen,
  Briefcase,
  Gamepad2,
  User,
  Circle,
  type LucideIcon,
} from 'lucide-react';
import type { TrackerCategory } from '../types';

export interface CategoryInfo {
  value: TrackerCategory;
  label: string;
  icon: LucideIcon;
  color: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { value: 'education',     label: 'تعليم',      icon: GraduationCap, color: '#3d8b8b' },
  { value: 'fitness',       label: 'رياضة',      icon: Dumbbell,      color: '#10b981' },
  { value: 'reading',       label: 'قراءة',      icon: BookOpen,      color: '#8b5cf6' },
  { value: 'work',          label: 'عمل',        icon: Briefcase,     color: '#0ea5e9' },
  { value: 'finance',       label: 'مالية',      icon: Wallet,        color: '#f59e0b' },
  { value: 'health',        label: 'صحة',        icon: Heart,         color: '#ef4444' },
  { value: 'entertainment', label: 'ترفيه',      icon: Gamepad2,      color: '#ec4899' },
  { value: 'personal',      label: 'شخصي',       icon: User,          color: '#6366f1' },
  { value: 'other',         label: 'أخرى',       icon: Circle,        color: '#6b7c7c' },
];

export function getCategory(value: TrackerCategory): CategoryInfo {
  return CATEGORIES.find((c) => c.value === value) ?? CATEGORIES[CATEGORIES.length - 1];
}