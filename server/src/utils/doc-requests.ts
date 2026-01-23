import env from "@config/env";

export const generateClientUploadLink = (
  userId: string,
  clientId: string,
  requestId: string
) => {
  // TODO: use a signed token/opaque request slug -  Leaks internal IDs into public URLs
  return `${env.APP_URL}/${userId}/${clientId}/${requestId}`;
};
