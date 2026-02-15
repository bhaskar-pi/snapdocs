import { CreateDocumentItemPayload } from "@models/payloads/documents.payload";
import {
  createDocument,
  updateDocumentById,
} from "@repositories/documents.repository";
import { uploadChecklistItemDocument } from "@services/upload-documents";

export const uploadDocumentHandler = async ({
  request,
}: {
  request: CreateDocumentItemPayload;
}) => {
  const file = request.file;

  const checklistItemId = request.checklistItemId;
  const documentId = request.documentId;
  const requestId = request.requestId;

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

  return {
    message: "Document uploaded successfully.",
    data: document,
    statusCode: documentId ? 200 : 201,
  };
};
