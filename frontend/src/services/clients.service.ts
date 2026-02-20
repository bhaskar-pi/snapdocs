import { DELETE, GET, PUT } from "@/api/http";
import {
  Client,
  ClientFormInput,
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

  deleteClient(clientId: string) {
    return DELETE<ApiResponse<void>>(`/clients/${clientId}`);
  },

  updateClient(clientId: string, data: ClientFormInput) {
    return PUT<ApiResponse<Client>>(`/clients/${clientId}`, data);
  },
};
