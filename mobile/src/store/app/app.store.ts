import { zustandStorage } from "@/services/storage/asyncStorge";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AppState = {
  theme: 'light' | 'dark';
  language: 'tr' | 'en';
  setTheme: (t: AppState['theme']) => void;
  setLanguage: (l: AppState['language']) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'tr',

      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
