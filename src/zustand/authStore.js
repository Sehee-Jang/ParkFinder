import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
const useAuthStore = create(
  persist(
    (set, get) => ({
      user: "",
      token: "",

      setAuth: (user, token) => set({ user, token }),
      clearAuth: () => set({ user: "", token: "" })
    }),
    {
      name: "authStorage",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);  

export default useAuthStore;
