import { create } from "zustand";

const initstate = {
  isLogin: false,
  user   : {},
  token  : "",
}

export const useAuthStore = create((set) => ({
  ...initstate,
  setIsLogin: (isLogin: boolean) => set({ isLogin }),
  setUser: (user: any) => set({ user }),
  setToken: (token: string) => set({ token }),
}))