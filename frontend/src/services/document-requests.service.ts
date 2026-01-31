import { POST } from "@/api/http";
import { ClientRequest } from "@/types/models/client";

export const documentRequestsApi = {
  sendDocumentsRequest(data: ClientRequest) {
    return POST(`/document-requests`, data);
  },
};
