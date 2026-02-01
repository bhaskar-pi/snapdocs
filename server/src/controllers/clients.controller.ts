import { AuthenticatedRequest } from "@models/express";
import { getClientSummariesByUserId } from "@repositories/client.repository";

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
