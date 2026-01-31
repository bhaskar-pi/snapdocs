import { getClientSummariesByUserId } from "@repositories/client.repository";

export async function getClientSummary(userId: string) {
  const data = await getClientSummariesByUserId(userId);
 
}
