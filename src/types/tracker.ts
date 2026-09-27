export type TrackerCategory =
  | 'finance'
  | 'education'
  | 'health'
  | 'fitness'
  | 'reading'
  | 'work'
  | 'entertainment'
  | 'personal'
  | 'other';

export type TrackerType = 'number';

export type GoalPeriod = 'daily' | 'weekly' | 'monthly';

export interface TrackerGoal {
  target: number;
  period: GoalPeriod;
}

export interface Tracker {
  id: string;
  name: string;
  description?: string;
  category: TrackerCategory;
  unit: string;
  type: TrackerType;
  icon?: string;
  color?: string;
  goal?: TrackerGoal;
  createdAt: string;
  updatedAt: string;
  archivedAt?: string;
}