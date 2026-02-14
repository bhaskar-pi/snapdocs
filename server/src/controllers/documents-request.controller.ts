import { AuthenticatedRequest } from "@models/express";
import { CreateDocumentsRequest } from "@models/requests/documents-request";
import { getCheckListItemsByRequestId } from "@repositories/checklist-items.repository";
import { getClientById } from "@repositories/client.repository";
import { getDocumentsByChecklistIds } from "@repositories/documents.repository";
import { getDocumentRequestById } from "@repositories/request.repository";
import { getUserById } from "@repositories/user.repository";
import { sendDocRequest } from "@services/document-requests.services";

import { verifyDocumentsRequestToken } from "@utils/session";

export const sendDocRequestHandler = async (request: AuthenticatedRequest) => {
  const data = request.body as CreateDocumentsRequest;

  if (!request.user) {
    throw new Error("Missing user details");
  }

  const linkToUpload = await sendDocRequest(request?.user, data);

  return {
    data: linkToUpload,
    message: "Document(s) request created successfully",
  };
};

export const getClientUploadChecklistItems = async (
  request: AuthenticatedRequest,
) => {
  const token = request.params?.token;

  if (!token) {
    throw new Error("Missing upload token");
  }

  const { clientId, userId, requestId } = verifyDocumentsRequestToken(token);

  const [user, client, documentRequest, checklistItems] = await Promise.all([
    getUserById(userId),
    getClientById(clientId),
    getDocumentRequestById(requestId),
    getCheckListItemsByRequestId(requestId),
  ]);

  if (
    !user ||
    !documentRequest ||
    !checklistItems ||
    checklistItems.length === 0
  ) {
    throw new Error("No checklist items found");
  }

  const checklistItemIds = checklistItems.map(
    (checklistItem) => checklistItem.id,
  );

  const documents = await getDocumentsByChecklistIds(checklistItemIds);

  const documentsByChecklistId = new Map<string, typeof documents>();
  for (const doc of documents) {
    if (!documentsByChecklistId.has(doc.checklistItemId)) {
      documentsByChecklistId.set(doc.checklistItemId, []);
    }

    documentsByChecklistId.get(doc.checklistItemId)!.push(doc);
  }

  return {
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
  };
};
