import { POST } from "@/api/http";
import { ClientRequest } from "@/types/models/client";

export const documentsRequestApi = {
  sendDocumentsRequest(data: ClientRequest) {
    return POST(`/documents-request`, data);
  },
};
