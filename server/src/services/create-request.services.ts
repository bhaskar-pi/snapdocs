import { Client } from "@database/schema/client.schema";
import { DocRequest } from "@database/schema/doc-request.schema";
import {
  CreateDocumentsRequest,
  CustomRequest,
} from "@models/requests/create-doc-request";
import {
  createClient,
  getClientByEmail,
} from "@repositories/client.repository";
import { createRequest } from "@repositories/request.repository";

export async function createDocRequest(
  userId: string,
  payload: CreateDocumentsRequest
) {
  const clientPayload = payload.client;

  let client = await getClientByEmail(userId, clientPayload.email);
  if (!client) {
    client = await createClient(userId, clientPayload);
  }

  const requestPayload = payload.request;

  if (requestPayload.templateId) {
    // TODO: fetch template details and follow up
    return;
  }

  const {
    title,
    dueDate,
    description,
    status,
    documents: requiredDocuments,
  } = requestPayload as CustomRequest;

  const newRequest: Partial<DocRequest> = {
    title,
    description,
    userId,
    clientId: client.id,
    status,
    sentAt: new Date(),
    ...(dueDate && {
      dueDate: new Date(dueDate),
    }),
  };

  const createdRequest = await createRequest(newRequest as DocRequest);
}
