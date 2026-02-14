import { getClientDetailsDto } from "@mappers/clients";
import { AuthenticatedRequest } from "@models/express";
import {
  getClientById,
  getClientDetailsById,
  getClientsByUserId,
  getClientSummariesByUserId,
} from "@repositories/client.repository";
import { getUserById } from "@repositories/user.repository";
import { verifyDocumentsRequestToken } from "@utils/session";

export const getClientsSummariesHandler = async (
  request: AuthenticatedRequest,
) => {
  const userId = request.user?.id;

  if (!userId) {
    throw new Error("Invalid Session");
  }

  const clientSummaries = await getClientSummariesByUserId(userId);

  return clientSummaries;
};

export const getClientDetailsHandler = async (
  request: AuthenticatedRequest,
) => {
  const userId = request.user?.id;
  const clientId = request.params.clientId;

  if (!userId) {
    throw new Error("Invalid Session");
  }

  if (!clientId) {
    throw new Error("Missing client id");
  }

  const details = await getClientDetailsById(userId, clientId);
  return getClientDetailsDto(details);
};

export const getClientsHandler = async (request: AuthenticatedRequest) => {
  const userId = request.user?.id;

  if (!userId) {
    throw new Error("Invalid Session");
  }

  const clients = await getClientsByUserId(userId);
  return clients;
};
