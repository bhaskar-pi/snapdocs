import { ClientDetailsRow } from "@models/clients";
import { DocumentRequestDto } from "@models/dtos/document-requests";

export function getClientDetailsDto(records: ClientDetailsRow[]) {
  if (!records.length) {
    throw new Error("Client not found");
  }

  const client = records[0].client;

  const requestsMap = new Map<string, DocumentRequestDto>();

  for (const record of records) {
    if (!record.request) continue;

    const requestId = record.request.id;

    if (!requestsMap.has(requestId)) {
      requestsMap.set(requestId, {
        ...record.request,
        checklistItems: [],
      } as DocumentRequestDto);
    }

    const request = requestsMap.get(requestId)!;

    if (record.checklistItem) {
      const checklistId = record.checklistItem.id;

      let checklistItem = request.checklistItems.find(
        (c) => c.id === checklistId,
      );

      if (!checklistItem) {
        checklistItem = {
          ...record.checklistItem,
          documents: [],
        };
        request.checklistItems.push(checklistItem);
      }

      if (record.document) {
        checklistItem.documents.push(record.document);
      }
    }
  }

  return {
    client,
    requests: Array.from(requestsMap.values()),
  };
}
