import { ChecklistItem } from "@database/schema/checklist-items.schema";
import { Client } from "@database/schema/clients.schema";
import { DocRequest } from "@database/schema/document-requests.schema";
import { Document } from "@database/schema/documents.schema";

export type ClientDetailsRow = {
  client: Client | null;
  request: DocRequest | null;
  checklistItem: ChecklistItem | null;
  document: Document | null;
};
