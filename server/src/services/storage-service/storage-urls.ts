import { supabase } from "@config/supabase";
import { AppError } from "@utils/error";

export async function generateSignedDocumentUrl(storagePath: string) {
  const { data, error } = await supabase.storage
    .from("documents")
    .createSignedUrl(storagePath, 60 * 60 * 24);

  if (error) {
    throw new AppError(`Failed to generate signed URL: ${error.message}`, 500);
  }

  return data.signedUrl;
}
