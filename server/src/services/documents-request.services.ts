import { DocRequestInsert } from "@database/schema/documents-request.schema";
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

export async function sendDocRequest(
  userId: string,
  payload: CreateDocumentsRequest,
) {
  if (!userId) {
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

  if (requestPayload.templateId) {
    // TODO: fetch template details and follow up
    throw new Error(
      "Template-based document requests are not currently supported",
    );
  }

  const { title, dueDate, description } = requestPayload;

  const newRequest: DocRequestInsert = {
    title,
    description,
    userId,
    clientId: clientRecord.id,
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

  const linkToUpload = generateClientUploadLink(
    userId,
    clientRecord.id,
    createdRequest.id,
  );

  return linkToUpload;
}
