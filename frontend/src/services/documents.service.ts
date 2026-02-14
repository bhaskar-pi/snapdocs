import { POST } from "@/api/http";
import { DocumentItem } from "@/types/models/document";

export const documentsApi = {
  uploadDocument(
    file: File,
    checklistItemId: string,
    requestId: string,
    documentId?: string,
  ) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("checklistItemId", checklistItemId);
    formData.append("requestId", requestId);

    if (documentId) {
      formData.append("documentId", documentId);
    }

    return POST<DocumentItem>("/upload-document", formData);
  },
};
