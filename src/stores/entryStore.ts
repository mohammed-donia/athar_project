import { create } from 'zustand';
import type { Entry } from '../types/entry';
import { storage } from '../lib/storage/storage';
import { generateId } from '../lib/ids';

const STORAGE_KEY = 'entries';

interface EntryState {
  entries: Entry[];
  addEntry: (data: Omit<Entry, 'id' | 'createdAt' | 'updatedAt'>) => Entry;
  updateEntry: (id: string, data: Partial<Entry>) => void;
  deleteEntry: (id: string) => void;
  deleteEntriesByTracker: (trackerId: string) => void;
}

export const useEntryStore = create<EntryState>((set, get) => ({
  entries: storage.get<Entry[]>(STORAGE_KEY, []),

  addEntry: (data) => {
    const now = new Date().toISOString();
    const entry: Entry = {
      ...data,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    const entries = [...get().entries, entry];
    storage.set(STORAGE_KEY, entries);
    set({ entries });
    return entry;
  },

  updateEntry: (id, data) => {
    const entries = get().entries.map((e) =>
      e.id === id ? { ...e, ...data, updatedAt: new Date().toISOString() } : e
    );
    storage.set(STORAGE_KEY, entries);
    set({ entries });
  },

  deleteEntry: (id) => {
    const entries = get().entries.filter((e) => e.id !== id);
    storage.set(STORAGE_KEY, entries);
    set({ entries });
  },

  deleteEntriesByTracker: (trackerId) => {
    const entries = get().entries.filter((e) => e.trackerId !== trackerId);
    storage.set(STORAGE_KEY, entries);
    set({ entries });
  },
}));