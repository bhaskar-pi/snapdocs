import { create } from "zustand";

interface ClientsState {
  isLoading: boolean;
}

export const useClientsStore = create<ClientsState>(() => ({
  isLoading: false,
}));
