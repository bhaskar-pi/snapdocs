import { GET } from "@/api/http";
import { ClientRequestDetails, ClientSummary } from "@/types/models/client";

export const clientsApi = {
  getClientsSummary() {
    return GET<ClientSummary[]>("/clients/summary");
  },

  getClientDetails(clientId: string) {
    return GET<ClientRequestDetails>(`clients/${clientId}`);
  },
};
