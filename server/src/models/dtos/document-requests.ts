type RequestStatus =
  | "draft"
  | "pending"
  | "in_progress"
  | "completed"
  | "expired"
  | "cancelled";

export interface DocumentDto {
  id: string;
  fileName: string;
  fileSize: number;
  storagePath: string;
  uploadedAt: Date;
}

export interface ChecklistItemDto {
  id: string;
  name: string;
  status: "received" | "pending";
  isRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
  documents: DocumentDto[];
}

export interface DocumentRequestDto {
  id: string;
  title: string;
  description: string | null;
  status: RequestStatus;
  dueDate: Date | null;
  sentAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  checklistItems: ChecklistItemDto[];
}
