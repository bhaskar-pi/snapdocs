import { GET, POST } from "@/api/http";
import { DocumentItem } from "@/types/models/document";
import { ApiResponse } from "@/types/models/misc";

export const documentsApi = {
  uploadDocument(
    file: File,
    checklistItemId: string,
    documentId?: string,
    token?: string,
  ) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("checklistItemId", checklistItemId);

    if (documentId) {
      formData.append("documentId", documentId);
    }

    return POST<DocumentItem>(`/documents/upload/${token}`, formData);
  },

  getDocumentUrl(documentId: string) {
    return GET<ApiResponse<{ url: string }>>(`/documents/${documentId}/url`);
  },
};
