// write a zustand store to manage the auth state

import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useAuthStore;
