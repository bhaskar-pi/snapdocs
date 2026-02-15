import { GET, POST } from "@/api/http";
import { ClientRequestInputForm } from "@/types/models/client";
import { DocumentsUploadChecklist } from "@/types/models/document";
import { ApiResponse } from "@/types/models/misc";

export const documentRequestsApi = {
  sendDocumentsRequest(data: ClientRequestInputForm) {
    return POST(`/document-requests`, data);
  },

  getUploadChecklistItems(token: string) {
    return GET<ApiResponse<DocumentsUploadChecklist>>(
      `/upload-documents/checklist/${token}`,
    );
  },
};
