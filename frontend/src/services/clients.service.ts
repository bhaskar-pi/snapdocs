import { GET } from "@/api/http";
import {
  Client,
  ClientRequestDetails,
  ClientSummary,
} from "@/types/models/client";

export const clientsApi = {
  getClientsSummary() {
    return GET<ClientSummary[]>("/clients/summary");
  },

  getClientDetails(clientId: string) {
    return GET<ClientRequestDetails>(`/clients/${clientId}`);
  },

  getClients() {
    return GET<Client[]>(`/clients`);
  },
};
