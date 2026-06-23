import { create } from 'zustand';
import { DEFAULT_SETTINGS } from '@/lib/constants';

interface SettingsState {
  currency: string;
  language: string;
  colorScheme: 'light' | 'dark' | 'system';
  defaultHourlyRate: number;
  taxRate: number;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  weekStartsOn: number;
  setSettings: (settings: Partial<SettingsState>) => void;
  setCurrency: (currency: string) => void;
  setLanguage: (language: string) => void;
  setColorScheme: (colorScheme: 'light' | 'dark' | 'system') => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  currency: DEFAULT_SETTINGS.currency,
  language: DEFAULT_SETTINGS.language,
  colorScheme: DEFAULT_SETTINGS.theme,
  defaultHourlyRate: DEFAULT_SETTINGS.defaultHourlyRate,
  taxRate: DEFAULT_SETTINGS.taxRate,
  dateFormat: DEFAULT_SETTINGS.dateFormat,
  timeFormat: DEFAULT_SETTINGS.timeFormat,
  weekStartsOn: DEFAULT_SETTINGS.weekStartsOn,
  setSettings: (settings) => set((state) => ({ ...state, ...settings })),
  setCurrency: (currency) => set({ currency }),
  setLanguage: (language) => set({ language }),
  setColorScheme: (colorScheme) => set({ colorScheme }),
}));
