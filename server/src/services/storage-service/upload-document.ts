import { supabase } from "@config/supabase";
import { StoragePathKeys } from "@models/document";
import { getDocumentStoragePath } from "@utils/doc-requests";

export async function uploadChecklistItemDocument(
  file: Express.Multer.File,
  ids: StoragePathKeys,
) {
  const storagePath = getDocumentStoragePath(file, ids);

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
