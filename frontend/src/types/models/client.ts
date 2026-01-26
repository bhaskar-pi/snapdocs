import { Document } from "./document";
import { RequestStatus } from "../enums/request";

export interface Client {
  id?: string;
  fullName: string;
  email: string;
  whatsappNumber?: string;
}

export interface DocRequest {
  templateId?: never;
  title: string;
  dueDate?: string;
  description?: string;
  status: RequestStatus;
  documents: Document[];
}

export interface ClientRequest {
  client: Client;
  request: DocRequest;
}
