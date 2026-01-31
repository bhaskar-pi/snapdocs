import { RequestStatus } from "@enums/request";

export interface DocumentRequest {
  /** name -> document name */
  name: string;
  isRequired: boolean;
}

export interface ClientRequest {
  email: string;
  whatsappNumber: string | null;
  fullName: string;
}

export interface TemplateBasedRequest {
  templateId: string;
  dueDate?: string;
  status: RequestStatus;
}

export interface CustomRequest {
  templateId?: never;
  title: string;
  dueDate?: string;
  description?: string;
  status: RequestStatus;
  documents: DocumentRequest[];
}

type CreateRequestPayload = TemplateBasedRequest | CustomRequest;

export interface CreateDocumentsRequest {
  client: ClientRequest;
  request: CreateRequestPayload;
}
