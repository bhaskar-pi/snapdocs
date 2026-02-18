import { supabase } from "@config/supabase";
import { StoragePathKeys } from "@models/document";
import { sanitizeFileName } from "@utils/doc-requests";

export async function uploadChecklistItemDocument(
  file: Express.Multer.File,
  ids: StoragePathKeys,
) {
  const ext = file.originalname.split(".").pop()?.toLowerCase() || "";
  const baseName = file.originalname.replace(/\.[^/.]+$/, "");
  const safeName = sanitizeFileName(baseName);

  const { userId, requestId, checklistItemId, clientId } = ids;

  const storagePath = `${userId}/${clientId}/${requestId}/checklists/${checklistItemId}/${new Date().getTime()}-${safeName}.${ext}`;

  const { error } = await supabase.storage
    .from("documents")
    .upload(storagePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(
      `Error uploading document to supabase storage: ${error.message}`,
    );
  }

  return storagePath;
}
