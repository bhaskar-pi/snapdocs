import { ChecklistItemStatus, RequestStatus } from "../enums/request";

export interface DocumentModal {
  name: string;
  isRequired: boolean;
}

export interface DocumentItem {
  id: string;
  checklistItemId: string;
  fileName: string;
  fileSize: number;
  storagePath: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChecklistItem {
  id: string;
  requestId: string;
  name: string;
  status: ChecklistItemStatus;
  isRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
  documents: DocumentItem[];
}

export interface DocumentRequest {
  id: string;
  title: string;
  description?: string;
  status: RequestStatus;
  dueDate?: Date;
  sentAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  checklistItems: ChecklistItem[];
}

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
