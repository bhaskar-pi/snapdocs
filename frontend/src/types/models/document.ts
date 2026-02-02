import { RequestStatus } from "../enums/request";

export interface DocumentModal {
  name: string;
  isRequired: boolean;
}

export interface Document {
  id: string;
  fileName: string;
  fileSize: number;
  storagePath: string;
  uploadedAt: Date;
}

export interface ChecklistItem {
  id: string;
  name: string;
  status: "received" | "pending";
  isRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
  documents: Document[];
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
