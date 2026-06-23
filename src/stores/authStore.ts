import { create } from 'zustand';

interface AuthState {
  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  hasSeenOnboarding: false,
  setHasSeenOnboarding: (value: boolean) => set({ hasSeenOnboarding: value }),
}));
