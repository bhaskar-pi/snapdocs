import { AuthenticatedRequest } from "@models/express";
import { CreateDocumentsRequest } from "@models/requests/create-doc-request";
import { sendDocRequest } from "@services/create-request.services";

export const createDocRequestHandler = async (
  request: AuthenticatedRequest
) => {
  const data = request.data as CreateDocumentsRequest;
  const linkToUpload = await sendDocRequest(request?.user?.userId, data);

  return {
    data: linkToUpload,
    message: "Document(s) request created successfully",
  };
};
