import { create } from 'zustand';
import type { Toast } from '@/types';

interface UIState {
  sidebarOpen: boolean;
  toasts: Toast[];
  isLoading: boolean;

  toggleSidebar: () => void;
  addToast: (message: string, type: Toast['type']) => void;
  removeToast: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  toasts: [],
  isLoading: false,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  addToast: (message, type) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));

    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, type === 'error' ? 5000 : 3000);
  },

  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),

  setLoading: (loading) => set({ isLoading: loading }),
}));
