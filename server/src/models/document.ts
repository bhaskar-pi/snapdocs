import { ChecklistItem } from "@database/schema/checklist-items.schema";

export interface DocumentsUploadChecklist {
  requestedBy: string;
  requestedOn: Date;
  clientName: string;
  dueDate: Date;
  requestTitle: string;
  checklistItems: ChecklistItem[];
}
