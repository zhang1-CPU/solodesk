import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  currency: string;
  defaultHourlyRate: number;
  taxRate: number;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  hasSeenOnboarding: boolean;

  setCurrency: (currency: string) => void;
  setDefaultHourlyRate: (rate: number) => void;
  setTaxRate: (rate: number) => void;
  setDateFormat: (format: string) => void;
  setTimeFormat: (format: '12h' | '24h') => void;
  completeOnboarding: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      currency: 'USD',
      defaultHourlyRate: 50,
      taxRate: 0,
      dateFormat: 'MM/dd/yyyy',
      timeFormat: '12h',
      hasSeenOnboarding: false,

      setCurrency: (currency) => set({ currency }),
      setDefaultHourlyRate: (defaultHourlyRate) => set({ defaultHourlyRate }),
      setTaxRate: (taxRate) => set({ taxRate }),
      setDateFormat: (dateFormat) => set({ dateFormat }),
      setTimeFormat: (timeFormat) => set({ timeFormat }),
      completeOnboarding: () => set({ hasSeenOnboarding: true }),
    }),
    {
      name: 'solodesk-settings',
    }
  )
);
