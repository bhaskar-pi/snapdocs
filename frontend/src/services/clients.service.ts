import { GET } from "@/api/http";
import { ClientSummary } from "@/types/models/client";

export const clientsApi = {
  getClientsSummary() {
    return GET<ClientSummary[]>("/clients/summary");
  },
};
