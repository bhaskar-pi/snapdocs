import { create } from "zustand";
import { User } from "@/types/models/user.model";
import { Session } from "@/types/models/auth.model";


interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setSession: (session: Session) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  setSession: (session) =>
    set({
      session,
      isAuthenticated: true,
    }),

  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
      session: null,
    }),
}));
