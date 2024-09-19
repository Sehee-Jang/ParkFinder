import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
const useAuthStore = create(
  persist(
    (set, get) => ({
      user: "",
      token: "",

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setAuth: (user, token) => set({ user, token }),
      clearAuth: () => set({ user: null, token: null })
    }),
    {
      name: "authStorage",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

export default useAuthStore;
