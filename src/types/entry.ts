export interface Entry {
  id: string;
  trackerId: string;
  value: number;
  date: string; 
  note?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}