import { getClientDetailsDto } from "@mappers/clients";
import { AuthenticatedRequest } from "@models/express";
import {
  getClientDetailsById,
  getClientSummariesByUserId,
} from "@repositories/client.repository";

export const getClientsSummariesHandler = async (
  request: AuthenticatedRequest,
) => {
  const userId = request.user?.userId;

  if (!userId) {
    throw new Error("Invalid Session");
  }

  const clientSummaries = await getClientSummariesByUserId(userId);

  return clientSummaries;
};

export const getClientDetailsHandler = async (
  request: AuthenticatedRequest,
) => {
  const userId = request.user?.userId;
  const clientId = request.params.clientId;

  if (!userId) {
    throw new Error("Invalid Session");
  }

  if (!clientId) {
    throw new Error("Missing client id");
  }

  const details = await getClientDetailsById(clientId);
  return getClientDetailsDto(details);
};
