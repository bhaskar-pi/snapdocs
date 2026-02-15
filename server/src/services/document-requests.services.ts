import { CreateDocumentsRequest } from "@models/requests/documents-request";
import { createDocumentRequest } from "@repositories/request.repository";
import { generateClientUploadLink } from "@utils/doc-requests";
import { sendDocumentRequestEmail } from "./brevo-email/send-doc-request";
import { AuthenticatedUser } from "@models/user";

export async function sendDocRequest(
  user: AuthenticatedUser,
  payload: CreateDocumentsRequest,
) {
  const clientPayload = payload.client;
  const requestPayload = payload.request;

  const requiredDocuments = requestPayload.documents;
  if (requiredDocuments?.length < 1) {
    throw new Error(
      "Document request must include at least one required document",
    );
  }

  const { clientRecord, createdRequest } = await createDocumentRequest(
    user.id,
    clientPayload,
    requestPayload,
  );

  const uploadLink = generateClientUploadLink(
    user.id,
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
