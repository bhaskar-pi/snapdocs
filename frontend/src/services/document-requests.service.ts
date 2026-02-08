import { POST } from "@/api/http";
import { ClientRequestInputForm } from "@/types/models/client";

export const documentRequestsApi = {
  sendDocumentsRequest(data: ClientRequestInputForm) {
    return POST(`/document-requests`, data);
  },
};
