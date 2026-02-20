import env from "@config/env";
import { generateDocumentsRequestToken } from "./session";
import { StoragePathKeys } from "@models/document";

export const generateClientUploadLink = (
  userId: string,
  clientId: string,
  requestId: string,
) => {
  const token = generateDocumentsRequestToken(userId, clientId, requestId);
  return `${env.APP_URL}/upload-documents/${token}`;
};

export const bytesToMB = (bytes: number) => {
  return Number((bytes / (1024 * 1024)).toFixed(2));
};

export function sanitizeFileName(name: string) {
  return name
    .normalize("NFKD") // normalize unicode
    .replace(/[^\w.\-]/g, "_") // remove unsafe chars
    .replace(/_+/g, "_") // collapse multiple _
    .toLowerCase();
}

export function getDocumentStoragePath(
  file: Express.Multer.File,
  ids: StoragePathKeys,
) {
  const ext = file.originalname.split(".").pop()?.toLowerCase() || "";
  const baseName = file.originalname.replace(/\.[^/.]+$/, "");
  const safeName = sanitizeFileName(baseName);

  const { userId, clientId, requestId, checklistItemId } = ids;

  const storagePath = `${userId}/${clientId}/${requestId}/checklists/${checklistItemId}/${new Date().getTime()}-${safeName}.${ext}`;

  return storagePath;
}
