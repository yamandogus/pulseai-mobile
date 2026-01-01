import { create } from 'zustand';
import { AuthState } from './auth.types';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from '@/services/storage/asyncStorge';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isLoggedIn: false,

      login: (token) => {
        set({
          token,
          isLoggedIn: true,
        });
      },
      logout: () =>
        set({
          token: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        token: state.token,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
