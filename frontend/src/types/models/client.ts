import { DocumentModal, DocumentRequest } from "./document";
import { RequestStatus } from "../enums/request";

export interface ClientFormInput {
  fullName: string;
  email: string;
  whatsappNumber?: string;
}

export interface DocRequestFormInput {
  templateId?: never;
  title: string;
  dueDate?: string;
  description?: string;
  status: RequestStatus;
  documents: DocumentModal[];
}

export interface ClientRequestInputForm {
  client: ClientFormInput;
  request: DocRequestFormInput;
}

export interface ClientSummary extends ClientFormInput {
  id: string; // clientId
  activeRequests: number;
  totalChecklists: number;
  completedChecklists: number;
  status: RequestStatus;
}

export interface Client {
  id: string;
  fullName: string;
  email: string;
  whatsappNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientRequestDetails {
  client: Client;
  requests: DocumentRequest[];
}
