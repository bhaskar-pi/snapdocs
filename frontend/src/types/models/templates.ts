import { DocumentModal } from "./document";

export interface Template {
  id: string;
  userId: string;

  title: string;
  description?: string;
  category?: string;

  documents: DocumentModal[];

  createdAt: Date;
  updatedAt: Date;
}
