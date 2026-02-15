import { ClientInsert } from "@database/schema/clients.schema";
import { DocRequestInsert } from "@database/schema/document-requests.schema";
import { RequestStatus } from "@enums/document-requests";

export interface RequestDocumentItem {
  /** name -> document name */
  name: string;
  isRequired: boolean;
}

export interface CreateClientPayload {
  email: string;
  whatsappNumber: string | null;
  fullName: string;
}

export interface TemplateRequestPayload {
  templateId: string;
  dueDate?: string;
  status: RequestStatus;
}

export interface CreateRequestPayload {
  templateId?: never;
  title: string;
  dueDate?: string;
  description?: string;
  status: RequestStatus;
  documents: RequestDocumentItem[];
}

export interface CreateDocumentsRequest {
  client: ClientInsert;
  request: CreateRequestPayload;
}
