export interface CreateDocumentItemPayload {
  file: Express.Multer.File;
  checklistItemId: string;
  requestId: string;
  documentId?: string;
}
