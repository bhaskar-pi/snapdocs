import { supabase } from "@config/supabase";
import { sanitizeFileName } from "@utils/doc-requests";
import { v4 as uuidV4 } from "uuid";

export async function uploadChecklistItemDocument(
  checklistItemId: string,
  file: Express.Multer.File,
) {
  const ext = file.originalname.split(".").pop()?.toLowerCase() || "";
  const baseName = file.originalname.replace(/\.[^/.]+$/, "");
  const safeName = sanitizeFileName(baseName);

  const storagePath = `checklists/${checklistItemId}/${uuidV4()}/${safeName}.${ext}`;

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
