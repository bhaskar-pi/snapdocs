import { AuthenticatedRequest } from "@models/express";
import { CreateDocumentsRequest } from "@models/requests/create-doc-request";
import { Response } from "express";

export const createDocRequestHandler = (
  request: AuthenticatedRequest,
  response: Response
) => {
  try {
    const data = request.data as CreateDocumentsRequest;

  } catch (error) {}
};
