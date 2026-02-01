import { DocumentRequestDto } from "./document-requests";

export interface ClientDto {
  id: string;
  fullName: string;
  email: string;
  whatsappNumber: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientDetailsDto {
  client: ClientDto;
  requests: DocumentRequestDto[];
}
