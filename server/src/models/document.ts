import { ChecklistItem } from "@database/schema/checklist-items.schema";

export interface DocumentsUploadChecklist {
  userId: string;
  userName: string;
  requestedOn: Date;
  clientName: string;
  dueDate?: Date;
  senderNotes?: string;
  requestTitle: string;
  checklistItems: ChecklistItem[];
}

export interface StoragePathKeys {
  checklistItemId: string;
  requestId: string;
  userId: string;
  clientId: string;
}
