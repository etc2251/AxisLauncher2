import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SettingsState {
  localhost: boolean;
  set_localhost: (value: boolean) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      localhost: false,
      set_localhost: (value: boolean) => set({ localhost: value }),
    }),
    {
      name: "persist:config",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
