import { create } from "zustand";

import { ClientSummary } from "@/types/models/client";

interface ClientsState {
  isLoading: boolean;
  summary?: ClientSummary[];

  setSummary: (summary: ClientSummary[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useClientsStore = create<ClientsState>((set) => ({
  isLoading: false,
  summary: [],

  setLoading: (loading) => set({ isLoading: loading }),
  setSummary: (summary) => set({ summary }),
}));
