import { AuthenticatedRequest } from "@models/express";
import { CreateDocumentsRequest } from "@models/requests/documents-request";
import { AuthenticatedUser } from "@models/user";
import { getCheckListItemsByRequestId } from "@repositories/checklist-items.repository";
import { getClientById } from "@repositories/client.repository";
import { getDocumentsByChecklistIds } from "@repositories/documents.repository";
import { getDocumentRequestById } from "@repositories/request.repository";
import { getUserById } from "@repositories/user.repository";
import { sendDocRequest } from "@services/document-requests.services";
import { AppError } from "@utils/error";
import { verifyDocumentsRequestToken } from "@utils/session";

export const sendDocumentsRequestHandler = async ({
  authUser,
  request,
}: {
  authUser: AuthenticatedUser;
  request: CreateDocumentsRequest;
}) => {
  const linkToUpload = await sendDocRequest(authUser, request);

  return {
    data: linkToUpload,
    message: "Document(s) request created successfully",
  };
};

export const getUploadRequestDetailsHandler = async ({
  params,
}: {
  params: { token: string };
}) => {
  if (!params.token) {
    throw new AppError("Missing upload token", 400);
  }

  const { clientId, userId, requestId } = verifyDocumentsRequestToken(
    params.token,
  );

  const [user, client, documentRequest, checklistItems] = await Promise.all([
    getUserById(userId),
    getClientById(clientId),
    getDocumentRequestById(requestId),
    getCheckListItemsByRequestId(requestId),
  ]);

  if (!user) {
    throw new AppError("Request owner not found", 404);
  }

  if (!documentRequest) {
    throw new AppError("Document request not found", 404);
  }

  if (!checklistItems?.length) {
    throw new AppError("No checklist items found", 404);
  }

  const checklistItemIds = checklistItems.map(
    (checklistItem) => checklistItem.id,
  );

  const documents = await getDocumentsByChecklistIds(checklistItemIds);

  // Group documents by checklistItemId
  const documentsByChecklistId = new Map<string, typeof documents>();
  for (const doc of documents) {
    if (!documentsByChecklistId.has(doc.checklistItemId)) {
      documentsByChecklistId.set(doc.checklistItemId, []);
    }

    documentsByChecklistId.get(doc.checklistItemId)!.push(doc);
  }

  return {
    message: "Retrieved request details successfully.",
    data: {
      requestedBy: `${user.firstName} ${user.lastName}`,
      requestedOn: documentRequest.sentAt,
      clientName: client?.fullName,
      dueDate: documentRequest.dueDate,
      requestTitle: documentRequest.title,
      requestId,
      checklistItems: checklistItems.map((item) => ({
        ...item,
        documents: documentsByChecklistId.get(item.id) ?? [],
      })),
    },
  };
};
