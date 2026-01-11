import { DocRequestInsert } from "@database/schema/doc-request.schema";
import {
  CreateDocumentsRequest,
  CustomRequest,
} from "@models/requests/create-doc-request";
import { createCheckListItems } from "@repositories/checklist-items.repository";
import {
  createClient,
  getClientByEmail,
} from "@repositories/client.repository";
import { createRequest } from "@repositories/request.repository";
import { generateClientUploadLink } from "@utils/doc-requests";

export async function sendDocRequest(
  userId: string,
  payload: CreateDocumentsRequest
) {
  const clientPayload = payload.client;
  const requestPayload = payload.request as CustomRequest;

  const requiredDocuments = requestPayload.documents;
  if (requiredDocuments?.length < 1) {
    throw new Error("At least one document is required");
  }

  const clientRecord =
    (await getClientByEmail(userId, clientPayload.email)) ??
    (await createClient(userId, clientPayload));

  if (requestPayload.templateId) {
    // TODO: fetch template details and follow up
    throw new Error("Template-based requests not implemented yet");
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
    createdRequest.id
  );

  return linkToUpload;
}
