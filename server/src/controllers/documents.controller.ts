import { AuthenticatedRequest } from "@models/express";
import {
  createDocument,
  updateDocumentById,
} from "@repositories/documents.repository";
import { uploadChecklistItemDocument } from "@services/upload-documents";

export const uploadDocumentHandler = async (request: AuthenticatedRequest) => {
  const file = request.file;

  const checklistItemId = request.body.checklistItemId;
  const documentId = request.body.documentId;
  const requestId = request.body.requestId;

  if (!file || !checklistItemId || !requestId) {
    throw new Error("File or checklistItemId or requestId missing");
  }

  const storagePath = await uploadChecklistItemDocument(checklistItemId, file);

  const interimDocument = {
    fileName: file.originalname,
    checklistItemId,
    fileSize: file.size,
    storagePath,
  };

  const document = documentId
    ? await updateDocumentById(requestId, documentId, interimDocument)
    : await createDocument(requestId, interimDocument);
  return document;
};
