export interface CreateDocumentItemPayload {
  file: Express.Multer.File;
  checklistItemId: string;
  documentId?: string;
}
