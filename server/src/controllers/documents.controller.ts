import { CreateDocumentItemPayload } from "@models/payloads/documents.payload";
import {
  createDocument,
  updateDocumentById,
} from "@repositories/documents.repository";
import { uploadChecklistItemDocument } from "@services/upload-documents";
import { AppError } from "@utils/error";
import { verifyDocumentsRequestToken } from "@utils/session";

export const uploadDocumentHandler = async ({
  request,
  file,
  params,
}: {
  request: CreateDocumentItemPayload;
  params: { token: string };
  file?: Express.Multer.File;
}) => {
  if (!params.token) {
    throw new AppError("Token not found", 400);
  }

  const { clientId, userId, requestId } = verifyDocumentsRequestToken(
    params.token,
  );

  const checklistItemId = request.checklistItemId;
  const documentId = request.documentId;

  if (!file || !checklistItemId || !requestId || !userId) {
    throw new Error("File or userId or checklistItemId or requestId missing");
  }

  const storagePath = await uploadChecklistItemDocument(file, {
    clientId,
    userId,
    requestId,
    checklistItemId,
  });

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
