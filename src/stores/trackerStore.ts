import { create } from 'zustand';
import type { Tracker } from '../types/tracker';
import { storage } from '../lib/storage/storage';
import { generateId } from '../lib/ids';

const STORAGE_KEY = 'trackers';

interface TrackerState {
  trackers: Tracker[];
  addTracker: (data: Omit<Tracker, 'id' | 'createdAt' | 'updatedAt'>) => Tracker;
  updateTracker: (id: string, data: Partial<Tracker>) => void;
  deleteTracker: (id: string) => void;
  archiveTracker: (id: string) => void;
  restoreTracker: (id: string) => void;
}

export const useTrackerStore = create<TrackerState>((set, get) => ({
  trackers: storage.get<Tracker[]>(STORAGE_KEY, []),

  addTracker: (data) => {
    const now = new Date().toISOString();
    const tracker: Tracker = {
      ...data,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    const trackers = [...get().trackers, tracker];
    storage.set(STORAGE_KEY, trackers);
    set({ trackers });
    return tracker;
  },

  updateTracker: (id, data) => {
    const trackers = get().trackers.map((t) =>
      t.id === id ? { ...t, ...data, updatedAt: new Date().toISOString() } : t
    );
    storage.set(STORAGE_KEY, trackers);
    set({ trackers });
  },

  deleteTracker: (id) => {
    const trackers = get().trackers.filter((t) => t.id !== id);
    storage.set(STORAGE_KEY, trackers);
    set({ trackers });
  },

  archiveTracker: (id) => {
    get().updateTracker(id, { archivedAt: new Date().toISOString() });
  },

  restoreTracker: (id) => {
    get().updateTracker(id, { archivedAt: undefined });
  },
}));