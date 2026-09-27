import type { Entry } from '../types';

export function calculateTotal(entries: Entry[]): number {
  return entries.reduce((sum, e) => sum + e.value, 0);
}

export function calculateAverage(entries: Entry[]): number {
  if (entries.length === 0) return 0;
  return calculateTotal(entries) / entries.length;
}

export function calculateMin(entries: Entry[]): number {
  if (entries.length === 0) return 0;
  return Math.min(...entries.map((e) => e.value));
}

export function calculateMax(entries: Entry[]): number {
  if (entries.length === 0) return 0;
  return Math.max(...entries.map((e) => e.value));
}

export function filterByPeriod(
  entries: Entry[],
  period: 'daily' | 'weekly' | 'monthly'
): Entry[] {
  const now = new Date();
  let start: Date;

  if (period === 'daily') {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else if (period === 'weekly') {
    const day = now.getDay();
    start = new Date(now);
    start.setDate(now.getDate() - day);
    start.setHours(0, 0, 0, 0);
  } else {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
  }

  return entries.filter((e) => {
    const d = new Date(e.date);
    return d >= start;
  });
}

export function groupByDay(entries: Entry[]): Record<string, Entry[]> {
  const groups: Record<string, Entry[]> = {};
  for (const e of entries) {
    if (!groups[e.date]) groups[e.date] = [];
    groups[e.date].push(e);
  }
  return groups;
}