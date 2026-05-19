import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthorized: false,
      token: null,

      setUser: (user) => set({ user, isAuthorized: true }),
      
      setToken: (token) => set({ token }),
      
      logout: () => set({ user: null, isAuthorized: false, token: null }),
      
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthorized: state.isAuthorized,
        token: state.token,
      }),
    }
  )
);
