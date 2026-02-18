import { getClientDetailsDto } from "@mappers/clients";
import { UpdateClientPayload } from "@models/payloads/documents-request.payload";
import { AuthenticatedUser } from "@models/user";
import {
  deleteClientById,
  getClientDetailsById,
  getClientsByUserId,
  getClientsStatsByUserId,
  updateClient,
} from "@repositories/client.repository";
import { AppError } from "@utils/error";

export const getUserClientsStatsHandler = async ({
  authUser,
}: {
  authUser: AuthenticatedUser;
}) => {
  const clientSummaries = await getClientsStatsByUserId(authUser.id);

  return {
    message: "Clients stats retrieved successfully.",
    data: clientSummaries,
    statusCode: 200,
  };
};

export const getClientDetailsHandler = async ({
  authUser,
  params,
}: {
  authUser: AuthenticatedUser;
  params: { clientId: string };
}) => {
  if (!params.clientId) {
    throw new Error("Missing client id");
  }

  const clientDetails = await getClientDetailsById(
    authUser.id,
    params.clientId,
  );

  const detailsDto = getClientDetailsDto(clientDetails);
  return {
    data: detailsDto,
    statusCode: 200,
  };
};

export const getClientsHandler = async ({
  authUser,
}: {
  authUser: AuthenticatedUser;
}) => {
  const clients = await getClientsByUserId(authUser.id);
  return {
    data: clients,
    statusCode: 200,
  };
};

export const deleteClientHandler = async ({
  authUser,
  params,
}: {
  authUser: AuthenticatedUser;
  params: { clientId: string };
}) => {
  if (!params.clientId) {
    throw new AppError("ClientId not found", 400);
  }

  const isDeleted = await deleteClientById(authUser.id, params.clientId);

  if (!isDeleted) {
    throw new AppError("Client not found or access denied", 404);
  }

  return {
    message: "Client deleted successfully.",
    statusCode: 200,
    success: isDeleted,
  };
};

export const updateClientDetailsHandler = async ({
  authUser,
  params,
  request,
}: {
  authUser: AuthenticatedUser;
  params: { clientId: string };
  request: UpdateClientPayload;
}) => {
  if (!params.clientId) {
    throw new AppError("ClientId not found", 400);
  }

  const updatedClient = await updateClient(
    authUser.id,
    params.clientId,
    request,
  );

  if (!updatedClient) {
    throw new AppError("Client not found or access denied", 404);
  }

  return {
    message: "Client updated successfully.",
    statusCode: 200,
    data: updatedClient,
  };
};
