import { CreateDocumentItemPayload } from "@models/payloads/documents.payload";
import {
  createDocument,
  getDocumentById,
  updateDocumentById,
} from "@repositories/documents.repository";
import { generateSignedDocumentUrl } from "@services/storage-service/storage-urls";
import { uploadChecklistItemDocument } from "@services/storage-service/upload-document";
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
    throw new AppError(
      "File or userId or checklistItemId or requestId missing",
      400,
    );
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

export const getDocumentUrlHandler = async ({
  params,
}: {
  params: { documentId: string };
}) => {
  const { documentId } = params;
  const document = await getDocumentById(documentId);

  if (!document) {
    throw new AppError("Document not found", 404);
  }

  const signedUrl = await generateSignedDocumentUrl(document.storagePath);

  return {
    statusCode: 200,
    data: {
      url: signedUrl,
    },
    message: "Url retrieved successfully.",
  };
};
