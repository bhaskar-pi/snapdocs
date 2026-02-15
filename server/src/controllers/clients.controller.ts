import { getClientDetailsDto } from "@mappers/clients";
import { AuthenticatedUser } from "@models/user";
import {
  getClientDetailsById,
  getClientsByUserId,
  getClientsStatsByUserId,
} from "@repositories/client.repository";

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
