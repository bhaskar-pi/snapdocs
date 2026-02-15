import { GET } from "@/api/http";
import {
  Client,
  ClientRequestDetails,
  ClientSummary,
} from "@/types/models/client";
import { ApiResponse } from "@/types/models/misc";

export const clientsApi = {
  getClientsSummary() {
    return GET<ApiResponse<ClientSummary[]>>("/clients/summary");
  },

  getClientDetails(clientId: string) {
    return GET<ApiResponse<ClientRequestDetails>>(`/clients/${clientId}`);
  },

  getClients() {
    return GET<ApiResponse<Client[]>>(`/clients`);
  },
};
