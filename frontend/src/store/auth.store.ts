import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Session } from "@/types/models/auth.model";
import { User } from "@/types/models/user.model";

interface PersistedUser {
  userId: string;
  email: string;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  persistedUser: PersistedUser | null;
  isAuthenticated: boolean;

  setUser: (user: User) => void;
  setSession: (session: Session) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      persistedUser: null,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          persistedUser: {
            userId: user.id,
            email: user.email,
          },
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
          session: null,
          persistedUser: null,
          isAuthenticated: false,
        }),
        
    }),
    {
      name: "auth-user",
      partialize: (state) => ({
        persistedUser: state.persistedUser,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
