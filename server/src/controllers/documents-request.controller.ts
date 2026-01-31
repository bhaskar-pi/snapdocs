import { AuthenticatedRequest } from "@models/express";
import { CreateDocumentsRequest } from "@models/requests/documents-request";
import { sendDocRequest } from "@services/document-requests.services";

export const sendDocRequestHandler = async (request: AuthenticatedRequest) => {
  const data = request.body as CreateDocumentsRequest;
  const linkToUpload = await sendDocRequest(request?.user?.userId, data);

  return {
    data: linkToUpload,
    message: "Document(s) request created successfully",
  };
};
