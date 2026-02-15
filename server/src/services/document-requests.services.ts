import { DocRequestInsert } from "@database/schema/document-requests.schema";
import {
  CreateDocumentsRequest,
  CustomRequest,
} from "@models/requests/documents-request";
import { createCheckListItems } from "@repositories/checklist-items.repository";
import {
  createClient,
  getClientByEmail,
} from "@repositories/client.repository";
import { createRequest } from "@repositories/request.repository";
import { generateClientUploadLink } from "@utils/doc-requests";
import { sendDocumentRequestEmail } from "./brevo-email/send-doc-request";
import { AuthenticatedUser } from "@models/user";

export async function sendDocRequest(
  user: AuthenticatedUser,
  payload: CreateDocumentsRequest,
) {
  const userId = user.id;
  if (!user.id) {
    throw new Error("Missing user details");
  }

  const clientPayload = payload.client;
  const requestPayload = payload.request as CustomRequest;

  const requiredDocuments = requestPayload.documents;
  if (requiredDocuments?.length < 1) {
    throw new Error(
      "Document request must include at least one required document",
    );
  }

  const clientRecord =
    (await getClientByEmail(userId, clientPayload.email)) ??
    (await createClient(userId, clientPayload));

  const { title, dueDate, description } = requestPayload;

  const newRequest: DocRequestInsert = {
    title,
    description,
    userId,
    clientId: clientRecord.id,
    sentAt: new Date(),
    ...(dueDate && {
      dueDate: new Date(dueDate),
    }),
  };

  const createdRequest = await createRequest(newRequest);

  const checklistItems = requiredDocuments.map((doc) => ({
    ...doc,
    requestId: createdRequest.id,
  }));

  await createCheckListItems(checklistItems);

  const uploadLink = generateClientUploadLink(
    userId,
    clientRecord.id,
    createdRequest.id,
  );

  await sendDocumentRequestEmail({
    clientEmail: clientRecord.email,
    clientName: clientRecord.fullName,
    userName: `${user.firstName} ${user.lastName}`,
    docCount: requestPayload.documents.length,
    requestTitle: requestPayload.title,
    uploadLink,
  });

  return uploadLink;
}
