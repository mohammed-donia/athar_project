import { create } from 'zustand';
import { storage } from '../lib/storage/storage';

type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme';

interface UIState {
  theme: Theme;
  mobileMenuOpen: boolean;
  setTheme: (theme: Theme) => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: storage.get<Theme>(STORAGE_KEY, 'system'),
  mobileMenuOpen: false,

  setTheme: (theme) => {
    storage.set(STORAGE_KEY, theme);
    set({ theme });
    applyTheme(theme);
  },

  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
}));

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function initTheme() {
  const theme = storage.get<Theme>(STORAGE_KEY, 'system');
  applyTheme(theme);

  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', () => {
    const current = storage.get<Theme>(STORAGE_KEY, 'system');
    if (current === 'system') applyTheme('system');
  });
}